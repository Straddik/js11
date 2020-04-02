import { moveLeft, moveRight } from "./moveLeftAndRight";

const buttonsCheme = document.querySelector('#scheme-list');
const sliderScheme = document.querySelector('.scheme-slider');
const descriprionCheme = document.querySelector('.scheme-slider-wrap');
const reg = new RegExp('\\d');

export const prepairCheme = () => {
    [...buttonsCheme.children].forEach((item, index) => {
        item.classList.add(`${index+1}`);
    });
    [...sliderScheme.children].forEach((item, index) => {
        item.classList.add(`${index+1}`);
    });
    [...descriprionCheme.children].forEach((item, index) => {
        item.classList.add(`${index}`);
    });

};

export const switchScheme = (button) => {
    [...buttonsCheme.children].forEach(item => {
        item.classList.remove(`active`);
    });
    button.classList.add('active');
    while (sliderScheme.firstElementChild.className.match(reg)[0] !== button.className.match(reg)[0]) {
        moveRight(sliderScheme);
    };
    [...descriprionCheme.children].forEach(item => {
        item.classList.remove('visible-content-block');
        if (item.className.match(reg)[0] === button.className.match(reg)[0]) {
            item.classList.add('visible-content-block');
        }
    });
};