import { roundNumber } from "@reflect-ui/uiutils";

export function blur(o?: number): string | undefined {
  if (o === undefined) {
    return;
  }
  return `blur(${roundNumber(o)}px)`;
}
