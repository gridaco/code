import { Figma } from "@design-sdk/figma";
import { compare_instance_with_master, NodeDiff } from "@design-sdk/diff";
import { ComponentsUsageRepository } from "./components-usage-repository";
import { MasterComponentMetaToken } from "./tokens/token-master-component";
import { InstanceMetaToken } from "./tokens/token-instance";

type IDMappable<T> =
  | {
      [id: string]: T;
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

export function make_instance_component_meta({ entry, components }: Input) {
  const property_meta = overrided_property_meta({ entry, components });

  const define = (
    diff: NodeDiff
  ): {
    type: string;
    master: string;
    use: string;
    default_value: string;
    overrided_value: string;
  }[] => {
    if (diff.diff) {
      const master = diff.ids[0];
      const use = diff.ids[1];
      switch (diff.type) {
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
        case "instance-to-master": {
          const definitions = diff.values.map((d) => {
            return define(d);
          });
          return definitions.filter((d) => d).flat();
        }
      }
    }
  };

  const properties = define(property_meta);

  const master = new MasterComponentMetaToken({
    key: property_meta.ids[0], // TODO:
    properties: properties.map((p) => {
      return {
        key: p.type,
        type: p.type,
        defaultValue: p.default_value,
      };
    }),
    propertiesLink: {},
    child: components[property_meta.ids[0]],
  });

  const use = new InstanceMetaToken({
    master: master,
    key: entry.id,
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
    usage: { [entry.id]: use },
  });
}

function overrided_property_meta({ entry, components }: Input) {
  if (entry.type !== "INSTANCE") {
    throw new Error("not a instance");
  }
  const diff = compare_instance_with_master({
    instance: entry,
    master: findIn(components, entry.mainComponentId),
    components: Array.from(Object.values(components)),
  });
  // TODO: make meta based on diff
  return diff;
}
