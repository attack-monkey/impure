export declare const impure: <B>(fn1: () => B) => {
    then: (fn2: (b: B) => any) => void;
};
export declare const asyncImpure: <B>(fn: (resolve: (b: B) => void) => void) => void;
