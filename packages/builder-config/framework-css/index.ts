export type CssStylingConfig = VanillaCssStylingConfig | ScssStylingConfig;

interface VanillaCssStylingConfig {
  type: "css";
  lang: "css";
}

interface ScssStylingConfig {
  type: "css";
  lang: "scss";
}
