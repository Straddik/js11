import { moveLeft, moveRight } from "./moveLeftAndRight";
const transparencyMobile = document.getElementById('transparency').children[0].children[3].children[0];
const modalTransparency = document.querySelector('.popup-transparency');
const agreements = modalTransparency.children[1].children[1].children[0];
const sliderCounterTransparency = document.getElementById('transparency-popup-counter');
const reg = new RegExp('\\d{1,2}');

export const prepairTransparency = () => {
    console.log();
    [...transparencyMobile.children].forEach((item, index) => {
        if (screen.width < 545) {
            transparencyMobile.style.display = 'flex';
            transparencyMobile.style.flexWrap = 'nowrap';
            item.style.flex = "0 0 100%";
        };
        item.classList.add(`${index+1}`);
        item.firstElementChild.classList.add(`${index+1}`);
    });

    [...agreements.children].forEach((item, index) => {
        item.classList.add(`${index+1}`);
    });
    sliderCounterTransparency.children[0].children[1].innerHTML = transparencyMobile.children.length;
};
export const moveTransparencyMobileLeft = () => {
    moveLeft(transparencyMobile);
};
export const moveTransparencyMobileRight = () => {
    moveRight(transparencyMobile);

};
export const popupTransparency = (elem) => {
    modalTransparency.style.visibility = 'visible';
    let indexAgreement = elem.className.match(reg)[0];
    while (indexAgreement !== agreements.firstElementChild.className.match(reg)[0]) {
        moveLeft(agreements);
    }
    sliderCounterTransparency.children[0].children[0].innerHTML = agreements.firstElementChild.className.match(reg)[0];
};
export const closeTransparency = () => {
    modalTransparency.style.visibility = 'hidden';
};
export const moveTransparencyPopupLeft = () => {
    moveLeft(agreements);
    sliderCounterTransparency.children[0].children[0].innerHTML = agreements.firstElementChild.className.match(reg)[0];
};
export const moveTransparencyPopupRight = () => {
    moveRight(agreements);
    sliderCounterTransparency.children[0].children[0].innerHTML = agreements.firstElementChild.className.match(reg)[0];
};