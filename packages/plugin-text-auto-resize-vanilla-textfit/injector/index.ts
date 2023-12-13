import assert from "assert";

type InjectorConfig = {
  selector: ReadonlyArray<string> | string;
  option: {};
};

export function inject(
  builder,
  strategy,
  injections: ReadonlyArray<InjectorConfig>
) {
  assert(strategy === "width-and-height");
  assert(injections);
  assert(Array.isArray(injections));
  if (!injections.length) return;

  const chunks = groupByProperty(injections, "option", "selector");

  const statement = (selectors, option) =>
    // prettier-ignore
    `getElementsWithWidthAndHeight([${selectors.map(s => `"${s}"`).join(',')}])
  .forEach((el) =>
  {
    try{
      textFit(el, ${JSON.stringify(option)});

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "characterData" || mutation.type === "childList") {
            const el = mutation.target;
            textFit(el, ${JSON.stringify(option)});
          }
        });
      });

      // Observe the target element and its descendants for changes to text content or child nodes
      observer.observe(el, { characterData: true, childList: true });

    } catch(e){ console.log(e); }
  })`;

  const base = `<script defer>
  window.onload = () => {
    ${chunks.map((c) => statement(c.selector, c.option)).join("\n")}
  }
</script>`;

  const src = `<script src="https://cdn.jsdelivr.net/npm/textfit/textFit.min.js"></script>`;
  const query_func = `<script>${JS_FUNCTION_GET_ELEMENTS_WITH_WIDTH_AND_HEIGHT}</script>`;

  builder.head(src);
  builder.head(query_func);
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
      // @ts-ignore
      item[arrayKey] as any[]
    );
  }

  return Object.values(grouped);
}

// TODO: upload to cdn (../pkg)
const JS_FUNCTION_GET_ELEMENTS_WITH_WIDTH_AND_HEIGHT = `
function getElementsWithWidthAndHeight(selectors) {
  const elementsWithWidthAndHeight = [];

  selectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);

    for (const element of elements) {
      const inlineStyle = element.style;
      const hasInlineWidth =
        inlineStyle.width && inlineStyle.width !== "auto";
      const hasInlineHeight =
        inlineStyle.height && inlineStyle.height !== "auto";

      const cssRules = Array.from(document.styleSheets).flatMap(
        (sheet) => {
          try {
            return Array.from(sheet.cssRules);
          } catch (error) {
            return [];
          }
        }
      );
      const matchingRules = cssRules.filter(
        (rule) =>
          rule.type === CSSRule.STYLE_RULE &&
          element.matches(rule.selectorText)
      );
      const hasWidthInStylesheet = matchingRules.some(
        (rule) => rule.style.width && rule.style.width !== "auto"
      );
      const hasHeightInStylesheet = matchingRules.some(
        (rule) => rule.style.height && rule.style.height !== "auto"
      );

      const hasWidth = hasInlineWidth || hasWidthInStylesheet;
      const hasHeight = hasInlineHeight || hasHeightInStylesheet;

      if (hasWidth && hasHeight) {
        elementsWithWidthAndHeight.push(element);
      }
    }
  });

  return elementsWithWidthAndHeight;
}
`;
