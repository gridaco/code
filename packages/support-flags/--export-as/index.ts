export interface ExportAsFlag {
  /**
   * --export-as=<value>
   */
  name: "export-as";
  /**
   * @required
   */
  value: "png" | "svg" | "jpg" | "pdf";
}
