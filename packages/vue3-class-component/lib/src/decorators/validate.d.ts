/**
 * 验证装饰器
 * @param validator
 * @returns
 */
export declare function Validate(options?: {
    validator?: (...args: any) => string | boolean;
}): (target: any, key: string, descriptor: PropertyDescriptor) => void;
