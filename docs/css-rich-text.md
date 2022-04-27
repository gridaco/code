---
title: "CSS Rich text"
version: 0.1.0
revision: 1
---

# CSS Rich text

How we handle rich text (mixed text styles) with css

## Composition

- base (default style)
- overrides (per ranges)

## Strategy 1. Inline overrides

## Strategy 2. anonymous classes

## Strategy 3. semantic classes

## Strategy 4. Chunk it all

## Why not use `<b>` / `<i>` / `<u>` / `<s>` tags?,

This is not a web standard for styling texts. the tags are semenatic, it is not recommanded to use tags for styling (and also the appearence may differ by browsers).

On mdn docs, you can find the below quote.

> Warning: This element used to be called the "Underline" element in older versions of HTML, and is still sometimes misused in this way. To underline text, you should instead apply a style that includes the CSS text-decoration property set to underline. @ [Element/u](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u)

- bold - `<b>` or `<strong>`
- italic - `<i>` or `<em>`
- underline - `<u>` or `<ins>`
- strikethrough - `<s>` or `<del>` (previously `<strike>`, which is no longer supported in HTML5)

Yet, this is a implicit standard way of writing markdown contents, so we allow users to opt-in to use these tags by following maps ([gfm](https://github.github.com/gfm/)).

- bold - `<strong>`
- italic - `<em>`
- underline - `<ins>`
- strikethrough - `<del>`

## References

- [gfm - GitHub Flavored Markdown Spec](https://github.github.com/gfm/)
- [`<u>`: mdn](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u)
