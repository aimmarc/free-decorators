// @ts-nocheck
import {
    RouteRecordRaw,
    _RouteRecordBase,
    RouteRecordRedirectOption,
} from "vue-router";
import { Constructor } from "../interfaces";
import {
    ComponentOptions as ComponentOptionsVue3,
    DefineComponent,
    defineComponent,
} from "vue";
import { MetadataKey } from "../enum";

export const RouterContainer = new Map();
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
export function Router(option: RouteOptionType) {
    return function (_target: any) {
        RouterContainer.set(option.dir, option);
    };
}

/**
 * 获取所有路由
 * @param pathes
 * @returns
 */
function getRouters(pathes: string[]) {
    return new Promise((resolve) => {
        const routerConfig: Record<string, any> = [];
        pathes.forEach(async (path: string, index) => {
            await import(`@/views${path}`);
            const route = RouterContainer.get(path.replace(".vue", ""));
            routerConfig.push({
                ...route,
                dir: null,
                component: () => import(`@/views${path}`),
            });
            if (index === pathes.length - 1) {
                resolve(routerConfig);
            }
        });
    });
}

/**
 * 根据组件文件生成路由
 * @param context
 * @param viewsDir
 * @returns
 */
export async function injectViews(context: any) {
    const pathes = context.keys();
    const realPathes = pathes.map((path: string) => path.slice(1));
    return (await getRouters(realPathes)) as Promise<RouteRecordRaw[]>;
}

/**
 * toComponent 返回一个defineComponent对象
 * @param ViewConstructor
 * @param options
 * @returns
 */
export function toComponent<P = unknown, T = unknown>(
    ViewConstructor: Constructor<T>
) {
    const options: Record<string, any> = Reflect.getMetadata(
        MetadataKey.VUE3_OPTIONS,
        ViewConstructor
    );
    return defineComponent<P, T>({
        ...options,
        setup(props, ctx) {
            const viewInstance: any = new ViewConstructor(props, ctx);
            if (typeof viewInstance.setup === "function")
                viewInstance.setup(props, ctx);
            const keys = Reflect.ownKeys(viewInstance.constructor.prototype); // 使用Reflect.ownKeys可以取出原型链上的属性keys
            keys.forEach((key: string | symbol) => {
                if (typeof viewInstance[key] === "function") {
                    viewInstance[key] = viewInstance[key].bind(viewInstance); // 在这里把取出的所有方法bind一下this
                }
            });
            return viewInstance as T;
        },
    }) as DefineComponent<P, T, {}, {}, {}>;
}

/**
 * 兼容老版本defineBaseComponent
 */
export const defineBaseComponent = toComponent;

/**
 * 收集BaseView子类的options
 * @param options
 * @returns
 */
export function ComponentOptions<P = any>(
    options: BaseComponentOptions<P> = {}
) {
    return function (target: any) {
        Reflect.defineMetadata(MetadataKey.VUE3_OPTIONS, options, target);
    };
}
