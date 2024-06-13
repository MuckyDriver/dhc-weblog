// Accordion Script For DHCWL2024

$(function() {
    // Constants i.e Toggle & Content
    const accordionToggles = $(".accordion-toggle")
    const accordionContents = $(".accordion-content")
    const slideDuration = 200;

    function action(element) {
        const handle = $(element);

        // Checking if any action is needed or not.
        if (handle.hasClass("open")) {
            return
        } else {

            // Resetting all the current active toggle elements
            accordionToggles.removeClass("open")

            // Sliding up all of the accordion content boxes
            accordionContents.slideUp(slideDuration)

            // Opening up the current accordion and making toggle element active.
            handle.siblings(".accordion-content").slideDown(slideDuration)
            handle.addClass("open");
        }
    }

    // Event Handliing i.e click and keyup events.
    accordionToggles.on("click", function() { 
        action(this)
    })

    accordionToggles.on("keyup", (e) => {
        if (e.key == "Enter") {
            action(e.target)
        }
    })
})