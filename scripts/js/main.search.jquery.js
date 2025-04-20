/*
    Main Search Code
    """"""""""""""""
    I already made this but the old code needed some fixing and optimising.

    Warning
    """""""
    This code will only work in either localhost where the website directory is the localhost or running on a hosted domain.
    Otherwise it will not work at all.
*/

const windowUrl = window.location.href;

// Global Functions
function createClone(className, toWhat) {
    $(className).clone().css('display', 'block').appendTo(toWhat);
}

$(() => {

    // Elements
    const searchInput = $("#searchInput");
    const searchButton = $("#searchActionButton");
    const searchResults = $("#searchResultsContainer");
    const searchCloseButton = $("#searchCloseButton");
    const searchOpenButton = $("#searchOpenButton");

    // Locale
    const locale = searchInput.attr('data-locale') ?? "data/json/search.json";

    // Main code
    $.getJSON(locale, (data) => {
        let searchData = data['results'];

        // We should have the JSON file data as an array.
        function keywordSearch() {
            let inputData = searchInput.val().toLowerCase().split(" ");
            searchResults.empty();

            // Creating the result element function.
            function add(obj) {
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

            // Firstly, check to ensure inputData has data.
            if (inputData != "" || null) {
                let foundResults = 0;

                $.each(searchData, (i, obj) => {

                    // This would be completed after searchInput'd or Button press'd.
                    if (obj["keywords"].some(item => inputData.includes(item))) {
                        add(obj);
                        foundResults += 1
                    }
                })

                if (foundResults <= 0) {
                    createClone(".search-error", searchResults)
                }
            } else {
                createClone(".search-empty", searchResults)
            }
        }

        // Init
        createClone(".search-empty", searchResults)

        // Input/Button Handling
        searchButton.on("click", keywordSearch)
    
        searchInput.on("keydown", (e) => {
            if (e.key == "Enter") {
                keywordSearch()
            }
        })

        // Auto Suggestor
        let searchSuggest = $(document.createElement("div"))

        searchSuggest.addClass("search-suggest")
        searchSuggest.appendTo($(".searcher"))
        
        searchInput.on("keyup", (e) => {
            if (e.key != "Enter") {
                let stringInput = searchInput.val().toLowerCase()

                if (stringInput != "") {

                    $.each(searchData, (i, obj) => {
                        let title = obj.title

                        if (title.toLowerCase().startsWith(stringInput)) {
                            searchInput.css("padding", "0.5em 1em 1.5em 1em")
                            searchSuggest.text("∴ " + title)
                        }
                        
                    })
                } else {
                    searchSuggest.text("")
                    searchInput.css("padding", "1em")
                }

            }
        })
    })

    // Button Effects
    searchCloseButton.on("click", () => {
        $(".search-box").addClass("closed")
        $("body").css("overflow-y", "auto")
    })

    searchOpenButton.on("click", () => {
        $(".search-box").removeClass("closed")
        $("body").css("overflow-y", "hidden")
    })
})