import type { ModuleMetadataType } from "./interfaces";
/**
 * @module Module
 * @param { ModuleMetadata }
 * @description 模块管理函数
 */
export declare const Module: (metadata?: ModuleMetadataType) => ClassDecorator;
/**
 * 全局模块
 * @returns
 */
export declare const Global: () => (target: any) => void;
