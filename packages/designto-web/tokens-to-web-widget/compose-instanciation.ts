import { Composer } from ".";
import * as reusable from "@code-features/component/tokens";
import * as web from "@web-builder/core";

export function compose_instanciation(
  widget: reusable.InstanceWidget,
  child_composer: Composer
) {
  const masterkey = widget.meta.master.key;
  return new web.InstanciationElement({
    key: {
      name: "foo",
      id: masterkey.id,
    },
    // TODO: fix this
    identifier: "foo",
  });
}
