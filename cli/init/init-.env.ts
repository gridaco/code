import path from "path";
import fs from "fs";

type GRIDA_DOT_ENV_MANAGED_KEY = "FIGMA_PERSONAL_ACCESS_TOKEN";

interface AddDotEnvResult {
  added: boolean;
  key: string;
  value: string;
  filecreated: boolean;
  overwrite: boolean;
}

/**
 * @param cwd
 * @param key
 * @param value
 * @param allowOverwrite - use with caution .env file is not on git track, so modifications by grida cli won't be visible to user. this can be very dangerous.
 * @returns
 */
export function addDotEnv(
  cwd = process.cwd(),
  key: GRIDA_DOT_ENV_MANAGED_KEY,
  value: string,
  allowOverwrite: boolean = false
): AddDotEnvResult {
  let added = false;
  let filecreated = false;
  let overwrite = false;

  const dotenv_file = path.join(cwd, ".env");
  const dotenv_file_exists = fs.existsSync(dotenv_file);
  if (!dotenv_file_exists) {
    fs.writeFileSync(dotenv_file, "");
    filecreated = true;
  }

  const dotenv_content = fs.readFileSync(dotenv_file, "utf8");
  const dotenv_lines = dotenv_content.split("\n");
  const keys = dotenv_lines.map((l) => l.split("=")[0].trim());
  const linetoadd = `${key}=${value}`;
  if (keys.some((k) => k === key)) {
    // key already exists
    if (allowOverwrite) {
      // overwrite
      // replace line with regex
      const regex = new RegExp(`^${key}=.*$`);
      dotenv_content.replace(regex, linetoadd);

      fs.writeFileSync(dotenv_file, dotenv_content);

      overwrite = true;
      added = true;
    }
  } else {
    fs.appendFileSync(
      dotenv_file,
      `
# Added by grida CLI
${linetoadd}
`
    );
    added = true;
  }

  return {
    added: true,
    key: key,
    value: value,
    filecreated,
    overwrite,
  };
}
