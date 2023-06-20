export function pad(str, n = 80) {
  return str.length > n ? str.substring(0, n) : str.padEnd(n);
}
