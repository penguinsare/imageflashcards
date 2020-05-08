$(function () {
    let feedbackForm = $('#feedback-form'); 
    adjustFeedbackButton();
    $(window).bind('resize', function () {
        adjustFeedbackButton();
        // adjustNavMenu();
        // toggleMobileModeElements();
    });

    $('.feedback-title').bind('click', function (e) {
        e.preventDefault();
        let feedbackTitle = $(this);
        let feedbackForm = feedbackTitle.parent('.feedback-form');
        if (feedbackForm.css('bottom') === '-1px') {
            feedbackForm.css('z-index', '10');
            feedbackForm.animate({
                bottom: -feedbackForm.data('bottomHideOffset') + 'px',
                'width': (feedbackForm.width() / 2) + 'px',
                'left': (feedbackForm.width() / 2) + feedbackForm.offset().left + 'px'
            }, 400, function () {
                feedbackTitle.find('.feedback-svg-icon').removeClass('feedback-svg-icon-rotate');
            }
            );

        } else {
            calculateFeedbackMessageChars();
            feedbackForm.css('z-index', '100');
            feedbackForm.animate({
                bottom: '-1px',
                'width': (feedbackForm.width() * 2) + 'px',
                'left': feedbackForm.offset().left - feedbackForm.width() + 'px'
            }, 400, function () {
                feedbackTitle.find('.feedback-svg-icon').addClass('feedback-svg-icon-rotate');
            }
            );
        }
    });


    $('textarea.feedback-section-items').bind('change textInput input', function () {
        calculateFeedbackMessageChars();
    });

    $('#feedback-form').data('bottomHideOffset', (feedbackForm.height() - feedbackForm.find('.feedback-title').height()));
    $('#feedback-form').css('bottom', -(feedbackForm.data('bottomHideOffset')) + 'px');

    $('#feedback-form').bind('submit', function (e) {
        e.preventDefault();
        console.log('SUBMIT FEEDBACK FORM');
        let feedbackSection = $('#feedback-form');
        $.ajax({
            url: '/api/Feedback',
            type: 'POST',
            data: JSON.stringify([
                {
                    'FeedbackId': 0,
                    'Name': feedbackSection.find('input[name=name]').val(),
                    'Email': feedbackSection.find('input[name=email]').val(),
                    'Message': feedbackSection.find('textarea[name=message]').val()
                }
            ]),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

        });
        let formItems = $(this).find('.feedback-section-items, .feedback-characters-counter, input[type=submit]');

        formItems.css('position', 'relative');

        //console.log('$(this).offset().top - 50', $(this).offset().top - 50);
        //console.log('$(this)', $(this));
        formItems
            .animate({
                'top': ($(this).offset().top - 15 - feedbackSection.offset().top) + 'px'
            }, 600)
            .delay(1000)
            .animate({ 'top': '500px' }, 600, function () {
                if ($(this).hasClass('feedback-characters-counter')) {
                    $('#feedback-sent-message').show(600, function () {
                        window.setTimeout(
                            function () {
                                $('.feedback-title').trigger('click');
                            }, 1200);
                        window.setTimeout(
                            function () {
                                $('#feedback-sent-message').hide();
                                formItems.css('position', 'static');
                                feedbackSection.find('input.feedback-section-items').val('');
                                feedbackSection.find('textarea.feedback-section-items').val($('textarea.feedback-section-items').data('initial-text'));
                            }, 2000);
                    });
                }
            });
    });
    // bind on mouseup to be sure it will execute before the window click event click
    $('#feedback-form').bind('mouseup', function () {
        feedbackFormClicked = true; // global var in site.js

    });
});

adjustFeedbackButton = function () {
    let feedbackSection = $('#feedback-form');
    let leftDistance = footerContainer.offset().left + footerContainer.width() - feedbackSection.width();
    feedbackSection.css('left', leftDistance);
}

calculateFeedbackMessageChars = function () {
    let messageTextarea = $('textarea.feedback-section-items');
    let charactersDisplay = messageTextarea.next('.feedback-characters-counter');
    charactersDisplay
        .text('Characters used ' +
        messageTextarea.val().length +
        '/' +
        messageTextarea.attr('maxLength'));    
}