import { moveLeft, moveRight } from "./moveLeftAndRight";

const mobile = document.querySelector('.formula-slider');
export const mobileFormula = () => {
    mobile.style.display = 'flex';
    mobile.style.justifyContent = 'flex-start';

    [...mobile.children].forEach((item, index) => {
        item.style.flex = '0 0 33%';
        item.style.justifyContent = 'flex-start';
        if (index === 1) {
            item.style.opacity = '1';
        } else {
            item.style.opacity = '0.4';
        }

        item.style.alignItems = 'center';
        item.style.fontSize = '18px';
        item.children[0].children[1].style.fontWeight = '900';
        item.style.textAlign = 'center';
        item.children[0].children[1].style.opacity = '1';
        item.children[0].children[1].style.background = "0px 0px";
        item.classList.remove('formula-slider__slide');

        // item.style.zIndex = '15';
    });
}
export const moveFormulaLeft = () => {
    moveLeft(mobile);
    [...mobile.children].forEach((item, index) => {
        if (index === 1) {
            item.style.opacity = '1';
        } else {
            item.style.opacity = '0.4';
        }
    });
};

export const moveFormulaRight = () => {
    moveRight(mobile);
    [...mobile.children].forEach((item, index) => {
        if (index === 1) {
            item.style.opacity = '1';
        } else {
            item.style.opacity = '0.4';
        }
    });
};
export const openHist = (elem) => {
    const hist = elem.previousElementSibling;
    hist.parentNode.style.opacity = '1';
    hist.style.opacity = '1';
    hist.style.visibility = 'visible';
    elem.style.opacity = '1';
    elem.style.background = '';
};
export const closeHist = (elem) => {
    const hist = elem.previousElementSibling;
    hist.style.opacity = '0';
    hist.style.visibility = 'hidden';
    elem.style.background = '0px 0px';
}