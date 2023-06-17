export interface FileReportsParams {
  file: string;
}

export interface NodeReportParams {
  file: string;
  node: string;
}

export type NodeReportCoverage = {
  a: string;
  b: string;
  diff: string;
  report: string;
};

export type FileReportsResponse = { [key: string]: NodeReportCoverage };
export type NodeReportResponse = NodeReportCoverage;

export type AllReportsReponse = {
  files: string[];
};
