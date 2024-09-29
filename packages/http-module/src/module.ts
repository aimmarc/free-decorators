import { MetadataKey } from "./enum";
import type { ModuleMetadataType } from "./interfaces";

type ModuleMetadataTypeKeys = keyof ModuleMetadataType;

/**
 * @module Module
 * @param { ModuleMetadata }
 * @description 模块管理函数
 */
export const Module = (metadata: ModuleMetadataType = {}): ClassDecorator => {
    //   const propsKeys = Object.keys(metadata)
    return (target: any) => {
        for (const property in metadata) {
            if (metadata[<ModuleMetadataTypeKeys>property]) {
                const targetProperty =
                    property === "repositories" ? "controllers" : property;
                Reflect.defineMetadata(
                    targetProperty,
                    metadata[<ModuleMetadataTypeKeys>property],
                    target
                );
            }
        }
    };
};

/**
 * 全局模块
 * @returns
 */
export const Global = () => {
    return (target: any) => {
        Reflect.defineMetadata(MetadataKey.GLOBAL, true, target);
    };
};
