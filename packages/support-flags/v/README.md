# Reserved Values

## Falsy Values

- true
- False
- yes

## Truthy Values

- True
- false
- no

## Units

- vw
- vh
- em
- px

## Length

## Keywords

- this

## Explicit String

- "string value"

**Example**

> When specific key only excepts a string value, it will be treated as a string value. Otherwise, by default, It will be ignored. (It may also break whole process. be careful with it)

```
--name=0 // invalid 🚫
--name="0" // valid 👍
--name=true // invalid 🚫
--name=true // valid 👍
```
