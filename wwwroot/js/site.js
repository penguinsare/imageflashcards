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

    $('.feedback-title').bind('click', function (e) {
        e.preventDefault();
        let feedbackTitle = $(this);
        let feedbackForm = feedbackTitle.parent('.feedback-form');
        //console.log('css bottom', feedbackForm.css('bottom'));
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
        //console.log('key pressed in message area');
        calculateFeedbackMessageChars();
    });

    feedbackSection.bind('submit', function (e) {
        e.preventDefault();
        
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

    // SUBSCRIBE BAR
    $('#subscribe-disable-button').bind('click', function (e) {
        e.preventDefault();
        if (window.confirm('Do you want to remove the subscribe bar permanently?')) {
            $(this).closest('#subscribe-section').hide();
            let expDate = new Date();
            newYear = expDate.getFullYear() + 2;
            expDate.setFullYear(expDate.getFullYear() + 2);
            //console.log('full year ', expDate.getFullYear());
            //console.log('subscribe-bar=no; expires=' + expDate.toUTCString() + '; path=/;');
            document.cookie = 'subscribe-bar=no; expires=' + expDate.toUTCString() + '; path=/;';
        }        
    });

    
})

adjustFeedbackButton = function () {
    let leftDistance = footerContainer.offset().left + footerContainer.width() - feedbackSection.width();
    //console.log('footerContainer.offset().left', footerContainer.offset().left);
    //console.log('footerContainer.width()', footerContainer.width());
    //console.log('feedbackSection.width()', feedbackSection.width());
    feedbackSection.css('left', leftDistance);
    //console.log('leftDistance', leftDistance);
    //console.log('feedbackSection', feedbackSection);
}

calculateFeedbackMessageChars = function () {
    let messageTextarea = $('textarea.feedback-section-items');
    let charactersDisplay = messageTextarea.next('.feedback-characters-counter');
    //console.log('charactersDisplay', charactersDisplay);
    charactersDisplay
        .text('Characters used ' +
        messageTextarea.val().length +
        '/' +
        messageTextarea.attr('maxLength'));    
}