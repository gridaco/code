// primary
export const flag_key__latlng = "latlng";
// alias
const flag_key__lat_lng = "lat-lng";

export const flag_key_alias__max_height = [flag_key__latlng, flag_key__lat_lng];

export interface LatLngFlag {
  flag: typeof flag_key__latlng | typeof flag_key__lat_lng;

  value: string;
  _raw?: string;
}
