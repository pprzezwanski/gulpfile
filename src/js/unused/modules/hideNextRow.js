const hideNextRow = () => {
    const elements = Array.from(document.querySelectorAll('.js-resource'));
    const firstPos = elements[0].getBoundingClientRect().top;

    elements.forEach((el, i) => {
        el.style.display = 'flex';
        if (el.getBoundingClientRect().top !== firstPos) el.style.display = 'none';
    });
};

export default hideNextRow;
