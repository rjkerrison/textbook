# Callbacks

When we refer to _callbacks_ in JavaScript, we mean the practice of passing a function as an argument to another function.

```js
function sayHello(name) {
  console.log(`Hello ${name}`)
}

['Alice', 'Bob', 'Carol'].forEach(sayHello)
```

In this example, `forEach` takes a callback as its first argument.
`sayHello` is the callback.

It's important to remember when using callbacks that we pass the **function declaration** or a **function expression**, but not an [invocation](./invocation.md) of the function.

## Functions are objects

Remember that a function, like everything in JavaScript,
is an object.

They can be named, they can be stored, and they can be passed like any other named object.

We can even detect whether an object is a function with `typeof`.

```js
function runFunctionOrLookupName(callback) {
  if (typeof callback === 'function') {
    callback()
  }
  else {
    console.log(`received ${callback} instead of a function`)
  }
}
```
