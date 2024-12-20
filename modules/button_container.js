class ButtonContainer {
  constructor(element) {
    this.element = element;
  }

  getAllButtons() {
    return this.element.querySelectorAll("button");
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

  deselectAllButtons() {
    const buttons = this.getAllButtons();
    for (const button of buttons) {
      button.classList.remove("selected");
    }
  }

  selectButton(key) {
    const button = this.getButton(key);
    if (button) {
      button.classList.add("selected");
    }
  }

}

export { ButtonContainer };
