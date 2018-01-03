Qualtrics.SurveyEngine.addOnReady(function() {
  // Add clicks so far
  // Select image more specifically
  const SPACEBAR_KEYCODE = 32
  const ENTER_KEYCODE = 13
  const possibleEnlargementClicks = 20
  const imageSizeIncrement = 100 / possibleEnlargementClicks
  let clicksSoFar = 0
  let imageWidth = imageSizeIncrement // Starting size
  console.log("imageWidth", imageWidth);

  const image = document.getElementsByTagName('img')[0]
  console.log('image', image)
  const imageContainer = document.getElementsByClassName('QuestionBody')[0]

  const incrementedImageSize = () => { imageWidth += imageSizeIncrement }
  let formattedImageSize = (width) => imageWidth + '%'
  const scaleImage = (width) => {
    console.log("formattedImageSize", formattedImageSize);
    const imageSizeString = formattedImageSize(width)
    console.log("imageSizeString", imageSizeString);
    image.style.width = imageSizeString
  }
  const isSpacebarPress = e => e.keyCode === SPACEBAR_KEYCODE
  const isEnterPress = e => e.keyCode === ENTER_KEYCODE
  const goToNextPage = () => { this.clickNextButton() }

  this.hideNextButton ()

  scaleImage(imageWidth) // scale image to initial/starting size on load
  image.style.margin = 'auto'
  image.style.display = 'block'

  imageContainer.style.minHeight = '600px'

  var elem_top = jQuery("img").offset()['top'];
  var viewport_height = jQuery(window).height();

  // Scroll to the middle of the viewport
  var my_scroll = elem_top - (viewport_height / 2);
  jQuery(window).scrollTop(my_scroll);


  document.onkeydown = function(e) {
    e.preventDefault()
    console.log("e", e);
    console.log("made it into onkeyup from key: ", e);

    // spacebar pressed
    if (isSpacebarPress(e)) {
      if (clicksSoFar < 19 && e.keyCode === SPACEBAR_KEYCODE) {
        console.log('oh hey there, ye clicked it!, RESIZING')
        clicksSoFar += 1
        incrementedImageSize()
        scaleImage(imageWidth)
      } else {
        console.log('Only the spacebar will make the image big, big, bigger!')
      }
    // enter pressed
    } else if (isEnterPress(e)) {
      // go to next question
      goToNextPage()
    }
  }
});

// TODO: Automatically import images to Qualtrix questions

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
// 3. number of presses for picture
// 4. reaction time of keypress (in ms) -- ms from last keypress?
// 5. total time from initial presentation to user enter press event


