export { tokenizeBitmap } from "./bitmap";
export { tokenizeVector } from "./vector";

// ----- export merged ------
import { tokenizeBitmap } from "./bitmap";
import { tokenizeVector } from "./vector";
export const tokenizeGraphics = {
  ...tokenizeBitmap,
  ...tokenizeVector,
};
// ----- export merged ------
