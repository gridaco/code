# grida CLI

Visit https://grida.co/cli for more information.

## Installation

```
npm install -g grida
```

## Documentation

Visit https://grida.co/docs/cli

## Commands

| Commands                |                                         |                                                       |
| ----------------------- | --------------------------------------- | ----------------------------------------------------- |
| `grida init`            | configure the preferences               |                                                       |
| `grida login`           | signin to design services               | `auto` \| `figma` \| `sketch` \| `xd`                 |
| `grida add [modules..]` | add new modules to existing project     | `grida add`                                           |
| `grida code react`      | convert input uri (file or url) to code | `grida code react https://www.figma.com/files/XXX`    |
| `grida code rn`         | convert input uri (file or url) to code | `grida code rn https://www.figma.com/files/XXX`       |
| `grida code vue`        | convert input uri (file or url) to code | `grida code vue https://www.figma.com/files/XXX`      |
| `grida code svelte`     | convert input uri (file or url) to code | `grida code svelte https://www.figma.com/files/XXX`   |
| `grida code solid-js`   | convert input uri (file or url) to code | `grida code solid-js https://www.figma.com/files/XXX` |
| `grida code flutter`    | help                                    | `grida code flutter https://www.figma.com/files/XXX`  |

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
