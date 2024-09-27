import { _RouteRecordBase, RouteRecordRedirectOption } from "vue-router";
import { Constructor } from "../interfaces";
import { ComponentOptions as ComponentOptionsVue3, DefineComponent } from "vue";
export declare const RouterContainer: Map<any, any>;
type BaseComponentOptions<P = any> = ComponentOptionsVue3<P> & {
    setup?: undefined;
};
interface RouteOptionType extends _RouteRecordBase {
    redirect?: RouteRecordRedirectOption;
    component?: undefined;
    dir: string;
}
export { Injection, InjectionRepository, InjectionService } from "./common";
/**
 * 类装饰器，注册路由
 * @param option
 * @returns
 */
export declare function Router(option: RouteOptionType): (_target: any) => void;
/**
 * 根据组件文件生成路由
 * @param context
 * @param viewsDir
 * @returns
 */
export declare function injectViews(context: any): Promise<RouteRecordRaw[]>;
/**
 * toComponent 返回一个defineComponent对象
 * @param ViewConstructor
 * @param options
 * @returns
 */
export declare function toComponent<P = unknown, T = unknown>(ViewConstructor: Constructor<T>): DefineComponent<P, T, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<P extends import("vue").ComponentPropsOptions<{
    [x: string]: unknown;
}> ? import("vue").ExtractPropTypes<P> : P>, import("vue").ExtractDefaultPropTypes<P>>;
/**
 * 兼容老版本defineBaseComponent
 */
export declare const defineBaseComponent: typeof toComponent;
/**
 * 收集BaseView子类的options
 * @param options
 * @returns
 */
export declare function ComponentOptions<P = any>(options?: BaseComponentOptions<P>): (target: any) => void;
