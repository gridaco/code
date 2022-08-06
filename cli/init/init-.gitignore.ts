//
// add .env & .grida to .gitignore (if not already added)
//

import fs from "fs";
import path from "path";

type TemplateData =
  | {
      init_with_template: false;
    }
  | {
      init_with_template: true;
      init_template_id: string;
      init_template_url: string;
    };
type GitignoreInitResult = {
  file_created: boolean;
  file_modified: boolean;
  added_dotenv: boolean;
  added_dotgrida: boolean;
} & TemplateData;

/**
 * inits .gitignore file with .env and .grida
 *
 * if the .gitignore file exists, it will be checked for .env and .grida
 * if .env and .grida are not found, they will be added
 *
 * if the .gitignore file does not exist, it will be created and .env and .grida will be added
 *
 * the each ignore lines added by grida will have the form:
 * ```
 * # grida
 * .env
 * .grida
 * ```
 *
 * So the following output can be..
 *
 * 1. file newly created.
 * ```
 * <.gitignore template>
 * # grida
 * .env
 * .grida
 * ```
 *
 * 2. file already exists, both .env and .grida does not exist.
 * ```
 * <existing .gitignore contents>
 * # grida
 * .env
 * .grida
 * ```
 *
 * 3. file already exists, .env exists, .grida does not exist.
 * ```
 * <existing .gitignore contents>
 * # grida
 * .grida
 * ```
 *
 * 4. file already exists, .env does not exist, .grida exists.
 * ```
 * <existing .gitignore contents>
 * # grida
 * .env
 * ```
 *
 * 5. file already exists, .env and .grida exist. -> skip, do nothing. (don't even log the result.)
 *
 */
export async function init_gitignore(
  cwd = process.cwd(),
  options?: { template?: "node" | "dart" | "react-native" }
): Promise<GitignoreInitResult> {
  const grida_comment = "# grida";
  const gitignorepath = path.join(cwd, ".gitignore");
  if (fs.existsSync(gitignorepath)) {
    const patterns = fs
      .readFileSync(gitignorepath, "utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter((l) => !l.startsWith("#"));

    const should_add = [];

    if (!patterns.includes(".env")) {
      should_add.push(".env");
    }

    if (!patterns.includes(".grida")) {
      should_add.push(".grida");
    }

    if (should_add.length > 0) {
      fs.appendFileSync(
        gitignorepath,
        `\n${grida_comment}\n${should_add.join("\n")}`
      );
      return {
        added_dotenv: should_add.includes(".env"),
        added_dotgrida: should_add.includes(".grida"),
        init_with_template: false,
        file_created: false,
        file_modified: true,
      };
    }

    return {
      added_dotenv: false,
      added_dotgrida: false,
      init_with_template: false,
      file_created: false,
      file_modified: false,
    };
  } else {
    let template_data: TemplateData = {
      init_with_template: false,
    };

    if (options?.template) {
      const url = _gitignore_teplates[options.template];
      const content = await (await fetch(url)).text();
      fs.writeFileSync(gitignorepath, content);

      template_data = {
        init_with_template: true,
        init_template_id: options.template,
        init_template_url: url,
      };
    }
    fs.writeFileSync(gitignorepath, `${grida_comment}\n.env\n.grida\n`);

    return {
      added_dotenv: true,
      added_dotgrida: true,
      file_created: true,
      file_modified: true,
      ...template_data,
    };
  }
}

const _gitignore_teplates = {
  node: "https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore",
  dart: "https://raw.githubusercontent.com/github/gitignore/main/Dart.gitignore",
  "react-native":
    "https://raw.githubusercontent.com/expo/create-react-native-app/main/template/gitignore",
} as const;
