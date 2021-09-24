export enum HtmlPathAttribute {
  d = "d",
}

export enum HtmlImgAttribute {
  src = "src",
}

type HtmlAttributes = HtmlPathAttribute | HtmlImgAttribute;

const JsxAttributeMap: { [key in HtmlAttributes]: string } = {
  // path
  d: "d",
  // img
  src: "src",
};
