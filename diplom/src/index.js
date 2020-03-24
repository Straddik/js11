'use strict';

import "@babel/polyfill";
import elementClosest from 'element-closest';
import 'nodelist-foreach-polyfill';

elementClosest(window);
import clickEventListener from './modules/click';
import adaptMenu from './modules/adaptMenu';
import { inputPhone } from './modules/input';
import mouseListener from "./modules/mouse";
import { mobileFormula } from "./modules/mobileFormula";
import { changeRepairType } from "./modules/repairType";

clickEventListener();
adaptMenu();
inputPhone();
mouseListener();
mobileFormula();
changeRepairType(document.querySelector('.repair-types-nav__item-1'));