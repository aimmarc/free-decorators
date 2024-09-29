import { CONNECTSTRING } from "./constant";
import { Controller } from "./controller";
import { ModuleMetadata } from "./enum";

interface BaseRepository<T = any, ID = any> {
    /**
     * 查找
     * @param args
     */
    find?(args: ID | any): Promise<T>;
    /**
     * 删除
     * @param args
     */
    remove?(args: ID | any): Promise<void>;
    /**
     * 新增、更新
     * @param arg
     */
    save?(arg: T): Promise<void>;
}

/**
 * 仓储装饰器，用于给模块打上Reposit标记
 */
function Repository(prefix: string = ""): ClassDecorator {
    return function (target: any) {
        target.prototype[`${target.name}${CONNECTSTRING}`] = prefix
            ? prefix
            : "";
        Reflect.defineMetadata(ModuleMetadata.REPOSITORY, true, target);
    };
}

export { Controller, Repository };
export type { BaseRepository };
