import * as vue from "vue";
import Lifecycle from "./lifecycle";

/**
 * View层基类
 *   核心封装vue生命周期、store、响应式操作
 */
export abstract class Vue<S = any, P = any, E = any> extends Lifecycle {
    protected emit: vue.SetupContext<E>["emit"];
    protected attrs: vue.SetupContext["attrs"];
    protected expose: vue.SetupContext["expose"];
    protected slots: vue.SetupContext<E>["slots"];
    protected props: P;
    constructor(props: P, ctx: vue.SetupContext<E>) {
        super();
        this.props = props;
        this.emit = ctx.emit;
        this.attrs = ctx.attrs;
        this.expose = ctx.expose;
        this.slots = ctx.slots;
        // 注册生命周期
        vue.onBeforeMount(() => {
            this.beforeMount();
        });
        vue.onMounted(() => {
            this.mounted();
        });
        vue.onBeforeUpdate(() => {
            this.beforeUpdate();
        });
        vue.onUpdated(() => {
            this.updated();
        });
        vue.onBeforeUnmount(() => {
            this.beforeUnmount();
        });
        vue.onUnmounted(() => {
            this.unmounted();
        });
        vue.onActivated(() => {
            this.activated();
        });
        vue.onDeactivated(() => {
            this.deactivated();
        });
        vue.onErrorCaptured(() => {
            this.errorCaptured();
        });
    }

    /**
     * 提供一个setup钩子，满足组件需要在setup阶段进行的操作
     */
    setup(props: P, ctx: vue.SetupContext<E>): void {}

    static store: any;

    static useStore<T>(store: T) {
        this.store = store;
    }

    /**
     * 统一输出 store
     *
     * @protected
     * @memberof Component
     */
    protected store: S = Component.store;

    /**
     * 封装 vue getCurrentInstance
     *
     * @protected
     * @memberof Component
     */
    protected getCurrentInstance: typeof vue.getCurrentInstance =
        vue.getCurrentInstance;

    /**
     * 封装 vue watch
     *
     * @protected
     * @memberof Component
     */
    protected watch: typeof vue.watch = vue.watch;

    /**
     * 封装 vue computed
     *
     * @protected
     * @memberof Component
     */
    protected computed: typeof vue.computed = vue.computed;

    /**
     * 封装 vue ref
     *
     * @protected
     * @memberof Component
     */
    protected ref: typeof vue.ref = vue.ref;

    /**
     * 封装 vue toRaw
     *
     * @protected
     * @memberof Component
     */
    protected toRaw: typeof vue.toRaw = vue.toRaw;

    /**
     * 封装 vue reactive
     *
     * @protected
     * @memberof Component
     */
    protected reactive: typeof vue.reactive = vue.reactive;

    /**
     * 封装 vue
     *
     * @protected
     * @memberof Component
     */
    protected vue: typeof vue = vue;
}

// 兼容老版本
export const BaseView = Vue;

export const Component = Vue;
