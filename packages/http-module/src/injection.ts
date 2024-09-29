import { MetadataKey } from "./enum";

/**
 * @module Injectable
 * @description 标注依赖注入
 * @returns { ClassDecorator } ClassDecorator
 */
export const Injectable = (): ClassDecorator => {
    return (target: object) => {
        Reflect.defineMetadata(MetadataKey.INJECTABLE_WATERMARK, true, target);
    };
};

// export const Injection = () => {
//     return function (target: any, propertyName: string) {
//         console.log(target, propertyName);
//     };
// };