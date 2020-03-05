    // sendform
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так..',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form = [...document.forms];
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: white;';
        statusMessage.style.opacity = '1';

        let step = 0.005;
        let idAniBlink;
        let idTime;
        //Для IE11
        (function(arr) {
            arr.forEach(function(item) {
                if (item.hasOwnProperty('remove')) {
                    return;
                }
                Object.defineProperty(item, 'remove', {
                    configurable: true,
                    enumerable: true,
                    writable: true,
                    value: function remove() {
                        if (this.parentNode === null) {
                            return;
                        }
                        this.parentNode.removeChild(this);
                    }
                });
            });
        })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
        // Анимация плавного появления
        const messageAnimateOpacity = (elem) => {
            elem.style.opacity = +elem.style.opacity + step;
            const idAni = requestAnimationFrame(messageAnimateOpacity.bind(null, elem));
            if (elem.style.opacity >= 1) {
                cancelAnimationFrame(idAni);
            };
        };
        // Анимация мигания
        const messageAnimateBlinking = (elem) => {
            idTime = setTimeout(() => {
                elem.style.opacity = elem.style.opacity === '0' ? '1' : '0';
                idAniBlink = requestAnimationFrame(messageAnimateBlinking.bind(null, statusMessage));
            }, 500);
        };

        //Проверка на валидацию
        const validateInput = (input, patternName) => {
            let pattern = {
                //Чтобы во всех браузерах работало
                email: new RegExp("^\\w+@\\w+\\.\\w{1,}\\w$\\b"),
                phone: new RegExp("^\\+7\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\b|^8\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\b"),
                //Это лишнее раз есть запрет, но я пока оставила
                name: new RegExp("^[а-яА-Я\\s]|^[а-яА-Я\\s]+\\b"),
                message: new RegExp("^[а-яА-Я\\s]+\\b"),
            };
            let rezult = pattern[patternName].test(input.value);
            if (rezult) {
                showSuccess(input);
            } else { showError(input) };
            return rezult;
        };
        //Показать ошибку
        const showError = (elem) => {
            //Для IE11 вместо classList.remove
            elem.className = elem.className.split('success').join();
            elem.classList.add('error');
            if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) return;
            const errorDiv = document.createElement('div');
            errorDiv.textContent = 'Ошибка в этом поле';
            errorDiv.classList.add('validator-error');
            elem.insertAdjacentElement('afterend', errorDiv);
        };

        //Показать правильность ввода
        const showSuccess = (elem) => {
            //Для IE11 вместо classList.remove 
            elem.className = elem.className.split('error').join();
            elem.classList.add('success');
            if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
                elem.nextElementSibling.remove();
            };
        };
        //Применить стили 
        const applyStyle = () => {
            const style = document.createElement('style');
            style.textContent = `
            input.success {
                border: 2px solid green;
            }
            input.error {
                border: 2px solid red;
            }
            .validator-error {
                font-size: 14px;
                font-family: sans-serif;
                color: red;
            }
            input {
                border: none;
            }
            `
            document.head.appendChild(style);
        };

        //Подключение обработчика событий к инпутам, чтобы цвет менялся сразу при изменении содержимого

        form.forEach(item => {
            applyStyle();
            [...item.elements].forEach(it => {
                if (it.tagName.toLowerCase() === 'input') {
                    //Запретить ввод любых символов в поле "Ваше имя" и "Ваше сообщение", кроме Кириллицы и пробелов (задание 6)
                    if (it.id.split('-')[1] === 'name' || it.id.split('-')[1] === 'message') {
                        it.addEventListener('input', () => {
                            it.value = it.value.replace(/[^а-яА-Я\s]/, '');
                        });
                    };
                    it.addEventListener('change', (e) => {
                        validateInput(it, it.id.split('-')[1]);
                    });
                    //Для Internet Explorer 11
                    it.addEventListener('blur', (e) => {
                        validateInput(it, it.id.split('-')[1]);
                    });
                }
            });
        });
        //Подключение обработчика событий  к каждой форме
        form.forEach(item => {
            item.addEventListener('submit', (event) => {
                event.preventDefault();
                // Проверка валидации (связь с Валидатором по классу success)
                if ([...item.elements].every(it => {
                        if (it.tagName.toLowerCase() === 'input') {
                            return validateInput(it, it.id.split('-')[1]);
                        } else {
                            return true;
                        };
                    })) {
                    item.appendChild(statusMessage);
                    statusMessage.textContent = loadMessage;
                    messageAnimateBlinking(statusMessage);
                    let body = {};
                    const formData = new FormData(item);
                    formData.forEach((val, key) => {
                        body[key] = val;
                    });
                    postData(body, './server.php')
                        .then((response) => {
                            if (response.status !== 200) {
                                throw new Error('status nerwork not 200');
                            }
                        })
                        .then(() => {
                            clearTimeout(idTime);
                            cancelAnimationFrame(idAniBlink);
                            statusMessage.style.opacity = '0';
                            requestAnimationFrame(messageAnimateOpacity.bind(null, statusMessage));
                            statusMessage.textContent = successMessage;
                            //Очистка inputов
                            [...item.elements].forEach(it => {
                                it.value = '';
                                it.classList.remove('success');
                            });
                        }, )
                        .catch((error) => {
                            cancelAnimationFrame(idAniBlink);
                            statusMessage.textContent = errorMessage;
                            console.error(error);
                        });
                };

            });
        });
        const postData = (data, url) => {
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
        };
    };
    export default sendForm;