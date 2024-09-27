export interface PipeTransform<T = any, R = any> {
    /**
     * RequestMethod to implement a custom pipe.  Called with two parameters
     *
     * @param value argument before it is received by route handler method
     */
    transform(value: T): R;
}
export declare class DefaultValuePipe<T = any> {
    protected readonly defaultValue: T;
    constructor(defaultValue: T);
}
export declare class ParseIntPipe {
    transform(integer: any): number;
}
export declare class ParseFloatPipe {
    transform(integer: any): number;
}
export declare class ParseBoolPipe {
    transform(value: any): boolean;
}
