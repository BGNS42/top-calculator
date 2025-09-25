// variables
// let n1 = null;
// let n2 = null;
// let op = "";

const buttons = document.querySelectorAll("button");
const visor = document.querySelector(".visor");

const display = {
    n1: "",
    n2: "",
};

// Math functions

function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(op, n1, n2) {
    switch (op) {
        case "+":
            return add(n1, n2);
            break;
        case "-":
            return subtract(n1, n2);
            break;
        case "*":
            return multiply(n1, n2);
            break;
        case "/":
            return divide(n1, n2);
            break;
        default:
            break;
    };
}

function checkNumbers(display, button){
    if(button.textContent === "0"){
        if(display.op === undefined){
            if(display.n1 != "") {
                display.n1 += button.textContent;
            }
        } else {
            if(display.n2 != "") {
                display.n2 += button.textContent;
            }
        }
    } else {
        if (display.op === undefined){
        display.n1 = display.n1 + button.textContent;
        } else {
            display.n2 = display.n2 + button.textContent;
        }
    }
}

function checkOperators(display, button) {
    if (display.op === undefined && display.n1 === "" && display.result) {
        display.n1 = display.result;
        display.op = button.textContent;
    } else if(display.op === undefined && display.n1 === "" && display.result === undefined) {
        return;
    } else if (display.op === undefined) {
        display.op = button.textContent;
    } else {
        console.log(`Operação: ${display.n1} ${display.op} ${display.n2} = ${operate(display.op, display.n1, display.n2)}`); // histórico no log após clicar "operators"
        display.n1 = operate(display.op, display.n1, display.n2)
        display.n2 = "";
        display.op = button.textContent;
    }
}

function resetDisplay(display) {
    display.n1 = "";
    display.n2 = "";
    display.op = undefined;
}

function resetAll(display){
    resetDisplay(display);
    display.result = undefined;
}

// Listeners

buttons.forEach(function(button) {
    button.addEventListener("click", () => {
        // console.log(button.classList);
        const btnClass = button.classList[0];
        switch(btnClass) {
            case "numbers":
                checkNumbers(display, button);
                break;
            case "operators":
                checkOperators(display, button)
                break;
            case "=":
                display.result = operate(display.op, display.n1, display.n2);
                console.log(`Operação: ${display.n1} ${display.op} ${display.n2} = ${display.result}`); // histórico no log após clicar "="
                resetDisplay(display);
                break;
            case "clear":
                resetAll(display);
                break;
        }
        console.log(display);
        visor.textContent = display.n2 || display.n1 || display.result;
    })
});


// Output Log

//console.log(operate("+", 3, 5));
console.log(display);