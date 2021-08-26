// TIP CALCULATOR APP ////////////////////////////////////////////////////////////////////////////////////////

// Bill input -------------------------------------------
let bill = document.querySelector('#bill'); // Input
let billContainer = document.querySelector('.bill-container'); // Input Container
let invalidBill = document.querySelector('.invalid-data-bill'); // Invalid
let zeroBill = document.querySelector('.zero-data-bill'); // Zero
let billValue = 0;

let paramBill = /^[+]?([0-9]*\.[0-9]+|[0-9]+)$/; // Regular Expression (param)


// Tip input --------------------------------------------
let tipButtons = document.querySelectorAll('.tip');
let tipParent = document.querySelector('.selectTipContainer');
let tipCustom = document.querySelector('#customTip');
let tipValue = 0;
let customTipValue = 0;

// Number of people input -------------------------------
let numberPeople = document.querySelector('#numberOfPeople'); // Input
let peopleContainer = document.querySelector('.numberPeople-container'); // Input Container
let invalidPeople = document.querySelector('.invalid-data'); // Invalid
let zeroPeople = document.querySelector('.zero-data'); // Zero
let peopleValue = 0;

let paramPeople = /^\d{1,28}$/; // Regular Expression (param)

// Tip Amount Result ------------------------------------
let tipAmountResult = document.querySelector('#tipAmountResult');
let totalAmountResult = document.querySelector('#totalResult');
let resultTipAmountPerPerson = 0;

// RESET BUTTON -----------------------------------------
let resetButton = document.querySelector('#reset');
resetButton.disabled = true;



// VERIFIER function -----------------------------------------------------------------------------------
const verifyValue = (input, inputContainer, param, invalidText, zeroText) => {
    if(input.value == 0){
        inputContainer.classList.add('invalidState');
        invalidText.style.display = 'none';
        zeroText.style.display = "block";
    } else if(!param.test(input.value)){
        inputContainer.classList.add('invalidState');
        invalidText.style.display = 'block';
        zeroText.style.display = "none";
    } else if(param.test(input.value) && input.value !== 0){
        inputContainer.classList.remove('invalidState');
        invalidText.style.display = 'none';
        zeroText.style.display = "none";

        return parseInt(input.value);
    }
};

// TIP AMOUNT PER PERSON ---------------------------------------------------------------------------------
const tipAmountPerPerson = () => {
    billValue = parseFloat(bill.value);
    peopleValue = parseInt(numberPeople.value);
    // Here we store the element with the class 'active', in case there aren't it will be empty
    let typesOfClasses = [];

    // Asigns the tipValue based of wich option has the class 'active'
    tipButtons.forEach((tip) => {
        if (tip.classList.contains('active') && tip.getAttribute('id') === 'customTip'){
            tipValue = parseFloat(tip.value)/100;
            typesOfClasses.push(tip.classList);
        } else if (tip.classList.contains('active')){
            tipValue = parseFloat(tip.value);
            typesOfClasses.push(tip.classList);
        }
    });
    // console.log(typesOfClasses);  // <---- Use this to see if it's empty or not

    // Resets the value of tipValue when there's no tip with the class 'active'
    if(typesOfClasses.length === 1){
        tipValue = tipValue;
    }else {
        tipValue = 0;
    }

    resultTipAmountPerPerson = (billValue * tipValue) / peopleValue;

    if(isNaN(resultTipAmountPerPerson)){
        resultTipAmountPerPerson = 0.00;
    }
    
    return tipAmountResult.innerHTML = "$ " + resultTipAmountPerPerson.toFixed(2);
};

// TOTAL AMOUNT PER PERSON ------------------------------------------------------------------------------
const totalAmountPerPerson = () => {
    resultTotalPerPerson = ( billValue / peopleValue ) + resultTipAmountPerPerson;

    if(isNaN(resultTotalPerPerson)){
        resultTotalPerPerson = 0.00;
    }

    return totalAmountResult.innerHTML = "$ " + resultTotalPerPerson.toFixed(2);
};

const activateResetButton = () => {
    resetButton.disabled = false;
    resetButton.style.backgroundColor = "hsl(172, 67%, 45%)";
};

const deactivateResetButton = () => {
    resetButton.disabled = true;
    resetButton.style.backgroundColor = "hsl(186, 14%, 43%)";
};


// TIP Assigner of the class active to the elements -----------------------------------------------------
tipParent.addEventListener('click', (e) => {
    e.preventDefault();
    tipButtons.forEach(tip => {
        if(tip !== e.target){
            tip.classList.remove('active');
        }
    });
    // Resets the Custom when it doesn't have the class 'active'
    if(tipCustom.classList !== 'active'){
        tipCustom.value = '';
    }

    e.target.classList.toggle('active');

    tipParent.classList.remove('active');

    activateResetButton();
    tipAmountPerPerson();
    totalAmountPerPerson();
});
// CUSTOM tip Event ----------------------------------

tipCustom.addEventListener('keyup', (e) => {
    e.preventDefault();

    tipCustom.classList.add('active');
    activateResetButton();
    tipAmountPerPerson();
    totalAmountPerPerson();
});

// Bill of people KeyUp Event ------------------------------------------------------------------------------
bill.addEventListener('keyup', (e) => {
    e.preventDefault();

    verifyValue(bill, billContainer, paramBill, invalidBill, zeroBill);
    activateResetButton();
    tipAmountPerPerson();
    totalAmountPerPerson();
});

// Number of people KeyUp Event ----------------------------------------------------------------------------
numberPeople.addEventListener('keyup', (e) => {
    e.preventDefault();

    verifyValue(numberPeople, peopleContainer, paramPeople, invalidPeople, zeroPeople);
    activateResetButton();
    tipAmountPerPerson();
    totalAmountPerPerson();
});

// RESET CLICK EVENT ---------------------------------------------------------------------------------------
resetButton.addEventListener('click', () => {
    console.log('Click Reset!');

    bill.value = null;
    numberPeople.value = null;

    tipAmountResult.innerHTML = '$ 0.00';
    totalAmountResult.innerHTML = '$ 0.00';

    tipButtons.forEach(tip => {
        tip.classList.remove('active');
    });

    tipCustom.value = null;

    deactivateResetButton();
});