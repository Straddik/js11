"use strict";
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
const regDigits = /[^\d]/g;
const regLetters = /[^а-я А-Я a-z A-Z \W]/g;
const setCookie = function(key, value, year, month, day) {
    let cookieString = `${encodeURI(key)}=${encodeURI(value)}`;
    if (year) {
        const expires = new Date(year, month, day);
        cookieString += `;expires=${expires.toUTCString()}`;
    }
    document.cookie = cookieString;
};

const buttonCalc = document.getElementById('start'),
    buttonPlusIncome = document.getElementsByTagName('button')[0],
    buttonPlusExpense = document.getElementsByTagName('button')[1],
    buttonCansel = document.getElementById('cancel'),
    checkboxDeposit = document.querySelector('#deposit-check'),
    selectBank = document.querySelector('.deposit-bank'),
    inputDepositAmount = document.querySelector('.deposit-amount'),
    inputDepositPercent = document.querySelector('.deposit-percent'),
    result = document.querySelectorAll('.result-total'),
    resultBudgetMonth = result[0],
    resultBudgetDay = result[1],
    resultExpensesMonth = result[2],
    resultAdditionalIncome = result[4],
    resultAdditionalExpenses = result[3],
    resultIncomePeriod = result[5],
    resultTargetMonth = result[6],
    inputSalaryAmount = document.querySelector('.salary-amount'),
    inputAdditionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    inputAdditionalExpenseAmount = document.querySelector('.additional_expenses-item'),
    inputTargetAmount = document.querySelector('.target-amount'),
    inputPeriodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');
let inputIncomeItems = document.querySelectorAll('.income-items'),
    inputIncomeAmounts = document.querySelectorAll('.income-amount'),
    inputIncomeTitles = document.querySelectorAll('.income-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    inputExpensesTitle = document.querySelectorAll('.expenses-title'),
    inputExpensesAmount = document.querySelectorAll('.expenses-amount');
// Переименование классов для удобной работы с local и cookie
inputAdditionalIncomeItems.forEach((item, index) => item.className += index);
console.log(result);

const memory = new Map();
const addEveryWhere = function(elem) {
    if (elem.className) {
        memory[elem.className] = elem.value;
        memory.set(elem.className, elem.value);
    } else {
        memory[elem.id] = elem.value;
        memory.set(elem.id, elem.value);
    };
    localStorage.setItem('memory', JSON.stringify(memory));
    memory.forEach((val, key) => {
        setCookie(key, val, 2021, 1, 1);
    });
};
const removeFromEveryWhere = function(elem) {
    memory.delete(elem.className);
    delete memory[elem.className];
    localStorage.setItem('memory', JSON.stringify(memory));
    setCookie(elem.className, memory.get(elem.className), 2018, 1, 1);
};
// 
const removeAllCookieAndStorage = function() {
    memory.forEach((val, key) => setCookie(key, val, 2019, 1, 1));
    localStorage.removeItem('memory');
    memory.clear();
    for (let k in memory) {
        delete memory[k];
    }
}




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
        this.moneyDeposit = 0;
    };
    start() {
        if (buttonCalc.style.display !== 'none') {
            this.budget = +inputSalaryAmount.value;
            this.getInExp();
            this.getInfoDeposit();
            this.getAddIncExp();
            this.getExpensesMonth();
            this.getInfoDeposit();
            this.getBudget();
            this.showResult();
        };
    };
    addInExBlock(elem) {
        const render = (elem) => {
            const stringStart = elem.className.split('-')[0];
            const items = document.querySelectorAll(`.${stringStart}-items`);
            items.forEach((item, index) => item.querySelector(`.${stringStart}-amount`).addEventListener('input', (e) => {
                const arr = [...e.target.classList];
                if (!arr.includes('' + index)) {
                    e.target.className += ' ' + index;
                };
                e.target.value = e.target.value.replace(regDigits, '');
                addEveryWhere(e.target);
            }));
            items.forEach((item, index) => item.querySelector(`.${stringStart}-title`).addEventListener('input', (e) => {
                const arr = [...e.target.classList];
                if (!arr.includes('' + index)) {
                    e.target.className += ' ' + index;
                };
                e.target.value = e.target.value.replace(regLetters, '');
                addEveryWhere(e.target);
            }));
            if (items.length === 3 && stringStart === 'expenses') {
                buttonPlusExpense.style.display = 'none';
                buttonPlusExpense.value = 'false';
            };
            if (items.length === 3 && stringStart === 'income') {
                buttonPlusIncome.style.display = 'none';
                buttonPlusIncome.value = 'false';
            };
        };
        if (elem.parentNode.className === 'income') {
            const cloneIncomeItem = inputIncomeItems[0].cloneNode(true);
            cloneIncomeItem.childNodes.forEach((item) => {
                item.value = '';
                if (item.className) item.className.replace(/\d|\s/, '');
            });
            inputIncomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
            render(cloneIncomeItem);
        } else {
            const cloneExpensesItem = expensesItems[0].cloneNode(true);
            cloneExpensesItem.childNodes.forEach((item) => {
                item.value = '';
                if (item.className) item.className.replace(/\d|\s/, '');
            });
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpense);
            render(cloneExpensesItem);
        }
    };
    getInExp() {
        const render = (item) => {
            const startStr = item.className.split('-')[0];
            const title = item.querySelector(`.${startStr}-title`).value;
            const amount = item.querySelector(`.${startStr}-amount`).value;
            if (title !== '' && amount !== '') {
                this[startStr][title] = +amount;
            }
        }
        inputIncomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');
        inputIncomeItems.forEach(render);
        expensesItems.forEach(render);
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        };
    };
    getAddIncExp() {
        const render = (item) => {
            if (item.className === 'additional_income-item0' | item.className === 'additional_income-item1') {
                item = item.value.trim();
                if (item !== '') {
                    this.addExpenses.push(item);
                };
            } else {
                item = item.trim();
                if (item !== '') {
                    this.addIncome.push(item);
                }
            };

        };
        const addExpenses = inputAdditionalExpenseAmount.value.split(',');
        addExpenses.forEach(render);
        inputAdditionalIncomeItems.forEach(render);

    };
    showResult() {
        const _this = this;
        resultBudgetMonth.value = this.budgetMonth;
        addEveryWhere(resultBudgetMonth);
        resultBudgetDay.value = this.budgetDay;
        addEveryWhere(resultBudgetDay);
        resultExpensesMonth.value = this.expensesMonth;
        addEveryWhere(resultExpensesMonth);
        resultAdditionalExpenses.value = this.addExpenses.join(', ');
        addEveryWhere(resultAdditionalExpenses);
        resultAdditionalIncome.value = this.addIncome.join(', ');
        addEveryWhere(resultAdditionalIncome);
        resultTargetMonth.value = this.getTargetMonth();
        addEveryWhere(resultTargetMonth);
        // inputPeriodSelect.addEventListener('input', () => {
        //     resultIncomePeriod.value = _this.calcSaveMoney();
        //     addEveryWhere(resultIncomePeriod);
        // });
        resultIncomePeriod.value = this.calcSaveMoney();
        addEveryWhere(resultIncomePeriod);

    };
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    };
    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    };
    getTargetMonth = function() {
        return Math.ceil(inputTargetAmount.value / this.budgetMonth);
    };
    setPeriod() {
        periodAmount.innerHTML = inputPeriodSelect.value;
        addEveryWhere(inputPeriodSelect);
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
        buttonCalc.value = true;
        addEveryWhere(buttonCalc);
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
        periodAmount.innerHTML = inputPeriodSelect.value;
        checkboxDeposit.disabled = false;
        checkboxDeposit.checked = false;
        inputDepositAmount.disabled = false;
        inputDepositPercent.disabled = false;
        selectBank.disabled = false;
        this.depositHandler();
        let elem = {
            className: "isLoad",
            value: "false"
        };
        addEveryWhere(elem);
        Object.assign(this, new this.constructor);
        removeAllCookieAndStorage();

    };
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = inputDepositPercent.value;
            this.moneyDeposit = inputDepositAmount.value;
        }
    };
    changePercent() {
        const valueSelect = this.value;
        addEveryWhere(selectBank);
        const replacement = function() {
            inputDepositPercent.value = inputDepositPercent.value.replace(regDigits, '');
            inputDepositPercent.value = inputDepositPercent.value.replace(/\d{3,}|00|^0/g, '');
            addEveryWhere(inputDepositPercent);
        };
        if (valueSelect !== 'other') {
            inputDepositPercent.value = valueSelect;
            inputDepositPercent.style.display = 'none';
        } else {
            inputDepositPercent.style.display = 'inline-block';
            addEveryWhere(inputDepositPercent);
            inputDepositPercent.addEventListener('input', replacement);
        }
    };
    depositHandler() {
        if (checkboxDeposit.checked) {
            checkboxDeposit.value = 'on';
            addEveryWhere(checkboxDeposit);
            selectBank.style.display = 'inline-block';
            inputDepositAmount.style.display = 'inline-block';
            inputDepositAmount.addEventListener('input', () => {
                inputDepositAmount.value = inputDepositAmount.value.replace(regDigits, '');
                addEveryWhere(inputDepositAmount);
            })
            this.deposit = true;
            selectBank.addEventListener('change', this.changePercent);
        } else {
            checkboxDeposit.value = 'off';
            addEveryWhere(checkboxDeposit);
            selectBank.style.display = 'none';
            inputDepositAmount.style.display = 'none';
            inputDepositPercent.style.display = 'none';
            selectBank.value = "";
            inputDepositAmount.value = "";
            this.deposit = false;
            removeFromEveryWhere(inputDepositAmount);
            removeFromEveryWhere(selectBank);
            removeFromEveryWhere(inputDepositPercent);
            selectBank.removeEventListener('change', this.changePercent)
        };
    };
    checkingStoragesAtStart() {
        if (document.cookie) {
            let cash = document.cookie.split('; ');
            cash = cash.map((val) => {
                val = val.split('=');
                val = val.map((item) => {
                    item = decodeURI(item);
                    return item;
                });
                memory.set(val[0], val[1]);
                return val;
            });
        };
        if (localStorage.memory) {
            const cash = JSON.parse(localStorage.getItem("memory"));
            for (let key in cash) {
                memory[key] = cash[key];
            };
        };

    };
    checkingStoragesEveryMoment() {
        if (document.cookie && localStorage.memory) {
            let cash2 = JSON.parse(localStorage.getItem("memory"));
            for (let key in cash2) {
                let cash1 = document.cookie.split('; ');
                let cash3 = false;
                for (let i = 0; i < cash1.length; i++) {
                    cash1[i] = cash1[i].split('=').map((item) => {
                        item = decodeURI(item);
                        return item;
                    });
                    if (cash1[i][0] === key && cash1[i][1] === cash2[key]) {
                        cash3 = true;
                        break;
                    };
                };
                if (!cash3) {
                    console.log(key, cash2[key]);
                    AppData.prototype.reset();
                    break;
                }
            };
        } else if (!document.cookie && localStorage.memory) {
            AppData.prototype.reset();

        };
    };
    buildingFormsAtStart() {
        memory.forEach((val, key) => {
            let block = 0;
            let cash = key.split(' ').filter(item => item !== "btn_plus" && item !== "result-total" &&
                item !== "0" && item !== "1" && item !== "2").join();
            if (cash) {
                if (cash === "start" || cash === "deposit-check") {
                    block = document.querySelector("#" + cash);
                    if (cash === "deposit-check" && val == 'on') {
                        block.checked = true;
                        this.depositHandler();
                        block.value = val;
                    } else {
                        block.value = val;
                    };
                } else if (cash === 'isLoad' && val === 'true') {
                    const clickButtonCalc = new Event("click", { 'detail': buttonCalc, bubbles: true });
                    buttonCalc.dispatchEvent(clickButtonCalc);
                } else if (cash === 'isLoad' && val === 'false') {
                    return;
                } else if (cash === 'income-title' || cash === 'expenses-title') {
                    if (key.match(/(?=\d)[^1 2]/)) {
                        block = document.querySelectorAll("." + cash)[1];
                        block.value = val;
                    } else if (key.match(/1/)) {
                        block = document.querySelectorAll("." + cash)[1];
                        this.addInExBlock(block.parentNode);
                        block = document.querySelectorAll("." + cash)[2];
                        block.value = val;
                    } else if (key.match(/2/)) {
                        block = document.querySelectorAll("." + cash)[2];
                        this.addInExBlock(block.parentNode);
                        block = document.querySelectorAll("." + cash)[3];
                        block.value = val;
                    }
                } else if (cash === 'income-amount' || cash === 'expenses-amount') {
                    if (key.match(/(?=\d)[^1 2]/)) {
                        block = document.querySelectorAll("." + cash)[0];
                        block.value = val;
                    } else if (key.match(/1/)) {
                        block = document.querySelectorAll("." + cash)[1];
                        console.log(block);
                        block.value = val;
                    } else if (key.match(/2/)) {
                        block = document.querySelectorAll("." + cash)[2];
                        block.value = val;
                    }
                } else if (cash === 'deposit-bank' && val === 'other') {
                    block = document.querySelector("." + cash);
                    block.value = val;
                    inputDepositPercent.style.display = 'inline-block';
                } else if (cash === 'salary-amount' && val.trim()) {
                    block = document.querySelector("." + cash);
                    block.value = val;
                    const inputSalaryChange = new Event("input", { 'detail': inputSalaryAmount, bubbles: true });
                    inputSalaryAmount.dispatchEvent(inputSalaryChange);
                } else {
                    block = document.querySelector("." + cash);
                    block.value = val;
                };
            };
        });
        this.setPeriod();
    };

    eventsListeners() {
        this.checkingStoragesAtStart();
        const _this = this;
        setInterval(this.checkingStoragesEveryMoment, 5000);
        buttonCansel.disabled = true;
        buttonCalc.disabled = true;
        buttonCalc.value = true;
        addEveryWhere(buttonCalc);
        buttonPlusExpense.value = 'true';
        buttonPlusIncome.value = 'true';
        buttonPlusExpense.addEventListener('click', (e) => _this.addInExBlock(e.target));
        buttonPlusIncome.addEventListener('click', (e) => _this.addInExBlock(e.target));
        inputPeriodSelect.addEventListener('input', _this.setPeriod);
        const inputListen = function() {
            if (inputSalaryAmount.value.trim() !== '' && isNumber(inputSalaryAmount.value.trim())) {
                buttonCalc.disabled = false;
                buttonCalc.value = false;
                addEveryWhere(buttonCalc);
                addEveryWhere(inputSalaryAmount);
                buttonCalc.addEventListener('click', _this.start.bind(_this));
                buttonCalc.addEventListener('click', buttonCalcListen);
            } else {
                inputSalaryAmount.value = inputSalaryAmount.value.replace(regDigits, '');
                buttonCalc.disabled = true;
                buttonCalc.value = true;
                addEveryWhere(inputSalaryAmount);
            }
        };
        const buttonCalcListen = function() {
            let elem = {
                className: "isLoad",
                value: "true"
            };
            addEveryWhere(elem);
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
            buttonCalc.disabled = true;
            buttonCalc.value = false;
            addEveryWhere(buttonCalc);
            buttonPlusExpense.disabled = true;
            buttonPlusIncome.disabled = true;
            checkboxDeposit.disabled = true;
            inputDepositAmount.disabled = true;
            inputDepositPercent.disabled = true;
            selectBank.disabled = true;
            buttonCansel.addEventListener('click', _this.reset.bind(_this));
            inputPeriodSelect.disabled = true;

        };
        inputSalaryAmount.addEventListener('input', inputListen);
        inputTargetAmount.addEventListener('input', () => {
            inputTargetAmount.value = inputTargetAmount.value.replace(regDigits, '');
            addEveryWhere(inputTargetAmount);
        });
        inputAdditionalExpenseAmount.addEventListener('input', () => {
            inputAdditionalExpenseAmount.value = inputAdditionalExpenseAmount.value.replace(regLetters, '');
            addEveryWhere(inputAdditionalExpenseAmount);
        });
        inputAdditionalIncomeItems.forEach((item) => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(regLetters, '');
                addEveryWhere(item);
            })
        });
        inputIncomeItems.forEach((item, index) => {
            item.querySelector('.income-amount').addEventListener('input', (e) => {
                const arr = [...e.target.classList];
                if (!arr.includes('' + index)) {
                    e.target.className += ' ' + index;
                };
                e.target.value = e.target.value.replace(regDigits, '');
                addEveryWhere(e.target);
            })
        });
        inputIncomeItems.forEach((item, index) => {
            item.querySelector('.income-title').addEventListener('input', (e) => {
                const arr = [...e.target.classList];
                if (!arr.includes('' + index)) {
                    e.target.className += ' ' + index;
                };
                e.target.value = e.target.value.replace(regLetters, '');
                addEveryWhere(e.target);
            })
        });
        expensesItems.forEach((item, index) => {
            item.querySelector('.expenses-amount').addEventListener('input', (e) => {
                const arr = [...e.target.classList];
                if (!arr.includes('' + index)) {
                    e.target.className += ' ' + index;
                };
                e.target.value = e.target.value.replace(regDigits, '');
                addEveryWhere(e.target);
            })
        });
        expensesItems.forEach((item, index) => {
            item.querySelector('.expenses-title').addEventListener('input', (e) => {
                const arr = [...e.target.classList];
                if (!arr.includes('' + index)) {
                    e.target.className += ' ' + index;
                };
                e.target.value = e.target.value.replace(regLetters, '');
                addEveryWhere(e.target);
            })
        });
        checkboxDeposit.addEventListener('change', this.depositHandler.bind(this));
        this.buildingFormsAtStart();
    };

};


const appData = new AppData();
appData.eventsListeners();