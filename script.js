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

const validKeys = [
  ".",
  "=",
  "~",
  "Backspace",
  "Delete",
];
validKeys.push(...digits);
validKeys.push(...operators);
