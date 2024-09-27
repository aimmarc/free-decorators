declare class HttpContainer {
    container: Map<any, string>;
    set(target: any, path: string): void;
    get(target: any): string | undefined;
}
declare const _default: HttpContainer;
export default _default;
