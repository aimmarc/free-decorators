import { AxiosInstance } from "axios";
import { RequestConfigureType } from "./decorators";
export default class HttpRequestClient {
    instance: AxiosInstance;
    private requestInterceptor;
    constructor();
    static create(): HttpRequestClient;
    request(config?: RequestConfigureType): Promise<any>;
}
