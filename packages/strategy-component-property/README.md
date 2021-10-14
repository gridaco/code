# Component property declaration & mapping strategy

## [Default] Auto strategy

- runs on
  - Text
    - data
  - Background
  - Image
  - Border
- gates on
  - `or` one of instance has a override value
  - `or` one of instance has a different instance in slot
