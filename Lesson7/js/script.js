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
    mission: 100000,
    period: 3,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Коммунальные платежы, продукты, кружки, проезд');
        appData.addExpenses = addExpenses.toLowerCase().split(',').map(val => val.trim());
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let keys,
            value;
        for (let i = 0; i < 2; i++) {
            keys = prompt('Введите обязательную статью расходов?', 'детский садик');
            do {
                value = prompt('Во сколько это обойдется?', '4000');
            }
            while (!isNumber(value));
            appData.expenses[keys] = value;

        }
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
    }

}

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.getStatusIncome());
appData.purposeAchieved();
console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log('свойство: ' + key + '; значение: ' + appData[key]);
}