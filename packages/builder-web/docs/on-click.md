# On Click.

> how the onclick event syntax is different by playforms

## Vanilla - `onclick`

```html
<div class="counter">
  <output>1</output>
  <button onclick="increment()">+</button>
</div>
```

```js
// 1.
object.onclick = function () {
  myScript;
};
// 2.
object.addEventListener("click", myScript);
```

## React - `onClick`

```tsx
<div class="counter">
  <output>{count}</output>
  <button
    onClick={() => {
      setCount(cont++);
    }}
  >
    +
  </button>
</div>
```

## Vue - `@click`

```vue
<div class="counter">
  <output>{{ count }}</output>
  <button @click="increment">+</button>
</div>
```

## Svelte - `on:click`

```svelte
<div class="counter">
  <output>{{ count }}</output>
  <button on:click={increment}>
	+
  </button>
</div>
```
