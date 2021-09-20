# Ref

## React - `ref` & `useRef()`

## Vue - `ref` & `this.$refs`

```vue
<template>
  <input type="text" ref="input" />
  <button @click="submit">Go!</button>
</template>
<script>
export default {
  methods: {
    submit() {
      console.log(this.$refs);
    },
  },
};
</script>
```

## Svelte - `bind:this`

```svelte
<script>
	import { onMount } from 'svelte';

	let canvasElement;

	onMount(() => {
		const ctx = canvasElement.getContext('2d');
		drawStuff(ctx);
	});
</script>

<canvas bind:this={canvasElement}></canvas>
```

## Vanilla - `N/A`
