let cheatCode = Math.round(Math.random() * 1000000);
console.log("Cheat code is:", cheatCode)

jQuery(function() {
    const windowUrl = window.location.href;

    const searchInput = $("#searchInput");
    const searchButton = $("#searchActionButton");
    const searchResults = $("#searchResultsContainer");
    const searchCloseButton = $("#searchCloseButton");
    const searchOpenButton = $("#searchOpenButton");
    let locale = searchInput.attr('data-locale');

    if (locale == null) {
        locale = "data/json/search.json" // Fail Safe.
    }

    $.getJSON(locale, function(data) {
        let searchData = data["results"]

        function keywordSearch() {
            searchResults.empty()

            let inputData = searchInput.val().toLowerCase().split(" ")

            // Creating the result element function.
            function add(obj) {

                if ( !(windowUrl.includes("/tutorial/") && obj["url"].includes("tutorial/")) ) {

                    let newResult = document.createElement('a');
                    let newTitle = document.createElement('span');
                    let newUrl = document.createElement("span");
    
                    newResult.classList.add('search-result')
    
                    if (obj['opt-in-class'] != null) {
                        newResult.classList.add(obj['opt-in-class'])
                    }
    
                    newUrl.classList.add('small')
    
                    newResult.href = obj['url']
                    newTitle.innerText = obj['title']
                    newUrl.innerText = obj['display-url'] || obj['url']
    
                    newResult.append(newTitle, newUrl)
                    searchResults.append(newResult)
                }
            }

            // Firstly, check to ensure inputData has data.
            if (inputData != "" || null) {
                let foundResults = 0;

                $.each(searchData, (i, obj) => {
                    // This would be completed after searchInput'd or Button press'd.
                    if (obj["keywords"].some(item => inputData.includes(item))) {
                        add(obj);
                        foundResults += 1
                    } else if (inputData == ("*" + cheatCode)) {
                        foundResults += 1
                        add(obj)
                    }
                })

                if (foundResults <= 0) {
                    $(".search-error").clone().css('display', 'block').appendTo(searchResults)
                }
            } else {
                $(".search-empty").clone().css('display', 'block').appendTo(searchResults)
            }
        }

        $(".search-empty").clone().css('display', 'block').appendTo(searchResults)

        searchButton.on("click", keywordSearch)
        // searchInput.on("keyup", keywordSearch)
        searchInput.on("keydown", (e) => {
            if (e.key == "Enter") {
                keywordSearch()
            }
        })
    })

    searchCloseButton.on("click", () => {
        $(".search-box").addClass("closed")
        $("body").css("overflow-y", "auto")
    })

    searchOpenButton.on("click", () => {
        $(".search-box").removeClass("closed")
        $("body").css("overflow-y", "hidden")
    })
})