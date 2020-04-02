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
import { portfolioLoad } from "./modules/portfolio";
import { prepairPopupPortfolio } from "./modules/popupPortfolio";
import { prepairTransparency } from "./modules/transparency";
import { prepairProblem } from "./modules/problems";
import { prepairDesign } from "./modules/design";
import { prepairCheme } from "./modules/scheme";
import { prepairAccordion } from "./modules/accordion";
import { prepairPartners } from "./modules/partners";

clickEventListener();
adaptMenu();
inputPhone();
mouseListener();
mobileFormula();
changeRepairType(document.querySelector('.repair-types-nav__item-1'));
portfolioLoad();
prepairPopupPortfolio();
prepairTransparency();
prepairProblem();
prepairDesign();
prepairCheme();
prepairAccordion();
prepairPartners();