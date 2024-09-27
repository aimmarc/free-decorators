import { CONNECTSTRING } from "./constant";

/**
 * 控制器装饰器
 * @param prefix
 * @returns
 */
export function Controller(prefix = ""): ClassDecorator {
    return function (target: any) {
        target.prototype[`${target.name}${CONNECTSTRING}`] = prefix
            ? prefix
            : "";
    };
}
