///
/// this configuration is work-in-progress.
///

export type SvelteStylingOption =
  | SvelteStyleFragment
  | SvelteInlineCssOption
  | SvelteCssInJsOption;

type SvelteInlineCssOption =
  | SvelteInlineCssWithHtmlStandard
  | SvelteInlineCssWithStyleDirective;

type SvelteCssInJsOption = SvelteEmotionCSS;

interface SvelteEmotionCSS {}

/**
 * inline css styling in svelte with html standard way.
 *
 * e.g. 👇
 * ```html
 * <div style="background: black"></div>
 * ```
 */
export interface SvelteInlineCssWithHtmlStandard {
  type: "inline-css-standard";
}

/**
 *
 * e.g. 👇
 * ```html
 * <div
 *   style:position="absolute"
 *   style:top={position === 'absolute' ? '20px' : null}
 *   style:pointer-events={pointerEvents ? null : 'none'}
 * ></div>
 * ```
 *
 * Learn more - [svelte style directive RFC](https://github.com/sveltejs/rfcs/blob/master/text/0008-style-directives.md)
 */
export interface SvelteInlineCssWithStyleDirective {
  type: "inline-css-with-style-directive";
}

/**
 * styling using standard scoped css under <style> tag in svelte.
 *
 * e.g. 👇
 * ```html
 * <p style="color: {color}; --opacity: {bgOpacity};">This is a paragraph.</p>
 * <style>
 *  p {
 *   font-family: "Comic Sans MS", cursive;
 * 	 background: rgba(255, 62, 0, var(--opacity));
 * 	}
 * </style>
 * ```
 */
// TODO: give a better clear name
export interface SvelteStyleFragment {}
