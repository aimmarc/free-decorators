import { Controller } from "./controller";
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
declare function Repository(prefix?: string): ClassDecorator;
export { Controller, Repository };
export type { BaseRepository };
