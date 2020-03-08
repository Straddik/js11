class Carusel {
    constructor({
        main,
        wrap,
        next,
        prev,
        infinity = false,
        position = 0,
        slidesToShow = 3,
        responsive = [{
                breakpoint: 1024,
                slideToShow: 3,
            },
            {
                breakpoint: 768,
                slideToShow: 2,
            },
            {
                breakpoint: 576,
                slideToShow: 1,
            }
        ],
    }) {

        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = document.querySelector(wrap).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.option = {
            position,
            infinity,
            widthSlide: Math.floor(100 / this.slidesToShow),
        };
        this.responsive = responsive;
        if (!this.main && !this.wrap) {
            console.warn('slider-carusel: Необходимо 2 свойства  main и wrap')
        };
    }
    init() {

        this.addGloClass();
        this.addStyle();
        if (this.prev && this.next) {
            this.controlSlide();
        } else {
            this.addArrow();
            this.controlSlide();
        };
        if (this.responsive) {
            this.responseInit()
        }
    }

    addGloClass() {
        this.main.classList.add('glo-slider');
        this.wrap.classList.add('glo-slider__wrap');

        for (const item of this.slides) {
            item.classList.add('glo-slider__item');
        }
    }
    addStyle() {
        let style = document.getElementById('sliderCarusel-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderCarusel-style';
        };
        style.textContent = `
        .glo-slider{
            overflow: hidden !important;
        }
        .glo-slider__wrap{
            display:flex !important;
            transition: transform 0.5s !important; 
            will-change: transform !important;   
        }
        .glo-slider__item{
            display: flex !important;
            align-items: center !important;
            justify-content: space-between;
            flex: 0 0 ${this.option.widthSlide}% !important;
            margin: auto 0 !important;
        }`;
        document.head.appendChild(style);
    }
    controlSlide() {
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
    }
    prevSlider() {
        if (this.option.infinity || this.option.position >= 0) {
            --this.option.position;
            if (this.option.position < 0) {
                this.option.position = this.slides.length - this.slidesToShow;
            }
            this.wrap.style.transform = `translateX(-${this.option.position*this.option.widthSlide}%)`;
        }

    }
    nextSlider() {
        if (this.option.infinity || this.option.position <= this.slides.length - this.slidesToShow) {
            ++this.option.position;
            if (this.option.position > this.slides.length - this.slidesToShow) {
                this.option.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.option.position*this.option.widthSlide}%)`;
        }
    }
    addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'glo-slider__prev';
        this.next.className = 'glo-slider__next';

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);

        const style = document.createElement('style');
        style.textContent = `
        .glo-slider__prev,
        .glo-slider__next{
            margin: 0 10px;
            border: 20px solid transparent;
            background: transparent;
        }
        .glo-slider__prev{
            border-right-color: #19b5fe;
        }
        .glo-slider__next{
            border-left-color: #19b5fe;
        }
        .glo-slider__prev:hover,
        .glo-slider__next:hover,
        .glo-slider__prev:focus,
        .glo-slider__next:focus{
            background: transparent;
            outline: transparent;
        }`;
        document.head.appendChild(style);
    }
    responseInit() {
        const slidesToShowDefault = this.slidesToShow;
        const allResponse = this.responsive.map(item => item.breakpoint);
        const maxResponse = Math.max(...allResponse);

        const checkResponse = () => {
            const widthWindow = document.body.clientWidth;

            if (widthWindow < maxResponse) {
                for (let i = 0; i < allResponse.length; i++) {
                    if (widthWindow < allResponse[i]) {
                        this.slidesToShow = this.responsive[i].slideToShow;
                        this.option.widthSlide = Math.floor(100 / this.slidesToShow);
                        this.addStyle();
                    }
                };
            } else {
                this.slidesToShow = slidesToShowDefault;
                this.option.widthSlide = Math.floor(100 / this.slidesToShow);
                this.addStyle();
            };
        };
        checkResponse();
        window.addEventListener('resize', checkResponse.bind(this));
    }

}

export default Carusel;