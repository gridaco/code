import { WidgetKey } from "@reflect-ui/core";
import { FigmaWidgetKey } from "./widget-key-figma";

export function extractMetaFromWidgetKey(key: WidgetKey): {
  designsource: "figma" | "unknown";
  filekey: string | undefined;
  id: string;
  name: string;
  originalname?: string | undefined;
} {
  if (key instanceof FigmaWidgetKey) {
    return {
      designsource: "figma",
      filekey: typeof key.filekey === "string" ? key.filekey : undefined,
      id: key.id,
      name: key.name,
      originalname: key.originName,
    };
  }

  return {
    designsource: "unknown",
    filekey: undefined,
    id: key.id,
    name: key.name,
    originalname: key.originName,
  };
}
