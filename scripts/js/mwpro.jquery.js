$(() => {
    const mwpro_pages = $('#mwpro-pages');
    const mwpro_switch = $('#mwpro-page-switch');

    // The Switcher
    mwpro_switch.children().each(function(i, obj) {
        const btn = $(obj);

        btn.on("click", function() {
            if (btn.hasClass("active")) {
                return
            }

            mwpro_switch.children().removeClass("active")

            const nav_id = btn.attr('data-nav-id')
            const page = $("#" + nav_id)

            if (page) {
                let d = 250;

                mwpro_pages.children().each((i, obj) => {
                    setTimeout(() => {
                        $(obj).fadeToggle(d)
                    }, (d-50)*i)
                })

                btn.addClass("active")
            }
        })
    })

    // Number of Shows/Movie counter
    let tvShowCounter = $("div.mwpro-page-switch :first-child span.num")
    let movieCounter = $("div.mwpro-page-switch :last-child span.num")

    tvShowCounter.text(
        $("#mwpro-tv-shows div.list > span").length
    )

    movieCounter.text(
        $("#mwpro-movies div.list > span").length
    )
})