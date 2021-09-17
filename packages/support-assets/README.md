# Assets

## Why assetes are technically special internally?

> Assets are not usually fully fetched while the code being generated. this full fetching process not only takes networking / extracting time, but also charges lots of memory + hosting storage.

### 1. Build first, fill it up later.

**with special string keys**

1. build with preview dummy,
2. asyncronously fetch assets, replace the url strings, update code seamlessly.

**with after tokenization**

1. detect & tokenize
2. fetch required assets
3. build with all assets ready to use

### 2. re-build whole after assets are fully fetched.

1. build for user preview with dummy url,
2. rebuild whole with asset repository provided when final export. (and when executing)

### 3. ignore performance, fetch first, build once.

1. fetch all required images beforehand,
2. build with all assets available.

This can't be working since we don't know which node will be converted as a asset (before detection, we can't know.)

this is only valid withoyt extra asset detection, using only pre-defined pure image assets.

## Related

- `@design-sdk/core/assets-repository`
