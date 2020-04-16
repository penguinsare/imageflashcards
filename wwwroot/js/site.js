// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(function () {
    boxImage = $('.box-image');
    footerContainer = $('.footer-container');
    feedbackSection = $('.feedback-form');
    adjustFeedbackButton();
    $(window).bind('resize', function () {
        adjustFeedbackButton();
    });
    $(window).bind('load', function () {
        adjustFeedbackButton();
    });
    let feedbackForm = $('.feedback-form');
    feedbackForm.data('bottomHideOffset', (feedbackForm.height() - feedbackForm.find('.feedback-title').height()));
    feedbackForm.css('bottom', -(feedbackForm.data('bottomHideOffset')) + 'px');

    $('.feedback-title').bind('click', function () {
        let feedbackTitle = $(this);
        let feedbackForm = feedbackTitle.parent('.feedback-form');
        console.log('css bottom', feedbackForm.css('bottom'));
        if (feedbackForm.css('bottom') === '-1px') {
            feedbackForm.animate({
                bottom: -feedbackForm.data('bottomHideOffset') + 'px',
                'width': (feedbackForm.width() / 2) + 'px',
                'left': (feedbackForm.width() / 2) + feedbackForm.offset().left + 'px'
            }, 400, function () {
                feedbackTitle.find('.feedback-svg-icon').removeClass('feedback-svg-icon-rotate');
                }
            );
            //feedbackTitle.find('.feedback-svg-icon').removeClass('feedback-svg-icon-rotate');
            //myThis.animate({'width': (myThis.width() / 2) + 'px'},400);
            //myThis.css('width', (myThis.width() / 2) + 'px');

        } else {
            calculateFeedbackMessageChars();
            feedbackForm.animate({
                bottom: '-1px',
                'width': (feedbackForm.width() * 2) + 'px',
                'left': feedbackForm.offset().left - feedbackForm.width() + 'px'
            }, 400, function () {
                    feedbackTitle.find('.feedback-svg-icon').addClass('feedback-svg-icon-rotate');
                }
            );

            
            //myThis.animate({ 'width': (myThis.width() * 2) + 'px' }, 400);

            //myThis.css('width', (myThis.width() * 2) + 'px');
        }        
    });

    
    $('textarea.feedback-section-items').bind('change textInput input', function () {
        console.log('key pressed in message area');
        calculateFeedbackMessageChars();
    });
})

adjustFeedbackButton = function () {
    let leftDistance = footerContainer.offset().left + footerContainer.width() - feedbackSection.width();
    console.log('footerContainer.offset().left', footerContainer.offset().left);
    console.log('footerContainer.width()', footerContainer.width());
    console.log('feedbackSection.width()', feedbackSection.width());
    feedbackSection.css('left', leftDistance);
    console.log('leftDistance', leftDistance);
    console.log('feedbackSection', feedbackSection);
}

calculateFeedbackMessageChars = function () {
    let messageTextarea = $('textarea.feedback-section-items');
    let charactersDisplay = messageTextarea.next('div.feedback-section-items');
    console.log('charactersDisplay', charactersDisplay);
    charactersDisplay
        .text('Characters used ' +
        messageTextarea.val().length +
        '/' +
        messageTextarea.attr('maxLength'));
    
}