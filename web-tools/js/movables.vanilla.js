// Movable Script (Vanilla JS Edition)
const movables = document.getElementsByClassName("movable")

setInterval(function() {
    let scrollBottom = (window.scrollY + window.innerHeight)

    for (let i = 0; i < movables.length; i++) {
        let movable = movables[i];
        
        if (scrollBottom > movable.offsetTop) {
            movable.classList.add("show")
        } else {
            movable.classList.remove("show")
        }
    }
}, 200)

/*  Include this:
    <script src="js/movables.vanilla.js" defer></script>
*/