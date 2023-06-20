export interface ReportConfig {
  sample: string;
  outDir?: string;
  localarchive?: {
    files: string;
    images: string;
  };
  skipIfReportExists?: boolean;
}
