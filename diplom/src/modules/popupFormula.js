export const popupFormula = (elem) => {
    const hist = document.querySelector(`.formula-item-popup-${elem.innerHTML}`);
    if (![...hist.childNodes].some(item => item === 'div')) {
        const div = document.createElement('div');
        div.innerHTML = hist.innerHTML;
        hist.innerHTML = '';
        hist.appendChild(div);
    };
    hist.style.visibility = 'visible';
    hist.style.transition = '0.4s';
    hist.style.opacity = '1';
    hist.nextElementSibling.style.opacity = '1';
    if (hist.getBoundingClientRect().y <= 0) {
        hist.style.transform = 'rotate(180deg)';
        hist.style.bottom = `-${Math.floor(hist.clientHeight/2)*2}px`;
        hist.childNodes[0].style.transform = 'rotate(180deg)';
        //Проблема с отражение текста

    } else {
        hist.style.transform = 'rotate(0deg)';
        hist.style.bottom = `90px`;
        hist.childNodes[0].style.transform = 'rotate(0deg)';
    };
};
export const closeFormula = (elem) => {
    const hist = document.querySelector(`.formula-item-popup-${elem.innerHTML}`);
    hist.style.visibility = 'hidden';
    hist.style.transform = 'rotate(0deg)';
    hist.style.bottom = `90px`;
    hist.style.transition = '0.4s';
    hist.style.opacity = '0';
    hist.childNodes[0].style.transform = 'rotate(0deg)';
    hist.nextElementSibling.style.opacity = '0';
};