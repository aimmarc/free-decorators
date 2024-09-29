import { Constructor } from "../interfaces";
import { ComponentOptions as ComponentOptionsVue3, DefineComponent, WatchOptions, WatchOptionsBase, Prop as PropOptions } from "vue";
export declare const RouterContainer: Map<any, any>;
type BaseComponentOptions<P = any> = ComponentOptionsVue3<P> & {
    setup?: undefined;
};
/**
 * toComponent 将class组件转换为组合式API组件
 * @param ViewConstructor
 * @param options
 * @returns
 */
export declare function toComponent<P = any, T = any>(ViewConstructor: Constructor<T>): DefineComponent<P, T, {}, {}, {}>;
/**
 * 兼容老版本defineBaseComponent
 */
export declare const defineBaseComponent: <P = any, T = any>(ViewConstructor: Constructor<T>) => DefineComponent<P, T, {}, {}, {}>;
/**
 * 收集BaseView子类的options
 * @param options
 * @returns
 */
export declare function Component<P = any>(options?: BaseComponentOptions<P> | any): any;
/**
 * 兼容老版本
 */
export declare const ComponentOptions: <P = any>(options?: BaseComponentOptions<P> | any) => any;
/**
 * 兼容老版本
 */
export declare const Options: <P = any>(options?: BaseComponentOptions<P> | any) => any;
/**
 * 注入Watch
 * @param Watch
 * @returns
 */
export declare function Watch(propertyKey: string | string[], options?: WatchOptions): (target: any, methodKey: string, descriptor: PropertyDescriptor) => void;
/**
 * 注入setup
 * @param cb
 * @returns
 */
export declare function Setup(cb?: () => any): void | TypedPropertyDescriptor<Function> | any;
/**
 * 收集WatchEffect
 * @param options
 * @returns
 */
export declare function WatchEffect(options?: WatchOptionsBase): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * 注入装饰器
 * @param defaultValue
 * @returns
 */
export declare function Inject<T = any>(defaultValue?: T, propertyKey?: string): any;
/**
 * 生产者装饰器
 * @param defaultValue
 * @returns
 */
export declare function Provide(alias?: string | any, propertyKey?: string): any;
/**
 * prop装饰器
 * @param options
 * @returns
 */
export declare function Prop(options?: PropOptions<any>): (target: any, propertyKey: string) => void;
/**
 * 不需要被track的数据
 * @param target
 * @param propertyKey
 */
export declare function MarkRaw(target: any, propertyKey: string): void;
export {};
