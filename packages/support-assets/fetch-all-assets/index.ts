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
    let should_fetch_keys = [];

    Object.keys(asset_repository.mergeAll()).map((k) => {
      const i = asset_repository.find(k);
      i.hash && (fetches[i.hash] = asset_repository._fetchDataByHash(i.hash));
      i.key && should_fetch_keys.push(i.key);
    });

    fetches = {
      ...fetches,
      ...(should_fetch_keys &&
        (await asset_repository.fetchAll(...should_fetch_keys))),
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
