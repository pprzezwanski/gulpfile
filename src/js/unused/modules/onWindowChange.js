/**
 * sets up listeners that will fire the callback
 * on every window size or orientation change
 * @param {function} callback to run
 */
const onWindowChange = (callback, ...args) => {
    const callbackWithArgs = () => callback(...args);
    window.addEventListener('resize', callbackWithArgs, false);
    window.addEventListener('orientationchange', callbackWithArgs, false);

    return {
        on: () => {
            window.addEventListener('resize', callbackWithArgs, false);
            window.addEventListener('orientationchange', callbackWithArgs, false);
        },
        off: () => {
            window.removeEventListener('resize', callbackWithArgs, false);
            window.removeEventListener('orientationchange', callbackWithArgs, false);
        },
    };
};

export default onWindowChange;
