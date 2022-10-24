import { ComponentNode, InstanceNode } from "@design-sdk/figma";
import { NodeRepository } from "@design-sdk/figma-node-repository";
import { unwrappedChild } from "@designto/token/wrappings";
import {
  RenderObjectWidget,
  MultiChildRenderObjectWidget,
  Widget,
  SingleChildRenderObjectWidget,
} from "@reflect-ui/core";
import { ComponentsUsageRepository } from "./components-usage-repository";
import { make_instance_component_meta } from "./define";
import { tokenizeComponent } from "./tokenize-component";
import { InstanceWidget } from "./tokens/token-instance";
import {
  MasterComponentMetaToken,
  MasterComponentWidget,
} from "./tokens/token-master-component";

/**
 * make widget tree with reusable components
 */
export function reusable({
  repository,
  entry,
}: {
  repository: NodeRepository;
  /**
   * tokenized widget tree (entry) from previous result
   */
  entry: RenderObjectWidget;
}): ReusableWidgetResult {
  // all instances in the input scope
  const instances = repository.nodes.filter(
    (node) => node.origin === "INSTANCE"
  );
  const component_use_repository = make_component_use_repository({
    instances: instances as any,
    components: repository.components,
  });

  const components =
    component_use_repository.components.map(composeComponentMeta);

  const _ = {
    // asumming root is always a multi child widget
    tree: composeInstanciationTree(entry, repository, component_use_repository),
    components: components,
  };
  // console.log("reusable", _);
  return _;
}

function composeInstanciationTree(
  widget: RenderObjectWidget,
  repository: NodeRepository,
  componentsUsageRepository: ComponentsUsageRepository
) {
  widget = unwrappedChild(widget); // unwrap child to reach original input.
  const { key, _type: _widget_type } = widget;
  const node = repository.get(key.id);

  // prettier-ignore
  if (!node) { console.warn("node not found", key, repository, "this is a know issue when trying to find a masking group. this will be fixed in the future."); return; }

  if (node.origin === "INSTANCE") {
    const instanceMeta = componentsUsageRepository.getUsageOf(node.id);
    const instance = new InstanceWidget({
      key: instanceMeta.key,
      meta: instanceMeta,
    });
    return instance;
  } else {
    if (
      widget instanceof MultiChildRenderObjectWidget &&
      widget.children.length > 0
    ) {
      // @ts-ignore
      widget.children = widget.children.map((c) => {
        return composeInstanciationTree(
          c,
          repository,
          componentsUsageRepository
        );
      });

      return widget;
    } else if (widget instanceof SingleChildRenderObjectWidget) {
      // @ts-ignore
      widget.child = composeInstanciationTree(
        widget.child,
        repository,
        componentsUsageRepository
      );

      return widget;
    } else {
      return widget;
    }
  }
}

function composeComponentMeta(
  component: MasterComponentMetaToken<any>
): MasterComponentWidget {
  const componentNode = component.body as ComponentNode;
  const componentTokenizedBody =
    tokenizeComponent.fromComponentNode(componentNode);

  return new MasterComponentWidget({
    key: component.key,
    child: componentTokenizedBody,
    meta: component,
  });
}

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
  tree: Widget;
  components;
}
