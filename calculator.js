console.log("loading...")

let first = null;
let second = null;
let operator = null;
let result = null;

const output = document.querySelector("#output");

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

function operate(func, first, second) {
    return func(Number(first), Number(second));
}

document.querySelectorAll(".number").forEach(
    el => el.addEventListener("click", (el) => {
	if (
	    el.target.innerText == "." &&
		result == null &&
		output.innerText.includes(".")
	) {
	    return;
	}
	if (result != null && operator != null) {
	    first = result;
	    second = el.target.innerText;
	    output.innerText = second;
	} else if (first == null && operator == null) {
	    first = el.target.innerText;
	    output.innerText = first;
	} else if (first != null && operator == null) {
	    first = output.innerText + el.target.innerText;
	    output.innerText = first;
	} else if (operator != null && second == null) {
	    second = el.target.innerText;
	    output.innerText = second;
	} else if (operator != null && second != null) {
	    second = output.innerText + el.target.innerText;
	    output.innerText = second;
	}

	result = null;
    })
)

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
	}
	if (el.target.innerText == "=") {
	    if (operator == null) {
		return;
	    }
	    if (operator == divide && second == "0") {
		output.innerText = "Can't trick me!";
		return;
	    }
	    result = operate(operator, first, second)
	    output.innerText = result;
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
	output.innerText = "";
    }
)
