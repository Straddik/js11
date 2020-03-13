const animateScrolling = (elem, step, count) => {
    count++;
    let idReq = requestAnimationFrame(animateScrolling.bind(null, elem, step, count)),
        scrollTopVal;
    document.body.scrollTop += step;
    document.documentElement.scrollTop += step;
    scrollTopVal = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;

    let offsetHeight = (!!document.documentElement && document.documentElement.offsetHeight) || (document.body.offsetHeight);
    if (step < 0) {
        if (elem.offsetTop > scrollTopVal || (scrollTopVal <= elem.scrollTop) || count > 200)
            cancelAnimationFrame(idReq);
    } else {
        if (elem.offsetTop < scrollTopVal || (scrollTopVal > (offsetHeight - elem.offsetHeight - 300)) || count > 200)
            cancelAnimationFrame(idReq);
    }

};

const scrollIt = (element, direction) => {
    // document.body.setAttribute('scroll-behavior', 'smooth');
    // document.body.setAttribute('overflow-y', 'scroll');
    const elem = document.querySelector(element.getAttribute('href'));
    let step = elem.offsetTop % 100 > 20 ? elem.offsetTop % 100 + 20 : elem.offsetTop % 100 + 45;
    if (direction === 'up') {
        step = -step - 30;
    };
    animateScrolling(elem, step, 0);
};

export default scrollIt;