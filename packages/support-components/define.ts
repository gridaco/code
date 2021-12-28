import { Figma, ReflectSceneNode } from "@design-sdk/figma";
import {
  compare_instance_with_master,
  InstanceDiff_1on1,
  NodeDiff,
} from "@design-sdk/diff";
import { ComponentsUsageRepository } from "./components-usage-repository";
import {
  MasterComponentMetaToken,
  Property,
} from "./tokens/token-master-component";
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

/**
 * A single property definition
 */
interface PropertyDefinition {
  type: string;
  /**
   * id of the master
   */
  master: string;
  /**
   * id of the instance
   */
  use: string;
  /**
   * default value from master
   */
  default_value: string;
  /**
   * overrided value from instance
   */
  overrided_value: string;
}

/**
 * defines properties as array of PropertyDefinition from whole diff data between master/instance
 * @param diff
 * @returns
 */
function define_props(diff: NodeDiff): PropertyDefinition[] {
  if (!diff.diff) return;
  const masterId = diff.ids[0];
  const instanceId = diff.ids[1];
  console.log("diff.type", diff.type);
  switch (diff.type) {
    case "instance-to-master":
      throw "instance-to-master - not implemented"; // TODO:
      return define_props__instance(diff as any) as any;
      break;
    case "text-node":
      return [
        diff.characters.diff
          ? {
              type: "text.data",
              default_value: diff.characters.values[0],
              overrided_value: diff.characters.values[1],
              master: masterId,
              use: instanceId,
            }
          : null,
        // TODO: add text styles diff support
      ];
      break;
  }
}

const define_props__instance = (diff: InstanceDiff_1on1) => {
  return diff.values
    .map((d) => {
      return define_props(d);
    })
    .flat()
    .filter((d) => d); // remove nulls
};

export function make_instance_component_meta({ entry, components }: Input) {
  const property_meta = overrided_property_meta({ entry, components });

  const properties = define_props__instance(property_meta).flat();

  const master = new MasterComponentMetaToken({
    key: keyFromNode(findIn(components, property_meta.ids[0])),
    properties: properties.map((p) => {
      return <Property<any>>{
        key: p.type,
        type: p.type,
        defaultValue: p.default_value,
        link: {
          type: "design-link",
          linksto: {
            type: "path-property-link",
            path: p.type,
            property: [{ type: "name", value: p.type }],
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
      ? (entry as any as ReflectSceneNode).origin !== "INSTANCE"
      : entry.type !== "INSTANCE"
  ) {
    throw new Error("not a instance");
  }
  const _master = findIn(components, entry.mainComponentId);
  if (!_master)
    throw new Error(
      "cannot find master with `mainComponentId` - id " +
        entry.mainComponentId +
        `\nIn map provided - length of ${components.length}`
    );

  const diff = compare_instance_with_master({
    instance: entry,
    master: _master,
    components: Array.from(Object.values(components)),
  });
  // TODO: make meta based on diff
  return diff;
}
