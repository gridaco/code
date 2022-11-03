import React from "react";
import { DefaultEditorWorkspaceLayout } from "layouts/default-editor-workspace-layout";
import {
  WorkspaceContentPanel,
  WorkspaceContentPanelGridLayout,
} from "layouts/panel";
import { EditorAppbar, EditorSidebar } from "components/editor";
import { useEditorState } from "core/states";
import { Canvas } from "scaffolds/canvas";
import { Code } from "scaffolds/code";
import { Inspector } from "scaffolds/inspector";
import { EditorHome } from "scaffolds/editor-home";
import { EditorSkeleton } from "./skeleton";
import { colors } from "theme";
import { useEditorSetupContext } from "./setup";

export function Editor() {
  const [state] = useEditorState();
  const { loading } = useEditorSetupContext();

  const _initially_loaded = state.design?.pages?.length > 0;
  const _initial_load_progress =
    [!!state.design?.input, state.design?.pages?.length > 0, !loading].filter(
      Boolean
    ).length /
      3 +
    0.2;

  // this key is used for force re-rendering canvas after the whole file is fetched.
  const _refreshkey = loading || !_initially_loaded ? "1" : "0";

  return (
    <>
      {(loading || !_initially_loaded) && (
        <EditorSkeleton percent={_initial_load_progress * 100} />
      )}

      <DefaultEditorWorkspaceLayout
        backgroundColor={colors.color_editor_bg_on_dark}
        // appbar={<EditorAppbar />}
        leftbar={{
          _type: "resizable",
          minWidth: 240,
          maxWidth: 600,
          children: <EditorSidebar />,
        }}
      >
        <WorkspaceContentPanelGridLayout>
          <WorkspaceContentPanel flex={6}>
            <PageView key={_refreshkey} />
          </WorkspaceContentPanel>
          <WorkspaceContentPanel
            overflow="hidden"
            flex={1}
            resize={{
              left: true,
            }}
            minWidth={300}
            zIndex={1}
            backgroundColor={colors.color_editor_bg_on_dark}
          >
            <RightPanelContent />
          </WorkspaceContentPanel>
          {/* {wstate.preferences.debug_mode && (
            <WorkspaceBottomPanelDockLayout resizable>
              <WorkspaceContentPanel disableBorder>
                <Debugger
                  id={root?.id}
                  file={state?.design?.key}
                  type={root?.entry?.origin}
                  entry={root?.entry}
                  widget={result?.widget}
                />
              </WorkspaceContentPanel>
            </WorkspaceBottomPanelDockLayout>
          )} */}
        </WorkspaceContentPanelGridLayout>
      </DefaultEditorWorkspaceLayout>
    </>
  );
}

function RightPanelContent() {
  const [state] = useEditorState();

  switch (state.mode) {
    case "code":
      return <Code />;
    case "inspect":
    case "view":
    default:
      return <Inspector />;
  }
}

function PageView() {
  const [state] = useEditorState();
  const { selectedPage } = state;

  switch (selectedPage) {
    case "home":
      return <EditorHome />;
    default:
      return <Canvas />;
  }
}
