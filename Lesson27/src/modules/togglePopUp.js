//popup
const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupMenu = popup.querySelector('.popup-content');
    let step = -100,
        idRequest;
    const animation = () => {
        idRequest = requestAnimationFrame(animation);
        step += 2;
        popupMenu.style.transform = `translateX(${step}%)`;
        popupMenu.style.opacity = `.${step>-90 ? 100+step%100 : 0}`;
        if (step >= 0) {
            cancelAnimationFrame(idRequest);
            step = -100;
            popupMenu.style.opacity = `1`;
            return;
        };
    };

    popupBtn.forEach((element) => element.addEventListener('click', () => {
        popup.style.display = 'block';
        if (document.documentElement.clientWidth >= 768) {
            animation();
        } else {
            popup.style.top = `0px`;
            popup.style.position = 'fixed';
        }

    }));
    popup.addEventListener('click', (event) => {
        let target = event.target;
        target.closest('.popup-close') ? target = false : target = target.closest('.popup-content');
        if (!target) {
            popup.style.display = 'none';
        }
    })
};
export default togglePopUp;