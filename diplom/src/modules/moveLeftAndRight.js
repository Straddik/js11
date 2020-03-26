export const moveLeft = (movingElement) => {
    const elem = movingElement.lastElementChild.cloneNode(true);
    movingElement.lastElementChild.remove();
    movingElement.prepend(elem);
};


export const moveRight = (movingElement) => {
    const elem = movingElement.firstElementChild.cloneNode(true);
    movingElement.firstElementChild.remove();
    movingElement.append(elem);
};