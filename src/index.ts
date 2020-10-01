export const impure = <B>(fn1: () => B) => ({
  then: (fn2: (b: B) => any) => { fn2(fn1()) }
})

export const asyncImpure = <B>(fn: (resolve: (b: B) => void) => void) => {
  new Promise<B>(resolve => fn(resolve))
}

