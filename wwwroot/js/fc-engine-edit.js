var flashcardsOnTheScreen = 0;
var mouseIsDown = false;
var draggedFlashcardId = -1;
var draggedFlashcardJQueryObject = null;
var flashcardCanBeDragged = false;
var cursorToFlashcardOffsetX = 0;
var cursorToFlashcardOffsetY = 0;
var boxImage = null;
var lessonImageNaturalWidth = null;
var lessonImageNaturalHeight = null;

$(function () {
    boxImage = $('.box-image');
    lessonImageNaturalWidth = $('#lesson-image').get(0).naturalWidth;
    lessonImageNaturalHeight = $('#lesson-image').get(0).naturalHeight;

    $(document).on('mouseup', function () {
        mouseIsDown = false;
        draggedFlashcardId = -1;
        draggedFlashcardJQueryObject = null;
    });
    
    $('.flashcard-added').each(function () {
        let myThis = $(this);
        positionFlashcard(myThis);
        //myThis.css('left', myThis.data('xdistance') + 'px');
        //myThis.css('top', myThis.data('ydistance') + 'px');
    });

    $('.flashcard-added').bind('mousedown', function (e) {
        e.preventDefault();
        draggedFlashcardJQueryObject = $(this);
        draggedFlashcardId = draggedFlashcardJQueryObject.data('flashcard-id'); 
        mouseIsDown = true;
        cursorToFlashcardOffsetX = e.clientX - $(this).offset().left;
        cursorToFlashcardOffsetY = e.clientY - $(this).offset().top;

    });

    $('.flashcard-added').bind('mouseup', function (e) {
        e.preventDefault();
        mouseIsDown = false;
        draggedFlashcardId = -1;
        draggedFlashcardJQueryObject = null;
        cursorToFlashcardOffsetX = 0;
        cursorToFlashcardOffsetY = 0;
    });

    $(document).bind('mousemove', function (e) {
        console.log("flashcard mouseMove event debug log:");
        if (!mouseIsDown || draggedFlashcardJQueryObject == null) return;
        e.preventDefault();
        let myThis = draggedFlashcardJQueryObject;
        let boxImage = $('#box-image');
        flashcardOffsetX = myThis.offset().left;
        flashcardOffsetY = myThis.offset().top;
        boxImageOffsetX = boxImage.offset().left;
        boxImageOffsetY = boxImage.offset().top;
        let resizeCoeffX = boxImage.width() / lessonImageNaturalWidth;
        let resizeCoeffY = boxImage.height() / lessonImageNaturalHeight;


        cursorToBoxImageOffsetX = e.clientX - boxImageOffsetX;
        cursorToBoxImageOffsetY = e.clientY - boxImageOffsetY;

        flashcardToBoxImageOffsetX = cursorToBoxImageOffsetX - cursorToFlashcardOffsetX;
        flashcardToBoxImageOffsetY = cursorToBoxImageOffsetY - cursorToFlashcardOffsetY;

        //console.log('cursorToBoxImageOffsetX', cursorToBoxImageOffsetX);
        //console.log('cursorToBoxImageOffsetY', cursorToBoxImageOffsetY);
        //console.log('flashcardToBoxImageOffsetX', flashcardToBoxImageOffsetX);
        //console.log('flashcardToBoxImageOffsetY', flashcardToBoxImageOffsetY);

        //console.log('image brect width', $('#lesson-image').width());
        //console.log('image brect height', $('#lesson-image').height());
        if (flashcardToBoxImageOffsetX > 0 &&
            flashcardToBoxImageOffsetX < $('#lesson-image').width()) {
            myThis.find('.xdistance').val(flashcardToBoxImageOffsetX / resizeCoeffX);
            myThis.css('left', (flashcardToBoxImageOffsetX) + 'px');
        } else if (flashcardToBoxImageOffsetX < 0) {
            myThis.css('left', 1 + 'px');
        } else {
            myThis.css('left', ($('#lesson-image').width() -1) + 'px');
        }

        if (flashcardToBoxImageOffsetY > 0 &&
            flashcardToBoxImageOffsetY < $('#lesson-image').height()) {
            //console.log('.ydistance', myThis.find('.ydistance'));
            myThis.find('.ydistance').val(flashcardToBoxImageOffsetY / resizeCoeffX);
            myThis.css('top', (flashcardToBoxImageOffsetY) + 'px');
        } else if (flashcardToBoxImageOffsetY < 0) {
            myThis.css('top', 1 + 'px');
        } else {
            myThis.css('top', ($('#lesson-image').height() - 1) + 'px');
        }
                
        //console.log('changedFlashcardPosition', e.clientX - boxImageOffsetX)
        //console.log("OffsetX", flashcardOffsetX);
        //console.log("OffsetY", flashcardOffsetY);
        //console.log("e.clientX", e.clientX);
        //console.log("e.clientY", e.clientY);
        //console.log("e.pageX", e.pageX);
        //console.log("e.pageY", e.pageY);
        //console.log("box-image.offsetX", $('#box-image').offset().left);
        //console.log("box-image.offsetY", $('#box-image').offset().top);

    });

    $('.flashcard-added').bind('mouseenter', function () {

    }); 

    $('.word').bind('click', function (e) {
        e.preventDefault();
        $(this).trigger('focus');
    });
});