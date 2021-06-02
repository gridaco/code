import React, { useState } from "react";
import styled from "@emotion/styled";
import { MainImageRepository } from "@design-sdk/core/assets-repository";
import { ImageRepositories } from "@design-sdk/figma/asset-repository";
import { figmacomp } from "../../components";
import { ReflectSceneNode } from "@design-sdk/core/nodes";
import { DefaultEditorWorkspaceLayout } from "../../layout/default-editor-workspace-layout";
import { LayerHierarchy } from "../../components/editor-hierarchy";
import { PreviewAndRunPanel } from "../../components/preview-and-run";
import { FigmaTargetNodeConfig } from "@design-sdk/core/utils/figma-api-utils";
import {
  WorkspaceContentPanel,
  WorkspaceContentPanelGridLayout,
} from "../../layout/panel";
// import * as flutter from "@designto/flutter";
import { MonacoEditor } from "../../components/code-editor";
import { composeAppWithHome } from "@bridged.xyz/flutter-builder";
// import { utils_dart } from "../../utils";

////
//// - https://github.com/suren-atoyan/monaco-react/issues/237
//// OTHER IMPORTS ARE DISABLED TEMPORARILY.
///// THIS LINE BELOW WILL BREAK/RUN THE MONACO EDITOR.
////
composeAppWithHome(""); /** COMMENT THIS LINE IF WANT TO MAKE IT WORK. */

// set image repo for figma platform
MainImageRepository.instance = new ImageRepositories();

const utils_dart = {
  format: (code) => code,
};

export default function FigmaDeveloperPage() {
  const [reflect, setReflect] = useState<ReflectSceneNode>();
  const [target, setTarget] = useState<FigmaTargetNodeConfig>();
  // const flutterAppBuild = reflect && flutter.buildApp(reflect);
  // const widget = flutterAppBuild?.widget;
  // const app =
  //   widget &&
  //   flutter.makeApp({
  //     widget: widget,
  //     scrollable: flutterAppBuild.scrollable,
  //   });
  const widget = {
    build: () => {
      return {
        finalize: () => "",
      };
    },
  };
  const app = "";

  const widgetCode = utils_dart.format(widget?.build()?.finalize());
  // const rootAppCode = app && utils_dart.format(composeAppWithHome(app));
  const rootAppCode = "";

  const handleOnDesignImported = (reflect: ReflectSceneNode) => {
    setReflect(reflect);
  };

  const handleTargetNodeSet = (target: FigmaTargetNodeConfig) => {
    setTarget(target);
  };

  return (
    <>
      <DefaultEditorWorkspaceLayout leftbar={<LayerHierarchy data={reflect} />}>
        <figmacomp.FigmaScreenImporter
          onImported={handleOnDesignImported}
          onTargetEnter={handleTargetNodeSet}
        />
        <WorkspaceContentPanelGridLayout>
          <WorkspaceContentPanel>
            <PreviewAndRunPanel
              config={{
                src: rootAppCode,
                platform: "flutter",
                sceneSize: {
                  w: reflect?.width,
                  h: reflect?.height,
                },
                fileid: target?.file,
                sceneid: target?.node,
              }}
            />
          </WorkspaceContentPanel>
          <WorkspaceContentPanel>
            <InspectionPanelContentWrap>
              <MonacoEditor
                key={widgetCode}
                height="100vh"
                defaultValue={
                  widgetCode
                    ? widgetCode
                    : "// No input design provided to be converted.."
                }
                defaultLangiage="dart"
              />
            </InspectionPanelContentWrap>
          </WorkspaceContentPanel>
        </WorkspaceContentPanelGridLayout>
      </DefaultEditorWorkspaceLayout>
    </>
  );
}

const InspectionPanelContentWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;
function dynamic(
  arg0: Promise<typeof import("../../components/code-editor")>,
  arg1: { ssr: boolean }
) {
  throw new Error("Function not implemented.");
}
