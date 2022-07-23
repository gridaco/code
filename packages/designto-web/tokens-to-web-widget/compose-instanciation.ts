import { Composer } from ".";
import * as reusable from "@code-features/component/tokens";
import * as web from "@web-builder/core";
import { nameit, NameCases } from "coli";
import { WidgetKey } from "@web-builder/core";

export function compose_instanciation(
  widget: reusable.InstanceWidget,
  child_composer: Composer // not used
) {
  const masterkey = widget.meta.master.key;

  const identifier = nameit(widget.meta.master.key.originName, {
    case: NameCases.pascal,
  }).name;

  return new web.InstanciationElement({
    key: WidgetKey.copyWith(widget.key, {
      name: "ExampleUsageOf_" + identifier,
    }),
    identifier: identifier,
    arguments: widget.meta.arguments,
  });
}
