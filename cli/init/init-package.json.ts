import path from "path";
import { add_dependencies, Dependency } from "../npm";
export async function init_package_json(
  cwd = process.cwd(),
  {
    dependencies,
  }: {
    dependencies?: Dependency[];
  }
) {
  const packagejson = path.join(cwd, "package.json");

  const { manifest, installed, updated } = await add_dependencies(packagejson, {
    dependencies: dependencies ?? [],
    devDependencies: [
      {
        name: "grida",
        version: "latest",
      },
    ],
    type: "write-only",
  });

  if (updated.dependencies?.length > 0) {
    console.log(`
  Added dependencies [${updated.dependencies
    .map((d) => `${d.name}@${d.version}`)
    .join(
      ", "
    )}] to package.json. Run \`npm install\` or \`yarn add\` to resolve.
    `);
  }
}
