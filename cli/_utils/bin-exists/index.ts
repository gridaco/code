import which from "which";

export function binexists(name: string): boolean {
  return which.sync(name, { nothrow: true }) !== null;
}
