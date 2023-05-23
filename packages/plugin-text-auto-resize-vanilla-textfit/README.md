# `@code-plugins/vanilla-textfit`

## Official code plugin for text elements to auto resize to fit the container, using [textfit](https://github.com/STRML/textFit)

- **jsdelivr** - https://www.jsdelivr.com/package/npm/textfit
- **npm** - https://www.npmjs.com/package/textfit

## Usage

For **`grida.config.js`**

```js
const VanillaTextFitPlugin = require("@code-plugins/vanilla-textfit");

module.exports = {
  // ...
  plugins: [
    // ...
    new VanillaTextFitPlugin({
      // options
    }),
  ],
};
```

For **API**

```json
{
  // ...
  "plugins": [
    {
      "preset": "@code-plugins/vanilla-textfit",
      "args": [],
      "kwargs": {
        "auto": true,
        "font-size-gt": 32,
        "font-size-lt": 12
      }
    }
  ]
}
```

## Options

| property  | default | type           | required | description                                                                                                           |
| --------- | ------- | -------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `mode`    | `fixed` | `fixed`        | ☑        | the mode, only supports `fixed` for now, which the resize will be applied to text with both width & height specified. |
| `min`     | `6`     | `number`       | ☐        | minimum font size in px                                                                                               |
| `max`     | `80`    | `number`       | ☐        | maximum font size in px                                                                                               |
| `include` | `[]`    | `string[]`     | ☐        | array of query selectors to fit (`.` for class, `#` for id)                                                           |
| `exclude` | `[]`    | `string[]`     | ☐        | array of query selectors to exclude                                                                                   |
| loglevel  | `none`  | `none \| null` | ☐        | log level                                                                                                             |

<!--
| `upscale`   | `false` | `bool`     | ☐        | rather to upscale-fit the text                                                                                        |
| `downscale` | `false` | `bool`     | ☐        | rather to downscale-fit the text               -->

## Output

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/textfit/textFit.min.js"></script>
    <script>
      [".a", ".b", ".c"]
        .map((selector) => document.querySelector(selector))
        .forEach((element) =>
          textFit(element, {
            // options
          })
        );
    </script>
    <style>
      .a {
        font-size: 12px;
      }
      .b {
        font-size: 32px;
      }
      .c {
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div style="width: 20px;">
      <span class="a">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </span>
    </div>

    <div style="width: 20px;">
      <span class="b">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </span>
    </div>
    <div style="width: 20px;">
      <span class="c">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </span>
    </div>
  </body>
</html>
```
