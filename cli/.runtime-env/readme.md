# this directory is for explicit .env for settings `NODE_ENV` for ncc build

Since the ncc does not opt us to set runtime env, so we'll need to load & set the env manually.

```ts
import dotenv from "dotenv";
dotenv.load({
  path: "./.runtime-env/.env",
});
```

## Note for contributors

Is this required?:

Not essential, but some of our modules use logging conditioning based on `NODE_ENV !== "production"` not `NODE_ENV === "development"`.

So in most case, this will not change the core engine's logic behind, this is for disable verbose logging at this point.
