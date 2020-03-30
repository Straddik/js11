import { moveLeft, moveRight } from "./moveLeftAndRight";
const problem = document.querySelector('.problems-item-popup-1');

const activateItem = (elem) => {
    [...elem.children].forEach((item, index) => {
        if (index !== 0) {
            item.style.display = 'none';
        } else {
            item.style.display = 'flex';
            item.style.opacity = '1';
            item.classList.remove('active-item');
        }
    })
};
export const prepairProblem = () => {
    const style = document.createElement('style');
    style.textContent = `
    .problem0_before:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: '';
        background: url(../images/problems/popup_bg_1.svg) 0 0/contain no-repeat;
        transform: rotate(180deg);
        z-index: -1;
    }
    .problem0_before {
        min-height: 344px;
        padding-top: 35px;
        top: 245px;
        transform: translateY(0px);
    }
    
    @media (min-width: 1025px) {
        .problem0_before {
            top: 140px;
        }
    }
    
    @media (max-width: 575px) {
        .problem0_before {
            top: 190px;
        }
    }
    @media (max-width: 575px) {
        .problem0_before:before {
            background: url("../images/problems/popup_bg_mobile.svg") no-repeat;
            background-size: contain;
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    .problem1_before:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: '';
        background: url(../images/problems/popup_bg_1.svg) 0 0/contain no-repeat;
        z-index: -1;
    }
    .problem1_before {
        min-height: 344px;
        padding-top: 35px;
        top: 245px;
        transform: translateY(-480px);
    }
    
    @media (min-width: 1025px) {
        .problem1_before {
            top: 140px;
        }
    }
    
    @media (max-width: 575px) {
        .problem1_before {
            top: 190px;
        }
    }
    @media (max-width: 575px) {
        .problem1_before:before {
            background: url("../images/problems/popup_bg_mobile.svg") no-repeat;
            background-size: contain;
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    .problem2_before:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: '';
        background: url(../images/problems/popup_bg_1.svg) 0 0/contain no-repeat;
        z-index: -1;
    }
    .problem2_before {
        min-height: 344px;
        padding-top: 35px;
        top: 245px;
        transform: translateY(-480px);
    }
    
    @media (min-width: 1025px) {
        .problem2_before {
            top: 140px;
        }
    }
    
    @media (max-width: 575px) {
        .problem2_before {
            top: 190px;
        }
    }
    @media (max-width: 575px) {
        .problem2_before:before {
            background: url("../images/problems/popup_bg_mobile.svg") no-repeat;
            background-size: contain;
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    .problem3_before:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: '';
        background: url(../images/problems/popup_bg_1.svg) 0 0/contain no-repeat;
        transform: rotate(180deg);
        z-index: -1;
    }
    .problem3_before {
        min-height: 344px;
        padding-top: 35px;
        top: 245px;
        transform: translateY(0px);
    }
    
    @media (min-width: 1025px) {
        .problem3_before {
            top: 140px;
        }
    }
    
    @media (max-width: 575px) {
        .problem3_before {
            top: 190px;
        }
    }
    @media (max-width: 575px) {
        .problem3_before:before {
            background: url("../images/problems/popup_bg_mobile.svg") no-repeat;
            background-size: contain;
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    `
    document.head.appendChild(style);
    problem.classList.remove('problems-item-popup-1');
    problem.classList.add('problem1_before');
    problem.classList.add('1');

    const problemSlider = document.querySelector('.problems-slider');
    problemSlider.style.display = 'flex';
    problemSlider.style.justifyContent = 'center';
    problemSlider.style.alignItems = 'start';
    problemSlider.style.marginTop = '20px';
    activateItem(problemSlider);
};
export const openProblem = (elem) => {
    if (elem.children[0].getBoundingClientRect().y <= 0 && elem.children[0].classList.contains('1')) {
        elem.children[0].className = "problems-item-popup problem0_before 1";
    } else if (elem.children[0].getBoundingClientRect().y <= 0 && !elem.children[0].classList.contains('1')) {
        elem.children[0].className = "problems-item-popup problem3_before";
    } else if (elem.children[0].getBoundingClientRect().y > 0 && elem.children[0].classList.contains('1')) {
        elem.children[0].className = "problems-item-popup problem1_before 1";
    } else {
        elem.children[0].className = "problems-item-popup problem2_before";
    }

    elem.children[0].style.visibility = 'visible';
    elem.children[1].style.opacity = '1';
    elem.children[0].style.opacity = '1';

};

export const closeProblem = (elem) => {
    // elem.children[0].className = "problems-item-popup problem1_before";
    if (elem.children[0].classList.contains('1')) {
        elem.children[0].className = "problems-item-popup problem1_before 1";
    } else {
        elem.children[0].className = "problems-item-popup problem2_before";
    }
    elem.children[0].style.visibility = 'hidden';
    elem.children[0].style.opacity = '.4';
    elem.children[1].style.opacity = '0';
};

export const activeProblem = (element) => {
    element.classList.toggle('active-item');

};
export const disactiveProblem = (element) => {
    element.classList.toggle('active-item');

};

export const moveProblemMobileLeft = (element) => {
    moveLeft(element.children[0]);
    activateItem(element.children[0]);
};
export const moveProblemMobileRight = (element) => {
    moveRight(element.children[0]);
    activateItem(element.children[0]);
};