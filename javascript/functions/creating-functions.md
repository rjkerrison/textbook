# Creating functions

There are numerous ways to create a function in JavaScript.
The three to know and practice are:

- function declaration
- function expression
- arrow expression

## Function declaration

A **function declaration** is where we declare a named function. It is thus available to be used elsewhere in our code.

```js
function sayHello() {
  console.log('Hello world!')
}
```

In this example, we are declaring a function named `sayHello` and we are defining its behaviour with the given statements — in this case, only one statement is given, and that is the call to `console.log`.

## Function expression

A **function expression** allows us to define a function without naming it.
This can be useful in the context of [callbacks](./callbacks.md).

```js
['Alice', 'Bob', 'Charlotte'].forEach(function (name) {
  console.log(`Hello ${name}`)
})
```

Here, we're defining the function that should be repeated in each step of the `forEach`. Since we're both creating and passing the function as an argument to `forEach` at the same time, there's no need to name it.

If we wanted to, we could achieve the same result with a function declaration.

```js
function sayHelloTo(name) {
  console.log(`Hello ${name}`)
}

['Alice', 'Bob', 'Charlotte'].forEach(sayHelloTo)
```

This would be preferred in the case where we want to reuse `sayHelloTo` elsewhere.
It also makes the `forEach` easier to read, especially in cases where the callback function has many statements.
For short functions like this which are only used once, the function expression syntax is often preferred.

## Arrow expression

As a shorthand for the function declaration, there is also the **arrow expression**. Here, there's no need for the `function` keyword, and instead we separate the parameters and the code block for the function statements by an arrow, `=>`, made up of an equals sign followed by a greater than sign.

The above example using `forEach` would be:

```js
['Alice', 'Bob', 'Charlotte'].forEach(
  (name) => console.log(`Hello ${name}`)
)
```

As with function expressions, this syntax is preferred in the cases of short functions. In such cases, it can vastly reduce the number of lines and the amount of syntax muddying the view of our code.

Generally, teams have their own conventions about when to use which syntax.

## Hoisting

When we declare a function with a function declaration, the name is **hoisted**. This means that any part of our JavaScript can refer to that function name, regardless of whether the code appears before or after the function declaration in our document.

This is not the case with 

## What about `this`?

Functions can use the `this` keyword.
The difference between `function` expressions and arrow (`=>`) expressions is that arrow functions do not change the `this` context.

This is a complicated issue.

## The constant `const`

Sometimes, teams take the approach of preferring to avoid using function declarations, and instead naming any reused functions with the use of `const`.

```js
const sayHello = (name) => console.log(`Hello ${name}`)

const callMum = function () {
  const telephone = getTelephone()
  const number = mum.mobile
  telephone.call(number)
}
```

This is often adopted with the view to avoiding any confusion around [hoisting](#hoisting).