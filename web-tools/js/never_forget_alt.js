// This will make sure all <img> tags have an alt attribute. No need to remember to add any :)
$(function() {
    $("img").each(function(i, imgTag) {
        if (imgTag.alt == "" || null) {
            let imgUrl = imgTag.src.split("/").slice(-1);
            imgTag.alt = imgUrl[0]
        }
    })
})