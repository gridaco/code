import { spawnSync, SpawnSyncOptions } from "child_process";
import { prompt } from "enquirer";
import path from "path";

export async function init_base_project_with_template(
  cwd = process.cwd(),
  { create_cwd_if_not_exists }: { create_cwd_if_not_exists: (cwd) => void }
): Promise<
  | "exit"
  | {
      created: true;
      name: string;
      cwd: string;
    }
> {
  const _ = await prompt({
    name: "template",
    message: "Select template for new app",
    type: "select",
    choices: [
      { name: "flutter", message: "flutter", hint: "flutter crate" },
      { name: "cra", message: "React CRA", hint: "npx craete-react-app" },
      {
        name: "next.js",
        message: "NextJS Typescript",
        hint: "npx create-next-app --typescript",
      },
      { name: "cancel" },
    ],
  });

  const template: string = _["template"];
  if (template === "cancel") {
    console.log("Please run `grida init` again after creating a project.");
    return "exit";
  }

  const { name } = await prompt<{ name: string }>({
    name: "name",
    message: "What is the name of your project?",
    initial: "project",
    type: "input",
  });

  // TODO: check if binary is installed first.

  create_cwd_if_not_exists(cwd);
  const __spawan_cfg: SpawnSyncOptions = { stdio: "inherit", cwd };
  switch (template) {
    case "flutter": {
      await spawnSync("flutter", ["create", name], __spawan_cfg);
      return { created: true, cwd: path.join(cwd, name), name };
    }
    case "next.js": {
      await spawnSync(
        "npx",
        ["create-next-app", name, "--typescript"],
        __spawan_cfg
      );
      return { created: true, cwd: path.join(cwd, name), name };
    }
    case "cra": {
      await spawnSync(
        "npx",
        ["create-react-app", name, "--template", "typescript"],
        __spawan_cfg
      );
      return { created: true, cwd: path.join(cwd, name), name };
    }
    default:
      throw new Error(`Unknown template: ${template}`);
  }
  //
}
