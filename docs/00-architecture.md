# How it all works

## Input: Design, Output: Code

[Figma, Sketch, Bridged, XD] to [Flutter, React, Svelte, Android, iOS, ReactNative, Vue]

## The process

- convert design to universal design representative (a.k.a Reflect CGR Nodes)
- do some linting
- do some detection
- convert ReflectNode to ReflectWidget
- ReflectWidget to each platform's interpreter
- platform interpreter to each platform builder (e.g. flutter-builder, react-builder)
  - this is done by universal computer language builder developed by Bridged - [CoLI](https://coli.codes) - A Computer language interface
- each platform builder generates the final executable code, wrapped with app scaffold.
- this code uploads and compiled by [BASE](https://github.com/bridgedxyz/base) - Bridged App SErvices
- you're design is now a running application.

> Some small steps are missing, this document will be updated continuously.
