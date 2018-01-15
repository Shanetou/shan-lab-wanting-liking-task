Qualtrics.SurveyEngine.addOnReady(function() {
  // Add clicks so far
  // Select image more specifically
  const SPACEBAR_KEYCODE = 32
  const ENTER_KEYCODE = 13
  const possibleEnlargementClicks = 20
  const initialImageRender = 1
  // Compensate for initial image render by adding another possible click
  const imageSizeIncrement = 100 / (possibleEnlargementClicks + initialImageRender)
  console.log('imageSizeIncrement', imageSizeIncrement)
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

  image.style.margin = 'auto'
  image.style.display = 'block'
  imageContainer.style.minHeight = '600px'

  var elem_top = jQuery("img").offset()['top'];
  var viewport_height = jQuery(window).height();
  // Scroll to the middle of the viewport
  var my_scroll = elem_top - (viewport_height / 2);
  jQuery(window).scrollTop(my_scroll);


  let keyPressed = false
  document.onkeydown = function(e) {
    e.preventDefault()

    // Ensure that
    if (!keyPressed) {
      keyPressed = true
      if (isSpacebarPress(e)) {
        if (clicksSoFar <= 19) {
          clicksSoFar += 1
          console.log('clicksSoFar', clicksSoFar)
          incrementedImageSize()
          scaleImage(imageWidth)
          console.log('imageWidth', imageWidth)
        } else {
          console.log('Only the spacebar will make the image big, big, bigger!')
        }
      } else if (isEnterPress(e)) {
        // go to next question
        goToNextTrial()
      }
    }
  }

  document.onkeyup = function(e) {
    if ((isSpacebarPress(e) || isEnterPress(e)) && keyPressed) {
      keyPressed = false
    }
  }

});

// TODO: Automatically import images to Qualtrix questions
// X: A user should not be able to hold spacebar
// X: A user should be able to enhance to 20 clicks (currently 20)
// TODO: A user should not be able to cycle to new trials by holding ENTER
  // Is this actually an issue? We could use a next button if it is.
  // Alternatively, we could require an action (like focus on an element) before going forward.

// FLOW
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
// Should we hide image until OnReady?

// MODIFIABLE CONFIGS
// Instructions
// Number of pictures (variable)
// Picture presenation order
// Grouping of pictures into blocks (1st 16, then 2nd 16, etc)
// # of keypresses to get to maximum enlargement  (variable)
// Duration picture freezes on screen after user presses enter, before moving to next trial (variable, in ms)

// OUTPUT DATA for given trial (added as embedded data)
// 1. picture ID
// 2. trial order (order photo was shown)
// 4. reaction time of keypress (in ms) -- ms from last keypress?
// 3. number of presses for picture
// 5. total time from initial presentation to user enter press event


