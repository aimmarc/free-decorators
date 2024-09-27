import { Constructor } from "./interfaces";
/**
 * 装饰响应Model属性
 * @param propertyName
 * @param pipes
 * @returns
 */
export declare function Transform(propertyName?: string, ...pipes: Array<Constructor<any> | object>): PropertyDecorator;
