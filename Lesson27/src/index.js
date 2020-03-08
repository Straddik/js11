'use strict';
import "@babel/polyfill";
import elementClosest from 'element-closest';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import 'smoothscroll-polyfill';
import 'nodelist-foreach-polyfill';
import 'regexp-polyfill';


elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import changePhoto from './modules/changePhoto';
import calculator from './modules/calculator';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import Carusel from './modules/sliderCarusel';



countTimer();


toggleMenu();

togglePopUp();

tabs();

changePhoto();

slider();

calculator(100);

sendForm();



const sliderCarusel = new Carusel({
    main: '.companies-wrapper',
    wrap: '.companies-hor',
    prev: '#test-left',
    next: '#test-right',
    slidesToShow: 4,
    infinity: true,
    responsive: [{
            breakpoint: 1024,
            slideToShow: 3,
        },
        {
            breakpoint: 768,
            slideToShow: 2,
        },
        {
            breakpoint: 576,
            slideToShow: 1,
        }
    ]
});
sliderCarusel.init();