/**
 * Regex for name, accepts compound names, accents, leading capitals only
 */
const PATTERN_NAME =
  '([A-Z]{1})?[a-zÜ-ü]{2,24}([ -]{1}([A-Z]{1})?[a-zÜ-ü]{1,24})?';

export default PATTERN_NAME;
