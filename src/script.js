// variables
let n1 = null;
let n2 = null;
let op = "";

const buttons = document.querySelectorAll("button");

let display = {
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

function checkInput(display, button){
    if(button.textContent === "0"){
        if(display.op === undefined){
            if(display.n1 != "") {
                display.n1 += button.textContent;
            }
        }
        else {
            if(display.n2 != "") {
                display.n2 += button.textContent;
            }
        }
    }
    else {
        if (display.op === undefined){
        display.n1 = display.n1 + button.textContent;
        }
        else {
            display.n2 = display.n2 + button.textContent;
        }
    }
}

// Listeners

buttons.forEach(function(button) {
    button.addEventListener("click", () => {
        console.log(button.classList);
        const btnClass = button.classList[0];
        const valor = button.textContent;
        switch(btnClass) {
            case "numbers":
                checkInput(display, button);
                break;
            case "1":
                if (display.op === undefined){
                    display.n1 = display.n1 + button.textContent;
                }
                else {
                    display.n2 = display.n2 + button.textContent;
                }
                break;
            case "+":
                if (display.op === undefined && display.n1 === "" && display.result) {
                    display.n1 = display.result;
                    display.op = button.textContent;
                }
                else if (display.op === undefined){
                    display.op = button.textContent;
                }
                else {
                    display.n1 = operate(display.op, display.n1, display.n2)
                    display.n2 = "";
                    display.op = button.textContent;
                }
                break;
            case "-":
                if (display.op === undefined){
                    if(display.n1 == "") {
                        display.n1 = display.result;
                    }
                    display.op = button.textContent;
                }
                else {
                    display.n1 = operate(display.op, display.n1, display.n2)
                    display.n2 = "";
                    display.op = button.textContent;
                }
                break;
            case "=":
                display.result = operate(display.op, display.n1, display.n2)
                display.n1 = "";
                display.n2 = "";
                display.op = undefined;
                break;
        }
        console.log(display);
    })
});


// Output Log

//console.log(operate("+", 3, 5));
console.log(display);