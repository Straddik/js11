// 1) объявление переменных и присвоение значений по заданию
let money = 60000,
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
addExpenses = addExpenses.toLowerCase().split(',')
console.log("После приведения строки addExpenses к нижнему регистру и преобразованию в массив : " + addExpenses);

let budgetDay = money / 30;

console.log("Дневной бюджет равен " + budgetDay);