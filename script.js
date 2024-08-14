"use strict";
// // Elements
const display = document.querySelector("input");
const operatorsContainer = document.querySelector(".operators");
const rowsContainer = document.querySelector(".rows");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const equalBtn = document.querySelector(".equal");
const dayButton = document.querySelector(".day");
const nightButton = document.querySelector(".night");
const allButtons = document.querySelectorAll(".num");
const alloperators = document.querySelectorAll(".operator");
const plusBtn = document.querySelector(".plus");
const minusBtn = document.querySelector(".minus");
const multipleBtn = document.querySelector(".multiple");
const divideBtn = document.querySelector(".divide");
const percentBtn = document.querySelector(".percent");
const floatBtn = document.querySelector(".float");
let test = false;
let calcInfo = {
  num1: "",
  num2: "",
  operation: "",
};
let result = 0;
display.focus();
// Functions
const hasDecimals = function (num) {
  return +num % 1 !== 0;
};
const clearDisplay = function () {
  test = false;
  display.focus();
  // برای اجتناب از تکرار عملگرها به صورت متوالی ++
  display.value = "";
  calcInfo.num1 = "";
  calcInfo.num2 = "";
  calcInfo.operation = "";
};
const updateUI = function () {
  if (calcInfo.num1 && !calcInfo.operation && !calcInfo.num2) {
    display.value = `${numberSeperator(calcInfo.num1)}`;
  }
  if (calcInfo.num1 && calcInfo.operation && !calcInfo.num2) {
    display.value = `${numberSeperator(calcInfo.num1)} ${calcInfo.operation}`;
  }
  if (calcInfo.num1 && calcInfo.operation && calcInfo.num2) {
    display.value = `${numberSeperator(calcInfo.num1)} ${
      calcInfo.operation
    } ${numberSeperator(calcInfo.num2)}`;
  }
  if (!calcInfo.num1 && !calcInfo.operation && !calcInfo.num2) {
    display.value = ``;
  }
};
const calculate = function () {
  display.value = "";
  if (!calcInfo.num1 && !calcInfo.num2 && !calcInfo.operation) return;
  if (calcInfo.num1 && !calcInfo.num2) {
    clearDisplay();
    display.value = "";
  }
  if (calcInfo.num1 && calcInfo.num2 && calcInfo.operation) {
    if (calcInfo.operation === "+") result = +calcInfo.num1 + +calcInfo.num2;
    if (calcInfo.operation === "-") result = +calcInfo.num1 - +calcInfo.num2;
    if (calcInfo.operation === "×") result = +calcInfo.num1 * +calcInfo.num2;
    if (calcInfo.operation === "÷") result = +calcInfo.num1 / +calcInfo.num2;
    if (calcInfo.operation === "%")
      result = (+calcInfo.num1 * +calcInfo.num2) / 100;
  }
  // display.value = `=  ${numberSeperator(result)}`;
  if (hasDecimals(result)) return result.toFixed(4);
  else return result.toFixed(0);
};
const deleteDisplay = function () {
  if (calcInfo.num1 && !calcInfo.operation && !calcInfo.num2) {
    calcInfo.num1 = calcInfo.num1.toString().slice(0, -1);
  }
  if (calcInfo.num1 && calcInfo.operation && !calcInfo.num2) {
    calcInfo.operation = "";
  }
  if (calcInfo.num1 && calcInfo.operation && calcInfo.num2) {
    calcInfo.num2 = calcInfo.num2.toString().slice(0, -1);
  }
  if (!calcInfo.num1 && !calcInfo.operation && !calcInfo.num2) {
  }
  updateUI();
};
const plusFunc = function () {
  if (!calcInfo.num1 && !calcInfo.num2 && !calcInfo.operation) return;
  if (calcInfo.num1 && !calcInfo.num2) {
    calcInfo.operation = "+";
  }
  if (calcInfo.num1 && calcInfo.num2 && calcInfo.operation) {
    calculate();
    calcInfo.num1 = result;
    calcInfo.num2 = "";
    calcInfo.operation = "+";
  }
  updateUI();
};
const minusFunc = function () {
  if (!calcInfo.num1 && !calcInfo.num2 && !calcInfo.operation) return;
  if (calcInfo.num1 && !calcInfo.num2) {
    calcInfo.operation = "-";
  }
  if (calcInfo.num1 && calcInfo.num2 && calcInfo.operation) {
    calculate();
    calcInfo.num1 = result;
    calcInfo.num2 = "";
    calcInfo.operation = "-";
  }
  updateUI();
};
const multipleFunc = function () {
  if (!calcInfo.num1 && !calcInfo.num2 && !calcInfo.operation) return;
  if (calcInfo.num1 && !calcInfo.num2) {
    calcInfo.operation = "×";
  }
  if (calcInfo.num1 && calcInfo.num2 && calcInfo.operation) {
    calculate();
    calcInfo.num1 = result;
    calcInfo.num2 = "";
    calcInfo.operation = "×";
  }
  updateUI();
};

const divideFunc = function () {
  if (!calcInfo.num1 && !calcInfo.num2 && !calcInfo.operation) return;
  if (calcInfo.num1 && !calcInfo.num2) {
    calcInfo.operation = "÷";
  }
  if (calcInfo.num1 && calcInfo.num2 && calcInfo.operation) {
    calculate();
    calcInfo.num1 = result;
    calcInfo.num2 = "";
    calcInfo.operation = "÷";
  }
  updateUI();
};

const percentFunc = function () {
  if (!calcInfo.num1 && !calcInfo.num2 && !calcInfo.operation) return;
  if (calcInfo.num1 && !calcInfo.num2) {
    calcInfo.operation = "%";
  }
  if (calcInfo.num1 && calcInfo.num2 && calcInfo.operation) {
    calculate();
    calcInfo.num1 = result;
    calcInfo.num2 = "";
    calcInfo.operation = "%";
  }
  updateUI();
};
const numberSeperator = function (num) {
  let integerPart = [];
  let decimalPart = [];
  let seperatedArray = [];
  if (hasDecimals(num)) {
    [integerPart, decimalPart] = num.toString().split(".");
    integerPart = integerPart.toString().split("");
  } else {
    integerPart = num.toString().split("");
  }
  for (let i = 0; i < integerPart.length; i++) {
    if ((i + 1) % 3 === 0) {
      seperatedArray.push(integerPart[i]);
      seperatedArray.push(",");
    } else {
      seperatedArray.push(integerPart[i]);
    }
  }
  if (hasDecimals(num)) return seperatedArray.join("") + "." + decimalPart;
  else return seperatedArray.join("");
};
plusBtn.addEventListener("click", plusFunc);
minusBtn.addEventListener("click", minusFunc);
multipleBtn.addEventListener("click", multipleFunc);
divideBtn.addEventListener("click", divideFunc);
percentBtn.addEventListener("click", percentFunc);

allButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (calcInfo.num1 && calcInfo.operation) {
      calcInfo.num2 += e.target.dataset.value;
    } else {
      calcInfo.num1 += e.target.dataset.value;
    }
    updateUI();
  });
});
floatBtn.addEventListener("click", function () {
  if (calcInfo.num1 && !calcInfo.num2 && !calcInfo.num1.includes(".")) {
    calcInfo.num1 += ".";
  }
  if (calcInfo.num1 && calcInfo.num2 && !calcInfo.num2.includes(".")) {
    calcInfo.num2 += ".";
  }
  updateUI();
});
equalBtn.addEventListener("click", function () {
  updateUI();
  calculate();
  display.value = `=  ${numberSeperator(result)}`;
  calcInfo.num1 = result;
  calcInfo.num2 = "";
  calcInfo.operation = "";
  test = false;
});
clearBtn.addEventListener("click", clearDisplay);
deleteBtn.addEventListener("click", deleteDisplay);

dayButton.addEventListener("click", function () {
  display.style.backgroundColor = "#eee";
  rowsContainer.style.backgroundColor = "#ddd";
  display.style.color = "#111";
  rowsContainer.style.color = "#111";
});
nightButton.addEventListener("click", function () {
  display.style.backgroundColor = "#0f1721";
  rowsContainer.style.backgroundColor = "#121d2c";
  display.style.color = "#ffff";
  rowsContainer.style.color = "#ffff";
});
window.addEventListener("keydown", (e) => {
  e.preventDefault();
  const operators = ["+", "-", "*", "/", "%"];
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const clickedKey = e.key;
  if (numbers.includes(e.key)) {
    const Key = document.getElementById(`key-${e.key}`);
    Key.click();
  }
  if (e.key === "Backspace") {
    deleteDisplay();
  }
  if (e.key === "Delete") {
    clearDisplay();
  }
  if (e.key === "Enter") {
    equalBtn.click();
  }
  if (e.key === ".") {
    // Float or . key
    floatBtn.click();
  }
  if (e.key === "+") {
    plusBtn.click();
  }
  if (e.key === "-") {
    minusBtn.click();
  }
  if (e.key === "*") {
    multipleBtn.click();
  }
  if (e.key === "/") {
    e.preventDefault();
    divideBtn.click();
  }
  if (e.key === "Enter") {
    equalBtn.click();
    // updateUI();
  }
});

window.addEventListener("load", () => {
  clearDisplay();
  display.focus();
  test = false;
});
