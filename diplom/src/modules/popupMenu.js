const menu = document.querySelector('.popup-dialog-menu');

export const popupMenu = () => {
    menu.style.transform = 'translate3d(0,0,0)';
};

export const closePopupMenu = () => {
    if (window.innerWidth <= 576) {
        menu.style.transform = 'translate3d(0,-120vh,0)';
        menu.parentNode.style.width = '100%';
    } else {
        menu.style.transform = 'translate3d(645px,0,0)';
    }
};