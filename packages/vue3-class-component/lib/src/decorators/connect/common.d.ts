import { Constructor } from "../interfaces";
/**
 * 属性注入Module
 * @param Module
 * @returns
 */
export declare function Injection(Module: Constructor<any>): (target: any, propertyKey: string) => void;
/**
 * 注入仓储
 * @param Repository
 * @returns
 */
export declare function InjectionRepository(Repository: Constructor<any>): (target: object, propertyKey: string) => void;
/**
 * 注入Service
 * @param Service
 * @returns
 */
export declare function InjectionService(Service: Constructor<any>): (target: object, propertyKey: string) => void;
