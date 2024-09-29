import { Constructor } from "../interfaces";
/**
 * 生成顶层代理逻辑
 * @param reactiveInstance
 * @param viewInstance
 * @param ViewConstructor
 * @returns
 */
export declare function genWrapperProxy(reactiveInstance: object, viewInstance: object, ViewConstructor: Constructor<any>): object;
/**
 * 绑定实例，确保响应式正常，确保this指向正常，确保get set正常
 * @param ViewConstructor
 * @param viewInstance
 */
export declare function bindingInstance(ViewConstructor: any, viewInstance: any, reactiveInstance: any, wrapperProxy: any): void;
/**
 * setup方法处理器
 * @param target
 * @param instance
 * @returns
 */
export declare function setupMethodsResolver(target: any, instance: any): void;
/**
 * 处理setup属性
 * @param target
 * @param instance
 * @returns
 */
export declare function setupPropsResolver(target: any, instance: any): void;
/**
 * watch处理
 * @param target
 * @param instance
 */
export declare function watcherResolver(target: any, instance: any): void;
/**
 * 处理watchEffect
 * @param target
 * @param instance
 */
export declare function watchEffectResolver(target: any, instance: any): void;
/**
 * 注入处理
 * @param target
 * @param instance
 * @returns
 */
export declare function injectResolver(target: any, instance: any): void;
/**
 * 生产者处理
 * @param target
 * @param instance
 * @returns
 */
export declare function provideResolver(target: any, instance: any): void;
/**
 * props处理
 * @param target
 * @param instance
 * @returns
 */
export declare function propsResolver(target: any): Record<string, any> | undefined;
/**
 * markRaw处理
 * @param target
 * @param instance
 * @returns
 */
export declare function markRawResolver(target: any, instance: any): void;
