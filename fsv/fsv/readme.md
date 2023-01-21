# `fsiv` - File system interface virtualized

`fsiv` is a node module that is used to mock a filesystem in memory, used for testing, syncing with virtual machines' filesystems, providing a unified client-server module to have a common interface for both, and more.

## Usage

**Install**

```bash
yarn add fsiv
```

**Basic usage**

Mocking a directory / file system for storage applications, like google drive, dropbox, etc.

```ts
import { FSIV } from "fsiv";

const fsiv = new FSIV();

// Create a directory
fsiv.mkdir("/test");

// Create a file
fsiv.writeFile("/test/file.txt", "Hello World");

// Read a file
fsiv.readFile("/test/file.txt"); // "Hello World"

// Delete a file
fsiv.unlink("/test/file.txt");

// Delete a directory
fsiv.rmdir("/test");

// List a directory
fsiv.readdir("/"); // ["/test"]

// Check if a file exists
fsiv.exists("/test/file.txt"); // false

// Move a file
fsiv.rename("/test/file.txt", "/test/file2.txt");
```

**Integration with react state management solutions**

```ts
import React, { useState } from "react";
import { FSIV } from "fsiv";

const fsiv = new FSIV();

const App = () => {
  const [state, setState] = useState(fsiv.getState());

  fsiv.onChange("/", () => {
    setState(fsiv.getState());
  });

  return (
    <div>
      <h1>My App</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
```
