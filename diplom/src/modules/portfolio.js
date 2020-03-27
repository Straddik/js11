import { moveLeft, moveRight } from "./moveLeftAndRight";
export const portfolio = document.querySelector('.portfolio-slider');
export const arrowLeft = document.getElementById('portfolio-arrow_left');
export const arrowRight = document.getElementById('portfolio-arrow_right');
const portfolioMobile = document.querySelector('.portfolio-slider-mobile');
export const arrowMobileLeft = document.getElementById('portfolio-arrow-mobile_left');
export const arrowMobileRight = document.getElementById('portfolio-arrow-mobile_right');
const counterTotal = document.getElementById('portfolio-counter').children[0].children[1];
const counterCurrent = document.getElementById('portfolio-counter').children[0].children[0];
const reg = new RegExp('\\d{1,2}');

export const portfolioLoad = () => {
    let i = 1;
    [...portfolio.children].forEach((item, index) => {
        item.classList.add(`${index+1}`);
        [...item.children].forEach(val => {
            val.classList.add(`${i}`);
            i++;
        })
    });
    [...portfolioMobile.children].forEach((item, index) => {
        item.classList.add(`${index+1}`);
    });
    arrowMobileLeft.style.display = 'none';
    arrowMobileLeft.style.zIndex = '11';
    arrowMobileRight.style.zIndex = '11';
    counterTotal.innerHTML = portfolioMobile.children.length;

};

export const movePortfolioLeft = () => {
    moveLeft(portfolio);
    if (portfolio.firstElementChild.classList.contains('1') && (window.innerWidth > 383)) {
        arrowLeft.style.display = 'none';
    };
    arrowRight.style.display = 'flex';
};

export const movePortfolioRight = () => {
    moveRight(portfolio);
    if (portfolio.firstElementChild.classList.contains('3') && (screen.width > 684)) {
        arrowRight.style.display = 'none';
    } else if (portfolio.firstElementChild.classList.contains('4') && (screen.width > 600)) {
        arrowRight.style.display = 'none';
    } else if (portfolio.firstElementChild.classList.contains('5') && (screen.width > 383)) {
        arrowRight.style.display = 'none';
    };
    arrowLeft.style.display = 'flex';
};

export const movePortfolioMobileLeft = () => {
    moveLeft(portfolioMobile);
    if (portfolioMobile.firstElementChild.classList.contains('1')) {
        arrowMobileLeft.style.display = 'none';
    }
    arrowMobileRight.style.display = 'block';
    counterCurrent.innerHTML = portfolioMobile.firstElementChild.className.match(reg)[0];
};

export const movePortfolioMobileRight = () => {
    moveRight(portfolioMobile);
    if (portfolioMobile.firstElementChild.classList.contains('10')) {
        arrowMobileRight.style.display = 'none';
    }
    arrowMobileLeft.style.display = 'block';
    counterCurrent.innerHTML = portfolioMobile.firstElementChild.className.match(reg)[0];
};