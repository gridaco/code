// priamry
export const flag_key__as_progress = "as-progress" as const;
// alias
const flag_key__as_progress_bar = "as-progress-bar" as const;
const flag_key__as_loading = "as-loading" as const;
const flag_key__as_loading_bar = "as-loading-bar" as const;

export const flag_key_alias__as_progress = [
  flag_key__as_progress,
  flag_key__as_progress_bar,
  flag_key__as_loading,
  flag_key__as_loading_bar,
];

export interface AsProgressFlag {
  flag:
    | typeof flag_key__as_progress
    | typeof flag_key__as_progress_bar
    | typeof flag_key__as_loading
    | typeof flag_key__as_loading_bar;

  value: boolean;
  _raw?: string;
}
