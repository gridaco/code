# A `grida code` CLI member of [`grida cli`](https://github.com/gridaco/cli)

## Installation

```
npm install -g @designto/cli
```

## Commands

| Commands             |                                         |
| -------------------- | --------------------------------------- | ---------------------------------------------------- |
| `grida code react`   | convert input uri (file or url) to code | `designto react https://www.figma.com/files/XXX`     |
| `grida code rn`      | convert input uri (file or url) to code | `designto rn https://www.figma.com/files/XXX`        |
| `grida code vue`     | convert input uri (file or url) to code | `grida code vue https://www.figma.com/files/XXX`     |
| `grida code svelte`  | convert input uri (file or url) to code | `grida code svelte https://www.figma.com/files/XXX`  |
| `grida code solid`   | convert input uri (file or url) to code | `grida code flutter https://www.figma.com/files/XXX` |
| `grida code flutter` | help                                    | `designto flutter https://www.figma.com/files/XXX`   |
| `grida code auth`    | signin to design services               | `auto` \| `figma` \| `sketch` \| `xd`                |
| `grida code init`    | configure the preferences               |

## Args

| Flags                     |                                                  |                                                                          |     |
| ------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------ | --- |
| `--framework`             | specify the target framework                     | `flutter` \| `react` \| `react-native` \| `svelte` \| `vue` \| `vanilla` | \*  |
| `--config`                | specify the framework config json file           | framework.config.json                                                    |     |
| `--design-origin`         | specify the input design origin                  | `auto` \| `figma` \| `sketch` \| `xd`                                    |     |
| `--personal-access-token` | access token                                     |                                                                          |     |
| `--user`                  | account name if signed-in with multiple accounts |

## Output

`--output, -o <path>`

- `<path>`: the output file path
- `<dir>`: the output files dir
- dry : do not write files. log the output
