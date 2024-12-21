class Display {
  constructor(element) {
    this.element = element;
  }

  showRegister(register, sigFigs = 0) {
    this.element.textContent = register.getDisplayStr(sigFigs);
  }
}

export { Display };
