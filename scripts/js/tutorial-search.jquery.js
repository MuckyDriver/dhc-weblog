$(function() {
    const tutorialSearchInput = $("#tutorialSearchInput");
    const tutorialListContainer = $(".tutorialListContainer a");
    const selectTutorialType = $("#selectTutorialType");
    const tutorialSearchActionBtn = $("#tutorialSearchButton");
    const tutorialSearchErrorBox = $(".tutorialSearchError");

    // Must Filter them when we load the webpage.
    tutorialListContainer.each(function(i, obj) {
        let qObj = $(obj);
        let keywordData = qObj.attr("data-keywords");

        if (!keywordData.includes("recent")) {
            qObj.hide(-100)
        }
    })

    function updateAccessibility(msg) {
        const maxHeight = 570;
        const maxItems = tutorialListContainer.length
        let items = 0;

        // Updating accessibility...
        setTimeout(function() {
            tutorialListContainer.each(function(i, obj) {
                $(obj).attr("tabindex", "-1");
    
                if ($(obj).position().top <= (maxHeight - 56.9)) {
                    $(obj).removeAttr("tabindex")
                    items += 1
                }
            })

            console.log(`${msg} / Removed ${maxItems - items} Element(s)`)
        }, 200)
    }

    updateAccessibility("Preloaded Accessibility!")

    // We now need to check whether someone clicks the search button.
    function action() {
        tutorialSearchErrorBox.removeClass("active")

        let foundResults = 0;
        let setTutorialType = selectTutorialType.val()
        let tutorialSearchValue = tutorialSearchInput.val()

        tutorialListContainer.each(function(i, obj) {
            let qObj = $(obj);
            let keywordData = qObj.attr("data-keywords");
            let tutListTitleData = qObj.find(".tutListTitle").text().toLowerCase();
            let regex = new RegExp("\\b" + tutorialSearchValue + "\\b", "gi");

            if (keywordData.includes(setTutorialType)) {

                if (tutorialSearchValue == "" || regex.test(tutListTitleData)) {
                    qObj.slideDown(125)
                    foundResults += 1;
                } else {
                    qObj.hide()
                }
            } else {
                qObj.hide()
            }
        })

        // Updating accessibility...
        updateAccessibility("Updated Accessibility successfully!")

        // If there are no results must show an error!
        if (foundResults <= 0) {
            tutorialSearchErrorBox.addClass("active")
        }
    }

    // Button / Input Handling
    tutorialSearchActionBtn.on("click", action)
    tutorialSearchInput.on("change", action)
})