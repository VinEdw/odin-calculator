import * as keyNames from "./key_names.js";

function countSigFigs(valueStr) {
  // Select the numeric part of the value string before the 'e'
  // Remove any +/- symbols
  // Remove any leading zeros
  const numericPart = valueStr.toLowerCase()
    .replaceAll(/[+-]/g, "")
    .split("e")[0]
    .replace(/^0+/, "");

  let sigFigCount = 0;

  if (numericPart.includes(".")) {
    // If the numeric part includes a decimal, split at the decimal point
    let [preDecimal, postDecimal] = numericPart.split(".");
    // Count all the digits before the decimal as significant
    sigFigCount += preDecimal.length;
    if (preDecimal) {
      // If there are sig figs before the decimal, then all digits after the decimal are significant
      sigFigCount += postDecimal.length;
    }
    else {
      // If there are no sig figs before the decimal, then all digits after any leading zeros are significant
      sigFigCount += postDecimal.replace(/^0+/, "").length;
    }
  }
  else {
    // Count any digits remaining after removing trailing zeroes
    sigFigCount += numericPart.replace(/0+$/, "").length;
  }

  return sigFigCount;
}

class Register {
  negative = false;
  str = "";

  getValue() {
    let val = +this.str;
    return this.negative ? -val : val;
  }

  setValue(value) {
    let numStr = value.toString();
    if (numStr.startsWith("-")) {
      numStr = numStr.slice(1);
      this.negative = true;
    }
    else {
      this.negative = false;
    }
    this.str = numStr;
  }

  appendCharacter(char, maxSigFigs = 9) {
    let sigFigs = countSigFigs(this.str);
    if (sigFigs >= maxSigFigs) {
      return;
    }
    
    const charIsDigit = keyNames.digits.includes(char);
    const charIsDecimal = char === ".";
    const strHasDecimal = this.str.includes(".");

    if (charIsDigit || (charIsDecimal && !strHasDecimal)) {
      this.str += char;
    }
  }

  popCharacter() {
    if (!this.str.length) {
      return null;
    }

    let char = this.str.at(-1);
    this.str = this.str.slice(0, -1);
    return char;
  }

  toggleSign() {
    this.negative = !this.negative;
  }

  getDisplayStr() {
    let displayStr = this.str || "0";
    if (this.negative) {
      displayStr = "-" + displayStr;
    }
    return displayStr;
  }

  reset() {
    this.str = "";
    this.negative = false;
  }
}

export { Register };
