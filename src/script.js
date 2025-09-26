// variables

const buttons = document.querySelectorAll("button");
const visor = document.querySelector(".visor");
const clearButton = document.querySelector(".clear");

const display = {
    n1: "",
    n2: "",
};

// Math functions

function operate(op, n1, n2) {
    let result;

    switch (op) {
        case "+":
            result = +n1 + +n2;
            break;
        case "-":
            result = +n1 - +n2;
            break;
        case "*":
            result = +n1 * +n2;
            break;
        case "/":
            if (+n1 === 0 || +n2 === 0) {
                //throw new Error("divided by 0");
                alert("ERROR: Cannot divide by 0");
                return "0";
            } else {
                result = +n1 / +n2;
            }
            break;
        default:
            return;
    };
    
    // checks for decimals and round it
    if (result % 1 !== 0) {
        result = parseFloat(result.toFixed(4));
    }

    return result;
}

function checkNumbers(display, button) {
    if (display.result) display.result = undefined;

    const inputChar = button.textContent;

    if (display.op && display.n1 === "") {
        display.op = undefined;
        display.n1 += inputChar;
    } else if (display.op === undefined) {
        if (inputChar === "." && display.n1.includes(".")) { // checks if there is already a "."
            return;
        }
        display.n1 += inputChar;
    } else if (!display.op && display.n2 === "") {
        display.n1 += inputChar;
    } else {
        if (inputChar === "." && display.n2.includes(".")) {
            return;
        }
        display.n2 += inputChar;
    }
}

function checkOperators(display, button) {
    if (display.op === undefined && display.n1 === "" && display.result) {
        display.n1 = display.result;
        display.op = button.textContent;
    } else if (display.op === undefined && display.n1 === "" && display.result === undefined) {
        return;
    } else if (display.n2 === "" && display.op != undefined) {
        return;
        //display.op = button.textContent;
    } else if (display.op === undefined) {
        display.op = button.textContent;
    } else {
        
        // histórico no log após clicar "operators"
        console.log(`Operação: ${display.n1} ${display.op} ${display.n2} = ${operate(display.op, display.n1, display.n2)}`);
        
        display.n1 = operate(display.op, display.n1, display.n2)
        display.n2 = "";
        display.op = button.textContent;
    }
}

function checkResult(display) {
    if(display.n2 === "" || display.op === undefined) return;

    display.result = operate(display.op, display.n1, display.n2);
    
    if(display.result === 0) display.result = "0";
    
    // histórico no log após clicar "="
    console.log(`Operação: ${display.n1} ${display.op} ${display.n2} = ${display.result}`); 
    
    resetOperation(display);
}


function checkSignal(display) {
    let target = display.op ? "n2" : "n1";

    console.log(target)

    if (display[target] === "0") { // if number is 0, do nothing
        return;
    }

    if (display[target].toString().startsWith("-")) {
        display[target] = display[target].toString().slice(1);
    } else {
        display[target] = `-${display[target]}`;
    }
}

function checkDisplay(display) {
    let textoVisor = display.n2 || display.op || display.n1 || display.result || "";

    if (textoVisor === 0) textoVisor = "0";
    
    if(typeof textoVisor === "number") {
        if(textoVisor.toString().length > 15) {
            return textoVisor.toExponential(4);
        }

        const decimalPart = textoVisor.toString().split('.')[1];
        //console.log(`Decimal part: ${decimalPart}`);

        if(decimalPart && decimalPart.length > 4) {
            return parseFloat(textoVisor.toFixed(4));
        }   
    } 
    return textoVisor;   
}

function convertPercent(display) {
    if (display.n2 !== "") {
        display.n2 = display.n2 / 100;
    } else if (display.n1 !== "") {
        display.n1 = display.n1 / 100;
    }
}

function resetOperation(display) {
    display.n1 = "";
    display.n2 = "";
    display.op = undefined;
}

function resetDisplay(display) {
    resetOperation(display);
    display.result = undefined;
}

function eraseNum(display) {
    if (display.n2 !== "") { // highest condition. If n2 has a number, erase is for n2
        display.n2 = display.n2.toString().slice(0, -1);
    } else if (display.op !== undefined) { // if !n2 and op, so the erase is for op
        display.op = undefined;
    } else if (display.n1 !== "") { // last priority. if there's only n1, erase for n1
        display.n1 = display.n1.toString().slice(0, -1);
    }
}

function resizeVisorText(visor) {
    if(visor.textContent.length < 10) {
        visor.style.fontSize = "x-large";
    } else if(visor.textContent.length > 26) {
        visor.style.fontSize = "8px";
    } else if(visor.textContent.length > 20) {
        visor.style.fontSize = "10px";
    } else if(visor.textContent.length > 15) {
        visor.style.fontSize = "small";
    } else if(visor.textContent.length > 10) {
        visor.style.fontSize = "medium";
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
                if(clearButton.textContent === "C") {
                    resetDisplay(display);
                } else {
                    eraseNum(display);
                }
                break;
            case "signal":
                checkSignal(display);
                break;
            case "percent":
                convertPercent(display);
                break;
        }

        if(display.n1 || display.n2) {
            clearButton.textContent = "⬅";
        } else {
            clearButton.textContent = "C";
        }

        console.log(display);
        visor.textContent = checkDisplay(display);
        resizeVisorText(visor);  
    });
});

document.addEventListener("keydown", (e) => {
    let key = e.key;

    if (key === "Enter") {
        key = "=";
    } else if (key === "Backspace") {
        if(display.n1 || display.n2) {
            key = "⬅";
        } else {
            key = "C";
        }
    } else if (key === "\\") {
        if (display.n1 === "") {
            key = "+/-";
        } else if (display.n2 === "") {
            key = "+/-";
        }
    }

    const targetButton = Array.from(buttons).find(button => button.textContent === key);

    if (targetButton) {
        e.preventDefault();
        targetButton.click();
    }

    console.log(key);
});

// Output Log

//console.log(operate("+", 3, 5));
console.log(display);