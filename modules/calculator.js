import * as calculatorStates from "./calculator_states.js";
import { Display } from "./display.js";
import { Register } from "./register.js";

class Calculator {
  firstRegister = new Register();
  secondRegister = new Register();
  operator = "";
  state = calculatorStates.firstRegisterFocused;

  constructor(buttonContainerElement, displayElement) {
    this.buttonContainerElement = buttonContainerElement;
    this.display = new Display(displayElement);
  }


  firstRegisterFocusedHandler(key) {
    if (keyNames.digits.includes(key) || key === ".") {
      this.firstRegister.appendCharacter(key);
    }
    else if (keyNames.operators.includes(key)) {
      this.operator = key;
      this.state = calculatorStates.operatorPressed;
    }
    else if (key === "~") {
      this.firstRegister.toggleSign();
    }
    else if (key === "Backspace") {
      this.firstRegister.popCharacter();
    }
  }

  operatorPressedHandler(key) {
    if (keyNames.digits.includes(key) || key === ".") {
      this.secondRegister.appendCharacter(key);
      this.state = calculatorStates.secondRegisterFocused;
    }
    else if (keyNames.operators.includes(key)) {
      this.operator = key;
    }
    else if (key === "~") {
      this.secondRegister.toggleSign();
      this.state = calculatorStates.secondRegisterFocused;
    }
  }
  updateDisplay() {
    switch (this.state) {
      case calculatorStates.firstRegisterFocused:
        this.display.showRegister(this.firstRegister);
        break;
      case calculatorStates.operatorPressed:
        this.display.showRegister(this.firstRegister);
        break;
      case calculatorStates.secondRegisterFocused:
        this.display.showRegister(this.secondRegister);
        break;
      case calculatorStates.equalPressed:
        this.display.showRegister(this.firstRegister);
        break;
    }
  }
}

export { Calculator };
