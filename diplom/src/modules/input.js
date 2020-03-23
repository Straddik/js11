import { maskAndBan } from "./maskAndBan";
import { mask } from "./maskAndBan";
import { ban } from "./maskAndBan";


export const inputPhone = () => {
    const body = document.querySelector('body');
    //Отмена выделения в инпутах, чтобы не менялась маска
    body.addEventListener('select', (e) => {
        const target = e.target;
        if (target.hasAttribute('name')) {
            if (target.getAttribute('name') === 'phone') {
                e.preventDefault();
                target.setSelectionRange(target.selectionStart, target.selectionStart);
            }
        }
    });
    //При фокусировки применяется маска
    body.addEventListener('focusin', (e) => {
        if (e.target.hasAttribute('name')) {
            if (e.target.getAttribute('name') === 'phone') {
                mask(e.target);
            }
        }
    });
    // При нажатии отслеживаются значения
    body.addEventListener('keydown', (e) => {
        if (e.target.hasAttribute('name')) {
            if (e.target.getAttribute('name') === 'phone') {
                maskAndBan(e.target, e.target.selectionStart, e.key);
            }
        }
    });
    //Запрет ввода всего кроме цифр
    body.addEventListener('input', (e) => {
        if (e.target.hasAttribute('name')) {
            if (e.target.getAttribute('name') === 'phone') {
                ban(e.target, e.target.selectionStart);
            }
        }
    })

};