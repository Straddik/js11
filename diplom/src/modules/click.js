'use strict';

import listPhone from "./listPhone";

const clickEventListener = () => {
    const body = document.querySelector('body');
    body.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        if (target.closest('.header-contacts__arrow')) {
            listPhone();
            console.log('IE11');
        }
    })
};

export default clickEventListener;