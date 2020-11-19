import { jsxToString } from "jsx-gen"
import * as preact from "preact"
//@ts-ignore
const jsx = jsxToString(<p></p>, {})
console.log(jsx)