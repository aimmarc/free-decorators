import { AxiosRequestConfig, AxiosResponse } from "axios";
import {
    CONNECTSTRING,
    HEADER_KEY,
    SLEEP_KEY,
    RETRY_KEY,
    CONFIGURE_KEY,
    RESPONSE_DTO_KEY,
} from "../constant";
import { HttpStatus, MetadataKey, RequestMethod } from "../enum";
import { FactoryMap, HttpServicesApplication } from "../factory";
import { tips } from "./tips";
import { Constructor, InterceptorsType } from "../interfaces";
import { ValidationError, validateSync } from "class-validator";
import { globalConfig } from "../factory";

type MessageType = string | boolean | ((...args: any) => void);
export type RequestConfigureType<T = any> = AxiosRequestConfig & {
    sleep?: number;
    retryTimes?: number;
    params?: T;
    data?: T;
    requestInterceptor?: InterceptorsType["request"];
};

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, ms);
    });
}

/**
 * 验证请求响应
 * @param response
 * @param message
 * @returns
 */
function validResponse(response: AxiosResponse) {
    if (
        response.status >= HttpStatus.OK &&
        response.status < HttpStatus.BAD_REQUEST
    ) {
        return true;
    }
    const tip = tips[response.status as HttpStatus];
    if (!tip) {
        return response.status >= 500 ? "服务端错误" : "客户端错误";
    }
    return tip;
}

/**
 * 展示提示
 * @param tip
 * @param fail
 * @param message
 */
function showTip(
    tip: string | boolean,
    fail: (...args: any) => void,
    message?: MessageType
) {
    if (typeof tip === "string" && message !== false) {
        fail(tip);
    }
}

/**
 * 具体验证逻辑
 * @param originParam
 * @param ValidateClass
 * @returns
 */
function getValidParam(
    originParam: Record<string, any>,
    ValidateClass?: Constructor<any>
) {
    if (!ValidateClass) {
        return originParam;
    }
    const validParam = new ValidateClass();
    for (const key in validParam) {
        validParam[key] = originParam[key];
    }
    return validParam;
}

/**
 * 获取Dto中未通过的错误信息
 * @param errors
 * @returns
 */
export function getErrorTips(errors: ValidationError[]) {
    const tips: string[] = [];
    errors.forEach((err) => {
        const { constraints } = err;
        for (const key in constraints) {
            tips.push(constraints[key]);
        }
    });
    return tips.join(",");
}

/**
 * 通过Dto验证参数
 * @param ReqDto
 * @param params
 * @param module
 */
function validDto(
    ReqDto: Constructor<any>,
    params: Record<string, unknown>,
    module: HttpServicesApplication
) {
    const validParam = getValidParam(params, ReqDto);
    const validErrors = validateSync(validParam);
    if (validErrors.length > 0) {
        const msg = getErrorTips(validErrors);
        const showMessage = module.showMessage || globalConfig.showMessage;
        showMessage?.fail(msg);
        console.error(msg);
    }
}

/**
 * 将参数转换为Dto过滤后的格式
 * @param param
 * @param Dto
 * @returns
 */
function transToDtoParam(
    param: Record<string, unknown>,
    Dto: Constructor<any>
) {
    const dto = new Dto();
    const dtoParam: Record<string, unknown> = {};
    for (const key in dto) {
        dtoParam[key] = param[key];
    }
    return dtoParam || {};
}

/**
 * 处理管道逻辑
 * @param transform
 * @param value
 * @returns
 */
export function pipesTransform(
    transform: {
        pipes: Constructor<any>[];
        originPropertyName: string;
        propertyName: string;
        dto: Constructor<any>;
    },
    value: unknown
) {
    const { pipes /**, originPropertyName, propertyName, dto */ } = transform;
    const res = pipes.reduce((prev: any, pipe: any) => {
        const pipeInstance = typeof pipe === "function" ? new pipe() : pipe;
        return typeof pipeInstance.transform === "function"
            ? pipeInstance.transform(prev)
            : prev || pipeInstance.defaultValue;
    }, value);
    return res;
}

/**
 * 格式化响应值
 * @param response
 * @param ResDto
 * @returns
 */
function formatResponse(
    response: Record<string, unknown>,
    ResDto: Constructor<any>
) {
    const resDto = new ResDto();
    for (const key in resDto) {
        const record = Reflect.getMetadata(key, ResDto);
        if (record) {
            resDto[key] = pipesTransform(record, response[key]);
        } else {
            resDto[key] = response[key];
        }
    }
    return resDto;
}

/**
 * 生成请求配置
 * @param target
 * @param propertyKey
 * @param method
 * @param params
 * @param url
 * @returns
 */
function generateReqConfig(
    target: any,
    propertyKey: string,
    method: RequestMethod,
    params: Record<string, any>,
    url: string
) {
    const token = Reflect.getMetadata(MetadataKey.TOKEN, target.constructor);
    const module = FactoryMap.get(token);
    const ReqDto = Reflect.getMetadata(
        MetadataKey.PARAMTYPES_METADATA,
        target,
        propertyKey
    )?.[0];
    const ResDto = Reflect.getMetadata(
        `${propertyKey}${RESPONSE_DTO_KEY}`,
        target,
        propertyKey
    );
    if (ReqDto?.length > 0 && typeof ReqDto[0] === "function") {
        validDto(ReqDto[0], params, module);
    }
    const interceptors = module.interceptors || globalConfig.interceptors;
    const controllerPrefix = (<any>target)[
        `${target.constructor.name}${CONNECTSTRING}`
    ];
    const globalPrefix = module.globalPrefix || globalConfig.globalPrefix;
    const showMessage = module.showMessage || globalConfig.showMessage;
    const tmpUrl = `${controllerPrefix}${url}`;
    const [_, ...paramList] = tmpUrl.split("/:");
    const needDeletePropertys: string[] = []; // 用于收集url参数key
    const reqUrl = paramList
        .reduce((prev, next) => {
            needDeletePropertys.push(next);
            return prev.replace(new RegExp(next), params[next]);
        }, tmpUrl)
        .replace(/:/g, "");
    const finalParams =
        typeof ReqDto === "function" ? transToDtoParam(params, ReqDto) : params;
    if (needDeletePropertys.length > 0) {
        needDeletePropertys.forEach((key) => {
            delete finalParams[key]; // 将最终参数中属于url参数的属性删除
        });
    }
    const isGet = method === RequestMethod.GET;
    const configure = Reflect.getMetadata(
        `${propertyKey}${CONFIGURE_KEY}`,
        target
    );
    const metaHeaders = Reflect.getMetadata(
        `${propertyKey}${HEADER_KEY}`,
        target
    );
    const retryTimes =
        Reflect.getMetadata(`${propertyKey}${RETRY_KEY}`, target) ||
        configure?.retryTimes;
    const delay =
        Reflect.getMetadata(`${propertyKey}${SLEEP_KEY}`, target) ||
        configure?.sleep;
    const globalRequestConfig = globalConfig.requestConfig || {};
    return {
        isGet,
        metaHeaders,
        retryTimes,
        delay,
        reqUrl,
        showMessage,
        globalPrefix,
        interceptors,
        configure,
        finalParams,
        ResDto,
        reqCfg: {
            ...globalRequestConfig,
            ...configure,
            headers: {
                ...configure?.headers,
                ...metaHeaders,
            },
            url: `${globalPrefix}${reqUrl}`,
            method,
            [isGet ? "params" : "data"]: finalParams,
            requestInterceptor: interceptors?.request,
            retryTimes,
        },
    };
}

/**
 * 请求method装饰器工厂
 * @param method
 * @param url
 * @param message
 * @returns
 */
export function MethodDecoratorFactory(
    method: RequestMethod,
    url: string,
    message?: MessageType
) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod: (params: any) => any = descriptor.value;
        descriptor.value = async function (params: Record<string, any>) {
            const boundMethod = originalMethod.bind(this);
            const { delay, showMessage, interceptors, ResDto, reqCfg } =
                generateReqConfig(target, propertyKey, method, params, url);
            if (delay > 0) {
                await sleep(delay); // 处理sleep
            }
            try {
                const response = await boundMethod.apply(this, [reqCfg]);
                const tip = validResponse(response);
                if (showMessage?.fail) showTip(tip, showMessage.fail, message);
                const finalResponse = interceptors?.response
                    ? interceptors?.response(response)
                    : response;
                return typeof ResDto === "function"
                    ? formatResponse(finalResponse, ResDto)
                    : finalResponse;
            } catch (err: any) {
                console.error(err);
                if (err.response) {
                    const tip = validResponse(err.response);
                    if (showMessage?.fail)
                        showTip(tip, showMessage.fail, message);
                    return interceptors?.response
                        ? interceptors?.response(err.response)
                        : Promise.reject(err);
                }
                if (showMessage?.fail)
                    showTip("请求异常", showMessage.fail, message);
                return Promise.reject(err);
            }
        };
        return descriptor;
    };
}

export function GetMapping(url: string, message?: string) {
    return MethodDecoratorFactory(RequestMethod.GET, url, message);
}

export function PostMapping(url: string, message?: string) {
    return MethodDecoratorFactory(RequestMethod.POST, url, message);
}

export function PutMapping(url: string, message?: string) {
    return MethodDecoratorFactory(RequestMethod.PUT, url, message);
}

export function DeleteMapping(url: string, message?: string) {
    return MethodDecoratorFactory(RequestMethod.DELETE, url, message);
}

/**
 * 动态添加headers key value
 * @param key
 * @param value
 * @returns
 */
export function Header(key: string, value: any) {
    return function (
        target: any,
        methodKey: string,
        _descriptor: PropertyDescriptor
    ) {
        const metaHeaders = Reflect.getMetadata(
            `${methodKey}${HEADER_KEY}`,
            target
        );
        if (metaHeaders) {
            metaHeaders[key] = value;
            Reflect.defineMetadata(
                `${methodKey}${HEADER_KEY}`,
                metaHeaders,
                target
            );
        } else {
            Reflect.defineMetadata(
                `${methodKey}${HEADER_KEY}`,
                {
                    [key]: value,
                },
                target
            );
        }
    };
}

/**
 * 动态设置延时毫秒数
 * @param ms
 * @returns
 */
export function Sleep(ms = 0) {
    return function (
        target: any,
        methodKey: string,
        _descriptor: PropertyDescriptor
    ) {
        Reflect.defineMetadata(`${methodKey}${SLEEP_KEY}`, ms, target);
    };
}

/**
 * 动态设置错误重试次数
 * @param times
 * @returns
 */
export function Retry(times: number) {
    return function (
        target: any,
        methodKey: string,
        _descriptor: PropertyDescriptor
    ) {
        Reflect.defineMetadata(`${methodKey}${RETRY_KEY}`, times, target);
    };
}

/**
 * 动态自定义当前请求配置
 * @param config
 * @returns
 */
export function Configure(config: RequestConfigureType) {
    return function (
        target: any,
        methodKey: string,
        _descriptor: PropertyDescriptor
    ) {
        Reflect.defineMetadata(`${methodKey}${CONFIGURE_KEY}`, config, target);
    };
}

/**
 * 收集响应Model
 * @param ResponseModel
 * @returns
 */
export function ResponseModel(ResModel: Constructor<any>) {
    return function (
        target: any,
        methodKey: string,
        _descriptor: PropertyDescriptor
    ) {
        Reflect.defineMetadata(
            `${methodKey}${RESPONSE_DTO_KEY}`,
            ResModel,
            target,
            methodKey
        );
    };
}
