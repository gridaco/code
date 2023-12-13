import Axios, { AxiosPromise } from "axios";
import {
  NodeReportParams,
  FileReportsParams,
  FileReportsResponse,
  NodeReportResponse,
  AllReportsReponse,
} from "./types";

export interface ClientInterface {
  reports: () => AxiosPromise<AllReportsReponse>;
  file: (params: FileReportsParams) => AxiosPromise<FileReportsResponse>;
  node: (params: NodeReportParams) => AxiosPromise<NodeReportResponse>;
}

export const Client = ({ baseURL }: { baseURL: string }): ClientInterface => {
  const client = Axios.create({
    baseURL,
  });

  return {
    reports: async () => client.get(`/reports`),
    file: async ({ file }: FileReportsParams) => client.get(`/reports/${file}`),
    node: async ({ file, node }: NodeReportParams) =>
      client.get(`/reports/${file}/${node}`),
  };
};
