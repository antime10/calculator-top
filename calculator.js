/* Calculator.js */

// First number loaded into calculator
let first = null;
// Second number loaded into calculator
let second = null;
// The operator on the inputs
let operator = null;
// The result stored between entries
let result = null;

const output = document.querySelector("#output");

/* Operator functions */
function add(first, second) {
    return first + second;
}

function subtract(first, second) {
    return first - second;
}

function multiply(first, second) {
    return first * second;
}

function divide(first, second) {
    return first / second;
}

/* Run a function on inputs */
function operate(func, first, second) {
    return func(Number(first), Number(second));
}

document.querySelectorAll(".number").forEach(
    el => el.addEventListener("click", (el) => {
	// If it's the decimal point
	if (
	    el.target.innerText == "." &&
		result == null &&
		output.innerText.includes(".")
	) {
	    return;
	}
	if (result != null && operator != null) {
	    // If there's a result and no operator yet store the result
	    // in the first position and begin inputting to the second
	    first = result;
	    second = el.target.innerText;
	    output.innerText = second;
	} else if (first == null && operator == null) {
	    // If there's nothing in the first position or operator begin
	    // by putting first digit into the first position
	    first = el.target.innerText;
	    output.innerText = first;
	} else if (first != null && operator == null) {
	    // If we've started inputting into first but still have no
	    // operator continue inputting into first
	    first = output.innerText + el.target.innerText;
	    output.innerText = first;
	} else if (operator != null && second == null) {
	    // If the operator isn't null and we don't have anything in
	    // the second variable start there
	    second = el.target.innerText;
	    output.innerText = second;
	} else if (operator != null && second != null) {
	    // If we've started inputting into the second variable,
	    // continue...
	    second = output.innerText + el.target.innerText;
	    output.innerText = second;
	}
	// Always discard result now as it's stored in first or not
	// needed anymore.
	result = null;
    })
)

// Add listeners to operators
document.querySelectorAll(".operator").forEach(
    el => el.addEventListener("click", (el) => {
	switch (el.target.innerText) {
	case "+":
	    operator = add;
	    break;
	case "-":
	    operator = subtract;
	    break;
	case "x":
	    operator = multiply;
	    break;
	case "/":
	    operator = divide;
	    break;
	case "=":
	    if (operator == null) {
		return;
	    }
	    break;
	default:
	    return;
	}
	if (el.target.innerText == "=") {
	    if (operator == divide && second == "0") {
		// Divide by zero!
		output.innerText = "Can't trick me!";
		return;
	    }
	    // Apply the operator to the inputs
	    result = operate(operator, first, second);
	    output.innerText = result.toString().slice(0,10);
	    first = null;
	    second = null;
	    operator = null;
	} else {
	    output.innerText = el.target.innerText;
	}
    })
)

document.querySelector("#clear").addEventListener(
    "click",
    () => {
	first = null;
	second = null;
	operator = null;
	result = null;
	output.innerText = "0";
    }
)

document.querySelector("#backspace").addEventListener(
    "click",
    () => {
	if (second != null) {
	    second = second.slice(0,-1);
	    output.innerText = second;
	} else if (first != null) {
	    first = first.slice(0,-1);
	    output.innerText = first;
	}
    }
)

function pressButton(value) {
    document.querySelectorAll(".btn").forEach(
	btn => {
	    if (btn.textContent == value) {
		btn.click()
	    }
	}
    )
}

document.addEventListener(
    "keydown",
    (e) => {
	if (
	    [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"<",
		"C",
		"+",
		"/",
		"x",
		"="
	    ].includes(e.key)) {
	    pressButton(e.key)
	}
    }
)

console.log(`Introducing the TOP003 calculator

All the features you've come to expect:
 - backspace button!
 - keyboard controls!
 - decimal input!
 - no known deviations from the Odin Project base spec!
 - best of all - it's free!
 - try it today!`)
