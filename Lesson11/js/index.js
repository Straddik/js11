"use strict";
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
let buttonCalc = document.getElementById('start'),
    buttonPlusIncome = document.getElementsByTagName('button')[0],
    buttonPlusExpense = document.getElementsByTagName('button')[1],
    checkbox = document.querySelector('#deposit-check'),
    resultBudgetMonth = document.getElementsByClassName('result-total')[0],
    resultBudgetDay = document.getElementsByClassName('result-total')[1],
    resultExpensesMonth = document.getElementsByClassName('result-total')[2],
    resultAdditionalIncome = document.getElementsByClassName('result-total')[3],
    resultAdditionalExpenses = document.getElementsByClassName('result-total')[4],
    resultIncomePeriod = document.getElementsByClassName('result-total')[5],
    resultTargetMonth = document.getElementsByClassName('result-total')[6],
    inputSalaryAmount = document.querySelector('.salary-amount'),
    inputIncomeItems = document.querySelectorAll('.income-items'),
    inputExpensesTitle = document.querySelector('.expenses-title'),
    inputExpensesAmount = document.querySelector('.expenses-amount'),
    inputAdditionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    inputAdditionalExpenseAmount = document.querySelector('.additional_expenses-item'),
    inputDepositAmount = document.querySelector('.deposit-amount'),
    inputDepositPercent = document.querySelector('.deposit-percent'),
    inputTargetAmount = document.querySelector('.target-amount'),
    inputPeriodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');




let appData = {
    budget: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    start: function() {
        appData.budget = +inputSalaryAmount.value;
        appData.getExpenses();
        // appData.asking();
        appData.getInfoDeposit();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getIncome();
        appData.getBudget();
        appData.showResult();
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpense);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonPlusExpense.style.display = 'none';
        };
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = inputIncomeItems[0].cloneNode(true);
        inputIncomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
        inputIncomeItems = document.querySelectorAll('.income-items');
        if (inputIncomeItems.length === 3) {
            buttonPlusIncome.style.display = 'none';
        };
    },

    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            };

        });
    },
    getIncome: function() {
        inputIncomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        })
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = inputAdditionalExpenseAmount.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function() {
        inputAdditionalIncomeItems.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        })
    },
    showResult: function() {
        resultBudgetMonth.value = appData.budgetMonth;
        resultBudgetDay.value = appData.budgetDay;
        resultExpensesMonth.value = appData.expensesMonth;
        resultAdditionalExpenses.value = appData.addExpenses.join(', ');
        resultAdditionalIncome.value = appData.addIncome.join(', ');
        resultTargetMonth.value = appData.getTargetMonth();
        inputPeriodSelect.addEventListener('input', () => {
            resultIncomePeriod.value = appData.calcSaveMoney();
        });
        resultIncomePeriod.value = appData.calcSaveMoney();

    },
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Коммунальные платежы, продукты, кружки, проезд');
        appData.addExpenses = addExpenses.toLowerCase().split(',').map(val => val.trim());
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil(inputTargetAmount.value / appData.budgetMonth);
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if ((appData.budgetDay >= 600) && (appData.budgetDay < 1200)) {
            return 'У вас средний уровень дохода';
        } else if ((appData.budgetDay >= 0) && (appData.budgetDay < 600)) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что-то пошло не так';
        }
    },
    purposeAchieved: function() {
        if (appData.getTargetMonth() > 0) {
            console.log('Цель будет достигнута за: ' + appData.getTargetMonth() + ' месяцев');
        } else {
            console.log('Цель не будет достигнута');
        }
    },
    getInfoDeposit: function() {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while (!isNumber(appData.percentDeposit));
            appData.percentDeposit = +appData.percentDeposit;
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while (!isNumber(appData.moneyDeposit));
            appData.moneyDeposit = +appData.moneyDeposit;

        }
    },
    setPeriod: function() {
        periodAmount.innerHTML = inputPeriodSelect.value;
    },
    calcSaveMoney: function() {
        return appData.budgetMonth * inputPeriodSelect.value;
    }

}

buttonCalc.disabled = true;
console.log(buttonCalc.disabled);
buttonPlusExpense.addEventListener('click', appData.addExpensesBlock);
buttonPlusIncome.addEventListener('click', appData.addIncomeBlock);
inputPeriodSelect.addEventListener('input', appData.setPeriod);
inputSalaryAmount.addEventListener('input', () => {
    if (inputSalaryAmount.value.trim() !== '' && isNumber(inputSalaryAmount.value.trim())) {
        buttonCalc.disabled = false;
        buttonCalc.addEventListener('click', appData.start);
    } else {
        buttonCalc.disabled = true;
    }
})




// appData.purposeAchieved();