  // Hide the picture while the page is loading
Qualtrics.SurveyEngine.addOnload(function () {
  const image = document.getElementsByTagName('img')[0]
  image.style.visibility = 'hidden'
})

Qualtrics.SurveyEngine.addOnReady(function() {
  // Select image with selectors that have more specificity
  const SPACEBAR_KEYCODE = 32
  const ENTER_KEYCODE = 13
  const FREEZE_DURATION_AFTER_ENTER_PRESS = 10000
  const possibleEnlargementClicks = 20
  const initialImageRender = 1
  // Compensate for initial image render by adding another possible click
  const imageSizeIncrement = 100 / (possibleEnlargementClicks + initialImageRender)
  let clicksSoFar = 0
  let imageWidth = imageSizeIncrement // Starting size

  const image = document.getElementsByTagName('img')[0]
  const imageContainer = document.getElementsByClassName('QuestionBody')[0]

  const incrementedImageSize = () => { imageWidth += imageSizeIncrement }
  let getImageSizeString = (width) => imageWidth + '%'
  const scaleImage = (width) => { image.style.width = getImageSizeString(width) }
  const isSpacebarPress = e => e.keyCode === SPACEBAR_KEYCODE
  const isEnterPress = e => e.keyCode === ENTER_KEYCODE
  const goToNextTrial = () => { this.clickNextButton() }

  this.hideNextButton()
  // hide image before scaling it and only display it after?
  scaleImage(imageWidth) // scale image to initial/starting size on load

  // Ok cool, the page is ready and the picture is scaled properly, so show the image
  image.style.visibility = 'visible'
  image.style.margin = 'auto'
  image.style.display = 'block'
  image.focus()
  imageContainer.style.minHeight = '600px'

  var elem_top = jQuery("img").offset()['top'];
  var viewport_height = jQuery(window).height();
  // Scroll to the middle of the viewport
  var my_scroll = elem_top - (viewport_height / 2);
  jQuery(window).scrollTop(my_scroll);


  let keyPressed = false
  document.onkeydown = function(e) {
    e.preventDefault()

    // Disable key repeat
    if (!keyPressed) {
      keyPressed = true
      if (isSpacebarPress(e)) {
        if (clicksSoFar <= 19) {
          clicksSoFar += 1
          incrementedImageSize()
          scaleImage(imageWidth)
        } else {
          // What should we do here?
        }
      } else if (isEnterPress(e)) {
        // Lock keyboard after enter is pressed
        document.onkeydown = e => false
        // Wait 10 seconds and then go to next tr ial
        setTimeout(() => {
          goToNextTrial()
        }, FREEZE_DURATION_AFTER_ENTER_PRESS)
        // Do we need to remove the handler after it's done here?
      }
    }
  }

  document.onkeyup = function(e) {
    if (keyPressed) {
      keyPressed = false
    }
  }

});

// Set picture ID to embedded data
// Set question number to embedded data

// TODO: Automatically import images to Qualtrix questions
// X: A user should not be able to hold spacebar
// X: A user should be able to enhance to 20 clicks (currently 20)
// TODO: A user should not be able to cycle to new trials by holding ENTER
  // Is this actually an issue? We could use a next button if it is.
  // Alternatively, we could require an action (like focus on an element) before going forward.
// X: After a user presses enter, the screen and keyboard should freeze for 10 seconds and then go to the next trial.
  // TODO: Do we also need to disable mouse click events?
  // Also, should we give the user some sort of UI update so they know something's happening?
// X: Only show image once page loads so you don't see it big and then small again.
// TODO: Set focus on the image once page loads so that spacebar press will always enhance image

// SESSION FLOW
// 1. Present instructions page
// 2. Present two practice trials (with generic photo)
// 2. Present each at random (16 pictures, shown 4 times each)
  // SPACEBAR to enlarge picture, ENTER to move to next page (should not be able to hold down key)

// TRIAL FLOW
// 1. Present minimized image
// 2. Set focus on picture?
// 3. Press enter to present next trial
// 4. Add embedded data of output data on addOnUnload? (make those variables global?)

// QUESTIONS
// How do we get JS into every questions
// Do pictures need to be resized to consistent size?
// How should we output data?

// MODIFIABLE CONFIGS
// Instructions
// Number of pictures (variable)
// Picture presenation order
// Grouping of pictures into blocks (1st 16, then 2nd 16, etc)
// # of keypresses to get to maximum enlargement  (variable)
// Duration picture freezes on screen after user presses enter, before moving to next trial (variable, in ms)

// OUTPUT DATA for given trial (added as embedded data)
// 1. picture ID
// 2. trial order (order photo was shown, aka question number?)
// 4. reaction time of keypress (in ms) -- ms from last keypress?
// 3. number of presses for picture
// 5. total time from initial presentation to user enter press event


