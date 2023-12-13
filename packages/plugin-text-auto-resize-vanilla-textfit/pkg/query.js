function getElementsWithWidthAndHeight(selectors) {
  const elementsWithWidthAndHeight = [];

  selectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);

    for (const element of elements) {
      const inlineStyle = element.style;
      const hasInlineWidth = inlineStyle.width && inlineStyle.width !== "auto";
      const hasInlineHeight =
        inlineStyle.height && inlineStyle.height !== "auto";

      const cssRules = Array.from(document.styleSheets).flatMap((sheet) => {
        try {
          return Array.from(sheet.cssRules);
        } catch (error) {
          return [];
        }
      });
      const matchingRules = cssRules.filter(
        (rule) =>
          rule.type === CSSRule.STYLE_RULE && element.matches(rule.selectorText)
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
