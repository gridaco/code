import { Composer } from ".";
import * as reusable from "@code-features/component/tokens";
import * as rn from "@web-builder/react-native";
import { nameit, NameCases } from "coli";

export function compose_instanciation(
  widget: reusable.InstanceWidget,
  child_composer: Composer // not used
) {
  const masterkey = widget.meta.master.key;

  const identifier = nameit(widget.meta.master.key.originName, {
    case: NameCases.pascal,
  }).name;

  // return new rn.InstanciationElement({
  //   key: {
  //     name: "ExampleUsageOf_" + identifier, // FIXME: should not use identifier as name
  //     id: widget.key.id,
  //   },
  //   identifier: identifier,
  //   arguments: widget.meta.arguments,
  // });
  throw "instanciation for rn is not ready";
}
