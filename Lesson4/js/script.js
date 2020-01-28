"use strict";
let income = "Profi.ru",
    addExpenses = "Коммунальные платежы, продукты, кружки, проезд",
    deposit = true,
    mission = 140000,
    period = 5,
    money = +prompt('Введите ваш месячный доход');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

const showTypeOf = function(data) {
    console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

addExpenses = addExpenses.toLowerCase().split(', ');
console.log("После приведения строки addExpenses к нижнему регистру и преобразованию в массив : " + addExpenses);

let expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите cледующую обязательную статью расходов?'),
    amount2 = +prompt('Во сколько это обойдется?');

const getExpensesMonth = function(expen1, expen2) {
    return expen1 + expen2;
}
console.log('Расходы за месяц: ' + getExpensesMonth(amount1, amount2));

const getAccumulatedMonth = function(incomeF, summOfExpenses) {
    return incomeF - summOfExpenses;
}

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

const getTargetMonth = function(budget) {
    return Math.ceil(mission / budget);
}

console.log('Цель будет достигнута за: ' + getTargetMonth(accumulatedMonth) + ' месяцев');
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