# `--height` for explicit height

**Accepted keys**

- `--height`
- `--h`

## Syntax

```ts
`--height=${typeof length}`;
```

## Example

```
--height=100
--h=100

--height=100px

--height=100vh
```

## Behavior

**Element**
There is no impact on element itself, but it can break relative layouts.

**Style**
When applied, this will force the node to be rendered with a `height` style.

## See Also

- [`--max-height`](../--max-height)
- [`--min-height`](../--min-height)
- [`--width`](../--width)
