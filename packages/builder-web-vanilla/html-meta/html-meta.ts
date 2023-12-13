/**
 * A user customizable additional meta declared inside html head with `<meta>` tag. (`<title>` for title)
 *
 * This follows the google supported meta tags.
 *
 * - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
 * - https://developers.google.com/search/docs/crawling-indexing/special-tags
 */
export interface HtmlMeta {
  /**
   *
   */
  title?: string;
  /**
   * @default "utf-8"
   */
  charset?: string;
  /**
   * Use this tag to provide a short description of the page. In some situations, this description is used in the snippet shown in search results.
   */
  description?: string;
  /**
   * These meta tags control the behavior of search engine crawling and indexing.
   */
  robots?: string[] | string;

  /**
   * These meta tags control the behavior of search engine crawling and indexing.
   * The <meta name="robots" ... tag applies to all search engines, while the <meta name="googlebot ... tag is specific to Google.
   * In the case of conflicting robots (or googlebot) meta tags, the more restrictive tag applies. For example, if a page has both the max-snippet:50 and nosnippet tags, the nosnippet tag will apply.
   * The default values are index, follow and don't need to be specified. For a full list of values that Google supports, see the list of valid rules.
   * You can also specify this information in the header of your pages using the X-Robots-Tag HTTP header rule. This is particularly useful if you wish to limit indexing of non-HTML files like graphics or other kinds of documents. More information about robots meta tags.
   */
  googlebot?: string[] | string;
  keywords?: string[] | string;
  author?: string;
  viewport?: string;
}
