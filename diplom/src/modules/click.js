'use strict';

import listPhone from "./listPhone";
import { popupMenu } from "./popupMenu";
import { closePopupMenu } from "./popupMenu";
import scrollIt from "./scrollIt";
import { popupRepair } from "./popupRepair";
import { closePopupRepair } from "./popupRepair";
import { popupPrivacy } from "./popupPrivacy";
import { closePrivacy } from "./popupPrivacy";
import { moveFormulaRight, moveFormulaLeft } from "./mobileFormula";

const clickEventListener = () => {
    const body = document.querySelector('body');
    body.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        if (target.closest('.header-contacts__arrow')) {
            listPhone();
        } else if (target.closest('.menu__icon')) {
            popupMenu();
        } else if (target.closest('.popup-menu-nav__item')) {
            scrollIt(target, 'down');
            closePopupMenu();
        } else if (target.closest('.menu-link')) {
            popupRepair();
            closePopupMenu();
        } else if (target.closest('.link-list-repair')) {
            popupRepair();
        } else if (target.closest('.button-footer')) {
            if (target.classList.contains('button-footer')) {
                scrollIt(target.childNodes[0], 'up');
            } else {
                scrollIt(target, 'up');
            };
        } else if (target.closest('.link-privacy')) {
            popupPrivacy();
        } else if (target.classList.contains('popup-privacy')) {
            closePrivacy();
        } else if (target.closest('#formula-arrow_right')) {
            moveFormulaRight();
        } else if (target.closest('#formula-arrow_left')) {
            moveFormulaLeft();
        } else if (target.closest('.popup-menu')) {
            closePopupMenu();
        } else if (target.classList.contains('popup-repair-types') || target.closest('.close')) {
            closePopupRepair();
        };
    })
};

export default clickEventListener;