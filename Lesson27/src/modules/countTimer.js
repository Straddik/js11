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
        updateClock();
        let id = setInterval(updateClock, 1000);
    };
    export default countTimer;