document.addEventListener('wheel', e => {
    if (e.deltaY > 0) {
        document.querySelector('.header').classList.add('fixed-header');
    } else {
        document.querySelector('.header').classList.remove('fixed-header');
    }
});