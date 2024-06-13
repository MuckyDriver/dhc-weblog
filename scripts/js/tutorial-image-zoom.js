// Tutorial Image Zoom Script - Allowing people to view the code snippets larger etc //

$(function() {
    // Image Container - Where all the images will be shown from (div)
    const imgContainer = $(document.createElement("div"))

    imgContainer.addClass("imgContainer")
    imgContainer.hide()

    $(document.createElement("div")).appendTo(imgContainer).html("<b>Tap/Click</b> anywhere to close this view.")
    $("body").prepend(imgContainer)

    // Looping through all the images in the webpage.
    $('div.accordion-content img').each(function(i, obj) {
        let inFullScreen = false; 
        let normalImage = $(obj);
        let imageClone = normalImage.clone()
        
        // Creating the cloned image.
        imageClone.appendTo(imgContainer)
        imageClone.css({
            "width": "100%",
            "max-width": "800px",
            "display": "none",
            "cursor": "zoom-out"
        })
            
        // Normal Image CSS
        normalImage.css("cursor", "zoom-in")
        normalImage.attr("title", "View larger image")

        // If someone clicks on the normal image it will reveal the larger one
        normalImage.on("click", function() {
            if (inFullScreen != true) {
                imgContainer.fadeIn(125)
                imageClone.fadeIn(125)

                inFullScreen = true
            }
        })

        // You can close the larger image and image container by just tapping/clicking on the image or img container.
        imgContainer.on("click", function() {
            if (inFullScreen == true) {
                imgContainer.fadeOut(125)
                imageClone.fadeOut(125)

                inFullScreen = false
            }
        })

    })
})