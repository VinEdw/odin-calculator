import * as calculatorStates from "./calculator_states.js";
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
