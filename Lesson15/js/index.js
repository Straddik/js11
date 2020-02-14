"use strict";
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const buttonCalc = document.getElementById('start'),
    buttonPlusIncome = document.getElementsByTagName('button')[0],
    buttonPlusExpense = document.getElementsByTagName('button')[1],
    buttonCansel = document.getElementById('cancel'),
    checkbox = document.querySelector('#deposit-check'),
    resultBudgetMonth = document.getElementsByClassName('result-total')[0],
    resultBudgetDay = document.getElementsByClassName('result-total')[1],
    resultExpensesMonth = document.getElementsByClassName('result-total')[2],
    resultAdditionalIncome = document.getElementsByClassName('result-total')[3],
    resultAdditionalExpenses = document.getElementsByClassName('result-total')[4],
    resultIncomePeriod = document.getElementsByClassName('result-total')[5],
    resultTargetMonth = document.getElementsByClassName('result-total')[6],
    inputSalaryAmount = document.querySelector('.salary-amount'),
    inputAdditionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    inputAdditionalExpenseAmount = document.querySelector('.additional_expenses-item'),
    inputDepositAmount = document.querySelector('.deposit-amount'),
    inputDepositPercent = document.querySelector('.deposit-percent'),
    inputTargetAmount = document.querySelector('.target-amount'),
    inputPeriodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');
let inputIncomeItems = document.querySelectorAll('.income-items'),
    inputIncomeAmounts = document.querySelectorAll('.income-amount'),
    inputIncomeTitles = document.querySelectorAll('.income-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    inputExpensesTitle = document.querySelectorAll('.expenses-title'),
    inputExpensesAmount = document.querySelectorAll('.expenses-amount');


class AppData {
    constructor() {
        this.budget = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.deposit = false;
        this.percentDeposit = 0;
    };
    start() {
        if (buttonCalc.style.display !== 'none') {
            this.budget = +inputSalaryAmount.value;
            this.getExpenses();
            this.getInfoDeposit();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getIncome();
            this.getBudget();
            this.showResult();
        };
    };
    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.childNodes.forEach((item) => {
            item.value = '';
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpense);
        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach(item => item.querySelector('.expenses-amount').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d]/g, '');
        }));
        expensesItems.forEach(item => item.querySelector('.expenses-title').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^а-я А-Я a-z A-Z \W]/g, '');
        }));
        if (expensesItems.length === 3) {
            buttonPlusExpense.style.display = 'none';
        };
    };
    addIncomeBlock() {
        const cloneIncomeItem = inputIncomeItems[0].cloneNode(true);
        cloneIncomeItem.childNodes.forEach((item) => {
            item.value = '';
        });
        inputIncomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
        inputIncomeItems = document.querySelectorAll('.income-items');
        inputIncomeItems.forEach(item => item.querySelector('.income-amount').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d]/g, '');
        }));
        inputIncomeItems.forEach(item => item.querySelector('.income-title').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^а-я А-Я \W]/g, '');
        }));
        if (inputIncomeItems.length === 3) {
            buttonPlusIncome.style.display = 'none';
        };
    };
    getExpenses() {
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            };
<<<<<<< HEAD
            if (items.length === 3 && stringStart === 'income') {
                buttonPlusIncome.style.display = 'none';
            };
        });
        if (elem.parentNode.className === 'income') {
            const cloneIncomeItem = inputIncomeItems[0].cloneNode(true);
            cloneIncomeItem.childNodes.forEach((item) => {
                item.value = '';
            });
            inputIncomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
            render(cloneIncomeItem);
        } else {
            const cloneExpensesItem = expensesItems[0].cloneNode(true);
            cloneExpensesItem.childNodes.forEach((item) => {
                item.value = '';
            });
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpense);
            render(cloneExpensesItem);
        }
=======
        });
>>>>>>> lesson_15_main
    };

    getIncome() {
        inputIncomeItems.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
        })
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    };
    getAddExpenses() {
        const addExpenses = inputAdditionalExpenseAmount.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        })
    };
    getAddIncome = function() {
        inputAdditionalIncomeItems.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        })
    };
    showResult() {
        const _this = this;
        resultBudgetMonth.value = this.budgetMonth;
        resultBudgetDay.value = this.budgetDay;
        resultExpensesMonth.value = this.expensesMonth;
        resultAdditionalExpenses.value = this.addExpenses.join(', ');
        resultAdditionalIncome.value = this.addIncome.join(', ');
        resultTargetMonth.value = this.getTargetMonth();
        inputPeriodSelect.addEventListener('input', () => {
            resultIncomePeriod.value = _this.calcSaveMoney();
        });
        resultIncomePeriod.value = this.calcSaveMoney();

    };
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    };
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    };
    getTargetMonth = function() {
        return Math.ceil(inputTargetAmount.value / this.budgetMonth);
    };
    getInfoDeposit() {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while (!isNumber(this.percentDeposit));
            this.percentDeposit = +this.percentDeposit;
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while (!isNumber(appthisata.moneyDeposit));
            this.moneyDeposit = +this.moneyDeposit;

        }
    };
    setPeriod() {
        periodAmount.innerHTML = inputPeriodSelect.value;
    };
    calcSaveMoney() {
        return this.budgetMonth * inputPeriodSelect.value;
    };
    reset() {
        inputSalaryAmount.disabled = false;
        inputSalaryAmount.value = '';
        inputTargetAmount.disabled = false;
        inputTargetAmount.value = '';
        inputAdditionalExpenseAmount.disabled = false;
        inputAdditionalExpenseAmount.value = '';
        inputAdditionalIncomeItems.forEach((item) => {
            item.disabled = false;
            item.value = '';
        });
        inputIncomeAmounts.forEach((item) => {
            item.disabled = false;
            item.value = '';
        });
        inputIncomeTitles.forEach((item) => {
            item.disabled = false;
            item.value = '';
        });
        inputExpensesTitle.forEach((item) => {
            item.disabled = false;
            item.value = '';
        });
        inputExpensesAmount.forEach((item) => {
            item.disabled = false;
            item.value = '';
        });
        buttonCansel.style.display = 'none';
        buttonCalc.style.display = 'block';
        buttonCansel.disabled = true;
        buttonCalc.disabled = true;
        buttonPlusExpense.disabled = false;
        buttonPlusIncome.disabled = false;
        buttonPlusExpense.style.display = 'block';
        buttonPlusIncome.style.display = 'block';
        resultBudgetMonth.value = '';
        resultBudgetDay.value = '';
        resultExpensesMonth.value = '';
        resultAdditionalExpenses.value = '';
        resultAdditionalIncome.value = '';
        resultTargetMonth.value = '';
        resultIncomePeriod.value = '';
        inputIncomeItems = document.querySelectorAll('.income-items');
        if (inputIncomeItems[1]) inputIncomeItems[1].remove();
        if (inputIncomeItems[2]) inputIncomeItems[2].remove();
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems[1]) expensesItems[1].remove();
        if (expensesItems[2]) expensesItems[2].remove();
        inputPeriodSelect.disabled = false;
        inputPeriodSelect.value = '1';
        this.setPeriod();
        Object.assign(this, this.constructor);

    };
    eventsListeners() {
        const _this = this;
        buttonCansel.disabled = true;
        buttonCalc.disabled = true;
        buttonPlusExpense.addEventListener('click', _this.addExpensesBlock);
        buttonPlusIncome.addEventListener('click', _this.addIncomeBlock);
        inputPeriodSelect.addEventListener('input', _this.setPeriod);
        const inputListen = function() {
            if (inputSalaryAmount.value.trim() !== '' && isNumber(inputSalaryAmount.value.trim())) {
                buttonCalc.disabled = false;
                buttonCalc.addEventListener('click', _this.start.bind(_this));
                buttonCalc.addEventListener('click', buttonCalcListen);
            } else {
                inputSalaryAmount.value = inputSalaryAmount.value.replace(/[^\d]/g, '');
                buttonCalc.disabled = true;
            }
        };
        const buttonCalcListen = function() {
            inputSalaryAmount.disabled = true;
            inputTargetAmount.disabled = true;
            inputAdditionalExpenseAmount.disabled = true;
            inputAdditionalIncomeItems.forEach((item) => item.disabled = true);
            inputIncomeAmounts = document.querySelectorAll('.income-amount');
            inputIncomeTitles = document.querySelectorAll('.income-title');
            inputExpensesTitle = document.querySelectorAll('.expenses-title');
            inputExpensesAmount = document.querySelectorAll('.expenses-amount');
            inputIncomeAmounts.forEach((item) => item.disabled = true);
            inputIncomeTitles.forEach((item) => item.disabled = true);
            inputExpensesTitle.forEach((item) => item.disabled = true);
            inputExpensesAmount.forEach((item) => item.disabled = true);
            buttonCansel.style.display = 'block';
            buttonCansel.disabled = false;
            buttonCalc.style.display = 'none';
            buttonPlusExpense.disabled = true;
            buttonPlusIncome.disabled = true;
            buttonCansel.addEventListener('click', _this.reset.bind(_this));
            inputPeriodSelect.disabled = true;

        };
        inputSalaryAmount.addEventListener('input', inputListen);
        inputTargetAmount.addEventListener('input', () => {
            inputTargetAmount.value = inputTargetAmount.value.replace(/[^\d]/g, '');
        });
        inputAdditionalExpenseAmount.addEventListener('input', () => {
            inputAdditionalExpenseAmount.value = inputAdditionalExpenseAmount.value.replace(/[^а-я А-Я a-z A-Z \W]/g, '');
        });
        inputAdditionalIncomeItems.forEach((item) => item.addEventListener('input', () => {
            item.value = item.value.replace(/[^а-я А-Я a-z A-Z \W]/g, '');
        }));
        inputIncomeItems.forEach(item => item.querySelector('.income-amount').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d]/g, '');
        }));
        inputIncomeItems.forEach(item => item.querySelector('.income-title').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^а-я А-Я a-z A-Z \W]/g, '');
        }));
        expensesItems.forEach(item => item.querySelector('.expenses-amount').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d]/g, '');
        }));
        expensesItems.forEach(item => item.querySelector('.expenses-title').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^а-я А-Я a-z A-Z \W]/g, '');
        }));
    };

};


const appData = new AppData();
appData.eventsListeners();