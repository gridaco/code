> These are the figma frame's property effecting to auto layouyt (flexbox) behaiviour

- layoutMode: "VERTICAL" | "HORIZONTAL" - colum or row
- [primaryAxisSizingMode](https://www.figma.com/plugin-docs/api/properties/nodes-primaryaxissizingmode/):"FIXED" | "AUTO"
- [counterAxisSizingMode](https://www.figma.com/plugin-docs/api/properties/nodes-counteraxissizingmode/):"FIXED" | "AUTO"
- primaryAxisAlignItems:"MIN" | "MAX"
- counterAxisAlignItems:"MIN" | "MAX"
- layoutAlign: "STRETCH" | "INHERIT"
- layoutGrow: 0 | 1 - flex 0/1

## "Stretched" item

### Web - css

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

### Flutter

**Using `crossAxisAlignment: CrossAxisAlignment.stretch` to container (layout)**

```dart
    return Container(
  height: 500,
  color: Colors.white,
  child: Row(
    /// set crossAxisAlignment here. this is like flexbox `align-items: stretch;` in css
    /// but still, in css, having stretch on container and having height on item will use the height. - it won't force stretch the size. unlike this, in flutter, every items are force stretched. see below height-sized item's comment.
    crossAxisAlignment: CrossAxisAlignment.stretch,
    children: [
      Container(
        color: Colors.cyan,
        width: 100,
      ),
      Expanded(child:
        Container(
          color: Colors.blue,
        )
      ),
      // even specifing explicit height will be ignored. all items including this will be stretched (height) to 500 (the continer's fixed height)
      Container(
        height: 50,
        width: 20,
        color: Colors.red
      ),
    ]
  )
);
```

> but still, in css, having stretch on container and having height on item will use the height. - it won't force stretch the size. unlike this, in flutter, every items are force stretched.

**Using double.infinity in item**

As shown below, using double.infinity is equivalant to css `align-self: stretch` which can be applied to item. (not the layout)

```dart
return Container(
  height: 500, // the row's height
  color: Colors.white,
  child: Row(
    children: [
      // streth height (align-self: stretch)
      Container(
        color: Colors.cyan,
        width: 100,
        height: double.infinity
      ),
      // epand to main axis (flexbox flex:1), fixed height
      Expanded(child:
        Container(
          color: Colors.blue,
          width: 50,
          height: 50,
        )
      ),
      // fixed size
      Container(
        height: 50,
        width: 20,
        color: Colors.red
      ),
    ]
  )
);
```

_References_

- [Add support for cross axis expansion #9075](https://github.com/flutter/flutter/issues/9075)
- [Flutter#Expanded](https://api.flutter.dev/flutter/widgets/Expanded-class.html)
