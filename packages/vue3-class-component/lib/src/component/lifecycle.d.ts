import { VNode } from "vue";
/**
 * 生命周期
 */
declare abstract class Lifecycle {
    /**
     * 生命周期 setup
     * 提供一个setup钩子，满足组件需要在setup阶段进行的操作
     */
    protected setup(): void;
    protected render?(): JSX.Element | VNode;
    /**
     * 生命周期 onBeforeMount
     * 组件挂载到节点上之前执行的函数
     *
     * @protected
     * @memberof Lifecycle
     */
    protected beforeMount(): void;
    /**
     * 生命周期 onMounted
     * 组件挂载完成后执行的函数
     *
     * @protected
     * @memberof Lifecycle
     */
    protected mounted(): void;
    /**
     * 生命周期 onBeforeUpdate
     * 组件更新之前执行的函数
     *
     * @protected
     * @memberof Lifecycle
     */
    protected beforeUpdate(): void;
    /**
     * 生命周期 onUpdated
     * 组件更新完成之后执行的函数
     *
     * @protected
     * @memberof Lifecycle
     */
    protected updated(): void;
    /**
     * 生命周期 onBeforeUnmount
     * 组件卸载之前执行的函数
     *
     * @protected
     * @memberof Lifecycle
     */
    protected beforeUnmount(): void;
    /**
     * 生命周期 onUnmounted
     * 组件卸载完成后执行的函数
     *
     * @protected
     * @memberof Lifecycle
     */
    protected unmounted(): void;
    /**
     * 生命周期 onActivated
     * 被包含在 <keep-alive> 中的组件，会多出两个生命周期钩子函数，被激活时执行
     *
     * @protected
     * @memberof Lifecycle
     */
    protected activated(): void;
    /**
     * 生命周期 onDeactivated
     * 比如从 A 组件，切换到 B 组件，A 组件消失时执行
     *
     * @protected
     * @memberof Lifecycle
     */
    protected deactivated(): void;
    /**
     * 生命周期 onErrorCaptured
     * 当捕获一个来自子孙组件的异常时激活钩子函数
     *
     * @protected
     * @memberof Lifecycle
     */
    protected errorCaptured(): void;
}
export default Lifecycle;
