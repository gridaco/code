import { Figma, ReflectSceneNode } from "@design-sdk/figma";
import {
  compare_instance_with_master,
  InstanceDiff,
  NodeDiff,
} from "@design-sdk/diff";
import { ComponentsUsageRepository } from "./components-usage-repository";
import { MasterComponentMetaToken } from "./tokens/token-master-component";
import { InstanceMetaToken } from "./tokens/token-instance";
import { keyFromNode } from "@designto/token/key";

type IDMappable<T> =
  | {
      [key: string]: T;
    }
  | Array<{ id: string } & T>;

function findIn<T>(map: IDMappable<T>, id: string) {
  if (Array.isArray(map)) {
    return map.find((c) => c.id === id);
  } else {
    return map[id];
  }
}

// based on default strategy
// WIP

interface Input {
  entry: Figma.InstanceNode;
  components: IDMappable<Figma.ComponentNode>;
  /**
   * other instances of the same component rather than the entry.
   */
  references?: Figma.InstanceNode[];
}

interface Definition {
  type: string;
  master: string;
  use: string;
  default_value: string;
  overrided_value: string;
}

export function make_instance_component_meta({ entry, components }: Input) {
  const property_meta = overrided_property_meta({ entry, components });
  const define = (diff: NodeDiff): Definition[] | Definition[][] => {
    if (diff.diff) {
      const master = diff.ids[0];
      const use = diff.ids[1];
      switch (diff.type) {
        case "instance-to-master":
          return define_instance(diff);
        case "text-node":
          return [
            diff.characters.diff
              ? {
                  type: "text.data",
                  default_value: diff.characters.values[0],
                  overrided_value: diff.characters.values[1],
                  master: master,
                  use: use,
                }
              : null,
          ];
          break;
      }
    }
  };

  const define_instance = (diff: InstanceDiff) => {
    const definitions = diff.values.map((d) => {
      return define(d);
    });
    return definitions.filter((d) => d) as any;
  };

  const properties = define_instance(property_meta);

  const master = new MasterComponentMetaToken({
    key: keyFromNode(findIn(components, property_meta.ids[0])),
    properties: properties.map((p) => {
      return {
        key: p.type,
        type: p.type,
        defaultValue: p.default_value,
        link: {
          type: "design-link",
          linksto: {
            type: "path-property-link",
            path: "",
            property: p.type,
          }, // TODO:
        },
      };
    }),
    child: findIn(components, property_meta.ids[0]),
  });

  const entryInstance = new InstanceMetaToken({
    master: master,
    key: keyFromNode(entry),
    arguments: properties.reduce(function (result, item, index, array) {
      result[item.type] = {
        key: item.type,
        value: item.overrided_value,
      };
      return result;
    }, {}),
  });

  return new ComponentsUsageRepository({
    components: [master],
    usage: { [entry.id]: entryInstance },
  });
}

function overrided_property_meta({ entry, components }: Input) {
  if (
    // TODO: needs cleanup
    "origin" in entry
      ? ((entry as any) as ReflectSceneNode).origin !== "INSTANCE"
      : entry.type !== "INSTANCE"
  ) {
    throw new Error("not a instance");
  }
  const _master = findIn(components, entry.mainComponentId);
  const diff = compare_instance_with_master({
    instance: entry,
    master: _master,
    components: Array.from(Object.values(components)),
  });
  // TODO: make meta based on diff
  return diff;
}
