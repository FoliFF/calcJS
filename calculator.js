class Calculator{
  constructor(previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if(this.currentOperand === '') return;
    if(this.previousOperand !== ''){
      this.operate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  operate() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(current)) return;
    switch(this.operation){
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decmalDigits = stringNumber.split('.')[1];
    let intergerDisplay;
    if(isNaN(integerDigits)) {
      intergerDisplay = '';
    } else {
      intergerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
    }
    if(decmalDigits != null) {
      return `${intergerDisplay}.${decmalDigits}`;
    } else {
      return intergerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if(this.operation != null) {
      this.previousOperandTextElement.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else{
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay();
  })
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
});

equalsButton.addEventListener('click', button => {
  calculator.operate();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});

// Add event listeners for keydown events
document.addEventListener('keydown', event => {
  if (event.key >= 0 && event.key <= 9) {
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  } else if (event.key === '.') {
    calculator.appendNumber('.');
    calculator.updateDisplay();
  } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
    calculator.chooseOperation(event.key);
    calculator.updateDisplay();
  } else if (event.key === 'Enter' || event.key === '=') {
    calculator.operate();
    calculator.updateDisplay();
  } else if (event.key === 'Backspace') {
    calculator.delete();
    calculator.updateDisplay();
  } else if (event.key === 'Escape') {
    calculator.clear();
    calculator.updateDisplay();
  }
});