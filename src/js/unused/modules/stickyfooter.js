if (document.querySelector('.footer')) {
    document.addEventListener('wheel', e => {
        if (e.deltaY < 0) {
            document.querySelector('.footer').classList.add('fixed-footer');
        } else {
            document.querySelector('.footer').classList.remove('fixed-footer');
        }
    });
}
