import * as calculatorStates from "./calculator_states.js";
import { Register } from "./register.js";

class Calculator {
  firstRegister = new Register();
  secondRegister = new Register();
  operator = "";
  state = calculatorStates.firstRegisterFocused;
}

export { Calculator };
