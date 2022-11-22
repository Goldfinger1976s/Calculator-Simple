//grab the buttons
const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const clearBtn = document.querySelector("[data-clear]");
const display = document.querySelector(".calculator-display");

// Set values
let displayValue = "0";
let firstOperand = "";
let secondOperand = "";
let firstOperator = "";
let secondOperator = "";
let result;

//updateDisplay
function updateDisplay() {
  display.innerHTML = displayValue;
  if (displayValue.length > 9) {
    display.innerHTML = displayValue.substring(0, 9);
  }
}

updateDisplay();

function clearDisplay() {
  displayValue = "0";
  firstNum = "";
  secondNum = "";
  firstOperator = "";
  secondOperator = "";
  result = "";
}

// Clear Display
clearBtn.addEventListener("click", () => {
  clearDisplay();
  updateDisplay();
});

// Equals click
equalsBtn.addEventListener("click", () => {
  //console.log("equals")
  evaluate();
  updateDisplay();
});

//Get Operands
numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    inputOperand(btn.innerHTML);
    console.log(btn.textContent);
    updateDisplay();
  });
});

// Get Operators
operationBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    inputOperator(btn.innerHTML);
    console.log(btn.textContent);
    updateDisplay();
  });
});

function inputOperand(operand) {
  if (firstOperator === "") {
    if (displayValue === "0" || displayValue === 0) {
      //1st click - handles first operand input
      displayValue = operand;
    } else if (displayValue === firstOperand) {
      //starts new operation after inputEquals()
      displayValue = operand;
    } else {
      displayValue += operand;
    }
  } else {
    //3rd/5th click - inputs to secondOperand
    if (displayValue === firstOperand) {
      displayValue = operand;
    } else {
      displayValue += operand;
    }
  }
}

function inputOperator(operator) {
  if (firstOperator != "" && secondOperator === "") {
    //4th click - handles input of second operator
    secondOperator = operator;
    secondOperand = displayValue;
    result = operate(
      Number(firstOperand),
      Number(secondOperand),
      firstOperator
    );
    displayValue = roundAccurately(result, 15).toString();
    firstOperand = displayValue;
    result = "";
  } else if (firstOperator != "" && secondOperator != "") {
    //6th click - new secondOperator
    secondOperand = displayValue;
    result = operate(
      Number(firstOperand),
      Number(secondOperand),
      secondOperator
    );
    secondOperator = operator;
    displayValue = roundAccurately(result, 15).toString();
    firstOperand = displayValue;
    result = "";
  } else {
    //2nd click - handles first operator input
    firstOperator = operator;
    firstOperand = displayValue;
  }
}

function evaluate() {
  //hitting equals doesn't display undefined before operate()
  if (firstOperator === "") {
    displayValue = displayValue;
  } else if (secondOperator != "") {
    //handles final result
    secondOperand = displayValue;
    result = operate(
      Number(firstOperand),
      Number(secondOperand),
      secondOperator
    );
  } else {
    //handles first operation
    secondOperand = displayValue;
    result = operate(
      Number(firstOperand),
      Number(secondOperand),
      firstOperator
    );
    if (result === "lmao") {
      displayValue = "lmao";
    } else {
      displayValue = roundAccurately(result, 15).toString();
      firstOperand = displayValue;
      secondOperand = "";
      firstOperator = "";
      secondOperator = "";
      result = "";
    }
  }
}

//Compute

function operate(first, second, op) {
  if (op === "+") {
    return first + second;
  }
  if (op === "-") {
    return first - second;
  }
  if (op === "×") {
    return first * second;
  }
  if (op === "÷") {
    return first / second;
  }
}

// console.log(firstNum);
// console.log(secondNum);
// console.log(firstOperator);
// console.log(secondOperator);

function roundAccurately(num, places) {
  return parseFloat(Math.round(num + "e" + places) + "e-" + places);
}
