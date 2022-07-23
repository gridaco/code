import Postprocessing from "coli-plugin-postprocessing";

export const dirty_widget_doc_meta_postprocessing_replacer =
  Postprocessing.create("widget-doc-meta-postprocessing-replacer");

export const dirty_widget_doc_meta_postprocessing_replacer_keys = {
  designsource: "designsource",
  filekey: "filekey",
} as const;
