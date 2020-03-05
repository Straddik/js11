    // меню 
    const toggleMenu = () => {
        const body = document.querySelector('body'),
            menu = body.childNodes[3],
            buttonImg = document.querySelectorAll('img')[3];
        buttonImg.className = 'scrollDown';
        //функция анимации для плавной прокрутки страницы
        const scrollAnimation = (elem, step, count) => {
            count++;
            let idReq = requestAnimationFrame(scrollAnimation.bind(null, elem, step, count));
            let scrollTopVal;
            document.body.scrollTop += step;
            document.documentElement.scrollTop += step;
            scrollTopVal = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
            let offsetHeight = (!!document.documentElement && document.documentElement.offsetHeight) || (document.body.offsetHeight);
            if (elem.offsetTop < scrollTopVal || (scrollTopVal > (offsetHeight - elem.offsetHeight - 300)) || count > 160)
                cancelAnimationFrame(idReq);
        };

        const handlerMenu = (e) => {
            e.preventDefault();
            menu.classList.toggle('active-menu');
            const id = e.target.getAttribute('href');

            if (id && id !== "#close") {
                const element = document.querySelector(id);
                let step = element.offsetTop % 100 > 20 ? element.offsetTop % 100 : element.offsetTop % 100 + 25;
                //Count добавила, чтобы не зацикливалась анимация при уменьшении масштаба
                let count = 1;
                scrollAnimation(element, step, count);
            }
        };
        //Обработчик событий на весь body
        body.addEventListener('click', (event) => {
            let target = event.target;
            if (target.closest('menu') && !target.classList.contains('active-menu') || (target.closest('.menu'))) {
                //На всё меню + кнопку меню
                handlerMenu(event);
            } else if (target === buttonImg) {
                //Для кнопки на первом слайде для прокрутки;
                event.preventDefault();
                const id = target.parentNode.getAttribute('href'),
                    element = document.querySelector(id);
                let step = element.offsetTop % 100 - 7,
                    count = 1;
                scrollAnimation(element, step, count);
            } else if (menu.classList.contains('active-menu') && !event.target.closest('menu')) {
                //если клик произошел мимо меню, оно закрывается
                handlerMenu(event);
            };
        });
        // 
        //Ввод только цифр с помощью регулярок в калькулятор;
        body.addEventListener('input', (event) => {
            let target = event.target;
            if (target.closest('.calc-square') || target.closest('.calc-count') || target.closest('.calc-day')) {
                target.value.replace(/\D/, '');
            };
        });
        // Настройка калькулятора
    };
    export default toggleMenu;