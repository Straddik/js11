window.addEventListener('DOMContentLoaded', () => {
    'use strict';

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
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItem = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItem.forEach(element => element.addEventListener('click', handlerMenu));


    };
    toggleMenu();
    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
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
        popupClose.addEventListener('click', () => popup.style.display = 'none');
    };
    togglePopUp();
});