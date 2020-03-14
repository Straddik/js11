const adaptMenu = () => {
    window.addEventListener('resize', () => {
        const menu = document.querySelector('.popup-dialog-menu');
        //Проверка изменения матрицы состояния(преобразование из строки в массив)
        if (window.getComputedStyle(menu).transform.split('matrix(')[1].split(', ').map(val => val = +val.split(')')[0])[4] !== 0 ||
            window.getComputedStyle(menu).transform.split('matrix(')[1].split(', ').map(val => val = +val.split(')')[0])[5] !== 0) {
            if (window.innerWidth <= 576) {
                menu.style.transform = 'translate3d(0,-120vh,0)';
                menu.parentNode.style.width = '100%';
            } else {
                menu.style.transform = 'translate3d(645px,0,0)';
            }
        };
    })
};

export default adaptMenu;