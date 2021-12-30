# `--width` for explicit width

**Accepted keys**

- `--width`
- `--w`

## Syntax

```ts
`--width=${typeof length}`;
```

## Example

```
--width=100
--w=100

--width=100px

--width=400vw
```

## Behavior

**Element**
There is no impact on element itself, but it can break relative layouts.

**Style**
When applied, this will force the node to be rendered with a width style.

## See Also

- [`--max-width`](../--max-width)
- [`--min-width`](../--min-width)
- [`--height`](../--height)
