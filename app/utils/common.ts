interface GenericObject {
    [key: string]: any;
}

/**
 * T - element type that will be iterated over (e.g. using Array underneath)
 * P - type of object to be transformed
 */
export interface Transformer<T, P> {
    filter: (callback: (key: T, index?: number) => boolean) => Transformer<T, P>;
    set: (transformed: P) => Transformer<T, P>;
    get: () => P;
}

export class ObjTransformer implements Transformer<string, GenericObject> {
    private transformed: GenericObject;
    constructor(transformed: GenericObject = {}) {
        this.transformed = transformed;
    }

    public set(transformed: GenericObject) {
        this.transformed = transformed;
        return this;
    }

    /**
     * Takes an object and filters it by its keys using provided callback function
     */
    public filter(callback: (key: string, index?: number) => boolean) {
        this.transformed =
            Object.keys(this.transformed).reduce((prev: GenericObject, key, index) => {
                if (callback(key, index)) {
                    prev[key] = this.transformed[key];
                }
                return prev;
            }, {});
        return this;
    }

    public get() {
        return this.transformed;
    }
}
