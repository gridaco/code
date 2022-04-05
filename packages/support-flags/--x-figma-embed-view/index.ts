// primary
export const flag_key__x_figma_embed_view = "x-figma-embed-view";

// alias
const flag_key__x_figma_embed = "x-figma-embed";
const flag_key__x_figma = "x-figma";
const flag_key__figma_embed_view = "figma-embed-view";
const flag_key__figma_embed = "figma-embed";

export const flag_key_alias__x_figma_embed_view = [
  flag_key__x_figma_embed_view,
  flag_key__x_figma,
  flag_key__figma_embed,
  flag_key__figma_embed_view,
];
export interface XFigmaEmbedFlag {
  flag:
    | typeof flag_key__x_figma_embed_view
    | typeof flag_key__x_figma_embed
    | typeof flag_key__x_figma
    | typeof flag_key__figma_embed
    | typeof flag_key__figma_embed_view;
  value: string;
  raw?: string;
}
