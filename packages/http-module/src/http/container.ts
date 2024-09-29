class HttpContainer {
    container: Map<any, string> = new Map();

    set(target: any, path: string) {
        this.container.set(target, path);
    }

    get(target: any) {
        return this.container.get(target);
    }
}

export default new HttpContainer();
