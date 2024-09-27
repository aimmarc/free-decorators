import { MetadataKey } from "./enum";
import { FactoryMap } from "./factory";
import { validateSync } from "class-validator";
import { Constructor } from "./interfaces";
import { getErrorTips, pipesTransform } from "./http/decorators";
import { RESPONSE_DTO_KEY } from "./constant";

function transformPipes(data: Record<string, any>, ResModel: Constructor<any>) {
    Object.keys(data).forEach((key) => {
        const record = Reflect.getMetadata(key, ResModel) || {};
        if (record.pipes?.length > 0)
            data[key] = pipesTransform(record, data[key]);
    });
    return data;
}

/**
 * 验证装饰器
 * @param validator
 * @returns
 */
export function Validate(options?: {
    validator?: (...args: any) => string | boolean;
}) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const oringinMethod = descriptor.value;

        descriptor.value = async function (...params: any[]) {
            const token = Reflect.getMetadata(
                MetadataKey.TOKEN,
                target.constructor
            );
            const ReqModel: Constructor<any> = (Reflect.getMetadata(
                MetadataKey.PARAMTYPES_METADATA,
                target,
                key
            ) || [])[0];
            const ResModel: Constructor<any> = Reflect.getMetadata(
                `${key}${RESPONSE_DTO_KEY}`,
                target,
                key
            );
            const param: Record<string, any> = params[0];
            if (ReqModel) {
                const validParam = new ReqModel();
                for (const key in param) {
                    validParam[key] = param[key];
                }
                const validErrors = validateSync(validParam);
                const errors = getErrorTips(validErrors);
                if (errors) {
                    console.error(
                        `*** @tcwl/utils decorators validate fail *** ${errors}`
                    );
                    return {
                        isSuccess: false,
                        message: errors,
                    };
                }
            }
            const module = FactoryMap.get(token);
            if (options?.validator) {
                const res = options.validator(param);
                const isStr = typeof res === "string";
                if (!res || isStr) {
                    const msg = isStr ? res : `Param is not validate!`;
                    module.showMessage?.fail?.(msg);
                    console.error(
                        `*** @tcwl/utils decorators validate fail *** ${msg}`
                    );
                    return {
                        isSuccess: false,
                        message: msg,
                    };
                }
            }
            const response = await oringinMethod.apply(this, [...params]);
            if (ResModel) {
                response.data = transformPipes(response.data, ResModel);
            }
            return response;
        };
    };
}
