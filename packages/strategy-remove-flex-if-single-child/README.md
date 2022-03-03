# Remove flex property if single child

When layout contains only one item, it's irrelevant rather we use flex or simple padding to represent a parent-child layout. By default, this strategy is disabled since the container's item can be dynamically modified, and that's a scenario likely to happen alot.

When to use this strategy is (describing based on figma) when designers use auto layout frame only for to represent a padding and a alignemnt.

- padding can be represented as padding
- alignment can be represented as position

## Applies to

> This strategy can be only applied to a empty frame or a single child frame from a snapshot design. it will loose a list compatitable functionallities.

- web (flexbox)
  - vanilla
  - react
  - vue
  - svelte
  - any other css based application
- flutter (column / row / flex / wrap)

## When to use?

As described above, use this strategy when the layout has a single child (or no child at all). The reason to use this is of course, to make the code more intuitive and shorter (removes redundant flex-like-layout related properties)
