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
    return "Does not compute";
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
  let result;
  if (storedValue !== null) {
    result = operate(selectedOperator, storedValue, currentValue);
    displayValue = result.toString();
  } else {
    result = currentValue;
  }
  storedValue = result;
  selectedOperator = null;
  updateDisplay();
}

function handleDecimalClick(event) {
  const decimal = event.target.value;
  // Only add a decimal point if there isn't one already
  if (!displayValue.includes(decimal)) {
    displayValue += decimal;
    // Disable the decimal button if there's already a decimal point
    const decimalButton = document.querySelector('.number[value="."]');
    if (displayValue.includes(decimal)) {
      decimalButton.disabled = true;
    }
  }
  updateDisplay();
}

function handleBackspaceClick() {
  displayValue = displayValue.slice(0, -1);
  if (displayValue === "") {
    displayValue = "0";
  }
  updateDisplay();
}

function handleKeyDown(event) {
  const key = event.key;
  switch (key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      const numberButton = document.querySelector(`.number[value="${key}"]`);
      numberButton.click();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      const operatorButton = document.querySelector(`.operator[value="${key}"]`);
      operatorButton.click();
      break;
    case ".":
      const decimalButton = document.querySelector('.number[value="."]');
      decimalButton.click();
      break;
    case "Backspace":
      const backButton = document.querySelector(".backspace");
      backButton.click();
      break;
    case "Enter":
      const equalsButton = document.querySelector(".equals");
      equalsButton.click();
      break;
    case "Escape":
      clearDisplay();
      break;
    default:
      break;
  }
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

const backButton = document.querySelector(".backspace");
backButton.addEventListener("click", handleBackspaceClick);