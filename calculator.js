// All declarations and functions are hoisted to the top of the scope.
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

let previousOperand = '';
let currentOperand = '';
let operation = undefined;

function addNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return; // Prevents multiple decimal points in a single number

  // If the current operand is empty and the number is a decimal point, display "0." instead of "."
  if (currentOperand === '' && number === '.') { 
    currentOperand = '0.';
  } 
  // If the current operand is 0 and the number is not a decimal point. Replace the leading zero with the new number if it's not a decimal point.
  else if (currentOperand === '0' && number !== '.') { 
    currentOperand = number;
  } else {
    currentOperand = currentOperand + number;
  }
}

function operate() {
  let result = 0;
  // Convert the operands to numbers
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (previousOperand === '' || currentOperand === '') return; // Prevents the operation from being performed if there is no previous or current operand

  if (operation === '÷' && curr === 0) { //The entire if statement is for when the user tries to divide by zero
    currentOperand = 'To ∞ and beyond! - Error -'; 
    operation = undefined;
    previousOperand = '';
    return;
  }

  switch (operation) { // Perform the operation based on the operation selected
    case '+': 
      result = prev + curr; 
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '÷':
      result = prev / curr;
      break;
    default:
      return; // Prevents the operation from being performed if the operation is not defined
  }
  currentOperand = result; 
  operation = undefined; 
  previousOperand = ''; 
}

function chooseOperation(selectedOperation) { 
  if (currentOperand === '') return; // Prevents the operation from being selected if there is no current operand
  if (previousOperand !== '') { // If there is a previous operand, perform the operation
    operate(); 
  }
  operation = selectedOperation;
  previousOperand = currentOperand;
  currentOperand = '';
}

function deleteNum() { 
  currentOperand = currentOperand.slice(0, -1); // Remove the last character from the current operand
}

function clear() {
  currentOperand = '';
  previousOperand = '';
  operation = undefined;
}

function updateDisplay() {
  currentOperandTextElement.innerText = currentOperand; // Display the current operand
  if (operation != null) { // Display the previous operand and the operation if the operation is defined
    previousOperandTextElement.innerText = `${previousOperand} ${operation}`;
  } else { 
    previousOperandTextElement.innerText = '';
  }
}

// Add event listeners using a helper function
function handleButtonClick(button, callback) { // The callback function is the function that will be called when the button is clicked
  button.addEventListener('click', () => {
    callback();
    updateDisplay(); // Update the display after the callback function is called
  });
}

// Add event listeners for number buttons
numberButtons.forEach(button => {
  handleButtonClick(button, () => {
    addNumber(button.innerText);
  });
});

// Add event listener for operation buttons
operationButtons.forEach(button => {
  handleButtonClick(button, () => {
    chooseOperation(button.innerText);
  });
});

// Add event listeners for delete and clear buttons
handleButtonClick(deleteButton, deleteNum);
handleButtonClick(allClearButton, clear);

// Add event listener for equals button
handleButtonClick(equalsButton, operate);

// Keyboard support
document.addEventListener('keydown', event => { 
  if (event.key >= 0 && event.key <= 9) {
    addNumber(event.key);
    updateDisplay();
  } else if (event.key === '.') {
    addNumber('.');
    updateDisplay();
  } else if (event.key === '+' || event.key === '-' || event.key === '*') {
    chooseOperation(event.key);
    updateDisplay();
  } else if (event.key === '/') { 
    // Set operation to '÷' if the key pressed is '/', thus it will also display '÷' instead of '/' on the caculator
    chooseOperation('÷'); 
    updateDisplay();
  } else if (event.key === 'Enter' || event.key === 'Equals') {
    event.preventDefault(); // Prevent form submission
    operate();
    updateDisplay();
  } else if (event.key === 'Backspace' || event.key === 'Delete') {
    deleteNum();
    updateDisplay();
  } else if (event.key === 'Escape') {
    clear();
    updateDisplay();
  }
});