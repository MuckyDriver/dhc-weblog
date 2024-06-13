$(() => {
    const mwpro_pages = $('#mwpro-pages');
    const mwpro_switch = $('#mwpro-page-switch');

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
                mwpro_pages.children().each((i, obj) => {
                    $(obj).fadeOut(250)
                })

                btn.addClass("active")
                page.fadeIn(250)
            }
        })
    })
})