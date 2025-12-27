export function moneyCentsToDollars(cents) {
  return `$${(Math.round(cents) / 100).toFixed(2)}`;
}