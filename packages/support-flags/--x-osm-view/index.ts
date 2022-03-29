// primary
export const flag_key__x_osm_view = "x-osm-view";

// alias
const flag_key__x_osm = "x-osm";
const flag_key__osm = "osm";

export const flag_key_alias__x_osm = [flag_key__x_osm_view, flag_key__osm];
export interface XOSMFlag {
  flag:
    | typeof flag_key__x_osm_view
    | typeof flag_key__x_osm
    | typeof flag_key__osm;
  value: string | boolean;
  raw?: string;
}
