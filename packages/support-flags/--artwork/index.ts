export const flag_key__artwork = "artwork";

const flag_key__as_artwork = "as-artwork";

export const flag_key_alias__artwork = [
  //
  flag_key__artwork,
  flag_key__as_artwork,
] as const;

export interface ArtworkFlag {
  flag: typeof flag_key__artwork;
  value?: boolean;
}
