class Display {
  constructor(element) {
    this.element = element;
  }

  showRegister(register) {
    this.element.textContent = register.getDisplayStr();
  }
}

export { Display };
