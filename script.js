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

document.addEventListener("keydown", (e) => {
  if (keyNames.all.includes(e.key)) {
    // Prevent the Quick Find shortcut from activating in Firefox
    if (e.key === "/") {
      e.preventDefault();
    }
    calculator.handleInput(e.key);
  }
  else if (e.key === "Enter") {
    // Treat Enter as an equal sign
    // Prevent Enter from activating the last pressed button
    e.preventDefault();
    calculator.handleInput("=");
  }
});
