const calculationDisplay = document.getElementById('calculation');
const resultDisplay = document.getElementById('result');

let currentInput = '';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;

function appendNumber(number) {
  if (shouldResetDisplay) {
    currentInput = ''
    shouldResetDisplay = false;
  }
  if (number === '.' && currentInput.includes('.')) return;
  currentInput += number;
  updateResultDisplay(currentInput);
}

function chooseOperator(selectedOperator) {
  if (currentInput === '' && previousInput === '') return;

  if (previousInput !== '' && operator !== '') {
    currentInput = evaluateExpression(previousInput, operator, currentInput);
    updateResultDisplay(currentInput);
  }

  operator = selectedOperator;
  previousInput = currentInput;
  currentInput = '';
  updateCalculationDisplay(`${previousInput} ${operator}`);
}

function updateCalculationDisplay(value) {
  calculationDisplay.innerText = value;
}

function updateResultDisplay(value) {
  resultDisplay.innerText = value;
}

function calculate() {
  if (currentInput === '' || previousInput === '' || operator === '') return;

  currentInput = evaluateExpression(previousInput, operator, currentInput);
  updateResultDisplay(currentInput);
  updateCalculationDisplay(`${previousInput} ${operator} ${currentInput}`);

  previousInput = currentInput;
  operator = '';
  shouldResetDisplay = true;
}

function clearCalculator() {
  currentInput = '';
  previousInput = '';
  operator = '';
  updateCalculationDisplay('0');
  updateResultDisplay('0');
}

function evaluateExpression(a, operator, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case '+':
      return (a + b).toString();
    case '-':
      return (a - b).toString();
    case 'x':
      return (a * b).toString();
    case '/':
      return (a / b).toString();
    default:
      return b.toString();
  }
}

document.querySelectorAll('.calc-btn').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const buttonText = button.textContent.trim();

    if (!action) {
      appendNumber(buttonText);
    } else if (action === 'clear') {
      clearCalculator();
    } else if (action === 'equal') {
      calculate();
    } else {
      chooseOperator(buttonText);
    }
  });
});
