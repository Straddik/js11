// 1) объявление переменных и присвоение значений по заданию
let money,
    income = "Profi.ru",
    addExpenses = "Коммунальные платежы, продукты, кружки, проезд",
    deposit = true,
    mission = 140000,
    period = 5;

// 2) вывод в консоль
console.log("Тип переменной money: " + typeof(money));
console.log("Тип переменной income: " + typeof(income));
console.log("Тип переменной deposit: " + typeof(deposit));
console.log("Длина строки addExpenses: " + addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log(`Цель заработать ${mission} рублей`);
addExpenses = addExpenses.toLowerCase().split(', ');
console.log("После приведения строки addExpenses к нижнему регистру и преобразованию в массив : " + addExpenses);

// 3) Запрос месячного дохода, расходы, депозита, расходы
money = prompt('Введите ваш месячный доход');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
expenses1 = prompt('Введите обязательную статью расходов?');
amount1 = prompt('Во сколько это обойдется?');
expenses2 = prompt('Введите cледующую обязательную статью расходов?');
amount2 = prompt('Во сколько это обойдется?');
let budgetMonth = parseInt(money) - parseInt(amount1) - parseInt(amount2);
console.log('Цель будет достигнута за: ' + Math.ceil(mission / budgetMonth) + 'месяцев');
let budgetDay = Math.floor(budgetMonth / 30);
console.log("Дневной бюджет равен " + budgetDay);

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if ((budgetDay >= 600) && (budgetDay < 1200)) {
    console.log('У вас средний уровень дохода');
} else if ((budgetDay >= 0) && (budgetDay < 600)) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}