# impure
A light-weight wrapper for impure code

> Checkout: https://github.com/attack-monkey/Lean-Functional-Typescript

Impure Code
===========

Impure code should have no effect on the Pure Code around it.

To achieve this, impure code should not leak impurity into the scope.

Take `console.log('cat')`. It is impure because it sends data out of the Pure Function, and prints 'cat' to the console.
In other words it interacts with more than just inputs, constants and other 'pure' functions.
In functional programming terms - it has a side-effect.
`console.log('cat')` however doesn't leak scope, and so is fine to use in **Lean** (https://github.com/attack-monkey/Lean-Functional-Typescript).

If on the other hand we have:

```typescript

let a = Math.random()
a = a + 1

```

^^ This code is definitely impure, since `Math.random()` produces a random number and then `a` is mutated after creation.
Moreover, it leaks impurity by assigning a random value to the variable `a` - so this code is not ok to use.

The above code could be rewritten as 

```typescript

const a = Math.random()
const b = a + 1

```

^^ ... which removes the mutation, but note that `a` is still impure due to having a random value.

Impure code like this can be wrapped in a wrapper that contains the leakage.

eg.

```typescript

impure(() => {
  const a = Math.random()
  const b = a + 1
  return [a, b]
})
  .then(([a, b]) => a + b)

```

`impure().then()` is void of value regardless of what it contains, and doesn't leak any impurity.

The impure code is wrapped in a function, and the result is passed to the pure function inside the `then`.

Here's the async version.

```typescript

asyncImpure(resolve => {
  setTimeout(() => {
    resolve(getRandom())
  }, 1000)
})
  .then(a => a + 100)

```

Both feel alot like the familiar `Promise` syntax that we are used to.

So what benefit does this provide? 

Well it forces developers to think about pure vs impure for a start. More than that though, it means that there is a focus on writing pure functions that are easy to test. While the impure code may need to load some values using getters, the tricky logic is handled by pure operations.
