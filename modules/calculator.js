import * as keyNames from "./key_names.js";
import * as calculatorStates from "./calculator_states.js";
import { Display } from "./display.js";
import { Register } from "./register.js";
import { operate } from "./operate.js";

class Calculator {
  firstRegister = new Register();
  secondRegister = new Register();
  operator = "";
  state = calculatorStates.firstRegisterFocused;

  constructor(buttonContainerElement, displayElement) {
    this.buttonContainerElement = buttonContainerElement;
    this.display = new Display(displayElement);
  }

  handleInput(key) {
    if (key === "Delete") {
      this.reset();
      return;
    }

    switch (this.state) {
      case calculatorStates.firstRegisterFocused:
        this.firstRegisterFocusedHandler(key);
        break;
      case calculatorStates.operatorPressed:
        this.operatorPressedHandler(key);
        break;
      case calculatorStates.secondRegisterFocused:
        this.secondRegisterFocusedHandler(key);
        break;
      case calculatorStates.equalPressed:
        this.equalPressedHandler(key);
        break;
    }

    this.updateDisplay();
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

  secondRegisterFocusedHandler(key) {
    if (keyNames.digits.includes(key) || key === ".") {
      this.secondRegister.appendCharacter(key);
    }
    else if (keyNames.operators.includes(key)) {
      this.performCalculation();
      this.operator = key;
      this.state = calculatorStates.operatorPressed;
    }
    else if (key === "=") {
      this.performCalculation();
      this.operator = "";
      this.state = calculatorStates.equalPressed;
    }
    else if (key === "~") {
      this.secondRegister.toggleSign();
    }
    else if (key === "Backspace") {
      this.secondRegister.popCharacter();
    }
  }

  equalPressedHandler(key) {
    if (keyNames.digits.includes(key) || key === ".") {
      this.firstRegister.reset();
      this.firstRegister.appendCharacter(key);
      this.state = calculatorStates.firstRegisterFocused;
    }
    else if (keyNames.operators.includes(key)) {
      this.operator = key;
      this.state = calculatorStates.operatorPressed;
    }
    else if (key === "~") {
      this.firstRegister.toggleSign();
    }
  }

  performCalculation() {
    let result = operate(this.operator, this.firstRegister.getValue(), this.secondRegister.getValue());
    this.firstRegister.setValue(result);
    this.secondRegister.reset();
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

  getAllButtons() {
    return this.buttonContainerElement.querySelectorAll("button");
  }

  getButton(key) {
    const buttons = this.getAllButtons();
    for (const button of buttons) {
      if (key === button.dataset.key) {
        return button;
      }
    }
    return null;
  }

  enableAllButtons() {
    const buttons = this.getAllButtons();
    for (const button of buttons) {
      button.disabled = false;
    }
  }

  disableButton(key) {
    const button = this.getButton(key);
    if (button) {
      button.disabled = true;
    }
  }

  reset() {
    this.firstRegister.reset();
    this.secondRegister.reset();
    this.operator = "";
    this.state = calculatorStates.firstRegisterFocused;
    this.updateDisplay();
  }
}

export { Calculator };
