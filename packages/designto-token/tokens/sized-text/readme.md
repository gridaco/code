# SizedText

Sized text is a token representing a Text with some fixed size. We have this token, the sizing of the Text vary by frameworks.

By default, the Text should not have a fixed width or height size. But when the text is under a flex layout (col, row, ...) and the Text has a fixe property, then it should explicitly have a size to be accurately rendered.

For example, The Text with fixed width of 100px in flutter is

**in Flutter**

```dart
SizedBox(
  width: 100,
  child: Text('Text'),
)
```

**in Css**

```css
.text {
  width: 100px;
}
```

**global representation**

```ts
new SizedText(
  width: 100,
  child: Text('Text'),
)
```
