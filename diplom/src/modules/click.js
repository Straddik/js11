'use strict';

import listPhone from "./listPhone";
import popupMenu from "./popupMenu";

const clickEventListener = () => {
    const body = document.querySelector('body');
    body.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        console.log(target);
        if (target.closest('.header-contacts__arrow')) {
            listPhone();
        } else if (target.closest('.menu__icon')) {
            popupMenu();
        }
    })
};

export default clickEventListener;