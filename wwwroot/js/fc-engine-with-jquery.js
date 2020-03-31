var flashcardsOnTheScreen = 0;
var mouseIsDown = false;
var flashcardCanBeDragged = false;
var cursorToFlashcardOffsetX = 0;
var cursorToFlashcardOffsetY = 0;

$(function () {
    $(document).on('mouseup', function(){
        mouseIsDown = false;
    });
    $('.add-flashcard-button').click(function () {
        if (flashcardsOnTheScreen < 5){
            $('#box-image').prepend(
                '<div class="flashcard-added">'
                //    + '<p style="display: block;">1</p>'
                + '<div class="flashcard-content" style="display: flex; flex-flow: column; width: 100%; height: 100%;">'
                +'    <input placeholder="native word" style="display: inherit;">'
                +'   <input placeholder="foreign word" style="display: inherit;">'
                +'   <div style="justify-content: flex-end; display: inherit;">'
                +'      <button class="fc-button" style="display: inherit; width: 3em; height: 2em;">Save</button>'
                +'        <button class="delete-fc-button" style="display: inherit; width: 3em; height: 2em;">Delete</button>'
                +'      </div>'
                +'    </div>'
               +' </div>'
            );
            $('.flashcard-added').bind('dblclick', function () {
                console.log("flashcard double click event debug log:");        
                $(this).children().toggle();
            });
            $('.flashcard-added').bind('mousedown', function (e) {
                e.preventDefault();
                mouseIsDown = true;
                cursorToFlashcardOffsetX = e.clientX - $(this).offset().left;
                cursorToFlashcardOffsetY = e.clientY - $(this).offset().top;
                console.log("flashcard mousedown event debug log:");                        
                console.log('cursorToFlashcardOffsetX', cursorToFlashcardOffsetX);
                console.log('cursorToFlashcardOffsetY', cursorToFlashcardOffsetY);
                // $(this).children().toggle();
            });
            $('.flashcard-added').bind('mouseup', function (e) {
                e.preventDefault();
                mouseIsDown = false;                
                cursorToFlashcardOffsetX = 0;
                cursorToFlashcardOffsetY = 0;
                console.log("flashcard mouseUp event debug log:");                        
                console.log('cursorToFlashcardOffsetX', cursorToFlashcardOffsetX);
                console.log('cursorToFlashcardOffsetY', cursorToFlashcardOffsetY);
                // $(this).children().toggle();
            });
            $('.flashcard-added').bind('mousemove', function (e) {
                console.log("flashcard mouseMove event debug log:");        
                if (!mouseIsDown) return;
                e.preventDefault();
                flashcardOffsetX=$(this).offset().left;
                flashcardOffsetY=$(this).offset().top;
                boxImageOffsetX=$('#box-image').offset().left;
                boxImageOffsetY=$('#box-image').offset().top;

                

                cursorToBoxImageOffsetX = e.clientX - boxImageOffsetX;
                cursorToBoxImageOffsetY = e.clientY - boxImageOffsetY;

                flashcardToBoxImageOffsetX = cursorToBoxImageOffsetX - cursorToFlashcardOffsetX;
                flashcardToBoxImageOffsetY = cursorToBoxImageOffsetY - cursorToFlashcardOffsetY;
                
                console.log('cursorToBoxImageOffsetX', cursorToBoxImageOffsetX);
                console.log('cursorToBoxImageOffsetY', cursorToBoxImageOffsetY);
                console.log('flashcardToBoxImageOffsetX', flashcardToBoxImageOffsetX);
                console.log('flashcardToBoxImageOffsetY', flashcardToBoxImageOffsetY);

                

                $(this).css('left', (flashcardToBoxImageOffsetX) + 'px');
                $(this).css('top', (flashcardToBoxImageOffsetY) + 'px');
                console.log('changedFlashcardPosition', e.clientX - boxImageOffsetX)
                console.log("OffsetX", flashcardOffsetX);
                console.log("OffsetY", flashcardOffsetY);
                console.log("e.clientX", e.clientX);
                console.log("e.clientY", e.clientY);
                console.log("e.pageX", e.pageX);
                console.log("e.pageY", e.pageY);
                console.log("box-image.offsetX", $('#box-image').offset().left);
                console.log("box-image.offsetY", $('#box-image').offset().top);

            });
            $('.flashcard-added').bind('mouseenter', function() {

            });
            console.log("ADDED flashcard");
            flashcardsOnTheScreen++;
            if (flashcardsOnTheScreen >= 5){
                $('.add-flashcard').hide();
            }
        }
        
        
    });

    

});

