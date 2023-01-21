import React, { useCallback } from "react";
import styled from "@emotion/styled";
import {
  FolderCard as _FolderCard,
  SceneCard as _SceneCard,
  SectionHeaderAction,
  SectionHeader,
  DashboardItemCardProps,
  DASHBOARD_ITEM_CARD_SELECTOR,
  DASHBOARD_ITEM_PATH_ATTRIBUTE,
  AuxilaryDashbaordGridPlacementGuide,
  AuxilaryGridDropGuideProps,
} from "../components";
import { EditorHomeHeader } from "./editor-dashboard-header";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  ContextMenuRoot as ContextMenu,
  MenuItem,
} from "@editor-ui/context-menu";
import * as Collapsible from "@radix-ui/react-collapsible";
import {
  useDashboard,
  DashboardItem,
  DashboardFolderItem,
  SceneItem,
} from "../core";
import Selecto from "react-selecto";

export function Dashboard() {
  const {
    hierarchy,
    hierarchyFoldings,
    filter,
    dispatch,
    focusNodeOnCanvas: enterNode,
    // isolateNode: enterNode,
    selectNode,
    blurSelection,
    fold,
    unfold,
    foldAll,
    unfoldAll,
    mkdir,
    selection,
  } = useDashboard();

  const handleQuery = (query: string) => {
    dispatch({
      type: "filter",
      query: query,
    });
  };

  const headerActions = [
    {
      id: "sections/unfold-all",
      label: "Expand All Sections",
      handler: unfoldAll,
    },
    {
      id: "sections/fold-all",
      label: "Fold All Section",
      handler: foldAll,
    },
    {
      id: "sections/new",
      label: "New Folder",
      handler: () => {
        // TODO:
        mkdir("/");
      },
    },
  ];

  return (
    <Providers>
      <EditorHomeHeader onQueryChange={handleQuery} />

      <div
        id={"selection-container"}
        style={{
          marginTop: 80,
          padding: 40,
        }}
      >
        {hierarchy.sections.map((section, i) => {
          const { name, contents } = section;
          return (
            <Directory
              key={i}
              path={section.path}
              label={name}
              contents={contents}
              query={filter.query}
              selections={selection}
              expanded={!hierarchyFoldings.includes(section.path)}
              onExpandChange={(expand) => {
                if (expand) {
                  unfold(section.path);
                } else {
                  fold(section.path);
                }
              }}
              onBlur={blurSelection}
              onSelect={selectNode}
              onEnter={enterNode}
              headerActions={headerActions}
            />
          );
        })}

        <Directory
          label="Components"
          path={"/components"}
          contents={hierarchy.components}
          query={filter.query}
          selections={selection}
          expanded
          onBlur={blurSelection}
          onSelect={selectNode}
          onEnter={enterNode}
          headerActions={headerActions}
        />
        {/* <Selecto
          container={document.querySelector("#selection-container")}
          dragContainer={document.querySelector("#selection-container")}
          selectableTargets={[DASHBOARD_ITEM_CARD_SELECTOR]}
          selectByClick={true}
          selectFromInside={true}
          continueSelect={true}
          toggleContinueSelect={"shift"}
          keyContainer={window}
          hitRate={0}
          scrollOptions={{
            container: document.querySelector(
              "#selection-container"
            ) as HTMLDivElement,
          }}
          onSelect={(e) => {
            // TODO: incomplete
            e.added.forEach((el) => {
              const id = el.id;
              // const path = el.getAttribute(DASHBOARD_ITEM_PATH_ATTRIBUTE);
              selectNode([...selection, id]);
            });
            e.removed.forEach((el) => {
              const id = el.id;
              // const path = el.getAttribute(DASHBOARD_ITEM_PATH_ATTRIBUTE);
              selectNode(selection.filter((p) => p !== id));
            });
          }}
        /> */}
      </div>
    </Providers>
  );
}

function Directory({
  label,
  contents,
  query,
  selections,
  path,
  expanded,
  onExpandChange,
  onBlur,
  onSelect,
  onEnter,
  headerActions,
}: {
  label: string;
  contents: ReadonlyArray<DashboardItem>;
  query: string;
  selections: string[];
  path: string;
  expanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
  onBlur: () => void;
  onSelect: (id: string) => void;
  onEnter: (id: string) => void;
  headerActions?: SectionHeaderAction[];
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <RootDirectoryContextMenuProvider cwd={path}>
        <Collapsible.Root open={expanded} onOpenChange={onExpandChange}>
          <SectionHeader
            id={path}
            expanded={expanded}
            label={label}
            q={query}
            actions={headerActions}
          />
          <Collapsible.Content>
            <SceneGrid onClick={onBlur}>
              {contents.map((item, i) => (
                <DashboardItemCardWrapper key={item.id} path={item.path}>
                  <DashboardItemCard
                    q={query}
                    {...item}
                    selected={selections.includes(item.id)}
                    onClick={(e) => {
                      onSelect(item.id);
                      e.stopPropagation();
                    }}
                    onDoubleClick={() => {
                      onEnter(item.id);
                    }}
                  />
                </DashboardItemCardWrapper>
              ))}
            </SceneGrid>
          </Collapsible.Content>
        </Collapsible.Root>
      </RootDirectoryContextMenuProvider>
    </div>
  );
}

function Providers({ children }: React.PropsWithChildren<{}>) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}

function RootDirectoryContextMenuProvider({
  children,
  disabled,
  cwd,
}: React.PropsWithChildren<{
  cwd: string;
  disabled?: boolean;
}>) {
  const { mkdir } = useDashboard();
  const items: MenuItem<string>[] = [
    { title: "New Folder", value: "new-folder" },
    // "separator",
    // { title: "Run", value: "run" },
    // { title: "Deploy", value: "deploy-to-vercel" },
    // { title: "Open in Figma", value: "open-in-figma" },
    // { title: "Get sharable link", value: "make-sharable-link" },
    // { title: "Copy CSS", value: "make-css" },
    // { title: "Refresh (fetch from origin)", value: "refresh" },
  ];

  const onselect = useCallback(
    (value: string) => {
      switch (value) {
        case "new-folder":
          mkdir(cwd);
          break;
      }
    },
    [mkdir]
  );

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <ContextMenu items={items} onSelect={onselect}>
      {children}
    </ContextMenu>
  );
}

type DndMetaItem<T = object> = T & {
  path: string;
  $type: DashboardItem["$type"];
};

function DashboardItemCardWrapper({
  path,
  children,
}: React.PropsWithChildren<{ path: string }>) {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <PlacementGuide left path={path} />
      {children}
      <PlacementGuide right path={path} />
    </div>
  );
}

function PlacementGuide({ ...props }: AuxilaryGridDropGuideProps) {
  const { path: target } = props;
  const { mv } = useDashboard();
  const [{ isActive }, drop] = useDrop(() => ({
    accept: "scene",
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
    canDrop(item: DndMetaItem, monitor) {
      return true;
    },
    drop(item, monitor) {
      const it: DashboardItem = item as DashboardItem;

      console.log("move order", it, monitor);

      switch (it.$type) {
        case "frame-scene": {
          const dest = target.split("/").slice(0, -1).join("/");
          console.log(target, dest);
          mv([it.path], dest); // TODO: add order info
          break;
        }
        case "folder": {
          throw new Error("folder cannot be moved to a scene");
        }
      }
    },
  }));

  // TODO: add on click handler with new-section command

  return (
    <AuxilaryDashbaordGridPlacementGuide
      ref={drop}
      {...props}
      over={isActive}
    />
  );
}

function DashboardItemCard(
  props: DashboardItem &
    Omit<DashboardItemCardProps, "label" | "preview" | "icon">
) {
  switch (props.$type) {
    case "frame-scene":
    case "component": {
      return <SceneCard {...props} />;
    }
    case "folder": {
      return <FolderCard {...props} />;
    }
    default: {
      throw new Error(`Unknown item type ${props.$type}`);
    }
  }
}

function SceneCard(
  props: SceneItem & Omit<DashboardItemCardProps, "label" | "preview" | "icon">
) {
  const { mv, isolateNode, focusNodeOnCanvas } = useDashboard();

  const [{ isActive }, drop] = useDrop(() => ({
    accept: "scene",
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
    canDrop(item: DndMetaItem, monitor) {
      return item.path !== props.path;
    },
    drop(item, monitor) {
      const it: DashboardItem = item as DashboardItem;

      console.log("drop into SceneCard", it, monitor);

      switch (it.$type) {
        case "frame-scene": {
          mv([it.path], props.path);
          break;
        }
        case "folder": {
          throw new Error("folder cannot be moved to a scene");
        }
      }

      // todo:
    },
  }));

  const [{ opacity }, drag] = useDrag(() => {
    return {
      type: "scene",
      item: {
        id: props.id,
        $type: props.$type,
        path: props.path,
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    };
  }, []);

  function attachRef(el) {
    drag(el);
    drop(el);
  }

  const defaultprops = {
    isOver: isActive,
    style: { opacity },
  };

  const items: MenuItem<string>[] = [
    { title: "View on Canvas", value: "focus" },
    { title: "View Details", value: "isolate" },
    { title: "Open in Figma", value: "open-in-figma" },
  ];

  const onContextSelect = useCallback(
    (value: string) => {
      switch (value) {
        case "focus": {
          focusNodeOnCanvas(props.scene.id);
          break;
        }
        case "isolate": {
          isolateNode(props.scene.id);
        }
      }
    },
    [focusNodeOnCanvas, isolateNode, props.scene.id]
  );

  return (
    <ContextMenu items={items} onSelect={onContextSelect}>
      <div>
        <_SceneCard
          // @ts-ignore
          scene={props.scene as any}
          ref={attachRef}
          {...defaultprops}
          {...props}
        />
      </div>
    </ContextMenu>
  );
}

function FolderCard(
  props: DashboardFolderItem &
    Omit<DashboardItemCardProps, "label" | "preview" | "icon">
) {
  const { mv } = useDashboard();
  const [{ isActive }, drop] = useDrop(() => ({
    accept: ["scene", "folder"],
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
    canDrop(item: DndMetaItem, monitor) {
      return item.path !== props.path;
    },
    drop(item, monitor) {
      const it: DashboardItem = item as DashboardItem;

      switch (it.$type) {
        case "frame-scene":
        case "folder": {
          mv([it.path], props.path);
        }
      }
    },
  }));

  const [{ opacity }, drag] = useDrag(() => {
    return {
      type: props.$type,
      item: props,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    };
  }, []);

  function attachRef(el) {
    drag(el);
    drop(el);
  }

  const defaultprops = {
    isOver: isActive,
    style: { opacity },
  };

  return (
    <_FolderCard
      ref={attachRef}
      id={props.id}
      path={props.path}
      name={props.name}
      contents={props.contents}
      {...defaultprops}
      {...props}
    />
  );
}

const SceneGrid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 40px;
`;
