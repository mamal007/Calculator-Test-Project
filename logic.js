//Extracting the buttons on the calculator (html elements)
const input = document.getElementById("input");
const button1 = document.getElementById("button-1");
const button2 = document.getElementById("button-2");
const button3 = document.getElementById("button-3");
const button4 = document.getElementById("button-4");
const button5 = document.getElementById("button-5");
const button6 = document.getElementById("button-6");
const button7 = document.getElementById("button-7");
const button8 = document.getElementById("button-8");
const button9 = document.getElementById("button-9");
const button0 = document.getElementById("button-0");
const minusButton = document.getElementById("button-minus");
const plusButton = document.getElementById("button-plus");
const divisionButton = document.getElementById("button-division");
const crossButton = document.getElementById("button-cross");
const moduleButton = document.getElementById("button-module");
const equalButton = document.getElementById("button-equal");
const pointButton = document.getElementById("button-point");
const clearButton = document.getElementById("button-clear");
const clearAllButton = document.getElementById("button-clearAll");
const historyButton = document.getElementById("button-history");
let history = []; //History of the calculations
let isResult = false; //Showing whether the calculation resulted or not
let isFirstPoint = true; //Showing if the point sign (.) has been used in the number or not
let isHistoryClicked = false; //Showing whether the history button has been clicked or not 
let historyArrayIndex;

//Adding functionality to the buttons when they're clicked
button1.addEventListener("click", getInput);
button2.addEventListener("click", getInput);
button3.addEventListener("click", getInput);
button4.addEventListener("click", getInput);
button5.addEventListener("click", getInput);
button6.addEventListener("click", getInput);
button7.addEventListener("click", getInput);
button8.addEventListener("click", getInput);
button9.addEventListener("click", getInput);
button0.addEventListener("click", getInput);
crossButton.addEventListener("click", getInput);
minusButton.addEventListener("click", getInput);
plusButton.addEventListener("click", getInput);
divisionButton.addEventListener("click", getInput);
moduleButton.addEventListener("click", getInput);
pointButton.addEventListener("click", getInput);
clearButton.addEventListener("click", getInput);
clearAllButton.addEventListener("click", getInput);
equalButton.addEventListener("click", calculate);
historyButton.addEventListener("click", showHistory);


function getInput(event) {
    if (isHistoryClicked) {
        isHistoryClicked = false;
        historyIndex = history.length - 1;
        input.textContent = "";
    } // Clearing the monitor and refreshing the history index after clicking the History button
    if ((isResult && (/\d/.test(event.target.textContent) || event.target.textContent === "C"))) {
        input.textContent = "";
        isResult = false;
    } else {
        isResult = false;
    } // Clearing the monitor after that calculation resulted and user doesn't want to operate on the result
    if (event.target.textContent === "C") {
        if (input.textContent.charAt(input.textContent.length - 1) === ".") {
            isFirstPoint = true;
        }
        input.textContent = input.textContent.slice(0, input.textContent.length - 1);
    } else if (event.target.textContent === "AC") {
        isFirstPoint = true;
        input.textContent = "";
    } else if (event.target.textContent === "." && isFirstPoint && /\d/.test(input.textContent.charAt(input.textContent.length - 1))) {
        isFirstPoint = false;
        input.textContent += event.target.textContent;
    } else if (/\d/.test(event.target.textContent)) {
        input.textContent += event.target.textContent;
    } else if (input.textContent.length !== 0 && /\d/.test(input.textContent.charAt(input.textContent.length - 1))) {
        if (event.target.textContent === "x") {
            isFirstPoint = true;
            input.textContent += "*";
        } else if (event.target.textContent === "/" || event.target.textContent === "+" || event.target.textContent === "-" || event.target.textContent === "%") {
            isFirstPoint = true;
            input.textContent += event.target.textContent;
        }
    }
} //Getting input from user

function calculate() {
    let mathPhrase = input.textContent;
    let matchedString;

    if (isHistoryClicked) {
        isHistoryClicked = false;
        historyIndex = history.length - 1;
        input.textContent = "";
    } // Clearing the monitor and refreshing the history index after clicking the History button
    while (/(\d+(\.\d+)?)\+(\d+(\.\d+)?)/.test(input.textContent) || /(\d+(\.\d+)?)-(\d+(\.\d+)?)/.test(input.textContent) || /(\d+(\.\d+)?)\*(\d+(\.\d+)?)/.test(input.textContent) || /(\d+(\.\d+)?)\/(\d+(\.\d+)?)/.test(input.textContent) || /(\d+(\.\d+)?)%(\d+(\.\d+)?)/.test(input.textContent)) {
        if (/(\d+(\.\d+)?)%(\d+(\.\d+)?)/.test(input.textContent)) {
            matchedString = /(\d+(\.\d+)?)%(\d+(\.\d+)?)/.exec(input.textContent); //Extracting the matched string from the phrase
            input.textContent = input.textContent.replace(matchedString[0], parseFloat(matchedString[1]) % parseFloat(matchedString[3])); //Replacing the matched string with the mathematical result
        }
        if (/(\d+(\.\d+)?)\/(\d+(\.\d+)?)/.test(input.textContent)) {
            matchedString = /(\d+(\.\d+)?)\/(\d+(\.\d+)?)/.exec(input.textContent); //Extracting the matched string from the phrase
            if (matchedString[3] === "0") {
                input.textContent = "No dividing by zero!";
            }
            input.textContent = input.textContent.replace(matchedString[0], parseFloat(matchedString[1]) / parseFloat(matchedString[3])); //Replacing the matched string with the mathematical result
        }
        if (/(\d+(\.\d+)?)\*(\d+(\.\d+)?)/.test(input.textContent)) {
            matchedString = /(\d+(\.\d+)?)\*(\d+(\.\d+)?)/.exec(input.textContent); //Extracting the matched string from the phrase
            input.textContent = input.textContent.replace(matchedString[0], parseFloat(matchedString[1]) * parseFloat(matchedString[3])); //Replacing the matched string with the mathematical result
        }
        if (/(\d+(\.\d+)?)\+(\d+(\.\d+)?)/.test(input.textContent)) {
            matchedString = /(\d+(\.\d+)?)\+(\d+(\.\d+)?)/.exec(input.textContent); //Extracting the matched string from the phrase
            input.textContent = input.textContent.replace(matchedString[0], parseFloat(matchedString[1]) + parseFloat(matchedString[3])); //Replacing the matched string with the mathematical result
        }
        if (/(\d+(\.\d+)?)-(\d+(\.\d+)?)/.test(input.textContent)) {
            matchedString = /(\d+(\.\d+)?)-(\d+(\.\d+)?)/.exec(input.textContent); //Extracting the matched string from the phrase
            input.textContent = input.textContent.replace(matchedString[0], parseFloat(matchedString[1]) - parseFloat(matchedString[3])); //Replacing the matched string with the mathematical result
        }
    } // Working until no part of the phrase matches with the patterns and there will be just a number as result

    if (mathPhrase !== input.textContent && !isResult) {
        isResult = true;
        history.push(mathPhrase + ' = ' + input.textContent);
        historyIndex = history.length - 1;
    }
} //Calculating the input with equal button

function showHistory() {
    if (historyIndex >= 0) {
        isHistoryClicked = true;
        input.textContent = history[historyIndex];
        historyIndex--;
    }
} //Showing the history with Hist. button
