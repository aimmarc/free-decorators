import {
    inject,
    isReactive,
    isRef,
    markRaw,
    provide,
    watch,
    watchEffect,
} from "vue";
import { MetadataKey } from "../enum";
import { LIFE_CYCLE } from "../constant";
import { Constructor } from "../interfaces";

/**
 * 获取属性描述符
 * @param target
 * @param propertyKey
 * @returns
 */
function getDescriptor(target: any, propertyKey: string | symbol) {
    return Object.getOwnPropertyDescriptor(target, propertyKey);
}

/**
 * 处理箭头函数的绑定
 * @param viewInstance
 * @param wrapperProxy
 * @returns
 */
function bindingArrowMethods(viewInstance: object, wrapperProxy: object) {
    Object.keys(viewInstance).forEach((key) => {
        const originVal = viewInstance[key];
        if (
            typeof originVal === "function" &&
            !originVal.hasOwnProperty("prototype") &&
            !LIFE_CYCLE.includes(key)
        ) {
            console.warn(
                `The method named "${key}" cannot be an arrow method! It will loose the responsiveness.`
            );
            const descriptor = getDescriptor(viewInstance, key);
            const originFn = descriptor?.value;
            if (originFn) {
                viewInstance[key] = function (...args) {
                    console.warn(
                        `The method named "${key}" cannot be an arrow method! It will loose the responsiveness.`
                    );
                    originFn(...args);
                };
                // const originFnStr = originFn.toString();
                // const functionBody = originFnStr.slice(
                //     originFnStr.indexOf("{") + 1,
                //     originFnStr.lastIndexOf("}")
                // );
                // const evalFunction = new Function(functionBody);
                // // 将箭头函数更改为普通函数，防止this没有正确代理到wrapperProxy
                // viewInstance[key] = evalFunction.bind(wrapperProxy);
            }
        }
    });
}

/**
 * 生成顶层代理逻辑
 * @param reactiveInstance
 * @param viewInstance
 * @param ViewConstructor
 * @returns
 */
export function genWrapperProxy(
    reactiveInstance: object,
    viewInstance: object,
    ViewConstructor: Constructor<any>
) {
    const setupProps = Reflect.getMetadata(
        MetadataKey.VUE3_SETUP_PROPS,
        ViewConstructor
    );
    const setupPropsObj = {};
    if (setupProps) {
        for (const [_, { propertyKey, cb }] of setupProps) {
            const res = cb?.();
            setupPropsObj[propertyKey] = res;
            if ("render" in viewInstance) {
                // 如果是render方式，需要再进行一次劫持，保障数据获取成功
                Object.defineProperty(viewInstance, propertyKey, {
                    get: () => {
                        // 调用属性直接执行getter
                        return res;
                    },
                    enumerable: true,
                    configurable: true,
                });
            }
        }
    }
    const keys = Reflect.ownKeys(viewInstance);
    const RefTrack = new Map(); // 使用一个Map来缓存实例中的ref，避免在wrapperProxy中取值导致get多次执行
    keys.forEach((key) => {
        const val = viewInstance[key];
        if (isRef(val)) RefTrack.set(key, val);
    });
    const wrapperProxy = new Proxy(reactiveInstance, {
        get(target, propertyKey, receiver) {
            const val = RefTrack.get(propertyKey);
            if (val) {
                return val;
            }
            // 处理ref不分解
            if (
                ["props", "attrs", "emit", "slots", "expose"].includes(
                    <string>propertyKey
                )
            ) {
                return viewInstance[propertyKey];
            }
            // 此处兼容tsx组件
            if ("render" in viewInstance) {
                const setupPropsKeys = Object.keys(setupPropsObj);
                if (
                    setupPropsKeys.includes(<string>propertyKey) &&
                    typeof setupPropsObj[propertyKey]
                ) {
                    return setupPropsObj[propertyKey];
                }
            }

            // 不是特殊情况，原路返回
            return Reflect.get(target, propertyKey, receiver);
        },
        set(target, propertyKey, newVal, receiver) {
            const descriptor = getDescriptor(
                ViewConstructor.prototype,
                propertyKey
            );
            if (typeof descriptor?.set === "function") {
                descriptor?.set?.call(target, newVal); // 保证set正常
                return true;
            }

            // 使用Reflect.set保证其他场景的set正常
            return Reflect.set(target, propertyKey, newVal, receiver);
        },
    });
    return wrapperProxy;
}

/**
 * 绑定原型上的方法
 * @param viewInstance
 * @param wrapperProxy
 * @param ViewConstructor
 */
function bindingPrototypeMethods(
    viewInstance: object,
    wrapperProxy: object,
    ViewConstructor: Constructor<any>
) {
    // 使用Reflect.ownKeys可以取出原型链上的属性keys
    const keys = Reflect.ownKeys(ViewConstructor.prototype);
    keys.forEach((key: string | symbol) => {
        if (
            typeof viewInstance[key] === "function" &&
            key !== "constructor" &&
            !isRef(viewInstance[key]) &&
            !LIFE_CYCLE.includes(<string>key) // 此处去掉了一些生命周期钩子，如mounted、setup等
        ) {
            // 如果是function，绑定死this为当前组件实例的reactive对象
            viewInstance[key] = viewInstance[key].bind(wrapperProxy); // 在这里把取出的所有方法bind一下this
        }
        // 获取当前属性的描述符
        const descriptor = Object.getOwnPropertyDescriptor(
            ViewConstructor.prototype,
            key
        );
        if (descriptor && typeof descriptor.get === "function") {
            // 如果属性是getter形式定义，通过属性劫持保证属性被正常track，不能写到wrapperProxy，会有问题
            Reflect.defineProperty(viewInstance, key, {
                get: () => {
                    // 调用属性直接执行getter
                    return descriptor.get?.call(wrapperProxy);
                },
                enumerable: true,
                configurable: true,
            });
        }
    });
}

/**
 * 绑定props
 * @param viewInstance
 */
function bindingProps(viewInstance: any) {
    const props = viewInstance.props; // <Record<string, any>>propsResolver(ViewConstructor);
    if (props) {
        for (const key in props) {
            // 保证在class中能直接通过this.xx 调用props
            Object.defineProperty(viewInstance, key, {
                get: () => {
                    // 调用属性直接执行getter
                    return viewInstance.props[key];
                },
                enumerable: true,
                configurable: true,
            });
        }
    }
}

/**
 * 绑定实例，确保响应式正常，确保this指向正常，确保get set正常
 * @param ViewConstructor
 * @param viewInstance
 */
export function bindingInstance(
    ViewConstructor: any,
    viewInstance: any,
    reactiveInstance: any,
    wrapperProxy: any
) {
    try {
        // 再搞一层代理，把reactiveInstance中的ref直接返回
        // const wrapperProxy = genWrapperProxy(
        //     reactiveInstance,
        //     viewInstance,
        //     ViewConstructor
        // );
        bindingArrowMethods(viewInstance, wrapperProxy);
        bindingPrototypeMethods(viewInstance, wrapperProxy, ViewConstructor);
        bindingProps(viewInstance);
    } catch (err) {
        console.log("bindingInstance err:", err);
    }
}

/**
 * setup方法处理器
 * @param target
 * @param instance
 * @returns
 */
export function setupMethodsResolver(target: any, instance: any) {
    try {
        const methods = Reflect.getMetadata(
            MetadataKey.VUE3_SETUP_METHODS,
            target
        );
        if (!methods) return;
        for (const [_, value] of methods) {
            instance?.[value.propertyKey]?.();
        }
    } catch (err) {
        console.log("setupMethodsResolver err:", err);
    }
}

/**
 * 处理setup属性
 * @param target
 * @param instance
 * @returns
 */
export function setupPropsResolver(target: any, instance: any) {
    try {
        const setupProps = Reflect.getMetadata(
            MetadataKey.VUE3_SETUP_PROPS,
            target
        );
        if (!setupProps) return;
        for (const [_, { propertyKey, cb }] of setupProps) {
            if (propertyKey && cb) {
                const r = cb?.();
                Object.defineProperty(instance, propertyKey, {
                    get: () => {
                        // 调用属性直接执行getter
                        return r;
                    },
                    enumerable: true,
                    configurable: true,
                });
            }
        }
    } catch (err) {
        console.log("setupPropsResolver err:", err);
    }
}

/**
 * watch处理
 * @param target
 * @param instance
 */
export function watcherResolver(target: any, instance: any) {
    try {
        const watches = Reflect.getMetadata(MetadataKey.VUE3_WATCHS, target);
        if (watches)
            for (const [_, val] of watches) {
                const { propertyKey } = val;
                let watchTarget: any;
                if (Array.isArray(propertyKey)) {
                    watchTarget = (<string[]>propertyKey).map((k) => {
                        const wt = instance[k];
                        return isRef(wt) || isReactive(wt)
                            ? instance[k]
                            : () => instance[k];
                    });
                }
                if (typeof propertyKey === "string") {
                    const wt = instance[propertyKey];
                    watchTarget =
                        isRef(wt) || isReactive(wt)
                            ? instance[propertyKey]
                            : () => instance[propertyKey];
                }
                if (watchTarget) {
                    watch(
                        watchTarget,
                        instance[val.methodKey],
                        val.options || {}
                    );
                }
            }
    } catch (err) {
        console.log("watcherResolver error!", err);
    }
}

/**
 * 处理watchEffect
 * @param target
 * @param instance
 */
export function watchEffectResolver(target: any, instance: any) {
    try {
        const watcheEffects = Reflect.getMetadata(
            MetadataKey.VUE3_WATCH_EFFECT,
            target
        );
        if (watcheEffects)
            for (const [_, val] of watcheEffects) {
                watchEffect(instance?.[val.propertyKey], val.options);
            }
    } catch (err) {
        console.log("watchEffectResolver error!", err);
    }
}

/**
 * 注入处理
 * @param target
 * @param instance
 * @returns
 */
export function injectResolver(target: any, instance: any) {
    try {
        const injecteds = Reflect.getMetadata(MetadataKey.VUE3_INJECT, target);
        if (!injecteds) return;
        for (const [_, { propertyKey, defaultValue }] of injecteds) {
            if (propertyKey) {
                Object.defineProperty(instance, propertyKey, {
                    get: () => {
                        // 调用属性直接执行getter
                        return inject(propertyKey, defaultValue);
                    },
                    enumerable: true,
                    configurable: true,
                });
            }
        }
    } catch (err) {
        console.log("injectResolver err:", err);
    }
}

/**
 * 生产者处理
 * @param target
 * @param instance
 * @returns
 */
export function provideResolver(target: any, instance: any) {
    try {
        const providers = Reflect.getMetadata(MetadataKey.VUE3_PROVIDE, target);
        if (!providers) return;
        for (const [_, { propertyKey, alias }] of providers) {
            if (propertyKey) {
                provide(alias || propertyKey, instance[propertyKey]);
            }
        }
    } catch (err) {
        console.log("provideResolver err:", err);
    }
}

/**
 * props处理
 * @param target
 * @param instance
 * @returns
 */
export function propsResolver(target: any) {
    try {
        const propsMap = Reflect.getMetadata(MetadataKey.VUE3_PROP, target);
        if (!propsMap) return;
        const props: Record<string, any> = {};
        for (const [_, { propertyKey, options }] of propsMap) {
            props[propertyKey] = options;
        }
        return props;
    } catch (err) {
        console.log("provideResolver err:", err);
    }
}

/**
 * markRaw处理
 * @param target
 * @param instance
 * @returns
 */
export function markRawResolver(target: any, instance: any) {
    try {
        const markRaws: Map<any, any> = Reflect.getMetadata(
            MetadataKey.VUE3_MARK_RAW,
            target
        );
        if (!markRaws) return;
        for (const [_, { propertyKey }] of markRaws) {
            const value = instance[propertyKey];
            const rawValue: Record<any, any> = markRaw({ value });
            Object.defineProperty(instance, propertyKey, {
                get: () => {
                    // 调用属性直接执行getter
                    return rawValue.value;
                },
                set: (val) => {
                    rawValue.value = val;
                },
                enumerable: true,
                configurable: true,
            });
        }
    } catch (err) {
        console.log("markRwaResolver err:", err);
    }
}
