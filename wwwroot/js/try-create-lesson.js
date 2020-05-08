var lessonImageNaturalWidth = null;
var lessonImageNaturalHeight = null;

$(function () {
    addFlashcard();
    lessonImageNaturalWidth = $('#lesson-image').get(0).naturalWidth;
    lessonImageNaturalHeight = $('#lesson-image').get(0).naturalHeight;
    $(document).bind('mousemove', (e) => dragFlashcard(e));
    $(document).on('mouseup', function () {
        mouseIsDown = false;
        draggedFlashcardId = -1;
        draggedFlashcardJQueryObject = null;
    });

    $('#fileInput').bind('input', function (e) {
        console.log('input triggered')
        let lessonImage = $('#lesson-image')[0];
            let fileReader = new FileReader();
            
            fileReader.onload = 
                (function(aImg) { 
                    return function(event) { 					
                        aImg.src = event.target.result; 
                        $('#step-1').hide();
                        $('#step-2').fadeIn(1000);
                        $(lessonImage).fadeIn(1000);
                        adjustLessonImage();
                    }; 
                })(lessonImage);
            
            fileReader.onerror = (function () {
                return function (event) {
                    $(lessonImage).hide();
                    $('#step-1').show();
                    $('#step-2').hide();
                };
            })(lessonImage);
            
            fileReader.readAsDataURL(e.target.files[0]);
    });

    $('#fileSelectButton').bind('click', function () {
        $('#fileInput').trigger('click');
    });

    //$('.addFlashcard').bind('click', addFlashcard());
    $('#addFlashcard').bind('click', function () {
        addFlashcard();
        console.log('click on #addFlashcard')
        $('#step-2').hide();
        $('#step-3').fadeIn(1000);
    }); 
    $('#addAnotherFlashcard').bind('click', () => addFlashcard());
    

    // });
    //         '<div class="flashcard"
    //         data-xdistance="@Model.XCoordinate"
    //         data-ydistance="@Model.YCoordinate"
    //      data-flashcard-id="@Model.FlashcardId">
    
    //     @*<span class="native-word solved unsolved turned">@Model?.WordPair?.EnglishWord?.Text</span>*@
    //     <div class="foreign-word-container solved unsolved turned">
    //         <input style="width:100%;" class="foreign-word-input unsolved" size="2" type="text">
    //         <p class="foreign-word solved turned">@Model?.WordPair?.SpanishWord?.Text</p>
    //     </div>
    
    //     <div class="flashcard-buttons-panel unsolved">
    //         <button class="turn-fc-button flashcard-button unsolved">
    //             <span class="unsolved" style="color:white;">Give Up</span>
    //         </button>
    
    //         <button class="check-button flashcard-button unsolved">
    //             <span class="unsolved" style="color:white;">Check</span>
    //         </button>
    //     </div>
    
    // </div>'
    //     );
    

});

addFlashcard = function () {
    console.log('add a flashcard');
    let flashcard = $('<div class="add-flashcard" data-xdistance="1" data-ydistance="1"></div>')
    .prepend('<button class="drag-flashcard" size="4" >Drag Flashcard</button>',
    ['<input class="flashcard-input front" size="4" type="text" placeholder="Front">',
    '<input class="flashcard-input" size="4" type="text" placeholder="Back">',
    '<button class="minimize-flashcard" size="4">Minimize Flashcard</button>',]);
    console.log(flashcard);
    flashcard.data('xdistance', 1);
    flashcard.data('ydistance', 1);
    flashcard.find('button.drag-flashcard').bind('mousedown', function (e) {
        e.preventDefault();
        draggedFlashcardJQueryObject = $(this).closest('.add-flashcard');
        //determine cursor to falshcard coordiantes offset
        let boxImage = $('#box-image');
        let boxImageOffsetX = boxImage.offset().left;
        let boxImageOffsetY = boxImage.offset().top;
        cursorToBoxImageOffsetX = e.clientX - boxImageOffsetX;
        cursorToBoxImageOffsetY = e.clientY - boxImageOffsetY;

        draggedFlashcardJQueryObject.data('cursorToFlashcardXOffset', cursorToBoxImageOffsetX - draggedFlashcardJQueryObject.data('xdistance'));
        draggedFlashcardJQueryObject.data('cursorToFlashcardYOffset', cursorToBoxImageOffsetY - draggedFlashcardJQueryObject.data('ydistance'));
        console.log('mousedown event: e.offsetX: ' + e.offsetX + ', e.offsetY: ' + e.offsetY);
        //draggedFlashcardId = draggedFlashcardJQueryObject.data('flashcard-id'); 
        mouseIsDown = true;
        cursorToFlashcardOffsetX = e.clientX - $(this).offset().left;
        cursorToFlashcardOffsetY = e.clientY - $(this).offset().top;
    });

    flashcard.find('button.minimize-flashcard').bind('click', function () {
        flashcard.find('*').hide(300);
        //let front = flashcard.find('input.front').val();
        flashcard.prepend(`<span class="flashcard-label" style="color:white;background-color:#9cc926;">${flashcard.find('input.front').val()}</span>`);
        flashcard.css('background-color', '#9cc926');
        flashcard.css('cursor', 'pointer');
        

        
    });

    $('.box-image').prepend(flashcard);
}

dragFlashcard = function (e) {
    console.log("flashcard mouseMove event debug log:");
    if (!mouseIsDown || draggedFlashcardJQueryObject == null) return;
    e.preventDefault();
    
    let flashcard = draggedFlashcardJQueryObject;
    console.log('mouse move event', flashcard.data('cursorToFlashcardXOffset'));
    console.log('mouse move event', flashcard.data('cursorToFlashcardYOffset'));
    let boxImage = $('#box-image');
    let lessonImage = $('#lesson-image');
    if (!flashcard || !boxImage) return;
    let lessonImageNaturalWidth = lessonImage.get(0).naturalWidth;
    let lessonImageNaturalHeight = lessonImage.get(0).naturalHeight;
    if (lessonImageNaturalWidth <= 0 || lessonImageNaturalHeight <= 0) return;
    // let flashcardOffsetX = flashcard.offset().left;
    // let flashcardOffsetY = flashcard.offset().top;
    
    let boxImageOffsetX = boxImage.offset().left;
    let boxImageOffsetY = boxImage.offset().top;
    if (boxImageOffsetX < 0 || boxImageOffsetY < 0) return;
    
    let resizeCoeffX = boxImage.width() / lessonImageNaturalWidth;
    //let resizeCoeffY = boxImage.height() / lessonImageNaturalHeight;

    let flashcardOffsetX = flashcard.data('xdistance') * resizeCoeffX;
    let flashcardOffsetY = flashcard.data('ydistance') * resizeCoeffX;
    console.log('xdistance: ' + flashcard.data('xdistance') + ', ydistance: ' + flashcard.data('ydistance'));
    if (flashcardOffsetX < 0 || flashcardOffsetY < 0) return;

    cursorToBoxImageOffsetX = e.clientX - boxImageOffsetX;
    cursorToBoxImageOffsetY = e.clientY - boxImageOffsetY;

    // flashcardToBoxImageOffsetX = cursorToBoxImageOffsetX - cursorToFlashcardOffsetX;
    // flashcardToBoxImageOffsetY = cursorToBoxImageOffsetY - cursorToFlashcardOffsetY;

    flashcardToBoxImageOffsetX = cursorToBoxImageOffsetX - flashcard.data('cursorToFlashcardXOffset');
    flashcardToBoxImageOffsetY = cursorToBoxImageOffsetY - flashcard.data('cursorToFlashcardYOffset');
    
    // flashcardToBoxImageOffsetX = e.offsetX - cursorToFlashcardOffsetX;
    // flashcardToBoxImageOffsetY = e.offsetY - cursorToFlashcardOffsetY;
    //console.log('cursorToBoxImageOffsetX', cursorToBoxImageOffsetX);
    //console.log('cursorToBoxImageOffsetY', cursorToBoxImageOffsetY);
    //console.log('flashcardToBoxImageOffsetX', flashcardToBoxImageOffsetX);
    //console.log('flashcardToBoxImageOffsetY', flashcardToBoxImageOffsetY);

    //console.log('image brect width', $('#lesson-image').width());
    //console.log('image brect height', $('#lesson-image').height());

    // console.log('flashcard.width()',flashcard.width());
    // console.log('flashcard.outerWidth()',flashcard.outerWidth());
    console.log(flashcard);
    if (flashcardToBoxImageOffsetX > 0 &&
        flashcardToBoxImageOffsetX < lessonImage.outerWidth()) {
            console.log('flashcardToBoxImageOffsetX ' + flashcardToBoxImageOffsetX + ' + flashcard.outerWidth() ' + flashcard.outerWidth() +  ' >= lessonImage.outerWidth() ' +lessonImage.outerWidth());
            if (flashcardToBoxImageOffsetX + flashcard.outerWidth() >= lessonImage.outerWidth()){
                console.log('IF');
                flashcard.addClass('right-edge');
                flashcard.css('left', (flashcardToBoxImageOffsetX - flashcard.outerWidth()) + 'px');
            }
            else{
                console.log('else');
                flashcard.removeClass('right-edge');
                flashcard.css('left', (flashcardToBoxImageOffsetX) + 'px');
            }
            flashcard.data('xdistance',(flashcardToBoxImageOffsetX / resizeCoeffX));
        
    } else if (flashcardToBoxImageOffsetX < 0) {
        flashcard.css('left', 1 + 'px');
        flashcard.data('xdistance', 1);
    } else {
        flashcard.css('left', (lessonImage.outerWidth() - flashcard.outerWidth() -1) + 'px');
        // flashcard.data('xdistance', (lessonImage.outerWidth() - flashcard.outerWidth() -1) / resizeCoeffX);
        flashcard.data('xdistance', (lessonImage.outerWidth() -1) / resizeCoeffX);

    }

    if (flashcardToBoxImageOffsetY > 0 &&
        flashcardToBoxImageOffsetY < lessonImage.height()) {
            flashcard.data('ydistance', (flashcardToBoxImageOffsetY / resizeCoeffX));
        //flashcard.find('.ydistance').val(flashcardToBoxImageOffsetY / resizeCoeffX);
        flashcard.css('top', (flashcardToBoxImageOffsetY) + 'px');
    } else if (flashcardToBoxImageOffsetY < 0) {
        flashcard.css('top', 1 + 'px');
        flashcard.data('ydistance', 1);
    } else {
        flashcard.css('top', (lessonImage.height() - 1) + 'px');
        flashcard.data('ydistance', (lessonImage.height() - 1) / resizeCoeffX);
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

}