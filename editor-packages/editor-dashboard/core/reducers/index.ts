import assert from "assert";
import produce from "immer";

import type {
  Action,
  FilterAction,
  FoldAction,
  FoldAllAction,
  MakeDirAction,
  MoveAction,
  NewSectionAction,
  UnfoldAction,
  UnfoldAllAction,
} from "../action";
import type {
  DashboardFolderItem,
  DashboardItem,
  DashboardState,
} from "../state";

export function reducer(state: DashboardState, action: Action): DashboardState {
  switch (action.type) {
    case "fsv/new-section": {
      const { name } = <NewSectionAction>action;
      return produce(state, (draft) => {
        draft.hierarchy.sections.push({
          $type: "folder",
          name: name,
          id: name, // add confliction check
          path: name, // add confliction check
          contents: [],
          ds_store: {},
        });
      });
    }

    case "filter": {
      const { query } = <FilterAction>action;
      return produce(state, (draft) => {
        draft.filter.query = query;
        // TODO:
        // draft.hierarchy
      });
    }

    case "fsv/mkdir": {
      const { cwd: dirname, name: seedname } = <MakeDirAction>action;
      return produce(state, (draft) => {
        const dir = draft.hierarchy.sections.find((s) => s.path === dirname);

        const siblings = dir?.contents.filter((c) => c.$type == "folder") || [];
        const name = newDirName({
          seed: seedname,
          siblings: siblings.map((s) => s.name as string),
        });

        const path = `${dirname}/${name}`;
        if (dir) {
          dir.contents.push({
            $type: "folder",
            name: name,
            id: path,
            path: path,
            contents: [],
            ds_store: {},
          });
        }
      });
    }

    case "fsv/mv": {
      const { source, dest } = <MoveAction>action;

      console.log("move", source, dest);
      return produce(state, (draft) => {
        // // 1. check if dest is a valid directory
        const destFolder = findFolder(dest, {
          directories: state.hierarchy.sections,
        });
        assert(destFolder, `"${destFolder}" is not a valid dest directory`);

        // 2. move each source under dest
        for (const src of source) {
          const srcdir = src.split("/").slice(0, -1).join("/");
          console.log("moving", src, "to", dest, "from", srcdir);
          const srcFolder = findFolder(srcdir, {
            directories: state.hierarchy.sections,
          });

          assert(srcFolder, `"${srcdir}" is not a valid source directory`);

          const item: DashboardItem = srcFolder.contents.find(
            (c) => c.path === src
          );

          // move item from src to dest (immer)
          // - remove src from srcFolder
          // - add src to destFolder

          // rm from srcFolder
          draft.hierarchy.sections = draft.hierarchy.sections.map((s) => {
            if (s.path === srcFolder.path) {
              return {
                ...s,
                contents: s.contents.filter((c) => c.path !== src),
              };
            } else if (s.path === destFolder.path) {
              return {
                ...s,
                contents: s.contents.concat(
                  srcFolder.contents.find((c) => c.path === src) as any
                ),
              };
            } else {
              return s;
            }
          });

          // add to destFolder
          draft.hierarchy.sections
            .find((s) => s.path === destFolder.path)
            .contents.push(item as any);
        }
      });
    }

    case "fsv/fold": {
      const { path } = <FoldAction>action;
      return produce(state, (draft) => {
        draft.hierarchyFoldings.push(path);
      });
    }

    case "fsv/unfold": {
      const { path } = <UnfoldAction>action;
      return produce(state, (draft) => {
        draft.hierarchyFoldings = draft.hierarchyFoldings.filter(
          (p) => p !== path
        );
      });
    }

    case "fsv/fold-all": {
      const {} = <FoldAllAction>action;
      return produce(state, (draft) => {
        draft.hierarchyFoldings = state.hierarchy.sections.map((s) => s.path);
      });
    }

    case "fsv/unfold-all": {
      const {} = <UnfoldAllAction>action;
      return produce(state, (draft) => {
        draft.hierarchyFoldings.length = 0;
      });
    }
  }

  throw new Error(
    `[dashboard/reducer] - unknown action type "${action["type"]}"`
  );
}

/**
 * if seedname not provided, get confliction free initial name with format "Untitled" or "Untitled (n)"
 * if seedname provided, get confliction free name with format "seedname" or "seedname (n)"
 * @param seed
 * @param siblings
 */
function newDirName({
  seed = "Untitled folder",
  siblings,
}: {
  seed?: string | undefined;
  siblings: Array<string>;
}): string {
  if (siblings.indexOf(seed) === -1) {
    return seed;
  }

  let i = 1;
  while (true) {
    const name = `${seed} (${i})`;
    if (siblings.indexOf(name) === -1) {
      return name;
    }
    i++;
  }
}

/**
 * find item under hierarchy
 *
 * @param directories the root directories to begin search with. it will loop recursively through all directories
 */
function findFolder(
  path: string,
  { directories }: { directories: Array<DashboardFolderItem> }
): DashboardFolderItem | undefined {
  for (const dir of directories) {
    if (dir.path === path) {
      return dir;
    }

    if (dir.$type === "folder") {
      const found = findFolder(path, {
        directories: dir.contents.filter(
          (d) => d.$type === "folder"
        ) as Array<DashboardFolderItem>,
      });
      if (found) {
        return found;
      }
    }
  }
}

// Visual File system
// mv
// mkdir
// rm
// rename
// fold
// unfold
// order
// tag
// search
