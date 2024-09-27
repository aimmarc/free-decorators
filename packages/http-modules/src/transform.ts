import { Constructor } from "./interfaces";

/**
 * 装饰响应Model属性
 * @param propertyName
 * @param pipes
 * @returns
 */
export function Transform(
    propertyName?: string,
    ...pipes: Array<Constructor<any> | object>
): PropertyDecorator {
    return function (target: object, propertyKey: string | symbol) {
        Reflect.defineMetadata(
            propertyKey,
            {
                pipes,
                originPropertyName: propertyKey,
                propertyName,
                dto: target.constructor,
            },
            target.constructor
        );
    };
}
