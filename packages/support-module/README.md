# Moduling support

## Specs

| name                    | default | version |
| ----------------------- | ------- | ------- |
| `@code-features/module` | YES     | \*      |

## Abstract

Here, "Module" means a file that contains a exported component.

Module is a single file or a directory containing developer-friendly api exports. It should consider the following:

- Is the import statement simple and understandable?
- Is the import statement well allocating the origin design?
- Does each directory contains readme.md and well documented?
- Does this module on file system can be exported between different platforms? - e.g. (git / github / git submodule / npm / ...)
- Does this module contains meta data to be tracked by grida when user decides to?
- Is this module well structured for manual user edits?
- Is this module tolerant to manual user edits?
- Is this module tolerant to future updates and successful merge?
- Can developer (user) extend widgets with custom styles?
- Can developer (user) extend widgets with custom props?
- Can developer (user) extend components with custom functions?
- Can developer (user) re-export module with manual subdirectory modules composition
- Do all subdirectory modules have consistent naming convention?
- Do this module contains any 3rd party dependencies?
- Can this module be used with monorepo (yarn workspaces)?

## Prerequisite

- The input source should be sanitized via lint.
- The entry widget (module) should be named by user.

## Module Composition Styles

A. **Single file component composition**

```
- {module-name}.tsx
```

B. **Multi file component composition / (flat)**

```
- {module-name}/
  - styles.ts
  - index.ts
  - {module-name}.tsx (root widget)
```

C. **Multi file component composition / (nested)**

```
- {module-name}/
  - styles/
    - index.ts
    - {widget-0}.style.ts
    - {widget-1}.style.ts
  - index.ts
  - {module-name}.tsx (root widget)
```

## Consider: Import statements best practices

```ts
import Widget from "./{module-name}";
import { Widgets } from "./{module-name}";
// <Widgets.{widget-name}/>
import { styles } from "./{module-name}";
import styles from "./{module-name}/styles";
import SubWidgetA from "./{module-name}/component-a";
import { SubWidgetA } from "./{module-name}/components";
```

## Consider: Re-exporting coding conventions

```ts
// TODO:
```
