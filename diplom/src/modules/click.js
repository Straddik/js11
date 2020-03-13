'use strict';

import listPhone from "./listPhone";
import popupMenu from "./popupMenu";
import closePopupMenu from "./closePopupMenu";

const clickEventListener = () => {
    const body = document.querySelector('body');
    body.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        if (target.closest('.header-contacts__arrow')) {
            listPhone();
        } else if (target.closest('.menu__icon')) {
            popupMenu();
        } else if (target.closest('.popup-menu')) {
            closePopupMenu();
        }
    })
};

export default clickEventListener;