import { AxiosRequestConfig } from "axios";
import { RequestMethod } from "../enum";
import { Constructor, InterceptorsType } from "../interfaces";
import { ValidationError } from "class-validator";
type MessageType = string | boolean | ((...args: any) => void);
export type RequestConfigureType<T = any> = AxiosRequestConfig & {
    sleep?: number;
    retryTimes?: number;
    params?: T;
    data?: T;
    requestInterceptor?: InterceptorsType["request"];
};
/**
 * 获取Dto中未通过的错误信息
 * @param errors
 * @returns
 */
export declare function getErrorTips(errors: ValidationError[]): string;
/**
 * 处理管道逻辑
 * @param transform
 * @param value
 * @returns
 */
export declare function pipesTransform(transform: {
    pipes: Constructor<any>[];
    originPropertyName: string;
    propertyName: string;
    dto: Constructor<any>;
}, value: unknown): unknown;
/**
 * 请求method装饰器工厂
 * @param method
 * @param url
 * @param message
 * @returns
 */
export declare function MethodDecoratorFactory(method: RequestMethod, url: string, message?: MessageType): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function GetMapping(url: string, message?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function PostMapping(url: string, message?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function PutMapping(url: string, message?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function DeleteMapping(url: string, message?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
/**
 * 动态添加headers key value
 * @param key
 * @param value
 * @returns
 */
export declare function Header(key: string, value: any): (target: any, methodKey: string, _descriptor: PropertyDescriptor) => void;
/**
 * 动态设置延时毫秒数
 * @param ms
 * @returns
 */
export declare function Sleep(ms?: number): (target: any, methodKey: string, _descriptor: PropertyDescriptor) => void;
/**
 * 动态设置错误重试次数
 * @param times
 * @returns
 */
export declare function Retry(times: number): (target: any, methodKey: string, _descriptor: PropertyDescriptor) => void;
/**
 * 动态自定义当前请求配置
 * @param config
 * @returns
 */
export declare function Configure(config: RequestConfigureType): (target: any, methodKey: string, _descriptor: PropertyDescriptor) => void;
/**
 * 收集响应Model
 * @param ResponseModel
 * @returns
 */
export declare function ResponseModel(ResModel: Constructor<any>): (target: any, methodKey: string, _descriptor: PropertyDescriptor) => void;
export {};
