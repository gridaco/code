<center>

</center>

<p align="center">
  <a href="https://code.grida.co">
  <image src="./branding/gh-artwork.png" />
    <h3 align="center">Design to Code</h3>
  </a>
</p>

<p align="center">
  Design to code engine. A design ✌️ code standard.
</p>

---

https://user-images.githubusercontent.com/16307013/145498355-58fb2cf3-a6a0-44a3-8515-3859b048c3a4.mov

> Grida's Design to code core library. Convert your figma, sketch and adobe xd design to flutter, react, vue and more.

```
npx designto react https://www.figma.com/files/XXX
```

**Or.. [👩‍💻 Try designto-code from browser IDE](https://code.grida.co)**

## Usage

```bash
npm i -g @designto/cli

# react + figma example
designto react https://www.figma.com/files/XXX -o mypage.tsx
```

Integrated usage

- Assistant (Figma plugin) - visit [assistant](https://github.com/gridaco/assistant)
- [code.grida.co](https://code.grida.co) (Web IDE for frontend development)
- [grida CLI](https://github.com/gridaco/cli)
- [@designto/cli](./cli)

## Platforms / Frameworks

| **Frameworks**     |       | channel  | bundler         | reflect-ui | material-ui  | tailwind | packager               |
| ------------------ | :---: | -------- | --------------- | ---------- | ------------ | -------- | ---------------------- |
| ReactJS            |  ✅   | `stable` | `esbuild`       | (wip)      | (wip)        | (wip)    | `npm`, `local`, `git`  |
| Flutter            |  ✅   | `beta`   | `dart-services` | (wip)      | Yes (native) | No       | `pub`, `local`, `git`  |
| React Native       |  ✅   | `beta`   | `expo`          | (wip)      | No           | No       | `expo`, `local`, `git` |
| SolidJS            |  ✅   | `beta`   | `esbuild`       | (wip)      | No           | (wip)    | `npm`, `local`, `git`  |
| Vanilla (html/css) |  ✅   | `stable` | `vanilla`       | (wip)      | No           | (wip)    | `local`, `cdn`         |
| Svelte             |  ✅   | `beta`   | `svelte`        | (wip)      | No           | (wip)    | `npm`, `local`, `git`  |
| Vue                | (wip) | `dev`    | `vue`           | (wip)      | No           | (wip)    | `npm`, `local`, `git`  |
| Android (Jetpack)  | (wip) | `dev`    | Not supported   | (wip)      | Yes (native) | No       | `local`, `git`         |
| iOS (SwiftUI)      | (wip) | `dev`    | Not supported   | (wip)      | No           | No       | `local`, `git`         |

<details>
<summary>React</summary>

| **ReactJS**         |       |
| ------------------- | :---: |
| `styled-components` |  ✅   |
| `@emotion/styled`   |  ✅   |
| css-modules         |  ✅   |
| inline-css          |  ✅   |
| `@mui/material`     | (wip) |
| breakpoints         | (wip) |
| components          | (wip) |

</details>

<details>
<summary>ReactNative</summary>

| **ReactNative**                |       |
| ------------------------------ | :---: |
| `StyleSheet`                   |  ✅   |
| `styled-components/native`     |  ✅   |
| `@emotion/native`              |  ✅   |
| `react-native-linear-gradient` | (wip) |
| `react-native-svg`             | (wip) |
| `expo`                         | (wip) |

</details>

<details>
<summary>Vanilla (html/css)</summary>

| **Vanilla** |               |
| ----------- | :-----------: |
| reflect-ui  | right-aligned |
| css         |      ✅       |
| scss        |   are neat    |

</details>

<details>
<summary>Flutter</summary>

| **Flutter** |       |
| ----------- | :---: |
| material    |  ✅   |
| cupertino   | (wip) |
| reflect-ui  | (wip) |

</details>

<details>
<summary>Svelte</summary>

| **Svelte**          |       |
| ------------------- | :---: |
| `styled-components` |  ✅   |
| `@mui/material`     | (wip) |

</details>

<details>
<summary>Vue3</summary>

| **Vue**             |       |
| ------------------- | :---: |
| `styled-components` |  ✅   |
| `@mui/material`     | (wip) |

</details>

<details>
<summary>SolidJS</summary>

| **Solid**                 |     |
| ------------------------- | :-: |
| `solid-styled-components` | ✅  |
| `inline-css`              | ✅  |

</details>

<details>
<summary>iOS Native</summary>

| **iOS** |       |
| ------- | :---: |
| SwiftUI | (wip) |

</details>

<details>
<summary>Android Native</summary>

| **Android**     |       |
| --------------- | :---: |
| Jetpack Compose | (wip) |

</details>

## Usage

Linting
Custom Tokenizer
Custom Assets Repository
Custom Cache
Custom Cursor
Plugins

### Local development

```
git clone https://github.com/gridaco/designto-code.git
cd designto-code

yarn
yarn editor
# visit http://localhost:6626
```

<details>
<summary>Trouble shooting</summary>

- update pulling - `git submodule update --init --recursive`

</details>

## Features

- preprocessing
  - lint
    - layout lint
    - naming lint
- design
  - layouts
  - animations
  - constraints
  - breakpoints
- code
  - documentation
    - tsdoc
  - single-file module
  - multi-file module

<details>
<summary>Layouts</summary>

</details>

<details>
<summary>Animations (motions)</summary>

</details>

<details>
<summary>Constraints</summary>

</details>

<details>
<summary>Breakpoints</summary>

</details>

### Editor (web IDE)

Visit project ([`./editor`](./editor/))

<details>
<summary>Visualization</summary>

![](./branding/shot-1.png)

![](./branding/shot-1.png)

![](./branding/shot-2.png)

![](./branding/shot-3.png)

![](./branding/shot-4.png)

![](./branding/shot-5.png)

![Grida's design to code. design node visualization snapshot](./branding/example-visualization-design-nodes.png)

</details>

## Architecture

Read [architecture.md](./architecture.md)
