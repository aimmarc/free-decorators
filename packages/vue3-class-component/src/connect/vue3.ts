import { Constructor } from "../interfaces";
import {
    ComponentOptions as ComponentOptionsVue3,
    DefineComponent,
    defineComponent,
    WatchOptions,
    WatchOptionsBase,
    Prop as PropOptions,
    reactive,
    onUnmounted,
} from "vue";
import { MetadataKey } from "../enum";
import {
    bindingInstance,
    setupMethodsResolver,
    // setupPropsResolver,
    watchEffectResolver,
    watcherResolver,
    injectResolver,
    provideResolver,
    propsResolver,
    markRawResolver,
    genWrapperProxy,
} from "./utils";

export const RouterContainer = new Map();
type BaseComponentOptions<P = any> = ComponentOptionsVue3<P> & {
    setup?: undefined;
};

/**
 * toComponent 将class组件转换为组合式API组件
 * @param ViewConstructor
 * @param options
 * @returns
 */
export function toComponent<P = any, T = any>(
    ViewConstructor: Constructor<T>
): DefineComponent<P, T, {}, {}, {}> {
    const options: Record<string, any> = Reflect.getMetadata(
        MetadataKey.VUE3_OPTIONS,
        ViewConstructor
    );
    if (!options) throw "this constructor is not decoreted by 'Component'";
    const props = propsResolver(ViewConstructor); // 获取通过@Prop定义的props
    options.props = {
        ...options.props,
        ...props,
    };
    return defineComponent<P, T>({
        ...options,
        setup(props, ctx) {
            // 首先实例化class组件，并且传入props、ctx
            let viewInstance: any = new ViewConstructor(props, ctx);
            // 将实例转换为reactive，让属性具备响应式
            let instance = reactive(viewInstance);
            // 再进行一层代理，处理ref等逻辑
            let wrapperProxy: any = genWrapperProxy(
                instance,
                viewInstance,
                ViewConstructor
            );
            onUnmounted(() => {
                wrapperProxy = null;
                instance = null;
                viewInstance = null;
            });
            // setup属性处理函数前置到基类构造器中执行，保证功能正常
            // 执行setup属性处理函数
            // setupPropsResolver(ViewConstructor, instance);
            // 绑定实例操作
            bindingInstance(
                ViewConstructor,
                viewInstance,
                instance,
                wrapperProxy
            );
            // 执行不需要响应的数据
            markRawResolver(ViewConstructor, viewInstance);
            // 执行provide处理函数
            provideResolver(ViewConstructor, instance);
            // 执行注入处理函数
            injectResolver(ViewConstructor, instance);
            // 执行setupMethods
            setupMethodsResolver(ViewConstructor, instance);
            // 执行watchers
            watcherResolver(ViewConstructor, instance);
            // 执行watchEffects
            watchEffectResolver(ViewConstructor, instance);
            // 如果存在setup钩子，直接执行
            if (typeof viewInstance.setup === "function")
                viewInstance.setup(props, ctx);
            if (
                typeof viewInstance.render === "function" &&
                "render" in viewInstance
            ) {
                return () => instance.render();
            }
            return instance as T;
        },
    }) as DefineComponent<P, T, {}, {}, {}>;
}

/**
 * 兼容老版本defineBaseComponent
 */
export const defineBaseComponent = <P = any, T = any>(
    ViewConstructor: Constructor<T>
): DefineComponent<P, T, {}, {}, {}> => {
    console.warn(
        "'defineBaseComponent' is unsafe, please change to use 'toComponent'."
    );
    return toComponent<P, T>(ViewConstructor);
};

/**
 * 收集BaseView子类的options
 * @param options
 * @returns
 */
export function Component<P = any>(
    options: BaseComponentOptions<P> | any = {}
): any {
    if (typeof options === "function") {
        return Component()(options);
    }
    return function (target: any) {
        Reflect.defineMetadata(MetadataKey.VUE3_OPTIONS, options || {}, target);
    };
}

/**
 * 兼容老版本
 */
export const ComponentOptions = <P = any>(
    options: BaseComponentOptions<P> | any = {}
) => {
    console.warn(
        "'ComponentOptions' is unsafe, please change to use 'Component'."
    );
    return Component(options);
};

/**
 * 兼容老版本
 */
export const Options = <P = any>(
    options: BaseComponentOptions<P> | any = {}
) => {
    console.warn("'Options' is unsafe, please change to use 'Component'.");
    return Component(options);
};

/**
 * 注入Watch
 * @param Watch
 * @returns
 */
export function Watch(propertyKey: string | string[], options?: WatchOptions) {
    return function (
        target: any,
        methodKey: string,
        descriptor: PropertyDescriptor
    ) {
        const watches: Map<any, any> =
            Reflect.getMetadata(MetadataKey.VUE3_WATCHS, target.constructor) ||
            new Map();
        watches.set(`${methodKey}${MetadataKey.VUE3_WATCHS}`, {
            options,
            methodKey,
            propertyKey,
        });
        Reflect.defineMetadata(
            MetadataKey.VUE3_WATCHS,
            watches,
            target.constructor
        );
    };
}

/**
 * 注入setup
 * @param cb
 * @returns
 */
export function Setup(
    cb?: () => any
): void | TypedPropertyDescriptor<Function> | any {
    return function (
        target: any,
        propertyKey: string,
        descriptor?: TypedPropertyDescriptor<Function>
    ) {
        if (propertyKey && typeof descriptor?.value === "function") {
            // 是方法
            const methods: Map<any, any> =
                Reflect.getMetadata(
                    MetadataKey.VUE3_SETUP_METHODS,
                    target.constructor
                ) || new Map();
            methods.set(`${propertyKey}${MetadataKey.VUE3_SETUP_METHODS}`, {
                propertyKey,
            });
            Reflect.defineMetadata(
                MetadataKey.VUE3_SETUP_METHODS,
                methods,
                target.constructor
            );
        } else {
            const setupProps =
                Reflect.getMetadata(
                    MetadataKey.VUE3_SETUP_PROPS,
                    target.constructor
                ) || new Map();
            setupProps.set(`${propertyKey}${MetadataKey.VUE3_SETUP_PROPS}`, {
                propertyKey,
                cb,
            });
            Reflect.defineMetadata(
                MetadataKey.VUE3_SETUP_PROPS,
                setupProps,
                target.constructor
            );
        }
    };
}

/**
 * 收集WatchEffect
 * @param options
 * @returns
 */
export function WatchEffect(options: WatchOptionsBase = {}) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const watcheEffects: Map<any, any> =
            Reflect.getMetadata(
                MetadataKey.VUE3_WATCH_EFFECT,
                target.constructor
            ) || new Map();
        watcheEffects.set(`${propertyKey}${MetadataKey.VUE3_WATCH_EFFECT}`, {
            options,
            propertyKey,
        });
        Reflect.defineMetadata(
            MetadataKey.VUE3_WATCH_EFFECT,
            watcheEffects,
            target.constructor
        );
    };
}

/**
 * 注入装饰器
 * @param defaultValue
 * @returns
 */
export function Inject<T = any>(defaultValue?: T, propertyKey?: string): any {
    if (propertyKey) {
        return Inject()(defaultValue, propertyKey);
    }
    return function (target: any, propertyKey: string) {
        const injecteds: Map<any, any> =
            Reflect.getMetadata(MetadataKey.VUE3_INJECT, target.constructor) ||
            new Map();
        injecteds.set(`${propertyKey}${MetadataKey.VUE3_INJECT}`, {
            defaultValue,
            propertyKey,
        });
        Reflect.defineMetadata(
            MetadataKey.VUE3_INJECT,
            injecteds,
            target.constructor
        );
    };
}

/**
 * 生产者装饰器
 * @param defaultValue
 * @returns
 */
export function Provide(alias?: string | any, propertyKey?: string): any {
    if (propertyKey) {
        return Provide()(alias, propertyKey);
    }
    return function (target: any, propertyKey: string) {
        const providers: Map<any, any> =
            Reflect.getMetadata(MetadataKey.VUE3_PROVIDE, target.constructor) ||
            new Map();
        providers.set(`${propertyKey}${MetadataKey.VUE3_PROVIDE}`, {
            alias,
            propertyKey,
        });
        Reflect.defineMetadata(
            MetadataKey.VUE3_PROVIDE,
            providers,
            target.constructor
        );
    };
}

/**
 * prop装饰器
 * @param options
 * @returns
 */
export function Prop(options: PropOptions<any> = {}) {
    return function (target: any, propertyKey: string) {
        const providers: Map<any, any> =
            Reflect.getMetadata(MetadataKey.VUE3_PROP, target.constructor) ||
            new Map();
        providers.set(`${propertyKey}${MetadataKey.VUE3_PROP}`, {
            propertyKey,
            options,
        });
        Reflect.defineMetadata(
            MetadataKey.VUE3_PROP,
            providers,
            target.constructor
        );
    };
}

/**
 * 不需要被track的数据
 * @param target
 * @param propertyKey
 */
export function MarkRaw(target: any, propertyKey: string) {
    const markRaws: Map<any, any> =
        Reflect.getMetadata(MetadataKey.VUE3_MARK_RAW, target.constructor) ||
        new Map();
    markRaws.set(`${propertyKey}${MetadataKey.VUE3_MARK_RAW}`, {
        propertyKey,
    });
    Reflect.defineMetadata(
        MetadataKey.VUE3_MARK_RAW,
        markRaws,
        target.constructor
    );
}
