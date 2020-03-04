    //Настройка калькулятора
    const calculator = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcSelect = calcBlock.childNodes[1],
            calcSquare = calcBlock.childNodes[3],
            calcCount = calcBlock.childNodes[5],
            calcDay = calcBlock.childNodes[7],
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcSelect.options[calcSelect.selectedIndex].value,
                squareValue = +calcSquare.value;
            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            };
            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }
            if (typeValue && squareValue) {
                total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
            };
            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (event) => {
            let target = event.target;
            if (target === calcSelect || target === calcSquare || target === calcCount || target === calcDay) {
                countSum();
            }
        });
    };
    export default calculator;