// variables

const buttons = document.querySelectorAll("button");
const visor = document.querySelector(".visor");

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
            if(+n1 === 0 || +n2 === 0) {
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
    if(result % 1 !== 0) {
        result = parseFloat(result.toFixed(4));
    }

    return result;
}

function checkNumbers(display, button){
    if(display.result) display.result = undefined;

    const inputChar = button.textContent;

    if (display.op === undefined){
        if (inputChar === "." && display.n1.includes(".")) { // checks if there is already a "."
            return;
        }
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

    //if(textoVisor === 0) return "0";

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

function resetOperation(display) {
    display.n1 = "";
    display.n2 = "";
    display.op = undefined;
}

function resetDisplay(display) {
    resetOperation(display);
    display.result = undefined;
}

function resizeVisorText(element) {
    if(visor.textContent.length < 10) {
        visor.style.fontSize = "x-large";
    }
    if(visor.textContent.length > 10) {
        visor.style.fontSize = "medium";
    }
    if(visor.textContent.length > 15) {
        visor.style.fontSize = "small";
    }
    if(visor.textContent.length > 20) {
        visor.style.fontSize = "10px";
    }
    if(visor.textContent.length > 23) {
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