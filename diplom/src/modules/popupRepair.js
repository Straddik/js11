const repair = document.querySelector('.popup-repair-types');

export const popupRepair = () => {
    repair.style.visibility = 'visible';
};

export const closePopupRepair = () => {
    repair.style.visibility = 'hidden';
}