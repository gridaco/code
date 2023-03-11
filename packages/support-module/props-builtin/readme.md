# builtin props for widget modules

**form events**

- onblur: Fires the moment that the element loses focus
- onchange: Fires the moment when the value of the element is changed
- oncontextmenu: Script to be run when a context menu is triggered
- onfocus: Fires the moment when the element gets focus
- oninput: Script to be run when an element gets user input
- oninvalid: Script to be run when an element is invalid
- onreset: Fires when the Reset button in a form is clicked
- onsearch: Fires when the user writes something in a search field (for `<input="search">`)
- onselect: Fires after some text has been selected in an element
- onsubmit: Fires when a form is submitted

**keyboard events**

- onkeydown
- onkeypress
- onkeyup

**mouse events**

- onclick
- ondbclick
- onmousedown
- onmousemove
- onmouseout
- onmouseover
- onmouseup
- onmousewheel
- onwheel

**drag events**

- ondrag
- ondragend
- ondragenter
- ondragleave
- ondragover
- ondragstart
- ondrop
- onscroll

**clipboard events**

- oncopy
- oncut
- onpaste

## props field name handling

No deligation (asis)

```tsx
function Child({ onClick }: { onClick?: (e) => void }) {
  return <div onClick={onClick} />;
}
```

With deligation (tobe)

```tsx
function Parent({
  onClick,
  onChildClick,
}: {
  onClick?: (e) => void;
  onChildClick?: (e) => void;
}) {
  return (
    <div onClick={onClick}>
      <Child onClick={onChildClick} />
    </div>
  );
}

// or with .d.ts representation..
interface ParentProps {
  onClick?: (e) => void;
} & {
  /**
   * ChildProps#onClick
   */
  onChildClick?: ChildProps['onClick'];
};
```

You can see that `onClick` keyword always represents to the callback to the caller, and the deligated callback will be renamed to `onChildClick`.

## References

- https://reactjs.org/docs/events.html
