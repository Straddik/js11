"use strict";
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let income = "Profi.ru",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Коммунальные платежы, продукты, кружки, проезд'),
    deposit,
    mission = 140000,
    money;
addExpenses = addExpenses.toLowerCase().split(', ');
console.log("После приведения строки addExpenses к нижнему регистру и преобразованию в массив : " + addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');

const start = function() {
    do {
        money = prompt('Введите ваш месячный доход', 60000);
    }
    while (!isNumber(money));
    money = +money;
}

start();

const showTypeOf = function(data) {
    console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


let expenses = [];

const getExpensesMonth = function() {
    let sum = 0,
        cash;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?', 'детский садик');
        do {
            cash = prompt('Во сколько это обойдется?', '4000');
        }
        while (!isNumber(cash));
        sum += +cash;
    }
    return sum;
}

let expensesAmount = getExpensesMonth()
console.log('Расходы за месяц: ' + expensesAmount);

const getAccumulatedMonth = function(incomeF, summOfExpenses) {
    return incomeF - summOfExpenses;
}

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

const getTargetMonth = function(budget) {
    return Math.ceil(mission / budget);
}

const purposeAchieved = function() {
    if (getTargetMonth(accumulatedMonth) > 0) {
        console.log('Цель будет достигнута за: ' + getTargetMonth(accumulatedMonth) + ' месяцев');
    } else {
        console.log('Цель не будет достигнута');
    }
}
purposeAchieved();

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log("Дневной бюджет равен " + budgetDay);

const getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if ((budgetDay >= 600) && (budgetDay < 1200)) {
        return 'У вас средний уровень дохода';
    } else if ((budgetDay >= 0) && (budgetDay < 600)) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
        return 'Что-то пошло не так';
    }
}

console.log(getStatusIncome());