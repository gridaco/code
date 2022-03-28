import { Container, Widget } from "@reflect-ui/core";

/**
 * Special token for wrapping a detected component with a container.
 */
export class WrappingContainer<
  T extends Widget = Widget
> extends Container<T> {}
