    // Изменение фотографий в Нашей команде при наведении на фото
    const changePhoto = () => {
        const comand = document.getElementById('command');
        const exchange = (element) => {
            let cash = element.src;
            element.src = element.dataset.img;
            element.dataset.img = cash;
        };
        comand.addEventListener('mouseover', (event) => {
            let target = event.target;
            if (target.closest('.command__photo')) {
                exchange(target);
            };
        });
        comand.addEventListener('mouseout', (event) => {
            let target = event.target;
            if (target.closest('.command__photo')) {
                exchange(target);
            };
        });
    };
    export default changePhoto;