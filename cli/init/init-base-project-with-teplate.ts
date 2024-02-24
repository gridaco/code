import { spawnSync, SpawnSyncOptions } from "child_process";
import { prompt } from "enquirer";
import path from "path";
import fs from "fs";
import { binexists } from "../_utils/bin-exists";

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
    return "exit";
  }

  const { name } = await prompt<{ name: string }>({
    name: "name",
    message: "What is the name of your project?",
    initial: "project",
    type: "input",
  });

  if (fs.existsSync(path.join(cwd, name))) {
    throw new Error(
      `Failed to create fresh project. directory with name "${name}" already exists.`
    );
  }

  create_cwd_if_not_exists(cwd);
  // TODO: check if binary is installed first.
  const __spawan_cfg: SpawnSyncOptions = { stdio: "inherit", cwd };
  switch (template) {
    case "flutter": {
      if (binexists("flutter")) {
        await spawnSync("flutter", ["create", name], __spawan_cfg);
        return { created: true, cwd: path.join(cwd, name), name };
      }
      break;
    }
    case "next.js": {
      if (binexists("npx")) {
        await spawnSync(
          "npx",
          ["create-next-app", name, "--typescript"],
          __spawan_cfg
        );
        return { created: true, cwd: path.join(cwd, name), name };
      }
      break;
    }
    case "cra": {
      if (binexists("npx")) {
        await spawnSync(
          "npx",
          ["create-react-app", name, "--template", "typescript"],
          __spawan_cfg
        );
        return { created: true, cwd: path.join(cwd, name), name };
      }
      break;
    }
    default:
      throw new Error(`Unknown template: ${template}`);
  }

  console.log(
    bin_not_found_descriptions[template] ||
      `Grida CLI failed to create project with template ${template}. Please create base project manually and re-run \`grida init\``
  );
  return "exit";
}

const bin_not_found_descriptions = {
  flutter:
    "flutter is not installed cannot create flutter project via `flutter create`",
  cra: "npx is not installed cannot create react project via `npx craete-react-app`",
  "next.js":
    "npx is not installed cannot create nextjs project via `npx create-next-app`",
} as const;
