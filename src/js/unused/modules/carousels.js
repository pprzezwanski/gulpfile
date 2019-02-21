import { tns } from 'tiny-slider/src/tiny-slider.module';

const carousel = tns({
    container: '.js-carousel',
    preventScrollOnTouch: 'force',
    mouseDrag: true,
    autoplay: false,
    center: true,
    controls: false,
    prevButton: false,
    nextButton: false,
    nav: true,
    navPosition: 'bottom',
    // slideBy: 1,
    // navContainer: '.js-nav-container',
    edgePadding: 20,
    navAsThumbnails: true,
    onInit: (info) => {
        info.slideItems[info.index].classList.add('active');
    },
    responsive: {
        0: {
            items: 1,
            startIndex: 0,
            gutter: 40,
            center: false,
        },
        768: {
            items: 2,
            center: false,
            startIndex: 0,
            gutter: 40,
        },
        1022: {
            items: 3,
            center: true,
            startIndex: 1,
            gutter: 100,
        },
    },
});

const addActiveClass = () => {
    // get slider info
    const info = carousel.getInfo();
    const indexPrev = info.indexCached;
    const indexCurrent = info.index;

    // update style based on index
    info.slideItems[indexPrev].classList.remove('active');
    info.slideItems[indexCurrent].classList.add('active');
};

carousel.events.on('indexChanged', () => {
    setTimeout(addActiveClass, 100);
});
