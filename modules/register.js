import * as keyNames from "./key_names.js";

class Register {
  negative = false;
  str = "";

  appendCharacter(char, maxCharacters = 15) {
    if (this.str.length >= maxCharacters) {
      return;
    }
    
    const charIsDigit = keyNames.digits.includes(char);
    const charIsDecimal = char === ".";
    const strHasDecimal = this.str.includes(".");

    if (charIsDigit || (charIsDecimal && !strHasDecimal)) {
      this.str += char;
    }
  }
}

export { Register };
