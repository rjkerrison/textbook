# Return

When a function **returns** a value, we mean that it gives back to the calling context that value. We also exit the function at that point.

```js
function sum(numberA, numberB) {
  const total = numberA + numberB
  return total
}
```

In this example, any time we [call](./invocation.md) the function, we will receive in response the value that `total` has.

You can think of this as similar to ordering delivery of a pizza. We may [call](./invocation.md) the restaurant, possibly specifying some toppings or other options ([parameters](./parameters.md)), and then the restaurant **returns** (or delivers) to us a pizza.

## Returning nothing

It is also possible to **return** with no value, and this has important applications too.

```js
function sendTextIfItIsNotTooLate() {
  if (currentTime.isLaterThanMidnight()) {
    return
  }
  textToSend.send()
}
```

In this context, the `return` keyword allows us to **return** to the calling context and cease any further operations in the function.

It is not necessary to send the calling context any information, so we don't!