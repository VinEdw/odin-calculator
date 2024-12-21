import * as keyNames from "./key_names.js";
import * as calculatorStates from "./calculator_states.js";
import { Display } from "./display.js";
import { ButtonContainer } from "./button_container.js";
import { Register } from "./register.js";
import { operate } from "./operate.js";

class Calculator {
  firstRegister = new Register();
  secondRegister = new Register();
  state = calculatorStates.firstRegisterFocused;

  constructor(buttonContainerElement, displayElement) {
    this.buttonContainer = new ButtonContainer(buttonContainerElement);
    this.display = new Display(displayElement);
    this.updateEnabledButtons();
    this.setOperator("");
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
    this.updateEnabledButtons();
  }

  firstRegisterFocusedHandler(key) {
    if (keyNames.digits.includes(key) || key === ".") {
      this.firstRegister.appendCharacter(key);
    }
    else if (keyNames.operators.includes(key)) {
      this.setOperator(key);
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
      this.setOperator(key);
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
      this.setOperator(key);
      this.state = calculatorStates.operatorPressed;
    }
    else if (key === "=") {
      this.performCalculation();
      this.setOperator("");
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
      this.setOperator(key);
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

  updateEnabledButtons() {
    this.buttonContainer.enableAllButtons();

    switch (this.state) {
      case calculatorStates.firstRegisterFocused:
        this.buttonContainer.disableButton("=");
        break;
      case calculatorStates.operatorPressed:
        this.buttonContainer.disableButton("=");
        this.buttonContainer.disableButton("Backspace");
        break;
      case calculatorStates.secondRegisterFocused:
        break;
      case calculatorStates.equalPressed:
        this.buttonContainer.disableButton("=");
        this.buttonContainer.disableButton("Backspace");
        break;
    }
  }

  setOperator(operator) {
    this.operator = operator;
    this.buttonContainer.deselectAllButtons();
    this.buttonContainer.selectButton(operator);
  }

  reset() {
    this.firstRegister.reset();
    this.secondRegister.reset();
    this.setOperator("");
    this.state = calculatorStates.firstRegisterFocused;
    this.updateDisplay();
    this.updateEnabledButtons();
  }
}

export { Calculator };
