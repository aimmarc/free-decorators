import { Constructor } from "./interfaces";

export default class Container {
    providers = new Map<Constructor<any>, any>();
    /**
     * register
     */
    addProvider(provider: any): void {
        this.providers.set(provider, provider);
    }

    /**
     * get
     */
    inject(token: Constructor<any>): Constructor<any> {
        return <Constructor<any>>this.providers.get(token);
    }
}

/**
 * 依赖集合
 */
export const DepsMap = new Map<Constructor<any>, any>();
