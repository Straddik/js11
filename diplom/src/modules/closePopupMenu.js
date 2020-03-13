const closePopupMenu = () => {
    const menu = document.querySelector('.popup-menu');
    if ((document.body.clientWidth + 50) <= 576) {
        menu.childNodes[1].style.transform = 'translate3d(0,-120vh,0)';
        menu.style.width = '100%';
    } else {
        menu.childNodes[1].style.transform = 'translate3d(645px,0,0)';
    }

};

export default closePopupMenu;