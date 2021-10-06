export function rotation(r?: number): string {
  const formatToRound = Math.round(r);
  const formatToRotate = `rotate(${formatToRound}reg)`;
  return formatToRotate;
}
