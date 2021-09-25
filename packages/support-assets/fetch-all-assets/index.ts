import { BaseImageRepositories } from "@design-sdk/core/assets-repository";

/**
 *
 */
export async function fetch_all_assets(
  asset_repository: BaseImageRepositories<string>
) {
  try {
    const fetches: { [key: string]: Promise<string> | string } = {};
    Object.keys(asset_repository.repositories).map((k) => {
      const repo = asset_repository.repositories[k];
      Object.keys(repo.images).forEach((ik) => {
        const i = repo.images[ik];
        i.hash && (fetches[i.hash] = asset_repository._fetchDataByHash(i.hash));
        i.key && (fetches[i.key] = asset_repository.fetchDataById(i.key));
      });
    });

    const fetched = {};
    const keys = Object.keys(fetches);
    (await Promise.all(Object.values(fetches))).map((v, i, a) => {
      fetched[keys[i]] = v;
    });
    return fetched;
  } catch (_) {
    // mostly 429 too many request
    // this can happen when loading image as non-dump but individial promise maps.
    return {};
  }
}
