const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),

        slider = document.querySelector('.portfolio-content');
    let currentSlide = 0,
        interval;
    //добавляем элементы точки по домашнему заданию
    const addingDots = (number, currentnumber) => {
        const ulDots = document.querySelector('.portfolio-dots');
        for (let i = 0; i < number; i++) {
            let element = document.createElement('li');
            element.classList.add('dot');
            if (i === currentnumber) element.classList.add('dot-active');
            ulDots.appendChild(element);
        };
        return ulDots.querySelectorAll('.dot');
    };
    const dot = addingDots(slide.length, currentSlide);
    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };
    const autoPlaySlide = () => {
        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');
        currentSlide++;
        if (currentSlide >= slide.length) currentSlide = 0;
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');

    };
    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };
    const stopSlide = () => {
        clearInterval(interval);

    };
    slider.addEventListener('click', (event) => {
        event.preventDefault();
        let target = event.target;
        //Подправила условие, а то переключение по точкам не осуществлялось
        if (!target.matches('.portfolio-btn') && !target.matches('.dot')) {
            console.log(target);
            return;
        }
        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');
        if (target.matches('#arrow-right')) {
            currentSlide++;
            if (currentSlide >= slide.length) currentSlide = 0;
        } else if (target.matches('#arrow-left')) {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            };
        } else if (target.matches('.dot')) {
            dot.forEach((elem, index) => {
                if (elem === target) {
                    currentSlide = index;
                }
            });
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
        if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
            stopSlide();
        };
    });
    slider.addEventListener('mouseout', (event) => {
        if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
            startSlide();
        };
    });
    startSlide(1000);
};
export default slider;