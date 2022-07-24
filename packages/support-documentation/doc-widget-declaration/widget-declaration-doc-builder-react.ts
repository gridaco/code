import { BlockStatement, ImportDeclaration, JSX, Return } from "coli";
import { stringfy } from "@coli.codes/export-string";
import { WidgetDeclarationDocBuilder } from "./widget-declaration-doc-builder";
import { react_imports } from "@web-builder/react-core";
import type { WidgetDeclarationInfo, WidgetModuleInfo } from "./types";
import { GridaTSDocWidgetDeclarationMetaManager } from "../doc-meta";
import { makeEsWidgetModuleFile } from "@web-builder/module-es";
import { version } from "@designto/code";
import { MainImageRepository } from "@design-sdk/core/assets-repository";

class ReactWidgetDeclarationDocUsageExampleBuilder {
  protected readonly sourceuri?: string | undefined;
  protected readonly identifier: string;
  protected readonly params;
  protected readonly module: WidgetModuleInfo;

  constructor({
    identifier,
    sourceuri,
  }: {
    identifier: string;
    sourceuri?: string;
  }) {
    this.identifier = identifier;
    this.sourceuri = sourceuri;
  }

  protected partImportReact() {
    return react_imports.import_react_minimal;
  }
  protected partImport(): ImportDeclaration | undefined {
    // TODO: module import example not supproted
    return undefined;
  }

  protected partInstanciation() {
    if (this.params) {
      return JSX.tag(this.identifier, this.params);
    } else {
      return JSX.tag(this.identifier);
    }
  }

  protected partBody() {
    return new BlockStatement(
      new Return(
        JSX.fragment({
          children: [
            JSX.text("👇 instanciate widget like below. 👇"),
            this.partInstanciation(),
          ],
        }).make()
      )
    );
  }

  public snippet() {
    const file = makeEsWidgetModuleFile({
      name: "example.tsx",
      path: "tmp/examples",
      imports: [this.partImportReact(), this.partImport()].filter(
        Boolean
      ) as ImportDeclaration[],
      body: this.partBody(),
      config: {
        exporting: {
          type: "export-default-anonymous-functional-component",
          exporting_position: "with-declaration",
          declaration_syntax_choice: "inlinefunction",
          export_declaration_syntax_choice: "export-default",
        },
      },
    });

    const code =
      stringfy(file, {
        language: "tsx",
        indentation: 2,
      }).trimEnd() + "\n";
    return `\`\`\`tsx\n${code}\`\`\``;
  }
}

export class ReactWidgetDeclarationDocBuilder extends WidgetDeclarationDocBuilder {
  protected readonly sourceuri?: string | undefined;

  constructor({
    sourceuri,
    ...p
  }: {
    module: WidgetModuleInfo;
    declaration: WidgetDeclarationInfo;
    params: any;
    defaultValues: any;
    sourceuri?: string;
  }) {
    super(p);

    this.sourceuri = sourceuri;
  }

  private get _widgetname(): string {
    if (this.anonymous) {
      return "Anonymous Widget";
    } else {
      return `${this.widgetname}`;
    }
  }

  protected partIntro() {
    const nameinfo = `\`<${this.module.name}>\` ('${this.module.originalname}')`;
    const designlink = buildOriginDesignLinkIfPossible(this.module);
    const gridalink = buildGridaCodeLinkIfPossible(this.module);
    return [
      nameinfo,
      designlink ? `- [${designlink.name}](${designlink.url})` : undefined,
      gridalink ? `- [${gridalink.name}](${gridalink.url})` : undefined,
    ]
      .filter(Boolean)
      .join("\n");
  }

  protected partExample() {
    const snippet = new ReactWidgetDeclarationDocUsageExampleBuilder({
      identifier: this.widgetname,
      sourceuri: this.sourceuri,
    }).snippet();
    return `@example\n${snippet}`;
  }

  protected partParams() {
    if (this.params) {
      return "TODO: params";
    } else {
      // provide default params document
      return "@params {any} props - this widget does not requires props. you can pass custom dynamic props to the widget as you want (on typescript, it will raise type check issues).";
    }
  }
  protected partPreview() {
    /**
     * @deprecated TODO: update the asset repository pattern.
     */
    const _asset_key = "fill-later-assets";
    const _tmp_img = MainImageRepository.instance.get(_asset_key).addImage({
      key: this.module.id,
    });

    return `@preview\n![](${_tmp_img.url})`;
  }
  protected partRemarks() {
    return "@remarks\n@see {@link https://grida.co/docs/widgets} for more information.";
  }

  protected partBrandingFooter() {
    return [
      "![Made with Grida](https://bridged-service-static.s3.us-west-1.amazonaws.com/branding/logo/32.png)",
    ].join("\n");
  }

  protected partGridaMetaComment() {
    const infoline =
      "<!-- Info: Please do not remove this comment unless intended. removing this section will break grida integrations. -->";
    const dataline = GridaTSDocWidgetDeclarationMetaManager.make({
      engine: version,
      source: `${this.module.designsource}://${this.module.filekey}/${this.module.id}`,
      uri: undefined,
    });
    return [infoline, dataline].join("\n");
  }

  protected divider() {
    return "---";
  }

  protected break() {
    return "\n";
  }
  //

  public make() {
    const hr = this.divider;
    const br = this.break;

    return [
      this.partIntro(),
      br(),
      hr(),
      this.partExample(),
      hr(),
      this.partParams(),
      hr(),
      this.partPreview(),
      hr(),
      this.partRemarks(),
      hr(),
      this.partPrivateRemarks(),
      br(),
      this.partBrandingFooter(),
      this.partGridaMetaComment(),
    ]
      .map((i) => i?.toString())
      .filter(Boolean)
      .join("\n");
  }
}

function buildOriginDesignLinkIfPossible(
  module: WidgetModuleInfo
): { name: string; url: string } | undefined {
  if (module.designsource) {
    if (module.designsource === "figma") {
      if (module.filekey) {
        return {
          name: "Open in Figma",
          url: `https://figma.com/file/${module.filekey}?node-id=${module.id}`,
        };
      }
    }
  }
  return;
}

function buildGridaCodeLinkIfPossible(
  module: WidgetModuleInfo
): { name: string; url: string } | undefined {
  if (module.designsource) {
    if (module.filekey) {
      return {
        name: "Open in Grida",
        url: `https://code.grida.co/files/${module.filekey}?node=${module.id}`,
      };
    }
  }
  return;
}
