# Design to tokens

> We first convert the input design to tokens

## Tokenize = Detection + Formation

Tokenize package uses reflec-detection internally, reflect raw node as input, reflect widget nodes(tokens) as output

## How is the token designed?

> Token is a minimal atomic node that can no more be splitted, so it can be adopted universally to merge and build by platforms / frameworks. Its design is like Coli's design.

We had two options to design the general architecture of this. first one was to accpeting all property-like nodes as a token as well, second was to accept the token as a container and others as a property in a more intuitive way.

This is more easier to understand if you think of both flutter and css.

Flutter is designed as in first approach, css is designed as the second approach

### The first approach (noisy and accurate one)

**Pros**

- It's accurate. the every property has its own bowndary and won't be effected to each other.
  **Cons**
- It's noisy. simply adding opacity or size requires extra token tree

### The second approach (intuitive one)

**Pros**

- It's intuitive (for developers). for example, opacity is a property in css, but not in flutter. as well as size (SizedBox in flutter).

**Cons**

- It's over engineered.
- It gets confusing when things get complex
- It cannot be 1:1 mapped since css is not only for layout & painting language, but has other redundant features

### Both way works, but the key point choosing between them is following the richer api provider's design.

> Which is css, so with second approach

I.e representing a multiple background is somthing not supported by flutter (we have to tweek it by using stack; this is how css is processed internally too, but anyway.). So representing this must be done with custom token that is compatible for all platforms, also considering graphics library compatability

_This is called [Reflect UI](https://reflect-ui.com)_

## Token design checklist

- Is it both representable without reverse conversion for all platform?

- Is the concept existing and has living well-documented references?

- At the point when the architecture needs to be changed, is it possible to double tokenize instead of re-writing (with all related concepts)?

- Is it representable by pure css?

- Is it representable by pure flutter?

- How much does it have conpatibility with graphics library? e.g. Skia

## Tokens

**layouts** _(the latest version can be found at reflect-core)_

- column
- row
- grid
- stack
- table
- list view

**container**

- container

**positioning / sizing**

- align
- center
- sizedbox
- expanded
- transform
