'use strict';
window.addEventListener('DOMContentLoaded', () => {
    //таймер
    function countTimer() {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            dateStop = new Date();
        dateStop = new Date(dateStop.getFullYear(), dateStop.getMonth(), dateStop.getDate() + 1, 0, 0, 0);


        function getTimeRemaining() {
            let dateNow = new Date();
            let timeRemaining = (dateStop - dateNow.getTime()) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(((timeRemaining / 60) / 60) % 24);
            return { timeRemaining, hours, minutes, seconds };
        };

        function updateClock() {
            let timer = getTimeRemaining();
            if (timer.timeRemaining <= 0) {
                clearInterval(id);
                dateStop = new Date();
                dateStop = new Date(dateStop.getFullYear(), dateStop.getMonth(), dateStop.getDate() + 1, 0, 0, 0);
                id = setInterval(updateClock, 1000);
            } else {
                timerHours.textContent = ('' + timer.hours).length === 1 ? `0${timer.hours}` : timer.hours;
                timerMinutes.textContent = ('' + timer.minutes).length === 1 ? `0${timer.minutes}` : timer.minutes;
                timerSeconds.textContent = ('' + timer.seconds).length === 1 ? `0${timer.seconds}` : timer.seconds;
            };
        };

        let id = setInterval(updateClock, 1000);
    };

    countTimer();

    // меню 
    const toggleMenu = () => {
        const body = document.querySelector('body'),
            menu = body.childNodes[3],
            buttonImg = document.querySelectorAll('img')[3];
        buttonImg.className = 'scrollDown';
        //функция анимации для плавной прокрутки страницы
        const scrollAnimation = (elem, step, count) => {
            count++;
            let idReq = requestAnimationFrame(scrollAnimation.bind(null, elem, step, count));
            document.documentElement.scrollTop += step;
            if (elem.offsetTop < document.documentElement.scrollTop || (document.documentElement.scrollTop > (document.documentElement.offsetHeight - elem.offsetHeight - 300)) || count > 160)
                cancelAnimationFrame(idReq);
        };

        const handlerMenu = (e) => {
            e.preventDefault();
            menu.classList.toggle('active-menu');
            const id = e.target.getAttribute('href');
            if (id && id !== "#close") {
                const element = document.querySelector(id);
                let step = element.offsetTop % 100 > 20 ? element.offsetTop % 100 : element.offsetTop % 100 + 25;
                //Count добавила, чтобы не зацикливалась анимация при уменьшении масштаба
                let count = 1;
                scrollAnimation(element, step, count);
            }
        };
        //Обработчик событий на весь body
        body.addEventListener('click', (event) => {
            let target = event.target;
            if (target.closest('menu') && !target.classList.contains('active-menu') || (target.closest('.menu'))) {
                //На всё меню + кнопку меню
                handlerMenu(event);
            } else if (target === buttonImg) {
                //Для кнопки на первом слайде для прокрутки;
                event.preventDefault();
                const id = target.parentNode.getAttribute('href'),
                    element = document.querySelector(id);
                let step = element.offsetTop % 100 - 7,
                    count = 1;
                scrollAnimation(element, step, count);
            } else if (menu.classList.contains('active-menu') && !event.target.closest('menu')) {
                //если клик произошел мимо меню, оно закрывается
                handlerMenu(event);
            };
        });
        // 
        //Ввод только цифр с помощью регулярок в калькулятор;
        body.addEventListener('input', (event) => {
            let target = event.target;
            if (target.closest('.calc-square') || target.closest('.calc-count') || target.closest('.calc-day')) {
                target.value.replace(/\D/, '');
            };
        });
        // Настройка калькулятора
    };
    toggleMenu();
    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupMenu = popup.querySelector('.popup-content');
        let step = -100,
            idRequest;
        const animation = () => {
            idRequest = requestAnimationFrame(animation);
            step += 2;
            popupMenu.style.transform = `translateX(${step}%)`;
            popupMenu.style.opacity = `.${step>-90 ? 100+step%100 : 0}`;
            if (step >= 0) {
                cancelAnimationFrame(idRequest);
                step = -100;
                popupMenu.style.opacity = `1`;
                return;
            };
        };

        popupBtn.forEach((element) => element.addEventListener('click', () => {
            popup.style.display = 'block';
            if (document.documentElement.clientWidth >= 768) {
                animation();
            } else {
                popup.style.top = `0px`;
                popup.style.position = 'fixed';
            }

        }));
        popup.addEventListener('click', (event) => {
            let target = event.target;
            target.closest('.popup-close') ? target = false : target = target.closest('.popup-content');
            if (!target) {
                popup.style.display = 'none';
            }
        })
    };

    togglePopUp();

    //tab

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            };
        };
        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();
    // Изменение фотографий в Нашей команде при наведении на фото
    const exchange = (element) => {
        let cash = element.src;
        element.src = element.dataset.img;
        element.dataset.img = cash;
    };

    const changePhoto = () => {
        const comand = document.getElementById('command');
        comand.addEventListener('mouseover', (event) => {
            let target = event.target;
            if (target.closest('.command__photo')) {
                exchange(target);
            };
        });
        comand.addEventListener('mouseout', (event) => {
            let target = event.target;
            if (target.closest('.command__photo')) {
                exchange(target);
            };
        });
    };
    changePhoto();
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
    calculator(100);


});