import { arrowRight, arrowLeft, arrowMobileLeft, arrowMobileRight } from "./portfolio";

const appearanceRightArrow = () => {
    if (!portfolio.firstElementChild.classList.contains('3') && !portfolio.firstElementChild.classList.contains('4') && !portfolio.firstElementChild.classList.contains('5') && (screen.width > 684)) {
        arrowRight.style.display = 'flex';
    } else if (!portfolio.firstElementChild.classList.contains('4') && !portfolio.firstElementChild.classList.contains('5') && (screen.width > 600)) {
        arrowRight.style.display = 'flex';
    } else if (!portfolio.firstElementChild.classList.contains('5') && (screen.width > 383)) {
        arrowRight.style.display = 'flex';
    };
};
const portfolio = document.querySelector('.portfolio-slider');
const portfolioMobile = document.querySelector('.portfolio-slider-mobile');
const adaptMenu = () => {
    window.addEventListener('resize', () => {
        const menu = document.querySelector('.popup-dialog-menu');
        //В блоке портфолио показ или исчезновение стрелок при адаптации
        if (screen.width <= 383) {
            arrowLeft.style.display = 'none';
            arrowRight.style.display = 'none';
            if (!portfolioMobile.firstElementChild.classList.contains('1')) {
                arrowMobileLeft.style.display = 'block';
            };
            if (!portfolioMobile.firstElementChild.classList.contains('10')) {
                arrowMobileRight.style.display = 'block';
            };
        } else if (!portfolio.firstElementChild.classList.contains('1')) {
            arrowLeft.style.display = 'flex';
            arrowMobileLeft.style.display = 'none';
            arrowMobileRight.style.display = 'none';
            appearanceRightArrow();
        } else {
            arrowMobileLeft.style.display = 'none';
            arrowMobileRight.style.display = 'none';
            appearanceRightArrow();
        }
        //Проверка изменения матрицы состояния(преобразование из строки в массив)
        if (window.getComputedStyle(menu).transform.split('matrix(')[1].split(', ').map(val => val = +val.split(')')[0])[4] !== 0 ||
            window.getComputedStyle(menu).transform.split('matrix(')[1].split(', ').map(val => val = +val.split(')')[0])[5] !== 0) {
            if (window.innerWidth <= 576) {
                menu.style.transform = 'translate3d(0,-120vh,0)';
                menu.parentNode.style.width = '100%';
            } else {
                menu.style.transform = 'translate3d(645px,0,0)';
            }
        };
    })
};

export default adaptMenu;