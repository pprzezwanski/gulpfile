function collapsible (selector, lineHeightPx = 19, numOfLines = 6, moreText = 'More...', lessText = '...Less') {
    if ($(selector).length === 0) return;

    const desiredHeight = lineHeightPx * numOfLines;

    $('<span class="more-btn">' + moreText + '</span>').insertAfter(selector);
    const moreBtn = $(selector).parent().find('.more-btn');
    
    // const fullHeight = $(selector).outerHeight()
    const fullHeight = document.querySelector(selector).offsetHeight;

    $(selector).css({
        'overflow': 'hidden',
        'transition': 'max-height .4s ease',
        'max-height': desiredHeight + 'px'
    });

    moreBtn.click(() => {
        if ($(selector).css('max-height').replace('px', '') - desiredHeight < 0.001) {
            $(selector).css('max-height', fullHeight + 'px');
        } else {
            $(selector).css('max-height', desiredHeight + 'px');
        }
        setTimeout(() => {
            moreBtn.text(moreBtn.text() === moreText ? lessText : moreText);
        }, 100);
    });
}

collapsible('.add-read-more', 48.05, 3);
