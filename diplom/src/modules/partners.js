import { moveLeft, moveRight } from "./moveLeftAndRight";

const partners = document.querySelector('.partners-slider');
const arrow_left = document.getElementById('partners-arrow_left');
const arrow_right = document.getElementById('partners-arrow_right');
const reg = new RegExp('\\d');

export const prepairPartners = () => {
    partners.style.display = "flex";
    partners.style.overflow = "hidden";
    [...partners.children].forEach((item, index) => {
        item.style.flex = "0 0 33%";
        item.classList.add(`${index+1}`);
    })
};

export const movePartnersLeft = () => {
    moveLeft(partners);
    if (partners.firstElementChild.className.match(reg)[0] === '1') {
        arrow_left.style.display = 'none';
        arrow_right.style.display = 'flex';
    } else {
        arrow_left.style.display = 'flex';
        arrow_right.style.display = 'flex';
    }
};
export const movePartnersRight = () => {
    moveRight(partners);
    if (partners.firstElementChild.className.match(reg)[0] === '3') {
        arrow_right.style.display = 'none';
        arrow_left.style.display = 'flex';
    } else {
        arrow_right.style.display = 'flex';
        arrow_left.style.display = 'flex';
    }
};