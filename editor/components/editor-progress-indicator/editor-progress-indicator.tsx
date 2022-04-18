import React from "react";
import styled from "@emotion/styled";
import { EditorTaskItem } from "./editor-task-item";
import { EditorProgressIndicatorButton } from "./editor-progress-indicator-trigger-button";
import { EditorProgressIndicatorPopoverContent } from "./editor-progress-indicator-popover-content";
import * as Popover from "@radix-ui/react-popover";

export function EditorProgressIndicator({
  isBusy,
  tasks,
}: {
  isBusy: boolean;
  tasks: any[];
}) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <EditorProgressIndicatorButton isBusy={isBusy} />
      </Popover.Trigger>
      <Popover.Content>
        <EditorProgressIndicatorPopoverContent>
          {tasks.map((task, index) => (
            <EditorTaskItem
              key={index.toString()}
              label={task.name}
              description={task.description}
              progress={task.progress}
            />
          ))}
        </EditorProgressIndicatorPopoverContent>
      </Popover.Content>
    </Popover.Root>
  );
}
