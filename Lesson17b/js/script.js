'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const div1 = document.createElement('div');
    document.body.append(div1);
    const div2 = document.createElement('div');
    document.body.append(div2);
    const div3 = document.createElement('div');
    document.body.append(div3);
    const div4 = document.createElement('div');
    document.body.append(div4);

    function outPutInformation() {

        const date = new Date(),
            newYear = new Date((date.getFullYear() + 1), 0, 1),
            daysBeforeNewYear = Math.floor((newYear - date.getDate()) / 1000 / 3600 / 60 / 24);


        function getgreeting() {
            return date.getHours() < 6 ? 'Доброй ночи' :
                date.getHours() > 5 && date.getHours() < 12 ? 'Доброе утро' :
                date.getHours() > 11 && date.getHours() < 18 ? 'Добрый день' :
                'Добрый вечер';
        };
        div1.innerHTML = getgreeting();

        function setDayOfWeek() {
            let dayOfWeeks = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
            return dayOfWeeks[date.getDay()];
        };
        div2.innerHTML = `Сегодня ${setDayOfWeek()}`;
        div3.innerHTML = `Текущее время:${date.toLocaleString('en-Us').split(', ')[1]}`;

        div4.innerHTML = `До Нового года осталось: ${daysBeforeNewYear} ${setRightNameForDayInRussian(daysBeforeNewYear)}`;

        function setRightNameForDayInRussian(daysBeforeNewYear) {
            if ((daysBeforeNewYear < 10 || daysBeforeNewYear > 20) && (daysBeforeNewYear % 10 === 1)) {
                return 'день';
            } else if ((daysBeforeNewYear < 10 || daysBeforeNewYear > 20) && (daysBeforeNewYear < 110 || daysBeforeNewYear > 120) && (daysBeforeNewYear < 210 || daysBeforeNewYear > 220) && (daysBeforeNewYear < 310 || daysBeforeNewYear > 320) && ((daysBeforeNewYear % 10 === 2) || (daysBeforeNewYear % 10 === 3) || (daysBeforeNewYear % 10 === 4))) {
                return 'дня';
            } else {
                return 'дней';
            };
        };
    };
    setInterval(outPutInformation, 1000);
})