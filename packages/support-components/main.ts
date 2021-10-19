import { NodeRepository } from "@design-sdk/figma";
import { unwrappedChild } from "@designto/token/wrappings";
import { Widget, WidgetKey } from "@reflect-ui/core";
import { ComponentsUsageRepository } from "./components-usage-repository";
import { make_instance_component_meta } from "./define";

/**
 * make widget tree with reusable components
 */
export function reusable({
  repository,
  token,
}: {
  repository: NodeRepository;
  /**
   * tokenized widget tree (entry) from previous result
   */
  token: Widget;
}): ReusableWidgetResult {
  const instances = repository.nodes.filter(
    (node) => node.origin === "INSTANCE"
  );
  const component_use_repository = make_component_use_repository({
    instances: instances,
    components: repository.components,
  });
  console.log("reusable", {
    repository,
    token,
    component_use_repository,
    instances,
  });

  const _handle = (widget: Widget) => {
    widget = unwrappedChild(widget); // unwrap child to reach original input.
    const { key, _type: _widget_type } = widget;
    const node = repository.get(key.id);
    if (node.origin === "INSTANCE") {
      const instanciation = component_use_repository.getUsageOf(node.id);
      console.log("instanciation", instanciation);
      return instanciation;
    } else {
      let child;
      let children;
      if (Array.isArray(widget.children) && widget.children.length > 0) {
        children = widget.children.map(_handle);
      } else if ("child" in widget) {
        child = _handle((widget as any).child);
      }

      const tree = {
        ...widget,
        children: children,
        child: child,
      };
      return tree;
    }
  };

  return {
    // asumming root is always a multi child widget
    tree: _handle(token),
  };
}

/**
 * make full component use repository based on all used instances & component map.
 * @returns
 */
function make_component_use_repository({
  components,
  instances,
}: {
  components;
  instances;
}) {
  const make_meta = (instance) => {
    return make_instance_component_meta({
      components: components,
      entry: instance,
    });
  };

  let component_use_repository = new ComponentsUsageRepository({
    components: components,
    usage: {},
  });
  for (const instance of instances) {
    component_use_repository = component_use_repository.merge(
      make_meta(instance)
    );
  }

  console.log("make_component_use_repository", {
    components,
    instances,
    component_use_repository,
  });
  return component_use_repository;
}

interface ReusableWidgetResult {
  tree;
}
