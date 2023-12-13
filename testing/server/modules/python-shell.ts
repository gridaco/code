import path from "path";
import { PythonShell } from "python-shell";

const _cv_path = path.join(__dirname, "../../cv");
const _cv_python_path = path.join(_cv_path, "venv/bin/python");

export const PYTHON_SHELL_OPTIONS = {
  pythonPath: _cv_python_path,
  scriptPath: _cv_path,
};

export async function run<T = any[]>(exe: string, kwargs: object, ...a: any[]) {
  const proc = await PythonShell.run(exe, {
    ...PYTHON_SHELL_OPTIONS,
    args: args(kwargs, ...a),
  });

  // the stdout is json string
  const stdout = proc[0] as string;
  const result = JSON.parse(stdout) as T;

  return result;
}

/**
 * Transform { "--a": 1, "--b": 2 } to ["--a", 1, "--b", 2]
 * @param p kwargs
 * @param a default args
 * @returns
 */
export const args = (p: object, ...a: any[]) => {
  const res = [];
  for (const k in p) {
    res.push(k);
    res.push(p[k]);
  }

  return [...a, ...res];
};
