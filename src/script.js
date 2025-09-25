// variables

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
    return +a - +b;
}

function multiply(a, b) {
    return +a * +b;
}

function divide(a, b) {
    if(+a === 0 || +b === 0) {
        return (new Error("Do not divide by 0"));
    } else {
        return +a / +b;
    }
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
        if (display.op === undefined){
        display.n1 = display.n1 + button.textContent;
        } else {
            display.n2 = display.n2 + button.textContent;
        }
}

function checkOperators(display, button) { 
    if (display.op === undefined && display.n1 === "" && display.result) {
        display.n1 = display.result;
        display.op = button.textContent;
    } else if(display.op === undefined && display.n1 === "" && display.result === undefined) {
        return;
    } else if (display.n2 === "" && display.op != undefined) {
        display.op = button.textContent;
    } else if (display.op === undefined) {
        display.op = button.textContent;
    } else {
        console.log(`Operação: ${display.n1} ${display.op} ${display.n2} = ${operate(display.op, display.n1, display.n2)}`); // histórico no log após clicar "operators"
        display.n1 = operate(display.op, display.n1, display.n2)
        display.n2 = "";
        display.op = button.textContent;
    }
}

function checkResult(display) {
    if(display.n2 === "" || display.op === undefined) return;
    
    display.result = operate(display.op, display.n1, display.n2);
    if(display.result === 0) display.result = "0";
    console.log(`Operação: ${display.n1} ${display.op} ${display.n2} = ${display.result}`); // histórico no log após clicar "="
    
    resetOperation(display);
}

function checkDisplay(display) {
    let textoVisor = display.n2 || display.n1 || display.result || "";
    if(typeof textoVisor === "number") {
        if (Number.isInteger(textoVisor) && textoVisor.toString().length > 10) {
            return textoVisor.toExponential();
        }
        if(!Number.isInteger(textoVisor) && textoVisor.toString().length > 10) {
            return Number(textoVisor.toFixed(30));
        }   
    } 
    return textoVisor;   
}

function resetOperation(display) {
    display.n1 = "";
    display.n2 = "";
    display.op = undefined;
}

function resetDisplay(display){
    resetOperation(display);
    display.result = undefined;
}

function resizeVisorText(element) {
    if(visor.textContent.length < 10) {
        visor.style.fontSize = "x-large";
    }
    if (visor.textContent.length > 10) {
        visor.style.fontSize = "medium";
    }
    if (visor.textContent.length > 15) {
        visor.style.fontSize = "small";
    }
    if (visor.textContent.length > 20) {
        visor.style.fontSize = "10px";
    }
    if (visor.textContent.length > 25) {
    visor.style.fontSize = "8px";
    }
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
                checkResult(display);
                break;
            case "clear":
                resetDisplay(display);
                break;
        }
        console.log(display);
        visor.textContent = checkDisplay(display);
        resizeVisorText(visor);
    });
});


// Output Log

//console.log(operate("+", 3, 5));
console.log(display);