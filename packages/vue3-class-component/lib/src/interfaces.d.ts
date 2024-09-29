import { AxiosRequestConfig } from "axios";
export type Constructor<T = any> = new (...args: any[]) => T;
export type Providers = Array<Constructor<any> | {
    provide: string;
    useFactory: () => any;
} | {
    provide: string;
    useValue: any;
}>;
export interface ModuleMetadataType {
    imports?: Array<Constructor<any>>;
    controllers?: Array<Constructor<any>>;
    providers?: Providers;
    exports?: Providers;
    repositories?: Array<Constructor<any>>;
}
export declare class HttpResponse<R = any> extends Promise<R> {
}
export interface CreateOptions {
    [key: string]: any;
}
export interface ValidOptions {
    message?: string;
}
export interface ValidContainerRecord {
    paramKeys: string[];
    options?: ValidOptions;
}
export type MessageMethodType = (m: string) => void;
export type MessageType = {
    success: MessageMethodType;
    fail: MessageMethodType;
};
export type InterceptorsType = {
    request?: (...args: any) => any;
    response?: (...args: any) => any;
};
export interface GlobalConfig {
    globalPrefix?: string;
    showMessage?: MessageType | undefined;
    interceptors?: InterceptorsType | undefined;
    requestConfig?: AxiosRequestConfig;
}
export interface RouteOption {
    path?: string;
}
export interface ComponentOption {
    name?: string;
}
