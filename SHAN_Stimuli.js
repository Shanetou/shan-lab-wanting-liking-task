Qualtrics.SurveyEngine.addOnload(function() {

  // Add clicks so far
  // Select image more specifically
  const actionKeyCode = 32
  const totalPossibleClicks = 20
  const imageSizeIncrement = 100 / totalPossibleClicks
  let clicksSoFar = 0
  let imageWidth = imageSizeIncrement // Starting size
  console.log("imageWidth", imageWidth);

  const image = document.getElementsByTagName('img')[0]
  const imageContainer = document.getElementsByClassName('QuestionBody')[0]

  const incrementedImageSize = () => { imageWidth += imageSizeIncrement }
  let formattedImageSize = (width) => imageWidth + '%'
  const scaleImage = (width) => {
    console.log("formattedImageSize", formattedImageSize);
    const imageSizeString = formattedImageSize(width)
    console.log("imageSizeString", imageSizeString);
    image.style.width = imageSizeString
  }

  scaleImage(imageWidth) // scale image to initial/starting size on load
  image.style.margin = 'auto'
  image.style.display = 'block'

  imageContainer.style.minHeight = '600px'

  document.onkeydown = function(e) {
      console.log("e", e);
    console.log("made it into onkeyup from key: ", e);
    // e.keyCode === actionKeyCode
    if (clicksSoFar < 19) {
      console.log('oh hey there, ye clicked it!, RESIZING')
      clicksSoFar += 1
      incrementedImageSize()
      scaleImage(imageWidth)
    } else {
      console.log('Only the spacebar will make the image big, big, bigger!')
    }
  }
});
