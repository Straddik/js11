let repairType;
const counterTotal = document.querySelector('.slider-counter-content__total');
const counterCurrent = document.querySelector('.slider-counter-content__current');
const navMobile = document.querySelector('.nav-list-repair');
const reg = new RegExp('\\d');
export const changeRepairType = (elem) => {
    [...elem.parentNode.children].forEach(item => item.classList.remove('active'));
    const nav = document.querySelector(`.types-repair${elem.className.match(reg)[0]}`);
    elem.classList.add('active');
    [...nav.parentNode.children].forEach(item => {
        item.style.display = 'none';
    });
    nav.style.display = 'block';
    [...nav.children].forEach((item, index) => {
        console.log(!item.classList.contains(`${index+1}`));
        if (!item.classList.contains(`${index+1}`)) {
            item.classList.add(`${index+1}`);
        }
    });
    repairType = nav;
    counterTotal.innerHTML = nav.children.length;
    counterCurrent.innerHTML = nav.firstElementChild.className.match(reg)[0];
};

export const moveRepairLeft = () => {
    const elem = repairType.lastElementChild.cloneNode(true);
    repairType.lastElementChild.remove();
    repairType.prepend(elem);
    counterCurrent.innerHTML = repairType.firstElementChild.className.match(reg)[0];
};
export const moveRepairRight = () => {
    const elem = repairType.firstElementChild.cloneNode(true);
    repairType.firstElementChild.remove();
    repairType.append(elem);
    counterCurrent.innerHTML = repairType.firstElementChild.className.match(reg)[0];
};
export const moveRepairMobileLeft = () => {
    const elem = navMobile.lastElementChild.cloneNode(true);
    navMobile.lastElementChild.remove();
    navMobile.prepend(elem);
};
export const moveRepairMobileRight = () => {
    const elem = navMobile.firstElementChild.cloneNode(true);
    navMobile.firstElementChild.remove();
    navMobile.append(elem);
};