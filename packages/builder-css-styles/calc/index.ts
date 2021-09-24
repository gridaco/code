import { Axis, Operation, Operations } from "@reflect-ui/core";
import { length } from "../length";

export function calc(operations: Operations | Operation, axis: Axis) {
  if (Array.isArray(operations)) {
    const operations_str = operations
      .map((op) => {
        return operation(op, axis);
      })
      .join(" ");
    return `calc(${operations_str})`;
  }

  return `calc(${operation(operations, axis)})`;
}

export function operation(operation: Operation, axis: Axis) {
  const _ = [length(operation.left, axis), length(operation.right, axis)]
    .filter((d) => d)
    .join(" " + op(operation.op) + " ");
  return `(${_})`;
}

function op(op: Operation["op"]): string {
  switch (op) {
    case "+":
      return "+";
    case "-":
      return "-";
    case "*":
      return "*";
    case "/":
      return "/";
  }
  throw new Error(`Unknown operation ${op}`);
}
