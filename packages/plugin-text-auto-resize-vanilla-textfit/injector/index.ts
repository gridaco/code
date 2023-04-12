import assert from "assert";
export function inject(builder, injections) {
  assert(injections);
  assert(Array.isArray(injections));
  if (!injections.length) return;

  //  TODO: group selectors with same options
  const chunks = [{ selectors: [], option: {} }];

  const statement = (selectors, options) =>
    // prettier-ignore
    `[${selectors.map(s=>`"${s}"`).join(',')}].map((selector) => document.querySelector(selector)).foreEach((el) => {
  try{
    el && textFit(el, ${JSON.stringify(options)});
  } catch(e){ log(e); }
  })`;

  const base = `<script defer>
  window.onload = () => {
    ${chunks.map((c) => statement(c.selectors, c.option)).join("\n")}
  }
</script>`;

  builder.head(base);
}
