// Popup Script For DHCWL2024
let livePopup = false;

jQuery(function() {
    // Close button event handling
    $(".popupCloseButton").click(function() {
        const popup = $(this).parentsUntil(".popup").parent()

        popup.addClass("closed")
        livePopup = false;
    })
    
    // Open button event handling
    $(".popupOpenButton").click(function() {
        if (livePopup == false) {
            const findId = "#" + $(this).attr("data-find-id").toString()
            const popupFromId = $(findId)
        
            popupFromId.removeClass("closed")
            livePopup = true;
        }
    })
})