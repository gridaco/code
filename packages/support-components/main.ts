import { ComponentNode, InstanceNode, NodeRepository } from "@design-sdk/figma";
import { unwrappedChild } from "@designto/token/wrappings";
import { Widget, WidgetKey } from "@reflect-ui/core";
import { ComponentsUsageRepository } from "./components-usage-repository";
import { make_instance_component_meta } from "./define";
import { tokenizeComponent } from "./tokenize-component";

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
    instances: instances as any,
    components: repository.components,
  });

  const components = component_use_repository.components.map((component) => {
    console.log("tokenize component", component);
    const componentNode = component.body as ComponentNode;
    const componentTokenizedBody = tokenizeComponent.fromComponentNode(
      componentNode
    );

    // .body = componentTokenizedBody;
    return {
      ...component,
      body: componentTokenizedBody,
    };
  });

  return {
    // asumming root is always a multi child widget
    tree: composeInstanciationTree(token, repository, component_use_repository),
    components: components,
  };
}

const composeInstanciationTree = (
  widget: Widget,
  repository: NodeRepository,
  componentsUsageRepository: ComponentsUsageRepository
) => {
  widget = unwrappedChild(widget); // unwrap child to reach original input.
  const { key, _type: _widget_type } = widget;
  const node = repository.get(key.id);
  if (node.origin === "INSTANCE") {
    const instanciation = componentsUsageRepository.getUsageOf(node.id);
    return instanciation;
  } else {
    let child;
    let children;
    if (Array.isArray(widget.children) && widget.children.length > 0) {
      children = widget.children.map((c) => {
        return composeInstanciationTree(
          c,
          repository,
          componentsUsageRepository
        );
      });
    } else if ("child" in widget) {
      child = composeInstanciationTree(
        (widget as any).child,
        repository,
        componentsUsageRepository
      );
    }

    const tree = {
      ...widget,
      children: children,
      child: child,
    };

    return tree;
  }
};

/**
 * make full component use repository based on all used instances & component map.
 * @returns
 */
function make_component_use_repository({
  components,
  instances,
}: {
  components: ComponentNode[];
  instances: InstanceNode[];
}) {
  const make_meta = (instance) => {
    return make_instance_component_meta({
      components: components,
      entry: instance,
    });
  };

  let component_use_repository = new ComponentsUsageRepository({
    components: [],
    usage: {},
  });

  for (const instance of instances) {
    component_use_repository = component_use_repository.merge(
      make_meta(instance)
    );
  }

  return component_use_repository;
}

interface ReusableWidgetResult {
  tree;
  components;
}
