import { AxiosRequestConfig } from "axios";
import { Constructor, GlobalConfig, MessageType, InterceptorsType } from "./interfaces";
export type HttpServicesApplication<T = any> = ModuleFactory & T;
export type RepositoryService<T = any> = RepositoryFactory & T;
export declare const FactoryMap: Map<string, any>;
export declare const globalConfig: GlobalConfig;
/**
 * 模块工厂
 */
export declare class ModuleFactory {
    token: string;
    globalPrefix: string | undefined;
    showMessage: MessageType | undefined;
    interceptors: InterceptorsType | undefined;
    requestConfig: AxiosRequestConfig;
    /**
     * 全局配置
     * @param cfg
     */
    static configure(cfg?: GlobalConfig): void;
    static create<T>(target: Constructor<T>): HttpServicesApplication<T>;
    /**
     * 模块工厂函数
     * @param target
     * @param options
     * @returns
     */
    private factory;
    setGlobalPrefix(prefix?: string): void;
    setMessage(showMessage: MessageType): void;
    setInterceptors(interceptors: InterceptorsType): void;
}
export declare class RepositoryFactory {
    token: string;
    globalPrefix: string | undefined;
    showMessage: MessageType | undefined;
    interceptors: InterceptorsType | undefined;
    requestConfig: AxiosRequestConfig;
    /**
     * 全局配置
     * @param cfg
     */
    static configure(cfg?: GlobalConfig): void;
    static create<T>(target: Constructor<T>): RepositoryService<T>;
    /**
     * 模块工厂函数
     * @param target
     * @param options
     * @returns
     */
    private factory;
    setGlobalPrefix(prefix?: string): void;
    setMessage(showMessage: MessageType): void;
    setInterceptors(interceptors: InterceptorsType): void;
}
export declare class ServiceFactory {
    token: string;
    static create<T>(target: Constructor<T>): T;
    /**
     * 模块工厂函数
     * @param target
     * @param options
     * @returns
     */
    private factory;
}
