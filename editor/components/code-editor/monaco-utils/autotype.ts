import * as monaco from "monaco-editor";
import { AutoTypings, LocalStorageCache } from "monaco-editor-auto-typings";

let dispose: () => void;
export function registerAutoTyping(
  editor: monaco.editor.IStandaloneCodeEditor
) {
  AutoTypings.create(editor, {
    sourceCache: new LocalStorageCache(), // Cache loaded sources in localStorage. May be omitted
  }).then((disposable) => {
    dispose = disposable.dispose;
  });

  return { dispose: dispose };
}
