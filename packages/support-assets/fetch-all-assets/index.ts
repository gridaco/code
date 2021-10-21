import {
  BaseImageRepositories,
  ImageRepository,
} from "@design-sdk/core/assets-repository";

/**
 *
 */
export async function fetch_all_assets(
  asset_repository: BaseImageRepositories<string>
) {
  try {
    let fetches: { [key: string]: Promise<string> | string } = {};
    let should_fetcg_keys = [];
    Object.keys(asset_repository.repositories).map((k) => {
      const repo: ImageRepository = asset_repository.repositories[k];
      Object.keys(repo.images).forEach((ik) => {
        const i = repo.images[ik];
        i.hash && (fetches[i.hash] = asset_repository._fetchDataByHash(i.hash));
        i.key && should_fetcg_keys.push(i.key);
      });
    });

    fetches = {
      ...fetches,
      ...(should_fetcg_keys &&
        (await asset_repository.fetchAll(...should_fetcg_keys))),
    };

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
