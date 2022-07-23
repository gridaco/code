export function debug(...messages) {
  if (process.env.NODE_ENV === "development") {
    console.log(...messages);
  }
}

export function debugIf(condition: boolean | (() => boolean), ...messages) {
  const _continue = typeof condition === "function" ? condition() : condition;
  if (_continue) {
    debug(...messages);
  }
}
