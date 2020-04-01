import { moveLeft, moveRight } from "./moveLeftAndRight";
const review = document.querySelector('.reviews-slider');
const popupConsult = document.querySelector('.popup-consultation');

export const moveReviewLeft = () => {
    moveLeft(review);
};
export const moveReviewRight = () => {
    moveRight(review);
};
export const openPopupConsult = () => {
    popupConsult.style.visibility = 'visible';
};
export const closePopupConsult = () => {
    popupConsult.style.visibility = 'hidden';
};