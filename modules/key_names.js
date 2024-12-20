// Set arrays of valid key strings, grouped into categories
const digits = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

const operators = [
  "+",
  "-",
  "*",
  "/",
];

const all = [
  ".",
  "=",
  "~",
  "Backspace",
  "Delete",
];
all.push(...digits);
all.push(...operators);

export { digits, operators, all };
