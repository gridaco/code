import { WidgetKey } from "./widget";
import * as core from "@reflect-ui/core";
import { nameit, NameCases } from "@coli.codes/naming";
export function keyFromWidget(widget: core.Widget): WidgetKey {
  if (!widget.key) {
    throw `cannot create web widget key from reflect widget because the input reflect widget key is empty or contains invalid value. the givven reflect widget was - ${
      widget._type
    } {${JSON.stringify(widget, undefined, 2)}}`;
  }
  const name = nameit(widget.key.originName, {
    case: NameCases.pascal,
  });
  return new WidgetKey(widget.key.id, name.name);
}
