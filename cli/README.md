# A `designto x` CLI

## Installation

```
npm install -g @designto/cli
```

## Commands

| Commands               |                                         |
| ---------------------- | --------------------------------------- | -------------------------------------------------- |
| `designto react`       | convert input uri (file or url) to code | `designto react https://www.figma.com/files/XXX`   |
| `designto rn`          | convert input uri (file or url) to code | `designto rn https://www.figma.com/files/XXX`      |
| `designto vue`         | convert input uri (file or url) to code | `designto vue https://www.figma.com/files/XXX`     |
| `designto svelte`      | convert input uri (file or url) to code | `designto svelte https://www.figma.com/files/XXX`  |
| `designto solid`       | convert input uri (file or url) to code | `designto flutter https://www.figma.com/files/XXX` |
| `designto flutter`     | help                                    | `designto flutter https://www.figma.com/files/XXX` |
| `designto signin`      | signin to design services               | `auto` \| `figma` \| `sketch` \| `xd`              |
| `designto config init` | configure the preferences               |

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
