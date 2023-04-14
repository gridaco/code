import assert from "assert";

type InjectorConfig = {
  selector: ReadonlyArray<string> | string;
  option: {};
};

export function inject(builder, injections: ReadonlyArray<InjectorConfig>) {
  assert(injections);
  assert(Array.isArray(injections));
  if (!injections.length) return;

  const chunks = groupByProperty(injections, "option", "selector");

  const statement = (selectors, option) =>
    // prettier-ignore
    `[${selectors.map(s => `"${s}"`).join(',')}].map((selector) => document.querySelectorAll(selector))
  .filter((el) => el.length)
  .forEach((el) => {
    console.log(el);
    try{
      el && textFit(el, ${JSON.stringify(option)});
    } catch(e){ log(e); }
  })`;

  const base = `<script defer>
  window.onload = () => {
    ${chunks.map((c) => statement(c.selector, c.option)).join("\n")}
  }
</script>`;

  const src = `<script src="https://cdn.jsdelivr.net/npm/textfit/textFit.min.js"></script>`;

  builder.head(src);
  builder.head(base);
}

function groupByProperty<T>(
  list: ReadonlyArray<T>,
  groupKey: keyof T,
  arrayKey: keyof T
) {
  const grouped: { [key: string]: Partial<T> & { [P in keyof T]: T[P][] } } =
    {};

  for (const item of list) {
    const itemKey = JSON.stringify(item[groupKey]);

    if (!grouped[itemKey]) {
      grouped[itemKey] = { ...item, [arrayKey]: [] };
    }

    // @ts-ignore
    grouped[itemKey][arrayKey] = (grouped[itemKey][arrayKey] as any[]).concat(
      item[arrayKey] as any[]
    );
  }

  return Object.values(grouped);
}
