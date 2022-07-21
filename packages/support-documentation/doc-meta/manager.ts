import docmeta from "./serializer";

export const grida_doc_meta_delimiters = {
  widget_declaraton: "grida.meta.widget_declaration",
};

export interface GridaWidgetDeclarationDocumentationMeta {
  delimiter: "grida.meta.widget_declaration";
  engine: string;
  uri: string;
  source: string;
}

class DocMetaManager {}

class GridaDocMetaManager extends DocMetaManager {}

/**
 * This manager class parse or makes comment string for widget declaration tsdoc as in markdown format.
 * The comment follows the html comment format, which is - `<!-- content -->`
 *
 * The meta will contain fields from interface {@link GridaWidgetDeclarationDocumentationMeta}
 */
class GridaTSDocMetaManager extends GridaDocMetaManager {}

export class GridaTSDocWidgetDeclarationMetaManager extends GridaTSDocMetaManager {
  static parse(
    docstring: string
  ): GridaWidgetDeclarationDocumentationMeta | undefined {
    if (docstring.includes(grida_doc_meta_delimiters.widget_declaraton)) {
      // use regex to parse lines with markdown comments
      const match = docstring.match(
        /^\s*<!--\s*grida.meta.widget_declaration\s*(.*)\s*-->\s*$/
      );
      if (match) {
        const meta = docmeta.decode(match[1]);
        if (meta[grida_doc_meta_delimiters.widget_declaraton]) {
          return {
            delimiter: "grida.meta.widget_declaration",
            engine: meta["engine"],
            uri: meta["uri"],
            source: meta["source"],
          };
        } else {
          // broken meta
        }
      }
    }
  }

  static make(
    meta: Omit<GridaWidgetDeclarationDocumentationMeta, "delimiter">
  ) {
    return docmeta.encode(<GridaWidgetDeclarationDocumentationMeta>{
      ...meta,
      delimiter: "grida.meta.widget_declaration",
    });
  }
}
