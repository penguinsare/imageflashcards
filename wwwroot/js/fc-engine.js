
var mouseIsDown = false;
var flashcardList = null;
var boxImage = null;
var lessonImageNaturalWidth = 0;
var lessonImageNaturalHeight = 0;
var viewportWidth = 0;
var viewportHeight = 0;

var fcToggleSize = 0;
var fcToggleOffset = 0;

var classHidden = 'hidden-flashcard';
var classStateUnsolved = 'unsolved';
var classStateSolved = 'solved';
var classStateTurned = 'turned';

$(function () {
   
    flashcardList = $('.flashcard');
    boxImage = $('.box-image');
    lessonImageNaturalWidth = $('#lesson-image').get(0).naturalWidth;
    lessonImageNaturalHeight = $('#lesson-image').get(0).naturalHeight;
    fcToggleOffset = $(1.8).toPx();
    //let elementNumber = 1;
    //window.setTimeout(function () {
    //    $('*').each(function () {
    //        if ($(this).css('z-index') != 'auto') {
    //            console.log(elementNumber + 'z-index', $(this).css('z-index'));
    //            elementNumber++;
    //        }
    //    });
    //}, 2000);
    


    flashcardList.each(function () {
        let fc = $(this);

        fc.addClass(classStateUnsolved);
        fc.addClass(classHidden);
        positionFlashcard(fc);
    });

    $(window).bind('resize', function () {
        adjustLessonImage();
        flashcardList.each(function () {
            let fc = $(this);           
            positionFlashcard(fc);
        });

    });

    $('#lesson-image').one('load', function () {
        //viewportWidth = $(window).width();
        //viewportHeight = $(window).height();
        //let mainBox = $('.main-box');
        //let boxImage = mainBox.find('#box-image');
        //let lessonImage = $(this);
        //console.log('lessonImage.width() / lessonImage.height()', lessonImage.width() / lessonImage.height());
        //console.log('viewportWidth', viewportWidth);
        //console.log('viewportHeight', viewportHeight);

        ////BIG TEST of dynamic image adjustment
        //// if image natural dimensions are smaller than screen
        //// or the scrren is portrait orientation
        //if (lessonImage.width() <= viewportWidth ||
        //    viewportWidth / viewportHeight < 1) {
        //    mainBox.find('#box-image').css('height', 'auto');
        //    mainBox.find('#lesson-image').css('width', '100%');
        //    console.log('if ------');
        //} else {
        //    let scaleCoeff = lessonImage.width() / viewportWidth;
        //    let visibleHeightOfImage = viewportHeight * scaleCoeff;
        //    let imageScaledHeightToScreenRation = lessonImage.height() / visibleHeightOfImage;
        //    if (imageScaledHeightToScreenRation > 1.5) {
        //        mainBox.find('#box-image').css('height', '150vh');
        //        mainBox.find('#lesson-image').css('width', 'auto');
        //        mainBox.find('#lesson-image').css('height', 'calc(100% - 0.8em)');
        //        console.log('else if ------');
        //    } else {
        //        mainBox.find('#box-image').css('height', 'auto');
        //        mainBox.find('#lesson-image').css('width', '100%');
        //        console.log('else else ------');
        //    }
        //}
        

        

        ////if ((lessonImage.width() / lessonImage.height()) <= 1) {
        ////    mainBox.find('#box-image').css('height', '100vh');
        ////    mainBox.find('#lesson-image').css('width', 'auto');
        ////} else {
        ////    mainBox.find('#box-image').css('height', 'auto');
        ////    mainBox.find('#lesson-image').css('width', '100%');
        ////}
        //flashcardList.each(function () {
        //    let fc = $(this);
        //    positionFlashcard(fc);
        //});
        adjustLessonImage();
    }).each(function () {
        if (this.complete) {
            //$(this).load(); // For jQuery < 3.0 
             $(this).trigger('load'); // For jQuery >= 3.0 
        }
    });

    $('#expand-all').bind('click', function () {
        if ($(this).is(':checked')) {
            flashcardList.each(function () {
                showFlashcard($(this));
            });
        } else {
            flashcardList.each(function () {
                hideFlashcard($(this));
            });
        }
    });

    $('#autoscale').bind('click', function () {
        let mainBox = $('.main-box');
        let boxImage = mainBox.find('#box-image');
        let lessonImage = mainBox.find('#lesson-image');
        //if ($(this).is(':checked')) {
        //    //mainBox.css('height', '100vh');
        //    //mainBox.find('#box-image').css('height', 'calc(100vh - 8em)');

        //    mainBox.find('#box-image').css('height', '100vh');

        //    mainBox.find('#lesson-image').css('width', 'auto');
        //    //mainBox.find('#lesson-image').css('height', 'calc(100% - 0.8em)');
        //} else {
        //    mainBox.find('#box-image').css('height', 'auto');
        //    mainBox.find('#lesson-image').css('width', '100%');
        //    //mainBox.find('#lesson-image').css('height', 'auto');
        //}
        //flashcardList.each(function () {
        //    let fc = $(this);
        //    positionFlashcard(fc);
        //});
    });

    $('.flashcard-toggle').bind('click', function () {
        let myThis = $(this);
        toggleFlashcard(myThis.next());        
    });

    $('.flashcard').bind('click', function () {
        flashcardList.each(function () {
            $(this).css('z-index', 30);
            $(this).prev().css('z-index', 31);
        });
        let fc = $(this);
        fc.css('z-index', 40);
        fc.prev().css('z-index', 41);
        //console.log('flashcard resize:', fc);
        //positionFlashcard(fc);        
    });

    $('.flashcard').each(function () {
        let fc = $(this);
        fc.find('.foreign-word-input').bind('keypress', function (e) {
            console.log('KEY PRESS EVENT:', e);
            if (e.originalEvent.key === 'Enter') {
                fc.find('.check-button').trigger('click')
            }
        });
    });

    $('.check-button').bind('click', function () {
        let myThis = $(this);
        let flashcard = myThis.closest('.flashcard');
        console.log('.flashcard', flashcard);
        let input = flashcard.find('.foreign-word-input');
        let foreignWord = flashcard.find('.foreign-word');
        console.log('.foreign-word-input', input);
        console.log('.foreign-word', foreignWord);

        console.log('word-input', input.val());
        console.log('word-p', foreignWord.text());
        if (flashcard.hasClass('flipped')) {
            return;
        }
        if (input.val() === foreignWord.text()) {
            if (!flashcard.hasClass(classStateSolved)) {
                changeStateFlashcard(flashcard, classStateSolved);
            }
            input.animate({
                width: '80%',
                'margin-left': '10%',
                'margin-right': '10%'
            }, 150, 'linear', () => {
                input.hide(0, () => foreignWord.show())
                });
            flashcard.find('.flashcard-buttons-panel').hide();
            let url = window.location.origin +
                '/api/FlashcardsSolved/' +
                flashcard.data('flashcard-id') +
                '/solved';
            $.ajax({
                type: "POST",
                url: url
                
            });
        } else {
            input.animate({
                width: '80%',
                'margin-left': '10%',
                'margin-right': '10%'
            }, 100, 'linear', () => {
                    input.animate({
                        width: '100%',
                        'color': 'white',
                        'margin-left': '0',
                        'margin-right': '0'
                    }, 200, 'linear');  
            });            
        }        
    });

    $('.turn-fc-button').bind('click', function () {
        let myThis = $(this);
        let flashcard = myThis.closest('.flashcard');
        let input = flashcard.find('.foreign-word-input');
        let foreignWord = flashcard.find('.foreign-word');

        if (flashcard.hasClass(classStateSolved) || flashcard.hasClass(classStateTurned)) {
            return;
        }

        changeStateFlashcard(flashcard, classStateTurned);
        flashcard.find('.flashcard-buttons-panel').hide();
        input.animate({
            width: '80%',
            'margin-left': '10%',
            'margin-right': '10%'
        }, 150, 'linear', () => {
            input.hide(0, () => foreignWord.show())
        });
    });
});

positionFlashcard = function (fc) {    
    let fcToggle = fc.prev();

    let resizeCoeffX = boxImage.width() / lessonImageNaturalWidth;
    let resizeCoeffY = boxImage.height() / lessonImageNaturalHeight;

    if (resizeCoeffX > 1) {
        resizeCoeffX = 1;
    }
    if (resizeCoeffY > 1) {
        resizeCoeffY = 1;
    }

    let fcOriginalXPositionResized = resizeCoeffX * fc.data('xdistance');
    let fcOriginalYPositionResized = resizeCoeffY * fc.data('ydistance');
    let rightOffsetOutsideOfImageBox = function () {
        let offset = boxImage.width() - (fcOriginalXPositionResized + fc.outerWidth());
        return offset < 0 ? (offset - 10) : 0;
    }

    let fcToggleOffset = boxImage.width() - (fcOriginalXPositionResized + fcToggle.outerWidth());
    if (fcToggleOffset <= 0) {
        fcToggle.addClass('flashcard-toggle-right-edge');
        fcToggleOffset = -fcToggle.outerWidth();
        //console.log('right-edge-offset:', fcToggleOffset);
        //console.log('fcToggle.width():', fcToggle.outerWidth());

    }else {
        fcToggle.removeClass('flashcard-toggle-right-edge');
        fcToggleOffset = 0;
        //console.log('right-edge-offset:', fcToggleOffset);

    }
   
    //let bottomOffsetOutsideOfImageBox = function () {
    //    let bottomOffset = (boxImage.outerHeight() + inflatableDiv.outerHeight()) - (fcOriginalYPositionResized + $(1).toPx() + 120);
    //    if (bottomOffset <= 0) {
    //        console.log('bottomOffset', bottomOffset);
            
    //        return Math.abs(bottomOffset);
    //    } else {
    //        console.log('bottomOffset', 0);
    //        return 0;
    //    }
    //} 
    //inflatableDiv.css('height', bottomOffsetOutsideOfImageBox() + 'px');

    fcToggle.css('left', (fcOriginalXPositionResized + fcToggleOffset) + 'px');
    fcToggle.css('top', fcOriginalYPositionResized + 'px');
    fc.css('left', fcOriginalXPositionResized + rightOffsetOutsideOfImageBox() + 'px');
    fc.css('top', fcOriginalYPositionResized + $(1).toPx() + 'px');  
    //console.log('fcOriginalYPositionResized', fcOriginalYPositionResized);
}

toggleFlashcard = function (fc) {
    if (fc.hasClass(classHidden)) {
        showFlashcard(fc);
    } else {        
        hideFlashcard(fc);
    }
}

showFlashcard = function (fc) {
    let leftOffsetLocal =
        (boxImage.width() / lessonImageNaturalWidth) * fc.data('xdistance');
    fc.css('left', leftOffsetLocal + 'px');
    fc.css('height', 'auto');
    fc.css('display', 'flex');

    fc.animate({
        width: '200px',
        left: offsetFlashcardLeft(200, fc.data('xdistance'), boxImage.width(), lessonImageNaturalWidth)
    }, 120);

    fc.css('height', 'auto');
    fc.css('display', 'flex');
    
    if (fc.hasClass(classStateUnsolved)) {
        fc.find('.unsolved').show();
    } else if (fc.hasClass(classStateSolved)) {
        fc.find('.solved').show();
    } else if (fc.hasClass(classStateTurned)) {
        fc.find('.turned').show();
    } else {
        fc.addClass(classStateUnsolved);
    }
    fc.removeClass(classHidden);
}

changeStateFlashcard = function (fc, state) {
    if (state === classStateSolved) {
        fc.addClass(classStateSolved);
        fc.removeClass(classStateTurned);
        fc.removeClass(classStateUnsolved);
        fc.css('background-color', 'rgb(0, 189, 91)');
        fc.prev().css('background-color', 'rgb(0, 189, 91)');
    } else if (state === classStateTurned) {
        fc.addClass(classStateTurned);
        fc.removeClass(classStateSolved);
        fc.removeClass(classStateUnsolved);
        fc.css('background-color', 'rgb(255, 136, 136)');
        fc.prev().css('background-color', 'rgb(255, 136, 136)');
    } else if (state === classStateUnsolved) {
        fc.addClass(classStateUnsolved);
        fc.removeClass(classStateSolved);
        fc.removeClass(classStateTurned);
    }
}

hideFlashcard = function (fc) {
    fc.css('width', fcToggleSize + 'px');
    fc.css('height', fcToggleSize + 'px');
    fc.hide();
    fc.addClass(classHidden);
}

offsetFlashcardLeft = function (flashcardWidth, flashcardXDistance, boxImageWidth, lessonImageWidth) {
    let resizeCoeffX = boxImageWidth / lessonImageWidth;
    let fcOriginalXPositionResized = resizeCoeffX * flashcardXDistance;
    let newLeft;
    if (boxImageWidth > flashcardWidth) {
        let offset = boxImageWidth - (fcOriginalXPositionResized + flashcardWidth);
        if (offset >= 0) {
            newLeft = fcOriginalXPositionResized;
        } else {
            newLeft = fcOriginalXPositionResized - Math.abs(offset) - 10;
        }
    } else {
        
        newLeft = 0; 
    }
    
    return newLeft;
}

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
    if (lessonImage[0].naturalWidth <= viewportWidth ||
        viewportWidth / viewportHeight < 1) {
        mainBox.find('#box-image').css('height', 'auto');
        mainBox.find('#lesson-image').css('width', '100%');
        console.log('if ------');
    } else {
        console.log('naturalWidth', lessonImage[0].naturalWidth)
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
            mainBox.find('#lesson-image').css('width', '100%');
            console.log('else else ------');
        }
    }

    flashcardList.each(function () {
        let fc = $(this);
        positionFlashcard(fc);
    });
}