// =======================
// DOM ELEMENT REFERENCES
// =======================
const cashUI = document.querySelector('.cash');
const betInput = document.querySelector('#bet');
const multiplierInput = document.querySelector('#multiplier');
const multiplierButton = document.querySelector('.multiplierButton');
const multiplierUI = document.querySelector('.multiplierText');
const display = document.querySelector('.display');
const randomNumber = document.querySelector('.number');
const chanceUI = document.querySelector('.chance');
const cashOut = document.querySelector('.cash-out');
const signInput = document.querySelector('.sign');
const luckyNumberInput = document.querySelector('#lucky-number');


// =======================
// GAME STATE VARIABLES
// =======================
let cash = 1000;
let displayCash = 0;
let sign = "<";
let luckyNumber = 50;
let bet = betInput.value;
let multiplier = 2;
let increase = 2;
let chance = 50;
let check = 0;
let win = 0;
let mode;

// Initialize displayed chance
chanceUI.innerText = `${chance.toFixed(0)}%`;


// =======================
// EVENT LISTENERS
// =======================


//---- Game Mode Listener ----
document.querySelectorAll('input[name=mode]').forEach(radio => {
    radio.addEventListener('change', () => {
        if(radio.value==='multiplier')  {
            mode = 'multiplier';
            multiplierInput.disabled = false;
            signInput.disabled = true;
            luckyNumberInput.disabled = true;
            
        }
        else {
            mode = 'number';
            signInput.disabled = false;
            luckyNumberInput.disabled = false;
            multiplierInput.disabled = true;
        }
    });
});


// ---- Sign (<, >, =) Changed ----
signInput.addEventListener('change', () => {
    sign = signInput.value;
    calculateChances();
    increase = 1/(chance/100);
    multiplier = increase;
    multiplierUI = multiplier.toFixed(1);
});

// ---- Calculate Chances ----
    function calculateChances() {
    if (sign === "<") {
        chance = luckyNumber/100;
        chanceUI.innerText = `${(chance*100).toFixed(0)}%`;
    } else if (sign === ">" && luckyNumber !== undefined) {
        chance = (100 - luckyNumber)/100;
        chanceUI.innerText = `${(chance*100).toFixed(0)}%`;
    } else if (sign === "=" && luckyNumber !== undefined) {
        chance = 1/100;
        chanceUI.innerText = `${(chance*100).toFixed(0)}%`;
        }
    
    }



// ---- Lucky Number Input ----
luckyNumberInput.addEventListener('input', () => {
    luckyNumber = Number(luckyNumberInput.value);
    if (luckyNumber > 100) {
        luckyNumber = 100;
    }
    if (luckyNumber < 1) {
        luckyNumber = 1;
    }
    luckyNumberInput.value = luckyNumber;

    calculateChances();
    increase = 1/(chance/100);
    multiplier = increase;
    multiplierUI = multiplier.toFixed(3);

   
});

// ---- Bet Input ----
betInput.addEventListener('input', () => {
    bet = betInput.value;
});

// ---- Multiplier Manual Input ----
multiplierInput.addEventListener('input', () => {
    increase = Number(multiplierInput.value);
    chance = 1/increase;
    chanceUI.innerText = `${(chance*100).toFixed(0)}%`;
    multiplier = increase;
    multiplierUI.innerText = multiplier.toFixed(1);
});

// ---- Start Button ----
multiplierButton.addEventListener('click', start);

// ---- Spacebar to Start ----
document.addEventListener('keyup', function (event) {
    if(event.key === ' '){
        start();
    }
});



// =======================
// MAIN GAME FUNCTION
// =======================
function start() {
    cashOut.innerText = chance;
    // Prevent going negative
    if (cash + displayCash - bet < 0) {
        display.innerText = 'No money';
        return;
    }

    // Only subtract bet once per round
    if (check === 0) {
        cash -= bet;
        cashUI.innerText = Number(cash.toFixed(2));
        check = 1;
    }

    // Increase multiplier & roll number
    multiplier *= increase;
    multiplierUI.innerText = multiplier.toFixed(1);
    number = Math.ceil(Math.random()*100);
    randomNumber.innerText = number;
   

    // Win Conditions for Sign Mode
    if (mode === "multiplier") {
        if (number <= chance*100) win = 1;
        else win = 0;
    }
    else {
    if (sign === "<") {
       if (number < luckyNumber) win = 1;
       else win = 0;

    } else if (sign === ">") {
        if (number > luckyNumber) win = 1;
        else win = 0;

    } else {
        if (number === luckyNumber) win = 1;
        else win = 0;
    }

    // Win or Lose Mechanic

    if (win === 1) {
        displayCash = Number(bet * multiplier);
        display.innerText = `${displayCash.toFixed(1)} Win`;
    } else {
        displayCash = 0;
        display.innerText = `0 Crash`;
        multiplier = 1;
        multiplierUI.innerText = multiplier.toFixed(1);
        check = 0;
    }
    
}



// =======================
// CASH OUT
// =======================
cashOut.addEventListener('click', () => {
    cash += Number(displayCash.toFixed(1));
    cashUI.innerText = cash;
    displayCash = 0;
    multiplier = 1;
    multiplierUI.innerText = 1;
    check = 0;
    chance = 1/increase*100;
    chanceUI.innerText = `${chance.toFixed(0)}%`;
});
}



