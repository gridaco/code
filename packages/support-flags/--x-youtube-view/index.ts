// primary
export const flag_key__x_youtube_view = "x-youtube-view";

// alias
const flag_key__x_youtube = "x-youtube";
const flag_key__youtube = "youtube";

export const flag_key_alias__x_youtube_view = [
  flag_key__x_youtube_view,
  flag_key__youtube,
];
export interface XYoutubeFlag {
  flag:
    | typeof flag_key__x_youtube_view
    | typeof flag_key__x_youtube
    | typeof flag_key__youtube;
  value: string;
  raw?: string;
}
