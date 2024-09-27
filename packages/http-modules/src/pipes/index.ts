export interface PipeTransform<T = any, R = any> {
    /**
     * RequestMethod to implement a custom pipe.  Called with two parameters
     *
     * @param value argument before it is received by route handler method
     */
    transform(value: T): R;
}

export class DefaultValuePipe<T = any> {
    protected readonly defaultValue!: T;
    constructor(defaultValue: T) {
        Object.assign(this, { defaultValue });
    }
}

export class ParseIntPipe {
    transform(integer: any): number {
        return /^\d+$/g.test(integer) ? ~~integer : integer;
    }
}

export class ParseFloatPipe {
    transform(integer: any): number {
        return /^\d+$/g.test(integer) ? parseFloat(integer) : integer;
    }
}

export class ParseBoolPipe {
    transform(value: any): boolean {
        return Boolean(value);
    }
}
