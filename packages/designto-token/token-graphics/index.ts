export { tokenizeBitmap } from "./bitmap";
export { tokenizeVector } from "./vector";

// ----- export merged ------
import { tokenizeBitmap } from "./bitmap";
import { tokenizeVector } from "./vector";
import { tokenizeIcon } from "./icon";
export const tokenizeGraphics = {
  ...tokenizeBitmap,
  ...tokenizeVector,
  ...tokenizeIcon,
};
// ----- export merged ------
