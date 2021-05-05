import { VectorWidget } from "@reflect-ui/core";

function fromStar(): VectorWidget {
  return new VectorWidget("");
}

function fromLine() {
  return new VectorWidget("");
}

function fromPoligon() {
  return new VectorWidget("");
}

function fromFrame() {
  return new VectorWidget("");
}

function fromGroup() {
  return new VectorWidget("");
}

export const tokenizeVector = {
  fromStar: fromStar,
  fromLine: fromLine,
  fromPoligon: fromPoligon,
  fromFrame: fromFrame,
  fromGroup: fromGroup,
};
