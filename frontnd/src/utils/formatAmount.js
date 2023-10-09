/**
 * Transform amount in string easy to read
 * @param { number } amount amount in cents
 * @example
 * // returns $1,618.03
 * formatAmount(161803)
 * @returns { string } amount formatted to display in $ with a comma in the thousand
 */
function formatAmount(amount) {
  let format = amount / 100;

  // Add 0 if the last amount character is 0 to have 2 digits to cents
  if (String(amount).slice(-1) === '0') {
    format = format + '0';
  }

  // locale string to have a comma in the thousand
  return `$${format.toLocaleString()}`;
}

export default formatAmount;
