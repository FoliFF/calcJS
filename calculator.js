function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: division by zero";
  }
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Error: invalid operator";
  }
}

let displayValue = "0";
let storedValue = null;
let selectedOperator = null;

function updateDisplay() {
  const display = document.querySelector(".calculator-display");
  display.value = displayValue;
}

function clearDisplay() {
  displayValue = "0";
  storedValue = null;
  selectedOperator = null;
  updateDisplay();
}

function handleNumberClick(event) {
  const number = event.target.value;
  if (displayValue === "0") {
    displayValue = number;
  } else {
    displayValue += number;
  }
  updateDisplay();
}

function handleOperatorClick(event) {
  const operator = event.target.value;
  storedValue = parseFloat(displayValue);
  selectedOperator = operator;
  displayValue = "0";
  updateDisplay();
}

function handleEqualsClick() {
  if (selectedOperator === null) {
    return;
  }
  const currentValue = parseFloat(displayValue);
  const result = operate(selectedOperator, storedValue, currentValue);
  if (result !== null && result !== undefined) {
    displayValue = result.toString();
    storedValue = null;
    selectedOperator = null;
    updateDisplay();
  }
}

function handleDecimalClick(event) {
  const decimal = event.target.value;
  if (!displayValue.includes(decimal)) {
    displayValue += decimal;
  }
  updateDisplay();
}

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
  button.addEventListener("click", handleNumberClick);
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", handleOperatorClick);
});

const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", handleEqualsClick);

const decimalButton = document.querySelector('.number[value="."]');
decimalButton.addEventListener("click", handleDecimalClick);

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearDisplay);