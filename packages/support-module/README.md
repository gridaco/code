# Moduling support

Here, "Module" means a file that contains a exported component

Module is a single file or a directory containing developer-friendly api exports. It should consider the following:

- Is the import statement simple and understandable?
- Is the import statement well allocating the origin design?
- Does each directory contains readme.md and well documented?
- Does this module on file system can be exported between different platforms? - e.g. (git / github / git submodule / npm / ...)
- Does this module contains meta data to be tracked by grida when user decides to?
- Is this module well structured for manual user edits?
- Is this module tolerant to manual user edits?
- Can developer (user) extend widgets with custom styles?
- Can developer (user) extend widgets with custom props?
- Can developer (user) extend components with custom functions?

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
