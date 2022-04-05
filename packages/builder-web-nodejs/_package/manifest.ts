///
/// Consider this to refactor with coli inherit object
///

import { TVersion } from "./version";
import { SingleDependency, Dependencies } from "./dependency";

export interface IPackageManifest {
  name: string;
  version: string;
}

/**
 * A simple minified version of package.json builder.
 */
export class PackageManifest implements IPackageManifest {
  readonly name: string;
  readonly description: string;
  readonly version: TVersion;
  main: string;
  dependencies: Dependencies = {};
  devDependencies: Dependencies = {};

  constructor(params: {
    name: string;
    description?: string;
    version?: TVersion;
    main?: string;
    dependencies?: Dependencies;
    devDependencies?: Dependencies;
  }) {
    this.name = params.name;
    this.description = params.description;
    this.version = params.version;
    this.main = params.main;
    this.dependencies = params.dependencies;
    this.devDependencies = params.devDependencies;
  }

  /**
   * set the `main` property of package.json
   * @param main
   */
  setMain(main: string): this {
    this.main = main;
    return this;
  }

  /**
   * add new single dependency to existing one.
   * @param dependency
   * @returns
   */
  addDependency(dependency: SingleDependency): this {
    const exsisting = this.dependencies[dependency.name];
    if (exsisting) {
      throw `can not add already exsiting dependency "${dependency.name}" with version "${dependency.version}"`;
    } else {
      // add to dependency tree
      this.dependencies[dependency.name] = dependency.version;
    }
    return this;
  }

  addDevDependency(dDependency: SingleDependency): this {
    // no confliction checking for dev deps (will add later if required. not a big a deal)
    this.devDependencies[dDependency.name] = dDependency.version;
    return this;
  }

  stringfy(): string {
    return JSON.stringify(this, null, 2);
  }
}
