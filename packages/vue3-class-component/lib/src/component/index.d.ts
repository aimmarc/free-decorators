import * as vue from "vue";
import Lifecycle from "./lifecycle";
/**
 * View层基类
 *   核心封装vue生命周期、store、响应式操作
 */
export declare abstract class Vue<P = any, E = any> extends Lifecycle {
    protected emit: vue.SetupContext<E>["emit"];
    protected attrs: vue.SetupContext["attrs"];
    protected expose: vue.SetupContext["expose"];
    protected slots: vue.SetupContext<E>["slots"];
    protected props: P;
    constructor(props: P, ctx: vue.SetupContext<E>);
    private executeSetup;
    /**
     * 封装 vue getCurrentInstance
     *
     * @protected
     * @memberof Component
     */
    protected getCurrentInstance: typeof vue.getCurrentInstance;
    /**
     * 封装 vue watch
     *
     * @protected
     * @memberof Component
     */
    protected watch: typeof vue.watch;
    /**
     * 封装 vue computed
     *
     * @protected
     * @memberof Component
     */
    protected computed: typeof vue.computed;
    /**
     * 封装 vue ref
     *
     * @protected
     * @memberof Component
     */
    protected ref: typeof vue.ref;
    /**
     * 封装 vue toRaw
     *
     * @protected
     * @memberof Component
     */
    protected toRaw: typeof vue.toRaw;
    /**
     * 封装 vue reactive
     *
     * @protected
     * @memberof Component
     */
    protected reactive: typeof vue.reactive;
    /**
     * 封装 vue
     *
     * @protected
     * @memberof Component
     */
    protected vue: typeof vue;
}
export declare abstract class BaseView<S = any, P = any, E = any> extends Vue<P, E> {
    constructor(props: P, ctx: vue.SetupContext<E>);
    protected __warningTips__(): void;
    /**
     * 统一输出 store
     *
     * @protected
     * @memberof Component
     */
    protected store: S;
    static store: any;
    /**
     * 兼容老API
     * @param store
     */
    static useStore<T>(store: T): void;
}
