// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var mobileMode = false;

var feedbackFormClicked = false;

$(function () {
    boxImage = $('.box-image');
    footerContainer = $('.footer-container');
    // adjustFeedbackButton();
    $(window).bind('resize', function () {
        if ($(window).width() > 600) {
            mobileMode = false;
        } else {
            mobileMode = true;
        }
        console.log('window width',$(window).width());
        //adjustFeedbackButton();
        // adjustNavMenu();
        // toggleMobileModeElements();
    });
    $(window).bind('load', function () {
        if ($(window).width() > 600) {
            mobileMode = false;
        } else {
            mobileMode = true;
        }
        adjustFeedbackButton();
        // adjustNavMenu();
        // toggleMobileModeElements();
    });

    $(window).bind('click', function () {
        console.log('window click event');
        console.log('feedbackFormClicked', feedbackFormClicked);
        if (!feedbackFormClicked) {
            let feedbackForm = $('#feedback-form');
            if (feedbackForm.css('bottom') === '-1px') {
                feedbackForm.css('z-index', '10');
                feedbackForm.animate({
                    bottom: -feedbackForm.data('bottomHideOffset') + 'px',
                    'width': (feedbackForm.width() / 2) + 'px',
                    'left': (feedbackForm.width() / 2) + feedbackForm.offset().left + 'px'
                }, 400, function () {
                    feedbackForm.find('.feedback-svg-icon').removeClass('feedback-svg-icon-rotate');
                }
                );
    
            }
            
        }
        feedbackFormClicked = false;
    });

    


    // $('#main-menu-button').bind('mouseenter', function () {
    //     if (mobileMode) {
    //         $(this).find('.logo-second-part').css('color', '#9cc926');
    //     }       
    // });
    // $('#main-menu-button').bind('mouseleave', function () {
    //     $(this).find('.logo-second-part').css('color', 'black');
    // });
    
    

    

    
    // SUBSCRIBE BAR
    $('#subscribe-form').bind('submit', function (e) {
        e.preventDefault();
        let subscribeForm = $(this);
        let subscribeEmailInput = subscribeForm.find('#subscribe-email');
        if (subscribeEmailInput.val().length < 1) {
            subscribeForm.trigger('reset');
            subscribeForm.find('input[type=submit]').trigger('blur');
        }else {
            console.log('subscribeEmailInput.val()', subscribeEmailInput.val());
            $.ajax({
                url: '/api/Subscribe',
                type: 'POST',
                data: JSON.stringify(
                    {
                        //'EmailSubscriberId': 0,                        
                        'Email': subscribeEmailInput.val(),
                        //'SubscribedAtDate': null
                    }
                ),
                contentType: "application/json; charset=utf-8",
                // dataType: "json",
                success: function () {
                    console.log('subscribe success');
                    $('#subscribe-section').hide();
                    let expDate = new Date();
                    newYear = expDate.getFullYear() + 2;
                    expDate.setFullYear(expDate.getFullYear() + 2);
                    document.cookie = 'subscribe-bar=no; expires=' + expDate.toUTCString() + '; path=/;';
                },
                error: function (err) {
                    console.log('subscribe error');
                    console.log(err);
                        subscribeForm.trigger('reset');
                        subscribeForm.find('input[type=submit]').trigger('blur');
                }
            });
        }
    });
    $('#subscribe-disable-button').bind('click', function (e) {
        e.preventDefault();
        if (window.confirm('Do you want to remove the subscribe bar permanently?')) {
            $(this).closest('#subscribe-section').hide();
            let expDate = new Date();
            newYear = expDate.getFullYear() + 2;
            expDate.setFullYear(expDate.getFullYear() + 2);
            document.cookie = 'subscribe-bar=no; expires=' + expDate.toUTCString() + '; path=/;';
        }
    });

    // $('#main-menu-button').bind('click', function (e) {
    //     e.preventDefault();
    //     if (mobileMode){
    //         let menuButton = $(this);
    //         let menuExpanded = $('#main-menu-expanded');
    
    //         if (menuExpanded.css('display') === 'none') {
    //             menuExpanded.css('bottom', -(menuExpanded.outerHeight() + $(1).toPx()));
    //             menuExpanded.show(100);
    //         } else {
    //             menuExpanded.hide();
    //         }
    //     }        
    // });
});


// ENABLE LATER
// adjustNavMenu = function () {
    
//     let mainMenuButton = $('#main-menu-button');
//     if (mobileMode){
//         mainMenuButton.css('border','1px solid lightgray');
//         mainMenuButton.css('background-color','#e6e6e6');
//         mainMenuButton.css('cursor','pointer');
//         mainMenuButton.find('.logo-second-part').css('color', '#9cc926');
//         mainMenuButton.find('i').show();
//     } else {
//         mainMenuButton.css('border','none');
//         mainMenuButton.css('background-color','#fafafa');
//         mainMenuButton.css('cursor','default');
//         mainMenuButton.find('.logo-second-part').css('color', 'black');
//         mainMenuButton.find('i').hide();
//         $('#main-menu-expanded').hide();
//     }
    
// };

// ENABLE LATER
// toggleMobileModeElements = function () {
//     let mobileModeElements = $('.hide-in-mobile-mode');
//     if (mobileMode) {
//         mobileModeElements.hide();
//     }else{
//         mobileModeElements.show();
//     }

// };

adjustLessonImage = function () {
    viewportWidth = $(window).width();
    viewportHeight = $(window).height();
    let mainBox = $('.main-box');
    let boxImage = $('#box-image');
    let lessonImage = $('#lesson-image');
    console.log('lessonImage.width() / lessonImage.height()', lessonImage.width() / lessonImage.height());
    console.log('viewportWidth', viewportWidth);
    console.log('viewportHeight', viewportHeight);

    //BIG TEST of dynamic image adjustment
    // if image natural dimensions are smaller than screen
    // or the scrren is portrait orientation
    if ((
        (lessonImage[0].naturalWidth <= viewportWidth ||
        viewportWidth / viewportHeight < 1) && viewportWidth < 800) ||
        lessonImage[0].naturalHeight <= viewportHeight) {
        mainBox.find('#box-image').css('height', 'auto');
        // mainBox.find('#box-image').css('width', '100%');
        mainBox.find('#lesson-image').css('width', '100%');
        console.log('if ------');
    } else {
        console.log('naturalWidth', lessonImage[0].naturalWidth)
        console.log('naturalWidth', lessonImage[0].naturalHeight)
        console.log('viewportWidth', viewportWidth)
        let scaleCoeff = lessonImage[0].naturalWidth / viewportWidth;
        console.log('scaleCoeff = lessonImage[0].naturalWidth(' +
            lessonImage[0].naturalWidth +
            ') / viewportWidth(' +
            viewportWidth +
            ') = ', scaleCoeff);
        let visibleHeightOfImage = viewportHeight * scaleCoeff;
        console.log('visibleHeightOfImage = viewportHeight(' +
            viewportHeight +
            ') * scaleCoeff(' +
            scaleCoeff +
            ') = ', visibleHeightOfImage);
        let imageScaledHeightToScreenRation = lessonImage[0].naturalHeight / visibleHeightOfImage;
        console.log('lessonImage.height()', lessonImage.height());
        console.log('lessonImage[0].naturalHeight', lessonImage[0].naturalHeight);
        console.log('imageScaledHeightToScreenRation = ', imageScaledHeightToScreenRation);
        if (imageScaledHeightToScreenRation > 1.2 ) {
            mainBox.find('#box-image').css('height', '100vh');
            mainBox.find('#lesson-image').css('width', 'auto');
            mainBox.find('#lesson-image').css('height', 'calc(100% - 0.8em)');
            console.log('else if ------');
        } else {
            mainBox.find('#box-image').css('height', 'auto');
            mainBox.find('#box-image').css('width', '100%');
            mainBox.find('#lesson-image').css('width', '100%');
            console.log('else else ------');
        }
    }

    $('#photograph-by-section').css('width', lessonImage.width());

    
}