let mode = true;

export const maskAndBan = (element, position, key) => {
    if (key >= 0 && key < 10) {
        mode = true;
        if (position < 4) {
            element.setSelectionRange(4, 4);
            element.value = element.value.slice(0, 5) + element.value.slice(6, );
            element.setSelectionRange(4, 4);
        } else if (position === 7 || position === 11 || position === 14) {
            element.value = element.value.slice(0, position + 1) + element.value.slice(position + 2, );
            element.setSelectionRange(position + 1, position + 1);
        } else if (position > 16) {
            element.value = element.value.slice(0, position - 1);

        } else {
            element.value = element.value.slice(0, position) + element.value.slice(position + 1, );
            element.setSelectionRange(position, position);
        }
    } else if (key === 'Backspace') {
        mode = false;
        if (position < 5) {
            element.setSelectionRange(5, 5);
            element.value = element.value.slice(0, 5) + '_' + element.value.slice(5, );
            element.setSelectionRange(5, 5);
        } else if (position === 8 || position === 12 || position === 15) {
            element.value = element.value.slice(0, position - 1) + '_' + element.value.slice(position - 1, );
            element.setSelectionRange(position, position);
        } else {
            element.value = element.value.slice(0, position) + '_' + element.value.slice(position, );
            element.setSelectionRange(position, position);
        }
    } else if (key === 'Delete' || key === 'Del') {
        mode = false;
        if (position <= 4) {
            element.setSelectionRange(4, 4);
            element.value = element.value.slice(0, 4) + '_' + element.value.slice(4, );
            element.setSelectionRange(5, 5);
        } else if (position === 7 || position === 11 || position === 14) {
            element.value = element.value.slice(0, position + 1) + '_' + element.value.slice(position + 1, );
            element.setSelectionRange(position + 1, position + 1);
        } else if (position <= 16) {
            element.value = element.value.slice(0, position) + '_' + element.value.slice(position, );
            element.setSelectionRange(position + 1, position + 1);
        }
    }

};
export const mask = (element) => {
    if (element.value === '') {
        element.value = '+7 (___)___-__-__';
        element.setSelectionRange(4, 4);
    };
};
export const ban = (elem, pos) => {
    const reg = new RegExp('[^\\d]');
    if (reg.test(elem.value.slice(pos - 1, pos)) && mode) {
        elem.value = elem.value.slice(0, pos - 1) + elem.value.slice(pos - 1, pos).replace(reg, '') + elem.value.slice(pos, );
        elem.setSelectionRange(pos - 1, pos - 1);
    }
    mode = true;
};