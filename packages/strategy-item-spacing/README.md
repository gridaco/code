# Item spacing strategies

> Handling item spacing from design. Based on figma's autolayout, item spacing is specified on the root wrapper of the layout itself, which is, in most cases, is not compatitable directly with the code interface.

## Options

1. flexbox with grid gap
2. empty item between items
3. [leading / trailing] [margin / padding] on each item **except** [first / last] element
4. css `+` or `~` selector `span + span` | `span ~ span`
5. css not-last-child query `span:not(:last-child)`

## By frameworks

### Standard web

```tsx
/// TBD
```

### Flutter

**Sized box spacing between items**

```dart
Column(
  children: <Widget>[
    Widget1(),
    SizedBox(height: 10),
    Widget2(),
  ],
),
```

### Android Compose

```kt
Column(
    modifier = Modifier
        .background(Color.Blue),
    verticalArrangement = Arrangement.spacedBy(10.dp)
) {
    // content here
}
```
