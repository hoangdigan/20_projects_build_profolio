const calculatorDisplay = document.querySelector('h1')
const inputBtns = document.querySelectorAll('button')
const clearBtn = document.getElementById('clear-btn')

let firstValue =0
let operatorValue = ''
let awaitingNextValue = false

function sendNumberValue(number) {
    // Replace current display value if first value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number 
        awaitingNextValue = false
    } else {
        // If current display value is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number
    }
}

// Calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, seconNumber) => firstNumber / seconNumber,
    '*': (firstNumber, seconNumber) => firstNumber * seconNumber,
    '+': (firstNumber, seconNumber) => firstNumber + seconNumber,
    '-': (firstNumber, seconNumber) => firstNumber - seconNumber,
    '=': (firstNumber, seconNumber) => seconNumber,
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent)    

    // Prevent multiple operators    
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator
        return 
    }

    // Assign firstValue if no value
    if (!firstValue) {
        firstValue = currentValue
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue)
        calculatorDisplay.textContent = calculation
        firstValue = calculation
    }   
    // Ready for next value, tore operator
    awaitingNextValue = true
    operatorValue = operator   
}

function addDecimal() {
    // If operator pressed, don't add decimal
    if (awaitingNextValue) return
    // if no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

// Add Event listeners for numbers, operators, decimal button
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value))
    } else if (inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    } else if (inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', () => addDecimal())
    }      
})

// Reset All values display
function resetAll() {
    firstValue =0
    operatorValue = ''
    awaitingNextValue = false
    calculatorDisplay.textContent = ''   
}

// Event listeners
clearBtn.addEventListener('click', resetAll)