# Grida Code API (Private Beta)

## Usage (REST)

### `POST /api/v1/code`

Example

```ts
import Axios from "axios";

const client = Axios.create({
  baseURL: "https://code.grida.co/api/v1",
  headers: {
    "Content-Type": "application/json",
    "X-Figma-Access-Token": "figd_xxxxxxxxxx",
  },
});

client.post("code", {
  // target node url formatted as https://www.figma.com/file/{fileKey}?node-id={nodeId}
  // at this moment, the nodeId must be formatted as 00:00, not 00-00
  // Note: if you copy & paste the link from the fihma editor, you will get in the format of 00-00 (we are updating this)
  figma: "https://www.figma.com/file/MikewnarPfXXXXX/?node-id=0%3A1",
  framework: {
    framework: "vanilla", // react, flutter, ...
  },
});
```

#### Request Body

```ts
interface CodeRequest {
  figma: FigmaNodeInput;
  framework: Partial<FrameworkConfig>;
}
```

**`body.figma`**

```ts
type FigmaNodeInput =
  | string
  | { url: string; version: string }
  | { filekey: string; node: string; version: string };
```

**Note** currently only `string` is supported.

An URL indicating the target node in Figma design.

target node url formatted as `https://www.figma.com/file/{fileKey}?node-id={nodeId}`
at this moment, the nodeId must be formatted as `00:00`, not `00-00` url encoded value like `0%3A1` is also acceptable.

Note: if you copy & paste the link from the fihma editor, you will get in the format of 00-00 (we are updating this)

**`body.framework`**

A Framework configuration used for generating code. Learn more at [Framework Configuration](https://grida.co/docs/cli#2-framework-configuration)

#### Response

```ts
// example of response
{
  warnings: [],
  src: '', // do not use this
  srcdoc: '<DOCTYPE html><head>...</head><body>...',
  srcmap: {
    // the mapping between the generated code and the design
    // node-id : xpath
    '123:123': '//div[@data-figma-node-id="123:123"]]'
  },
  files:{
    'index.hml': '<DOCTYPE html><head>...</head><body>...'
  }
  framework:{
    // the framework config used for generating code
    // ...
  },
  // (if the input design source is figma, you will get the brief summary about the used design)
  figma:{
    file:{
      // #region original data ------
      name: "Exmaples",
      lastModified: "2023-03-28T17:51:08Z",
      thumbnailUrl: "https://s3-alpha.figma.com/thumbnails/dc85b86a-2502-4baa-a776-ce0972131a80",
      version: "3247308401",
      // #endregion original data ------
    }

    filekey: 'MikewnarPfXXXXX',
    entry: '0:1',
    json: "{}",
    node: {
      ...
    }
  }
  engine: {
    // the info of the engine used for generating code
    name: 'code.grida.co/api/v1',
    // the engibe version
    version: '2023.1.1'
  },
  // the preview image of the rendered html
  thumbnail: 'https://xxx.s3.amazonaws.com/.../xxxxxx.png',
  license: {
    // the license info of the generated code and the api
    // ...
  }
}
```

- `warnings` - An array of warnings. If there is no warning, it will be an empty array. (This is usually a warning caused by poor design, which can be ignored)
- `src` - The generated code as a uri, a publicly accessible html file endpoint.
- `srcdoc` - The generated code as a bundled and concatenated string, which can be used to embed the code directly into your website.

### `GET /api/v1/embed`

We also provide an experimental embed API for embedding the generated code directly into your website with an iframe.

Example

```html
<iframe
  src="https://code.grida.co/api/v1/embed?figma=<figma-node-url>&fpat=figd_xxxxx"
  width="100%"
  height="100%"
></iframe>
```

#### URL Parameters

**`figma`**
Same as `/v1/code` API's `figma` parameter.

**`fpat`** or **`fat`**

- fpat: Figma Personal Access Token (starting with `figd_`)
- fat: Figma Access Token

Warning: For security reasons, we highly recommend using the Figma Access Token (which expires), instead of the Figma Personal Access Token (which never expires unless revoked). The Figma Personal Access Token is only used for development purpose.

We are planning on providing a more secure way to use embed with the `fpat` in the future.

The framework configuration for embed is `vanilla-preview` by default. We are planning on providing a way to customize the framework configuration in the future.

## Request / Response Types Declarations

See [./types.ts](./types.ts)

## API Clients (Under Development)

At this moment there is no publicly available API wrappers. If you are looking for use on your local machine, you van use [Grida CLI](https://grida.co/cli)
