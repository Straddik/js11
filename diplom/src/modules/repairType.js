import { moveLeft, moveRight } from "./moveLeftAndRight";

let repairType;
const counterTotal = document.querySelector('.slider-counter-content__total');
const counterCurrent = document.querySelector('.slider-counter-content__current');
const navMobile = document.querySelector('.nav-list-repair');
const reg = new RegExp('\\d');
export const changeRepairType = (elem) => {
    [...elem.parentNode.children].forEach(item => item.classList.remove('active'));
    const nav = document.querySelector(`.types-repair${elem.className.match(reg)[0]}`);
    elem.classList.add('active');
    [...nav.parentNode.children].forEach(item => {
        item.style.display = 'none';
    });
    nav.style.display = 'block';
    [...nav.children].forEach((item, index) => {
        if (!item.classList.contains(`${index+1}`)) {
            item.classList.add(`${index+1}`);
        }
    });
    repairType = nav;
    counterTotal.innerHTML = nav.children.length;
    counterCurrent.innerHTML = nav.firstElementChild.className.match(reg)[0];
};


export const moveRepairLeft = () => {
    moveLeft(repairType);
    counterCurrent.innerHTML = repairType.firstElementChild.className.match(reg)[0];
};
export const moveRepairRight = () => {
    moveRight(repairType);
    counterCurrent.innerHTML = repairType.firstElementChild.className.match(reg)[0];
};
export const moveRepairMobileLeft = () => {
    moveLeft(navMobile);
};
export const moveRepairMobileRight = () => {
    moveRight(navMobile);
};