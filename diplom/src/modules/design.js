import { moveLeft, moveRight } from "./moveLeftAndRight";

const designsListButtons = document.getElementById('designs-list');
const popupDesignButtons = document.getElementById('nav-list-popup-designs');
const designSlider = document.querySelector('.designs-slider');
const popupDesignSlider = document.querySelector('.popup-design-slider')
const designPreviewSliders = document.querySelectorAll('.preview-block');
const popup = document.querySelector('.popup-design');
const counterDesign = document.getElementById('popup-designs-counter');
const reg = new RegExp('\\d{1,2}');

export const prepairDesign = () => {
    designPreviewSliders.forEach((item, index) => {
        item.classList.add(`${index+1}`);
        [...item.children].forEach((i, n) => {
            i.classList.add(`${n+1}`);
        });
    });
    [...designsListButtons.children].forEach((item, index) => {
        item.classList.add(`${index+1}`);

    });
    [...designSlider.children].forEach(item => {
        [...item.children].forEach((i, n) => {
            i.classList.add(`${n+1}`);
        });
    });
    [...popupDesignButtons.children].forEach((item, index) => {
        item.classList.add(`${index+1}`);
    });
    [...popupDesignSlider.children].forEach((item) => {
        [...item.children].forEach((i, n) => {
            i.classList.add(`${n+1}`);
        });
    });
    counterDesign.firstElementChild.children[1].innerHTML = popupDesignSlider.firstElementChild.children.length;
};

export const openDesignSlider = (button) => {
    [...designsListButtons.children].forEach((item) => {
        item.classList.remove(`active`);
    });
    [...popupDesignButtons.children].forEach((item, index) => {
        item.classList.remove(`active`);
    });
    if (!button.classList.contains('.active')) {
        button.classList.add('active')
    };

    while (button.className.match(reg)[0] !== designSlider.firstElementChild.className.match(reg)[0]) {
        moveRight(designSlider);
    };
    while (button.className.match(reg)[0] !== popupDesignSlider.firstElementChild.className.match(reg)[0]) {
        moveRight(popupDesignSlider);
        console.log(popupDesignSlider);
    };
    designPreviewSliders.forEach((item) => {
        item.classList.remove('visible');
    });
    designPreviewSliders[button.className.match(reg)[0] - 1].classList.add('visible');
    while (designSlider.firstElementChild.firstElementChild.className.match(reg)[0] !== [...designPreviewSliders[button.className.match(reg)[0] - 1].children].filter(item => item.firstElementChild.classList.contains('preview_active'))[0].className.match(reg)[0]) {
        moveRight(designSlider.firstElementChild);
    };
    counterDesign.firstElementChild.children[1].innerHTML = popupDesignSlider.firstElementChild.children.length;
    counterDesign.firstElementChild.children[0].innerHTML = popupDesignSlider.firstElementChild.firstElementChild.className.match(reg)[0];
};

export const changeDesignSlider = (elem) => {
    [...elem.parentNode.children].forEach(item => {
        item.firstElementChild.classList.remove('preview_active')
    });
    elem.firstElementChild.classList.add('preview_active');
    while (designSlider.firstElementChild.firstElementChild.className.match(reg)[0] !== elem.className.match(reg)[0]) {
        moveRight(designSlider.firstElementChild);
    }
};

export const moveNavDesignLeft = () => {
    moveLeft(designsListButtons);
};
export const moveNavDesignRight = () => {
    moveRight(designsListButtons);
};

export const popupDesign = () => {
    popup.style.visibility = 'visible';
    counterDesign.firstElementChild.children[1].innerHTML = popupDesignSlider.firstElementChild.children.length;
    counterDesign.firstElementChild.children[0].innerHTML = popupDesignSlider.firstElementChild.firstElementChild.className.match(reg)[0];
};
export const closePopupDesign = () => {
    popup.style.visibility = 'hidden';
};
export const movePopupDesignSliderLeft = () => {
    moveLeft(popupDesignSlider.firstElementChild);
    counterDesign.firstElementChild.children[0].innerHTML = popupDesignSlider.firstElementChild.firstElementChild.className.match(reg)[0];
};
export const movePopupDesignSliderRight = () => {
    moveRight(popupDesignSlider.firstElementChild);
    counterDesign.firstElementChild.children[0].innerHTML = popupDesignSlider.firstElementChild.firstElementChild.className.match(reg)[0];
};