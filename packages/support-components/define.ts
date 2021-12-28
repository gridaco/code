import { ComponentNode, Figma, ReflectSceneNode } from "@design-sdk/figma";
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
import { NameCases, nameit, ScopedVariableNamer } from "coli";
import { ReservedKeywordPlatformPresets } from "@coli.codes/naming/reserved";
import { visit } from "tree-visit";
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

function findDeepUnderComponent(component: ComponentNode, id: string) {
  let found = null;
  visit<{ id; children }>(component, {
    getChildren: (node) => {
      if ("children" in node) {
        return node.children;
      }
      return [];
    },
    onEnter: (node) => {
      if (node.id === id) {
        found = node;
        return "stop";
      }
    },
  });
  return found;
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
  switch (diff.type) {
    case "instance-to-master":
      return define_props__instance(diff as any) as any;
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
        diff.fills.diff
          ? {
              type: "text.fill",
              default_value: JSON.stringify(diff.fills.values[0]),
              overrided_value: JSON.stringify(diff.fills.values[1]),
              master: masterId,
              use: instanceId,
            }
          : null,
        // TODO: add text styles diff support
      ].filter((d) => d);
    default:
      throw "not handled yet - " + diff["type"];
  }
}

const define_props__instance = (diff: InstanceDiff_1on1) => {
  return diff.values
    .map((d) => {
      return define_props(d);
    })
    .flat()
    .filter(Boolean);
};

export function make_instance_component_meta({ entry, components }: Input) {
  const propertyNamer = new ScopedVariableNamer(
    "property",
    ReservedKeywordPlatformPresets.universal
  );

  const property_meta = overrided_property_meta({ entry, components });
  const masterId = property_meta.ids[0];
  const master = findIn(components, masterId);

  const properties = define_props__instance(property_meta).flat();

  const __name_cache = {};
  /**
   *
   * @param propertyOriginId - the origin node of the property will be targetted. e.g. in `master(group(text))`, the master's text's id will be used.
   * @returns
   */
  const get_property_key = (type: string, propertyOriginId: string) => {
    const uid = type + "-" + propertyOriginId;
    const originNodeName = findDeepUnderComponent(
      master,
      propertyOriginId
    )?.name;

    if (originNodeName) {
      const { name, register } = propertyNamer.nameit(originNodeName, {
        case: NameCases.camel,
        register: false,
      });
      if (__name_cache[uid]) {
        return __name_cache[uid];
      } else {
        __name_cache[uid] = name;
        register();
        return name;
      }
    }
    throw new Error("origin layer does not contain a valid name");
  };

  const masterMeta = new MasterComponentMetaToken({
    key: keyFromNode(findIn(components, masterId)),
    properties: properties.map((p) => {
      return <Property<any>>{
        key: get_property_key(p.type, p.master),
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
    child: findIn(components, masterId),
  });

  const entryInstanceMeta = new InstanceMetaToken({
    master: masterMeta,
    key: keyFromNode(entry),
    arguments: properties.reduce(function (result, item, index, array) {
      result[item.type] = {
        key: get_property_key(item.type, item.master),
        value: item.overrided_value,
      };
      return result;
    }, {}),
  });

  return new ComponentsUsageRepository({
    components: [masterMeta],
    usage: { [entry.id]: entryInstanceMeta },
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
  // TODO: make meta based on diff `{ diff, ... }`
  return diff;
}
