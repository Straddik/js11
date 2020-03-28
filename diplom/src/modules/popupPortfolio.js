import { moveLeft, moveRight } from "./moveLeftAndRight";

const popupPortfolio = document.querySelector('.popup-portfolio');
const popupPortfolioSlider = document.querySelector('.popup-portfolio-slider');
const counterPortfolioSliderCurrent = document.getElementById('popup-portfolio-counter').children[0].children[0];
const counterPortfolioSliderTotal = document.getElementById('popup-portfolio-counter').children[0].children[1];
// const arrowLeftPopupPortfolio = document.getElementById('popup_portfolio_left');
// const arrowLeRightPopupPortfolio = document.getElementById('popup_portfolio_right');
let portfolioText, indexSlide;

const reg = new RegExp('\\d{1,2}');

export const prepairPopupPortfolio = () => {
    [...popupPortfolioSlider.children].forEach((item, index) => {
        item.classList.add(`${index+1}`);
        item.style.display = 'none';
    });
    [...popupPortfolioSlider.parentNode.parentNode.children].forEach((item, index) => {
        item.classList.add(`${index}`);
    });
    counterPortfolioSliderTotal.innerHTML = popupPortfolioSlider.children.length;
    // popupPortfolioSlider.nextElementSibling.style.zIndex = '1001';
};

export const openPopupPortfolio = (elem) => {
    popupPortfolio.style.visibility = 'visible';
    for (let i = 1; i < elem.className.match(reg)[0]; i++) {
        moveRight(popupPortfolioSlider);
    };
    popupPortfolioSlider.children[0].style.display = 'block';
    indexSlide = elem.className.match(reg)[0];
    portfolioText = [...popupPortfolioSlider.parentNode.parentNode.children].filter(item => item.classList.contains(indexSlide))[0];
    portfolioText.style.display = 'block';
    counterPortfolioSliderCurrent.innerHTML = indexSlide;
};

export const closePopupPortfolio = () => {
    popupPortfolio.style.visibility = 'hidden';
    popupPortfolioSlider.children[0].style.display = 'none';
    indexSlide = popupPortfolioSlider.children[0].className.match(reg)[0];
    while (indexSlide !== '1') {
        moveRight(popupPortfolioSlider);
        indexSlide = popupPortfolioSlider.children[0].className.match(reg)[0];
    };
};

export const moveLeftPopupPortfolio = () => {
    portfolioText.style.display = 'none';
    popupPortfolioSlider.children[0].style.display = 'none';
    moveLeft(popupPortfolioSlider);
    popupPortfolioSlider.children[0].style.display = 'block';
    indexSlide = popupPortfolioSlider.children[0].className.match(reg)[0];
    portfolioText = [...popupPortfolioSlider.parentNode.parentNode.children].filter(item => item.classList.contains(indexSlide))[0];
    portfolioText.style.display = 'block';
    counterPortfolioSliderCurrent.innerHTML = indexSlide;
};
export const moveRightPopupPortfolio = () => {
    portfolioText.style.display = 'none';
    popupPortfolioSlider.children[0].style.display = 'none';
    moveRight(popupPortfolioSlider);
    popupPortfolioSlider.children[0].style.display = 'block';
    indexSlide = popupPortfolioSlider.children[0].className.match(reg)[0];
    portfolioText = [...popupPortfolioSlider.parentNode.parentNode.children].filter(item => item.classList.contains(indexSlide))[0];
    portfolioText.style.display = 'block';
    counterPortfolioSliderCurrent.innerHTML = indexSlide;
};