# Html button

- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button



## Attributes

| name                                                                                         | react                         | vue | svelte | vanilla | supported?     |
| -------------------------------------------------------------------------------------------- | ----------------------------- | --- | ------ | ------- | -------------- |
| [autofocus](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-autofocus) | `autoFocus` | `autofocus` |        | `autofocus` | ✅             |
| [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-autocomplete) | `autoComplete` | `aria-autocomplete` ([?](https://github.com/vuejs/vue-next/issues/4633)) |        | `autocomplete` | ❌ (dprecated) |
| [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-disabled)  | `disabled` | `disabled` |        | `disabled` | ✅             |
| [form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-form) ([#1](https://www.w3schools.com/tags/att_button_form.asp)) | `form` | `form` |        | `form` | ✅             |
| [formaction](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formaction) | `formAction` | `formaction` |        | `formaction` | ✅             |
| [formenctype](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formenctype) | `formEncType` | `formenctype` |        | `formenctype` | ✅             |
| [formmethod](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formmethod) | `formMethod` | `formmethod` |        | `formmethod` | ✅             |
| [formnovalidate](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formnovalidate) | `formNoValidate` | `formnovalidate` |        | `formnovalidate` | ✅             |
| [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-name) | `name` | `name` |        | `name` | ✅             |
| [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | `type` | `type` |        | `type` | ✅             |
| [value](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-value) | `value` | `value` |        | `value` | ✅             |





## React

```tsx
// from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts
interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
  autoFocus?: boolean | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  formAction?: string | undefined;
  formEncType?: string | undefined;
  formMethod?: string | undefined;
  formNoValidate?: boolean | undefined;
  formTarget?: string | undefined;
  name?: string | undefined;
  type?: 'submit' | 'reset' | 'button' | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
}
```



## Vue

```vue
<button
        autofocus
        aria-autocomplete=""
        disabled="false"
        form=""
        formaction=""
        formenctype=""
        formmethod=""
        formnovalidate
        name=""
        type=""
        value=""
        >
  Vue Button attributes demo
</button>
```

