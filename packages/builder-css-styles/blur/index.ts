import { roundNumber } from "@reflect-ui/uiutils";

export function blur(o?: number): string {
  if (o === undefined) {
    return;
  }
  return `blur(${roundNumber(o)}px)`;
}
