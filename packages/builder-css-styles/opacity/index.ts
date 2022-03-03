export function opacity(o?: number): number {
  const formatToOneDecimal = Math.round(o * 10) / 10;
  return formatToOneDecimal;
}
