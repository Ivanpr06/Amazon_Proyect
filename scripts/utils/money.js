export function moneyCentsToDollars(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}