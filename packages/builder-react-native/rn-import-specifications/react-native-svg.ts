import { Import } from "coli";

const _react_native_svg_lib = {
  name: "react-native-svg",
  version: "12.1.1",
  website: "https://github.com/react-native-svg/react-native-svg",
};

/**
 * CoLI: `import Svg, { Path } from "react-native-svg";`
 * - [github:react-native-svg](https://github.com/react-native-svg/react-native-svg)
 * - [npm:react-native-svg](https://www.npmjs.com/package/react-native-svg)
 */
export const import_svg_and_path_from_react_native_svg = new Import()
  .imports("StyleSheet")
  .and("Text")
  .and("View")
  .from(_react_native_svg_lib.name)
  .make();

/**
 * CoLI: `import { SvgXml } from "react-native-svg";`
 */
export const import_svgxml_from_react_native_svg = new Import()
  .imports("SvgXml")
  .from(_react_native_svg_lib.name);
