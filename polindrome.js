'use strict';
const returnLongestPolindrom = (str) => {
    const arrPolindrome = [];
    str = str.split('');
    for (let i = 0; i <= str.length - 1; i++) {
        for (let j = i + 1; j < str.length + 1; j++) {
            let b = str.slice(i, j);
            if (b.join('') === b.reverse().join('')) {
                arrPolindrome.push(b.join(''));
            };
        };
    };
    arrPolindrome.sort((a, b) => {
        return a.length > b.length ? -1 : a.length < b.length ? 1 : 0;
    });
    return arrPolindrome[0];
};
console.log(returnLongestPolindrom('алаарозаупаланалапуазора'));