/* ---------------- Global Variables ---------------- */
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const screenLast = document.querySelector('[data-previous]');
const screenCurrent = document.querySelector('[data-current]');
const equalBtn = document.querySelector('[data-equal]');
const clearBtn = document.querySelector('[data-reset]');
const deleteBtn = document.querySelector('[data-del]');
const pointBtn = document.querySelector('[data-dot]');

let shouldResetScreen = false;
let firstOperend = '';
let secondOperand = '';
let currentOperator = null;


/* ---------------- Btn's events ---------------- */
pointBtn.addEventListener('click', appendPoint);
clearBtn.addEventListener('click',clear);
deleteBtn.addEventListener('click',del);
equalBtn.addEventListener('click',secondPart)


/* ---------------- Numbers and operations btn's ---------------- */
numberButtons.forEach(number => {
    number.addEventListener('click', ()=>{
        appendNumber(number.innerText)
    })
})

operatorButtons.forEach(operator => {
    operator.addEventListener('click',()=>{
        chooseOperation(operator.innerText)
    })
})

/* ---------------- Functions---------------- */
//function to the clear button
function clear(){
    screenCurrent.innerText = '0';
    screenLast.innerText = '';
    firstOperend = ''
    secondOperand = ''
    currentOperator = null

}

//function to del button
function del(){
    screenCurrent.innerText = screenCurrent.innerText.toString().slice(0,-1);
}

//function to reset the current screen without using the button
function resetScreen(){
    screenCurrent.innerText = ''
    shouldResetScreen = false
}


function appendPoint(){
    if (shouldResetScreen) resetScreen()
    if (screenCurrent.textContent === ''){
        screenCurrent.textContent = '0'
    }
    if (screenCurrent.textContent.includes('.')) return
    screenCurrent.textContent += '.'
}


function appendNumber(number){
    if (screenCurrent.innerText === '0' || shouldResetScreen){
        resetScreen()
    }
    screenCurrent.innerText = screenCurrent.innerText.toString() + number.toString();
}

// this make the first part of operation, when the button is clicked this function will work
function chooseOperation(operator) {
    //this check if the operator is clicked
    if (currentOperator !== null) secondPart()
    firstOperend = screenCurrent.innerText
    currentOperator = operator
    screenLast.innerText = `${firstOperend} ${currentOperator}`
    shouldResetScreen = true
}

//this part its when the operator its clicked
function secondPart(){
    if (currentOperator === null || shouldResetScreen) return
    if (currentOperator === '/' && screenCurrent.innerText === '0'){
        screenCurrent.style.fontSize = '30px'
        screenCurrent.innerText = "You can't divide by 0"
        return
    }
    secondOperand = screenCurrent.innerText
    screenCurrent.innerText = roundNum(calculate(firstOperend,secondOperand,currentOperator))
    screenLast.innerText = `${firstOperend} ${currentOperator} ${secondOperand} ${equalBtn.innerText}` 
    currentOperator = null
}



function roundNum(num){
    return Math.round(num * 10000000000000) / 10000000000000
}

function calculate(a,b,operator){
    a = Number(a)
    b = Number(b)
    switch(operator){
        case '+':
            return a+b
        case '-':
            return a-b
        case 'x':
            return a*b
        case '/':
            if (a===0) return 0
            else return a/b
        default:
            return null
    }
}