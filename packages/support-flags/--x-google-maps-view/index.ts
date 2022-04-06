// primary
export const flag_key__x_google_maps_view = "x-google-maps-view";

// alias
const flag_key__x_google_maps = "x-google-maps";
const flag_key__x_google_map = "x-google-map";
const flag_key__google_maps = "google-maps";
const flag_key__google_map = "google-map";
const flag_key__googlemaps = "googlemaps";
const flag_key__googlemap = "googlemap";
export const flag_key_alias__x_google_maps = [
  flag_key__x_google_maps_view,
  flag_key__x_google_map,
  flag_key__google_maps,
  flag_key__google_map,
  flag_key__googlemaps,
  flag_key__googlemap,
];
export interface XGoogleMapsFlag {
  flag:
    | typeof flag_key__x_google_maps_view
    | typeof flag_key__x_google_maps
    | typeof flag_key__x_google_map
    | typeof flag_key__google_maps
    | typeof flag_key__google_map
    | typeof flag_key__googlemaps
    | typeof flag_key__googlemap;
  value: string;
  raw?: string;
}
