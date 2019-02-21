/* global bodyScrollLock */

const hamburger = document.querySelector('.js-hamburger');
const nav = document.querySelector('.js-nav');

const onHamburgerClick = (e) => {
    hamburger.classList.toggle('is-active');
    nav.classList.toggle('is-opened');
    if (hamburger.classList.contains('is-active')) {
        bodyScrollLock.disableBodyScroll(nav);
    } else {
        bodyScrollLock.enableBodyScroll(nav);
    }
};

hamburger.addEventListener('click', onHamburgerClick);
