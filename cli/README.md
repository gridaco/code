# Using Design-to-code via cli

## Installation

```
brew install design
```

## Commands

| Commands        |                                         |
| --------------- | --------------------------------------- | ---------------------------------------- |
| `design uri`    | convert input uri (file or url) to code | `design https://www.figma.com/files/XXX` |
| `design help`   | help                                    | `design help`                            |
| `design login`  | login to design services                | `auto` \| `figma` \| `sketch` \| `xd`    |
| `design config` | configure the preferences               |

## Args

| Flags                |                                                  |                                                                          |     |
| -------------------- | ------------------------------------------------ | ------------------------------------------------------------------------ | --- |
| `--framework`        | specify the target framework                     | `flutter` \| `react` \| `react-native` \| `svelte` \| `vue` \| `vanilla` | \*  |
| `--framework-config` | specify the framework config json file           | framework.config.json                                                    |     |
| `--design-origin`    | specify the input design origin                  | `auto` \| `figma` \| `sketch` \| `xd`                                    |     |
| `--access-token`     | access token                                     |                                                                          |     |
| `--account`          | account name if signed-in with multiple accounts |
