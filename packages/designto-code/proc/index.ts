import { repo_assets } from "@design-sdk/core";

export abstract class BuildProcess {
  readonly id: string;
  readonly processes: Array<BuildProcess> = [];
  imageAssetRepository: repo_assets.ImageRepository;

  constructor() {
    this.id = Date.now().toString();
  }

  registerProcess(process: BuildProcess) {
    this.processes.push(process);
  }
}
