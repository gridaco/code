import type {
  JSXWithOrWithoutStyleElementConfig,
  WidgetStyleConfigMap,
} from "./build-style-map";

export type DuplicationReductionMap = Map<
  string,
  | JSXWithOrWithoutStyleElementConfig
  | {
      type: "proxy";
      to: string;
    }
>;

type OptimizerFunc = (m: WidgetStyleConfigMap) => DuplicationReductionMap;

export class StylesRepository {
  readonly map: WidgetStyleConfigMap;
  readonly proxymap: DuplicationReductionMap;
  readonly optimizer: OptimizerFunc;
  constructor(map, optimizer?: OptimizerFunc) {
    this.map = map;
    optimizer && (this.optimizer = optimizer);

    if (optimizer) {
      this.proxymap = optimizer(map);
    } else {
      this.proxymap = new Map();
    }
  }

  /**
   * get final target of a proxy
   * @param key
   * @returns
   */
  private _get_proxied(key): string {
    const p = this.proxymap.get(key);
    if (p && "type" in p && p.type === "proxy") {
      return this._get_proxied(p.to);
    } else {
      return key;
    }
  }

  get(key): JSXWithOrWithoutStyleElementConfig {
    const t = this._get_proxied(key);
    const targetstyle = this.map.get(t);
    const originconfig = this.map.get(key);

    return {
      ...targetstyle!,
      // attributes must be preserved.
      attributes: originconfig!.attributes,
    };
  }

  keys(): string[] {
    return Array.from(this.map.keys());
  }

  /**
   * unique keys of the map keys without proxied keys
   */
  uniques(): string[] {
    return Array.from(
      new Set(
        // this will make proxied keys to return target keys
        Array.from(this.map.keys()).map((k) => this._get_proxied(k))
      )
    );
  }
}
