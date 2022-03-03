# @web-builder - Vue support

## References

- https://www.npmjs.com/package/@vue/compiler-dom
- https://github.com/vuejs/vue-next/tree/master/packages/compiler-dom#readme
- [Vue AST](https://github.dev/vuejs/vue-next/tree/master/packages/compiler-dom/src)

## The minimal output

```vue
<!-- the layout -->
<template>
  <div
    class="vue-colorpicker"
    @click="showPicker = true"
    v-click-outside="hide"
  >
    <span
      class="vue-colorpicker-btn"
      :style="btnStyle"
      ref="triggerButton"
    ></span>
    </div>
  </div>
</template>

<!-- script -->
<script>
export default { name: "vue-colorpicker" };
</script>

<!-- style -->
<style lang="stylus" scoped>
.container {
  display: inline-block;
  box-sizing: border-box;
  font-size: 0;
}
</style>
```
