let flag = true;
const listPhone = () => {
    const phone = document.querySelector('.header-contacts__phone-number-accord');

    if (flag) {
        phone.style.position = 'static';
        phone.childNodes[0].style.opacity = '1';
    } else {
        phone.style.position = 'absolute';
        phone.childNodes[0].style.opacity = '0';
    }
    flag = !flag;


};

export default listPhone;