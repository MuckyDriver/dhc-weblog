// Movable Script (JQuery Edition)
jQuery(function() {
    const movables = $(".movable")

    setInterval(function() {
        let scrollBottom = $(window).scrollTop() + $(window).innerHeight();

        movables.each(function() {
            if (scrollBottom > this.offsetTop) {
                this.classList.add("show")
            } else {
                this.classList.remove("show")
            }
        })
    }, 200)
})

/*  Include this:
    <script src="js/movables.jquery.js" defer></script>
*/
