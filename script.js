import * as keyNames from "./modules/key_names.js";
import { Calculator } from "./modules/calculator.js";

const buttonContainerElement = document.querySelector("#calculator-buttons");
const displayElement = document.querySelector("#calculator-display");
const calculator = new Calculator(buttonContainerElement, displayElement);

buttonContainerElement.addEventListener("click", (e) => {
  const el = e.target;
  if (el.localName === "button") {
    calculator.handleInput(el.dataset.key);
  }
});
