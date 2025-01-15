const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");

let currentInput = "";
let numbers = [];
let operators = [];

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (value >= "0" && value <= "9") {
            currentInput += value;
            display.value += value;
        } else if (["+", "-", "*", "/"].includes(value)) {
            if (currentInput) {
                numbers.push(parseFloat(currentInput));
                currentInput = "";
            }
            while (operators.length && precedence(value) <= precedence(operators[operators.length - 1])) {
                calculate();
            }
            operators.push(value);
            display.value += value;
        }
    });
});

equals.addEventListener("click", () => {
    if (currentInput) {
        numbers.push(parseFloat(currentInput));
        currentInput = "";
    }
    while (operators.length) {
        calculate();
    }
    display.value = numbers.length ? numbers.pop() : "Error";
});

clear.addEventListener("click", () => {
    currentInput = "";
    numbers = [];
    operators = [];
    display.value = "";
});

function precedence(op) {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    return 0;
}

function calculate() {
    if (numbers.length < 2 || !operators.length) return;
    const b = numbers.pop();
    const a = numbers.pop();
    const op = operators.pop();
    let result = 0;

    if (op === "+") result = a + b;
    else if (op === "-") result = a - b;
    else if (op === "*") result = a * b;
    else if (op === "/") result = a / b;

    numbers.push(result);
}