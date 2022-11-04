import {
  BaseImageRepositories,
  ImageRepository,
} from "@design-sdk/asset-repository";

/**
 *
 */
export async function fetch_all_assets(
  asset_repository: BaseImageRepositories<string>
) {
  let fetches: { [key: string]: Promise<string> | string } = {};
  let should_fetch_keys = [];
  Object.keys(asset_repository.mergeAll()).map((k) => {
    const i = asset_repository.find(k);

    if (i.hash) {
      fetches[i.hash] = asset_repository._fetchDataByHash(i.hash);
    }

    if (i.key) {
      should_fetch_keys.push(i.key);
    }
  });

  const fetched = {};

  try {
    fetches = {
      ...fetches,
      ...(should_fetch_keys.length > 0 &&
        (await asset_repository.fetchAll(...should_fetch_keys))),
    };

    const keys = Object.keys(fetches);
    (await Promise.all(Object.values(fetches))).map((v, i, a) => {
      const k = keys[i];
      fetched[k] = v;
      // cache.set(k, v);
    });
    return fetched;
  } catch (_) {
    // mostly 429 too many request
    // this can happen when loading image as non-dump but individial promise maps.
    const keys = Object.keys(fetches);
    for (const k of keys) {
      fetched[k] = null;
    }
    return fetched;
  }
}
