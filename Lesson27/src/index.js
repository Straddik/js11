'use strict';
import elementClosest from 'element-closest';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import 'smoothscroll-polyfill';
import 'nodelist-foreach-polyfill';
import "@babel/polyfill";

// smoothscroll.polyfill();
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import changePhoto from './modules/changePhoto';
import calculator from './modules/calculator';
import sendForm from './modules/sendForm';
import slider from './modules/slider';



countTimer();

toggleMenu();

togglePopUp();

tabs();

changePhoto();

slider();

calculator(100);

sendForm();