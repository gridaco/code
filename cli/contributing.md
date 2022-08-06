# ux

## `grida code init`

inits the grida.config.js with code related user prompts

- `grida code init`

  - No project root is found. [package.json or pubspec.y(a)ml] Do you want to continue anyway? (y/n)
  - what's the name of the project?
  - which design tool are you using?
    - figma
      - please enter the figma file url: (https://www.figma.com/file/XXX)
    - sketch
    - xd
    - other
  - Which frontend framework are you using?

    - react

      - Which style(s) will you be using? (This can be changed later)
        - styled-components (@emotion/styled) (found in package.json#dependencies)
        - styled-components (styled-components)
        - css
        - scss
        - inline-style (`<div style={{…}}/>`)
        - tailwind-css
        - mui (@mui/core)
        - others
      - Please select the default styling strategy for this project (This can be changed later)
        - styled-components + tailwind
      - Choose the default components directory (This can be changed later)
        - my-project/components/\*
        - my-project/\*_/components/_
        - don’t specify
      - How would you like your components to be exported? (This can be changed later)
        - `export function Component(){…}`
        - `export const Component = () => {…}`
        - `export default function (){…}`
        - `const Component () => {}` & `export default Component`
        - `function Component () => {}` & `export default Component`

    - react-native
    - flutter
    - svelte
    - vanilla html/css

  - Where is your assets directory?
    - `/assets`
    - `/public`
    - other
  - > Created my-project/grida.config.js .

- `grida code https://www.figma.com/xxx`

  - ..

- `grida code issue`

  - Design-to-code issues
    - I get a broken layout
    - I get a broken style
    - Something else is wrong
  - CLI Issues
    - My configuration is broken

- **prompt: handle-assets-replacement**

  - 12 Assets found for x (view at https://cli.grida.co/:session/:command/assets)
  - How would you like to import assets? (select)
    - with temporary url (expires after 7 days)
    - with permanent public url (previously selected)
      - Host 12 assets? will take up 3mb (Y/N)
        - Hosted 12 new assets. you can manage hosted files at https://code.grida.co/file/xxx/assets
    - download to project’s assets folder
    - cancel

- `grida add`

  - generate all components for source https://www.figma.com/file/XXX ? (y/n)
  - Fetching data from api.figma.com… Caching data to api.figma.grida.co…
    - 600 Frames found.
    - 20 Components & 10 Variants found.
    - Select pages to add
      - All
      - page1
      - page2
      - page3
    - Select frames to add from page1
    - Select frames to add from page2
    - Import components used by 40 frames? (y/n)
      - Imported 40 components.
      - You can manage components at https://code.grida.co/file/xxx/components
    - You are adding more than one components at once. Do you want to ignore individual issues and continue for all? (y/n)
      - yes (add all with ignoring all issues)
      - no (add each individually)
      - cancel

- `grida add <uri...>`

  - (if uri points page)
    - This uri is a page. Add all x frames (x found) & components (x found) under page "`<page-name>`"?
      - yes (add all x frames & components)
      - add only components (n components)
      - add only frames (n frames)
      - manually choose from list
  - (if uri points entire file)

- `grida code <framework> https://...`

  - running code command individually outside of project. to run in project, run `grida code add` or `grida code init`
  - framework not specified
  - choose framework from below
  - ..

- `grida code add https://...`

  - Fetching fresh data from api.figma.grida.co…
  - Running grida lint https://wwww.figma.com/file/xxx?node-id=xxx …
    - 20 Issues found
    - View issues 👉 https://code.grida.co/files/xxx/xxx/issues
    - Continue anyway? This might generate non responsive code
      - Continue
      - Cancel & Fix issues
      - Continue & Ignore issues for this session
    - Frame “Page” has dependency to below 4 components. How would you like to handle this?

- `grida code editor`
  - Starting grida dev server @ 0.0.0.0:28012
    - Visit localhost:6626
    - You can install grida pwa or grida desktop app at https://grida.co/download
  - Port 0.0.0.0:28012 already in use run with --port option to start another dev server. run grida editor kill to kill existing dev server

## codegenspec

```json

```

## Useful resources

- CLI References

  - prisma
  - webpack
  - storybook
  - firebase
  - vercel
  - yarn

- [Publishing on Brew](https://bharathvaj.me/blog/how-to-publish-your-nodejs-project-on-homebrew)
