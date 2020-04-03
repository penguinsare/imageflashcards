var flashcardsOnTheScreen = 0;
var mouseIsDown = false;
var draggedFlashcardId = -1;
var draggedFlashcardJQueryObject = null;
var flashcardCanBeDragged = false;
var cursorToFlashcardOffsetX = 0;
var cursorToFlashcardOffsetY = 0;

$(function () {
    $(document).on('mouseup', function () {
        mouseIsDown = false;
        draggedFlashcardId = -1;
        draggedFlashcardJQueryObject = null;
    });
    //$('.add-flashcard-button').click(function () {
    //    if (flashcardsOnTheScreen < 5) {
    //        $('#box-image').prepend(
    //            '<div class="flashcard-added">'
    //            //    + '<p style="display: block;">1</p>'
    //            + '<div class="flashcard-content" style="display: flex; flex-flow: column; width: 100%; height: 100%;">'
    //            + '    <input placeholder="native word" style="display: inherit;">'
    //            + '   <input placeholder="foreign word" style="display: inherit;">'
    //            + '   <div style="justify-content: flex-end; display: inherit;">'
    //            + '      <button class="fc-button" style="display: inherit; width: 3em; height: 2em;">Save</button>'
    //            + '        <button class="delete-fc-button" style="display: inherit; width: 3em; height: 2em;">Delete</button>'
    //            + '      </div>'
    //            + '    </div>'
    //            + ' </div>'
    //        );
    //$('.flashcard-added').bind('dblclick', function () {
    //    console.log("flashcard double click event debug log:");
    //    $(this).children().toggle();
    //});
    $('.flashcard-added').each(function () {
        let myThis = $(this);
        myThis.css('left', myThis.data('xdistance') + 'px');
        myThis.css('top', myThis.data('ydistance') + 'px');
    });
    $('.flashcard-added').bind('mousedown', function (e) {
        e.preventDefault();
        draggedFlashcardJQueryObject = $(this);
        draggedFlashcardId = draggedFlashcardJQueryObject.data('flashcard-id'); 
        mouseIsDown = true;
        cursorToFlashcardOffsetX = e.clientX - $(this).offset().left;
        cursorToFlashcardOffsetY = e.clientY - $(this).offset().top;
        //console.log("flashcard mousedown event debug log:");
        //console.log('cursorToFlashcardOffsetX', cursorToFlashcardOffsetX);
        //console.log('cursorToFlashcardOffsetY', cursorToFlashcardOffsetY);
        // $(this).children().toggle();
    });
    $('.flashcard-added').bind('mouseup', function (e) {
        e.preventDefault();
        mouseIsDown = false;
        draggedFlashcardId = -1;
        draggedFlashcardJQueryObject = null;
        cursorToFlashcardOffsetX = 0;
        cursorToFlashcardOffsetY = 0;
        //console.log("flashcard mouseUp event debug log:");
        //console.log('cursorToFlashcardOffsetX', cursorToFlashcardOffsetX);
        //console.log('cursorToFlashcardOffsetY', cursorToFlashcardOffsetY);
        // $(this).children().toggle();
    });
    //$('.flashcard-added').bind('mousemove', function (e) {
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
            myThis.find('.xdistance').val(flashcardToBoxImageOffsetX);
            myThis.css('left', (flashcardToBoxImageOffsetX) + 'px');
        } else if (flashcardToBoxImageOffsetX < 0) {
            myThis.css('left', 1 + 'px');
        } else {
            myThis.css('left', ($('#lesson-image').width() -1) + 'px');
        }

        if (flashcardToBoxImageOffsetY > 0 &&
            flashcardToBoxImageOffsetY < $('#lesson-image').height()) {
            //console.log('.ydistance', myThis.find('.ydistance'));
            myThis.find('.ydistance').val(flashcardToBoxImageOffsetY);
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

        //    console.log("ADDED flashcard");
        //    flashcardsOnTheScreen++;
        //    if (flashcardsOnTheScreen >= 5) {
        //        $('.add-flashcard').hide();
        //    }
        //}


   // });



});