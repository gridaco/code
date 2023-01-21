import { Volume } from "memfs";
import produce from "immer";

const fs = new Volume();

interface State {
  files: { [path: string]: { content: string; isDirectory: boolean } };
}

const initialState: State = { files: {} };

const fsReducer = (state: State, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "MKDIR":
        fs.mkdirSync(action.payload, { recursive: true });
        break;
      case "MV":
        fs.renameSync(action.payload.oldPath, action.payload.newPath);
        break;
      case "TOUCH":
        fs.writeFileSync(action.payload, "");
        draft.files[action.payload] = { content: "", isDirectory: false };
        break;
      case "RENAME":
        fs.renameSync(action.payload.oldName, action.payload.newName);
        draft.files[action.payload.newName] =
          draft.files[action.payload.oldName];
        delete draft.files[action.payload.oldName];
        break;
      case "UPDATE_FS":
        const jsonFs = fs.toJSON();
        Object.keys(jsonFs).forEach((path) => {
          const content = jsonFs[path];
          if (content === null) {
            draft.files[path] = { content: "", isDirectory: true };
          } else {
            draft.files[path] = {
              content: content,
              isDirectory: false,
            };
          }
        });
        break;
      default:
        return state;
    }
  });
