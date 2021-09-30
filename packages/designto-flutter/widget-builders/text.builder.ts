import { ReflectTextNode } from "@design-sdk/core";
import { SizedBox, Text, Widget } from "@flutter-builder/flutter";
import { makeText } from "../make/make-flutter-text";
import { WidgetBuilder } from "./default.builder";
import { roundNumber } from "@reflect-ui/uiutils";
export class TextBuilder extends WidgetBuilder {
  constructor(args: { child?: Widget; node: ReflectTextNode }) {
    super(args);
  }

  createText(): this {
    // step 1. create text widget
    // step 2. process text auto resize
    this.child = this.wrapTextAutoResize(
      makeText(this.node as ReflectTextNode)
    );
    return this;
  }

  /**
   * wraps the Text with SizedBox
   * @param node
   * @param child
   */
  wrapTextAutoResize(child: Text): Widget {
    const textAutoResize = (this.node as ReflectTextNode).textAutoResize;
    switch (textAutoResize) {
      case "NONE": {
        // if, NONE set, provide both w/h for wapping sizedbox
        // TODO: this needs to be handled with overflow box - since the overflow content still should be visible (and not take up size).
        return new SizedBox({
          child: child,
          width: roundNumber(this.node.width),
          height: roundNumber(this.node.height),
        });
      }
      case "HEIGHT": {
        // if HEIGHT set, HEIGHT will be calculated automatically, but width won't
        // provide only height for warpping sizedbox
        return new SizedBox({
          child: child,
          width: roundNumber(this.node.width),
        });
      }
      case "WIDTH_AND_HEIGHT": {
        // not specifing size (not wrapping with sizedbox) will follow the text content's size (both w&h).
        return child;
      }
    }
  }
}
