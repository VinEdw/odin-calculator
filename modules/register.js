import * as keyNames from "./key_names.js";

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
