$(function() {
    const disclaimer = $(document.createElement("div"))
    const ver = "2.0.5";
    const msg2 = "Website main search feature will not work!";

    disclaimer.addClass("disclaimer")
    disclaimer.html(`Version ${ver}`)
    disclaimer.appendTo("body")

    if (window.location.href.split("://")[0] == "file") {
        disclaimer.html(`${msg2} <br> Version ${ver}`)
    }
})