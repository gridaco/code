import { Import } from "coli";

const _react_native_linear_gradient_lib = {
  name: "react-native-linear-gradient",
  version: "2.5.6",
  website:
    "https://github.com/react-native-linear-gradient/react-native-linear-gradient",
};

/**
 * CoLI: `import LinearGradient from "react-native-linear-gradient";`
 *
 * - [github:react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient)
 * - [npm:react-native-linear-gradient](https://www.npmjs.com/package/react-native-linear-gradient)
 */
export const import_lineargradient_from_react_native_linear_gradient =
  new Import()
    .importDefault("LinearGradient")
    .from(_react_native_linear_gradient_lib.name)
    .make();
