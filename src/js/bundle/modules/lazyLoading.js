import LazyLoad from 'vanilla-lazyload';

const lazy = new LazyLoad({
    elements_selector: '.lazy',
    treshold: 300,
    class_loading: 'loading',
    // callback_load: (el) => {},
});
