import { popupFormula, closeFormula } from "./popupFormula";
import { openHist, closeHist } from "./mobileFormula";

const body = document.querySelector('body');
const mouseListener = () => {
    body.addEventListener('mouseout', (e) => {
        if (e.target.closest('.formula-item__icon-inner-text')) {
            closeFormula(e.target);
        } else if (e.target.classList.contains('formula-item__icon-inner')) {
            closeHist(e.target);
        }
    });
    //Подсказки появляются
    body.addEventListener('mouseover', (e) => {
        if (e.target.closest('.formula-item__icon-inner-text')) {
            popupFormula(e.target);
        } else if (e.target.classList.contains('formula-item__icon-inner')) {
            openHist(e.target);
        }
    });

};
export default mouseListener;