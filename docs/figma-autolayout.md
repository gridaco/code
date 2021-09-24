> These are the figma frame's property effecting to auto layouyt (flexbox) behaiviour

- layoutMode: "VERTICAL" | "HORIZONTAL" - colum or row
- [primaryAxisSizingMode](https://www.figma.com/plugin-docs/api/properties/nodes-primaryaxissizingmode/):"FIXED" | "AUTO"
- [counterAxisSizingMode](https://www.figma.com/plugin-docs/api/properties/nodes-counteraxissizingmode/):"FIXED" | "AUTO"
- primaryAxisAlignItems:"MIN" | "MAX"
- counterAxisAlignItems:"MIN" | "MAX"
- layoutAlign: "STRETCH" | "INHERIT"
- layoutGrow: 0 | 1 - flex 0/1

## "Stretched" item

> The below description is based on `flex-direction: row;`. what we are trying to stretch is the height of the item.

**using align-items on container**

> this sould only be used when all items are stretched. in figma, detection of this is not possible by only looking in to the container's property. we have to look through all its children to determine if the container is used to stretch all items. Again, the align-items property cannot be infered from figma container.

```css
.container {
  display: flex;
  align-items: stretch;
}

.item {
  /* ... */
  /* height: n; -- height should be removed */
  /* ... */
}
```

**using align-self on item**

> align-self property can be infered from a item (a container's child)

```css
.container {
  display: flex;
}

.item {
  /* ... */
  /* height: n; -- height should be removed */
  align-self: stretch;
  /* ... */
}
```
