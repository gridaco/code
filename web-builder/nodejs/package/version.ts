import * as semver from "semver";
import * as assert from "assert";

export type TVersion = string | "latest";

/**
 * A simple version instance with semver validation.
 */
export class Version {
  readonly version: TVersion;
  constructor(version: string) {
    /**
     * validate if givven version is in a valid semver format. if null is returned, than it aint' valid.
     * learn more at https://github.com/npm/node-semver
     */
    assert(semver.valid(version));
  }
}
