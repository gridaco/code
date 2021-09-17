import { ReflectVectorNode } from "@design-sdk/core";
import { VectorWidget } from "@reflect-ui/core";
import { keyFromNode } from "../key";

function fromStar(): VectorWidget {
  // return new VectorWidget("");
  return;
}

function fromLine() {
  // return new VectorWidget("");
}

function fromPoligon(): VectorWidget {
  return;
  // return new VectorWidget("");
}

function fromVector(vector: ReflectVectorNode) {
  const _key = keyFromNode(vector);
  return new VectorWidget({
    key: _key,
    ...vector,
    data: vector?.vectorPaths[0]?.data,
  });
}

function fromFrame() {
  // return new VectorWidget("");
}

function fromGroup() {
  // return new VectorWidget("");
}

export const tokenizeVector = {
  fromStar: fromStar,
  fromLine: fromLine,
  fromPoligon: fromPoligon,
  fromFrame: fromFrame,
  fromGroup: fromGroup,
  fromVector: fromVector,
};
