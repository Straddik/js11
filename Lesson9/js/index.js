"use strict";
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;
const start = function() {
    do {
        money = prompt('Введите ваш месячный доход', 60000);
    }
    while (!isNumber(money));
    money = +money;
}

start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    mission: 100000,
    period: 3,
    asking: function() {

        if (confirm('Eсть ли у вас дополнительный источник заработка?')) {
            let itemIncome;
            let cashIncome;
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'репетиторство');
                console.log(itemIncome.trim());
            }
            while (isNumber(itemIncome) || itemIncome.trim() === '');

            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            }
            while (!isNumber(cashIncome));

            appData.income[itemIncome] = +cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Коммунальные платежы, продукты, кружки, проезд');
        appData.addExpenses = addExpenses.toLowerCase().split(',').map(val => val.trim());
        let keys,
            value;
        for (let i = 0; i < 2; i++) {
            do {
                keys = prompt('Введите обязательную статью расходов?', 'детский садик');
            }
            while (isNumber(keys) || keys.trim() === '');

            do {
                value = prompt('Во сколько это обойдется?', '4000');
            }
            while (!isNumber(value));
            appData.expenses[keys] = value;

        };
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.budgetMonth);
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
    calcSaveMoney: function() {
        return appData.budgetMonth * appData.period;
    }

}

appData.asking();
appData.getInfoDeposit();
appData.getExpensesMonth();
appData.getBudget();
console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.getStatusIncome());
appData.purposeAchieved();
console.log(appData.addExpenses.map(val => val[0].toUpperCase() + val.substr(1)).join(', '));
console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log('свойство: ' + key + '; значение: ' + appData[key]);
}
let buttonCalc = document.getElementById('start'),
    buttonPlusIncome = document.getElementsByTagName('button')[0],
    buttonPlusExpense = document.getElementsByTagName('button')[1],
    checkbox = document.querySelector('#deposit-check'),
    additionalIncomeItem1 = document.querySelectorAll('.additional_income-item')[0],
    additionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1],
    resultBudgetMonth = document.getElementsByClassName('result-total')[0],
    resultBudgetDay = document.getElementsByClassName('result-total')[1],
    resultExpensesMonth = document.getElementsByClassName('result-total')[2],
    resultAdditionalIncome = document.getElementsByClassName('result-total')[3],
    resultAdditionalExpenses = document.getElementsByClassName('result-total')[4],
    resultIncomePeriod = document.getElementsByClassName('result-total')[5],
    resultTargetMonth = document.getElementsByClassName('result-total')[6],
    inputSalaryAmount = document.querySelector('.salary-amount'),
    inputIncomeTitle = document.querySelector('.income-title'),
    inputIncomeAmount = document.querySelector('.income-amount'),
    inputExpensesTitle = document.querySelector('.expenses-title'),
    inputExpensesAmount = document.querySelector('.expenses-amount'),
    inputAdditionalExpenseAmount = document.querySelector('.additional_expenses-item'),
    inputDepositAmount = document.querySelector('.deposit-amount'),
    inputDepositPercent = document.querySelector('.deposit-percent'),
    inputTargetAmount = document.querySelector('.target-amount'),
    inputPeriodSelect = document.querySelector('.period-select');