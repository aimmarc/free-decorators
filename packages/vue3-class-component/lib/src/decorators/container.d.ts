import { Constructor } from "./interfaces";
export default class Container {
    providers: Map<Constructor<any>, any>;
    /**
     * register
     */
    addProvider(provider: any): void;
    /**
     * get
     */
    inject(token: Constructor<any>): Constructor<any>;
}
/**
 * 依赖集合
 */
export declare const DepsMap: Map<Constructor<any>, any>;
