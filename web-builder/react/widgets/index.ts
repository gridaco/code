export * from "./column";
export * from "./container";
export * from "./row";
export * from "./stack";
export * from "./error-widget";
export * from "./text";

export * from "./widget";

// export core widget
export * from "@coli.codes/web-builder-core/widget";

// build types
import type { Column } from "./column";
import type { Row } from "./row";
import type { Stack } from "./stack";
import type { Container } from "./container";

export type ReactWidgets = Column | Row | Stack | Container;
