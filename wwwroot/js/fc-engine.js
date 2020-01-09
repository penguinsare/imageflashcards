
const minFcWidth = 150;

// set max data length of the flash card depending on the words length
(function () {    
    let flashcardList = document.querySelectorAll(".flashcard");
    console.log(flashcardList);
    flashcardList.forEach((flashcard, index) => {
        let maxCharLength = Math.max(
            flashcard.children[0].innerHTML.length,
            flashcard.children[2].innerHTML.length);
        let proposedFcLength = (maxCharLength + 4) * 10;
        flashcard.setAttribute("data-max-length",
            (minFcWidth > proposedFcLength) ? (minFcWidth + 'px') : (proposedFcLength + 'px'));
        flashcard.setAttribute("data-tries", 0);
    });    
})();


function positionFc() {
    this.counter++;
    let flashcardList = document.querySelectorAll(".flashcard");
    //console.log(flashcardList);
    let lessonImage = document.getElementById('lesson-image');
    //let originalX = image.getAttribute('data-xdimension');
    //let originalY = image.getAttribute('data-ydimension');
    let imageNaturalWidth = lessonImage.naturalWidth;
    let imageNaturalHeight = lessonImage.naturalHeight;
    //console.log(imageNaturalWidth);
    let currentImageWidth = lessonImage.getBoundingClientRect().width;
    let currentImageHeight = lessonImage.getBoundingClientRect().height;
    //console.log(currentImageWidth);

    flashcardList.forEach((flashcard, index) => {
        let xCoordinate = flashcard.getAttribute('data-xdistance');
        let yCoordinate = flashcard.getAttribute('data-ydistance');
        //console.log(xCoordinate);

        let newXCoordinate = (currentImageWidth / imageNaturalWidth) * xCoordinate
        let newYcoordinate = (currentImageHeight / imageNaturalHeight) * yCoordinate
        flashcard.style.top = newYcoordinate + 'px'
        flashcard.style.left = newXCoordinate + 'px'
        //console.log(newXCoordinate)

        //-----------------------
        //############ move the flash card if it touches the borders
        let fcLength = flashcard.getBoundingClientRect().width; //div.getAttribute("data-max-length")
        let fcHeight = flashcard.getBoundingClientRect().height;
        //console.log(fcLength);
        //console.log(fcHeight);
        let orientation;
        if (fcHeight > currentImageHeight - newYcoordinate) {
            orientation = "bottom-"
            div.style.top = (newYcoordinate - fcHeight) + 'px'
        }
        else {
            orientation = "top-"
        }
        if (fcLength > currentImageWidth - newXCoordinate) {
            orientation += "right"
            div.style.left = (newXCoordinate - fcLength) + 'px'
        }
        else {
            orientation += "left"
        }
        switchFcOrientation(flashcard, orientation)
    });
    
}

var counter = 1;

function whenBodyLoads() {
    console.log("when body loads");
    window.onresize = this.positionFc;
    positionFc();
    let flashcardList = document.querySelector('.flashcard');
    console.log(flashcardList);
    flashcardList.forEach(flashcard => {
        flashcard.addEventListener('transitionend', showFlashCard);
        flashcard.addEventListener('transitionstart', hideFlashCard);
    })
    transition.addEventListener('transitionend', showFlashCard)
     transition.addEventListener('transitionstart', hideFlashCard)
}

function maxImageWidth() {
    let lessonImage = document.getElementById('lesson-image');
    if (lessonImage.naturalWidth > 375 &&
        lessonImage.naturalWidth < 1000) {
        lessonImage.parentNode.style.maxWidth = event.target.naturalWidth + 'px';
    }
    console.log(lessonImage.naturalWidth);
}
//function maxImageWidth(event) {
//    if (event.target.naturalWidth > 375 &&
//        event.target.naturalWidth < 1000) {
//        event.target.parentNode.style.maxWidth = event.target.naturalWidth + 'px';
//    }
//    console.log(event.target.naturalWidth);
//}
// function onMouseEnterFc(div) {
//     let children = div.children
//     div.style.transitionDelay = '0s';
//     longestWordWithPixels = children[0]
//     div.style.width = div.getAttribute('data-max-length') 
//     div.style.height = '45px'
// }

 //function onMouseLeaveFc(div) {
 //    div.style.transitionDelay = '1s';
 //    div.style.width = '20px'
 //    div.style.height = '20px'
 //}

function hideFlashCard(divTransEvent) {
    console.log("hide flashcard");
     let childrenArray = divTransEvent.target.children
     if (childrenArray[0].style.display === 'block') {
         childrenArray[0].style.display = 'none'
         // childrenArray[1].children[0].style.display = 'none'  
         // childrenArray[1].children[1].style.display = 'none'     
         childrenArray[1].style.display = 'none'  
         //childrenArray[1].children[0].style.display = 'none'       
     }
 }

function showFlashCard(divTransEvent) {
    console.log("show flashcard");
     let childrenArray = divTransEvent.target.children
     if ((childrenArray[0].style.display === '' || childrenArray[0].style.display === 'none') &&
     divTransEvent.target.style.width === divTransEvent.target.getAttribute('data-max-length')) {
         //childrenArray[0].style.display = 'block'
         // childrenArray[1].children[0].style.display = 'block'
         // childrenArray[1].children[1].style.display = 'inline'
         childrenArray[2].style.display = 'block'
         //childrenArray[1].children[0].style.display = 'inline'
         childrenArray[1].children[0].focus()
     }
 };

 function onMouseEnterFc(divMouseEvent) {
     console.log("mouseEnterEvent")
     divMouseEvent.target.style.transition.delay = 0;
     hideFlashCard(divMouseEvent)
 }

 function onMouseLeaveFc(divMouseEvent) {
     console.log("mouseLeaveEvent")
     divMouseEvent.target.style.transition.delay = 3;
 }

function checkFc(button) {
    console.log(button)
    console.log(button.parentElement.children[3])
    let input = button.parentElement.children[3].children[0]
    let foreignWord = button.parentElement.children[4].children[0]
    let foreignWordText = foreignWord.innerHTML
    // console.log(foreignWord.innerHTML)
    let rightMarginForeignWord = 100
    let leftMargin = 0;
    var firstTimer
    var secondTimer
    function frame() {
        if (leftMargin === 100) {
            clearInterval(firstTimer)
            input.style.display = 'none'
            foreignWord.style.display = 'block'
            foreignWord.style.right = rightMarginForeignWord + '%'
            button.style.display = 'none'
            console.log(foreignWord)
            secondTimer = setInterval(secondFrame, 10)
        }
        else {
            leftMargin += 2
            input.style.left = leftMargin + '%'
        }
    }

    function secondFrame() {
        if (rightMarginForeignWord === 0) {
            clearInterval(secondTimer)
        }
        else {
            rightMarginForeignWord -= 2
            //console.log(rightMarginForeignWord)
            foreignWord.style.right = rightMarginForeignWord + '%'
        }
    }

    function wrongWordFrame() {
        if (leftMargin === 30) {
            clearInterval(firstTimer)
            // input.style.display = 'none'
            // foreignWord.style.display = 'block'
            // foreignWord.style.right = rightMarginForeignWord + '%'
            // button.style.display = 'none'
            console.log(foreignWord)
            secondTimer = setInterval(wrongWordSecondFrame, 10)
        }
        else {
            leftMargin += 2
            input.style.left = leftMargin + '%'
        }
    }

    function wrongWordSecondFrame() {
        if (leftMargin === 0) {
            clearInterval(secondTimer)
        }
        else {
            if (leftMargin > 15) {
                input.style.backgroundColor = 'rgb(250, 151, 148)';
            }
            else {
                input.style.backgroundColor = 'white';
            }
            leftMargin -= 1
            //console.log(rightMarginForeignWord)
            input.style.left = leftMargin + '%'
        }
    }


    if (input.value === foreignWordText) {
        firstTimer = setInterval(frame, 1)
    }
    else {
        let tries = button.parentElement.getAttribute("data-tries")
        console.log(tries)
        tries++
        button.parentElement.setAttribute("data-tries", tries)
        if (tries == 3) {
            console.log("set button turn fc")
            button.parentElement.children[0].style.display = "block"
        }
        firstTimer = setInterval(wrongWordFrame, 1)
    }
    // input.style.left = '50%';
    //let svgElement = button.children[0]
    // console.log(svgElement)
    // console.log(svgElement.style.left)
    //svgElement.style.left = '10px'
}

function showForeignWord(button) {
    var firstTimer = setInterval(turnFirstAnimation, 1)
    var secondTimer
    let foreignWordSpan = button.parentElement.children[4]
    let foreignWord = foreignWordSpan.children[0]
    let inputSpan = button.parentElement.children[3]
    let checkButton = button.parentElement.children[2]
    let angle = 0
    function turnFirstAnimation() {
        if (angle >= 90) {
            inputSpan.style.display = "none"
            checkButton.style.display = "none"
            foreignWord.style.display = "block"
            clearInterval(firstTimer)
            foreignWordSpan.style.transform = "rotateX(" + angle + "deg)"
            secondTimer = setInterval(turnSecondAnimation, 1)
        }
        else {
            inputSpan.style.transform = "rotateX(" + angle + "deg)"
            checkButton.style.transform = "rotateX(" + angle + "deg)"
            angle += 3
        }
    }

    function turnSecondAnimation() {
        if (angle <= 0) {
            clearInterval(secondTimer)
            button.style.display = "none"
        }
        else {
            foreignWordSpan.style.transform = "rotateX(" + angle + "deg)"
            angle -= 1
        }
    }
}


function onFcHover(div) {
    console.log(div.getAttribute("class"))
    let fcClassAttribute = div.getAttribute("class")
    fcClassAttribute.replace('top-left', "bottom-left")
    console.log(fcClassAttribute.replace('top-left', "bottom-left"))
    console.log(fcClassAttribute)
    console.log(fcClassAttribute.lastIndexOf("top-left"))
    console.log(fcClassAttribute.lastIndexOf("bottom-left"))
    div.setAttribute("class", fcClassAttribute.replace('top-left', "bottom-left"))
}

function switchFcOrientation(flashcard, orientation) {
    let fcClassAttribute = flashcard.getAttribute("class")
    if (fcClassAttribute.lastIndexOf("top-left") > -1) {
        flashcard.setAttribute("class", fcClassAttribute.replace('top-left', orientation))
    }
    else if (fcClassAttribute.lastIndexOf("top-right") > -1) {
        flashcard.setAttribute("class", fcClassAttribute.replace('top-right', orientation))
    }
    else if (fcClassAttribute.lastIndexOf("bottom-right") > -1) {
        flashcard.setAttribute("class", fcClassAttribute.replace('bottom-right', orientation))
    }
    else if (fcClassAttribute.lastIndexOf("bottom-left") > -1) {
        flashcard.setAttribute("class", fcClassAttribute.replace('bottom-left', orientation))
    }
}
