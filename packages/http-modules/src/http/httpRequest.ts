import axios, { AxiosInstance } from "axios";
import { Injectable } from "../injection";
import axiosRetry from "axios-retry";
import { RequestConfigureType } from "./decorators";

@Injectable()
export default class HttpRequestClient {
    instance: AxiosInstance;
    private requestInterceptor!: (...args: any) => any;

    constructor() {
        this.instance = axios.create({
            baseURL: "",
        });
        this.instance.interceptors.request.use(
            (config) => {
                if (typeof this.requestInterceptor === "function") {
                    return this.requestInterceptor(config) || config;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    static create() {
        return new this();
    }

    async request(config?: RequestConfigureType): Promise<any> {
        if (config?.requestInterceptor)
            this.requestInterceptor = config.requestInterceptor;
        axiosRetry(this.instance, {
            retries: config?.retryTimes || 0,
        });
        return await this.instance(config || {});
    }
}
