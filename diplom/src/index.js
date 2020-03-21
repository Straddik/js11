'use strict';

import "@babel/polyfill";
import elementClosest from 'element-closest';
import 'nodelist-foreach-polyfill';

elementClosest(window);
import clickEventListener from './modules/click';
import adaptMenu from './modules/adaptMenu';
import { inputPhone } from './modules/input';

clickEventListener();
adaptMenu();
inputPhone();