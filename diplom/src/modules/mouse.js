import { popupFormula, closeFormula } from "./popupFormula";
import { openHist, closeHist } from "./mobileFormula";
import { openProblem, closeProblem, disactiveProblem, activeProblem } from "./problems";

const body = document.querySelector('body');
const mouseListener = () => {
    body.addEventListener('mouseout', (e) => {
        if (e.target.closest('.formula-item__icon-inner-text')) {
            closeFormula(e.target);
        } else if (e.target.classList.contains('formula-item__icon-inner')) {
            closeHist(e.target);
        } else if (e.target.classList.contains('svg-wrap') && !(e.relatedTarget ? e.relatedTarget.closest('.svg-wrap') : true)) {
            closeProblem(e.target.closest('.problems-item__icon'));
        } else if (e.target.classList.contains('problems-item__icon-inner') && !(e.relatedTarget ? e.relatedTarget.closest('.problems-item__icon-inner') : true)) {
            disactiveProblem(e.target.closest('.problems-item__icon '));
        }
    });
    //Подсказки появляются
    body.addEventListener('mouseover', (e) => {

        if (e.target.closest('.formula-item__icon-inner-text')) {
            popupFormula(e.target);
        } else if (e.target.classList.contains('formula-item__icon-inner')) {
            openHist(e.target);
        } else if (e.target.classList.contains('svg-wrap') && !(e.relatedTarget.closest('.svg-wrap'))) {
            openProblem(e.target.closest('.problems-item__icon'));
        } else if (e.target.classList.contains('problems-item__icon-inner') && !(e.relatedTarget.closest('.problems-item__icon-inner'))) {
            activeProblem(e.target.closest('.problems-item__icon '));
        }
    });

};
export default mouseListener;