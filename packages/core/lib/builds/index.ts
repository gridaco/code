import { ImageRepository } from "@designto.codes/core/lib/assets-repository";

export abstract class BuildProcess {
  readonly id: string;
  readonly processes: Array<BuildProcess> = [];
  imageAssetRepository: ImageRepository;

  constructor() {
    this.id = Date.now().toString();
  }

  registerProcess(process: BuildProcess) {
    this.processes.push(process);
  }
}
