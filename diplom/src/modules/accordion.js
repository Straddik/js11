const accordion = document.querySelector('.accordion');

export const prepairAccordion = () => {
    [...accordion.firstElementChild.children].forEach(item => {
        item.firstElementChild.classList.remove('msg-active');
    });
}

export const activeAccordion = (button) => {
    if (button.classList.contains('msg-active')) {
        button.classList.remove('msg-active');
    } else {
        [...accordion.firstElementChild.children].forEach(item => {
            item.firstElementChild.classList.remove('msg-active');
        });
        button.classList.add('msg-active');
    }



};