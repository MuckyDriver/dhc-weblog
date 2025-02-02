// App: Quick Commands
// For: DHCTesting page (/test.html)
// JQUERY ONLY

$(() => {
    let output = $("#output_i");
    let input = $("#_i");
    let appBtn = $("#app_i > button");

    // Timer/Counter Command Stuff
    let liveState = null;
    let speed = 1;

    const stopLiveState = () => {
        clearInterval(liveState)
        liveState = null
        output.removeAttr("style");
        document.title = "dhcweblog test";
    }

    const cts = (timeSegment) => {
        let zeroNeeded = (timeSegment < 10) && "0" || ""; 
        return `${zeroNeeded}${timeSegment}`
    }

    // Command List
    const commandList = {
        "#rand": (detail) => { 
            let n = detail || 100;
            output.val(Math.floor(Math.random() * n+1)) 
        },
    
        "#date": () => {
            let date = new Date()
            output.val(date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear())
        },

        "#us_date": () => {
            let date = new Date()
            output.val((date.getMonth() + 1) + "." + date.getDate() + "." + date.getFullYear())
        },

        "#time": () => {
            let time = new Date()
            output.val(time.getHours() + ":" + cts(time.getMinutes()) + ":" + cts(time.getSeconds()))
        },

        "#invert": (detail) => {
            let n = detail || 1;
            $("html").css("filter", `invert(${n})`);
        },

        "#brightness": (detail) => {
            let n = detail || 1;
            $("html").css("filter", `brightness(${n})`);
        },

        "#contrast": (detail) => {
            let n = detail || 1;
            $("html").css("filter", `contrast(${n})`);
        },

        "#hue": (detail) => {
            let n = detail && (detail+"deg") || ('180deg');
            $("html").css("filter", `hue-rotate(${n})`);
        },

        "#print": (detail) => {
            let msg = detail || "";
            output.val(msg)
        },

        "#locale": () => { output.val(navigator.language) },

        "#refresh": () => { window.location.reload(); },

        "#clear": () => { 
            output.val(""); 
            input.val("");

            // Extras
            stopLiveState()
        },

        "#domain": () => { output.val(window.location.host) },

        "#protocol": () => { output.val(window.location.protocol) },

        "#port": () => { output.val(window.location.port) },

        "#load_image": (url) => {
            let obj = $(document.createElement("img"));

            // Editing the <img>
            obj.addClass("generatedImage")
            obj.css({"width": "100%", "margin": "0.25em 0em", "border-radius": "6px"})
            obj.attr("alt", "generatedimage not found")
            obj.attr("src", url)

            // If an image already exists it must be removed!
            if ($(obj)) {
                $("img.generatedImage").remove()
            }

            obj.appendTo("body > section > div.wrapper")
        },

        "#timer": (seconds) => {
            // Cannot have two or more live states going at once.
            if (liveState != null) {
                return
            }

            // Timer Values
            let secs = seconds ? seconds : 60;
            let count = ((secs > 86400) && 86400 || secs) * 1000;

            // The Timer
            liveState = setInterval(() => {
                let dateData = new Date(count)
                let time = {
                    "h": dateData.getUTCHours(),
                    "m": dateData.getMinutes(),
                    "s": dateData.getSeconds()
                }
                let realTime = cts(time.h) + ":" + cts(time.m) + ":" + cts(time.s)

                output.val(realTime)
                output.css("color", "lightgreen"); // This is optional
                document.title = `dhcweblog test - ${realTime}`

                count -= 1000

                // Cancel the interval when the timer hits 0.
                if (count < 0) {
                    stopLiveState()
                }
            }, 1000/speed)
        },
        
        "#stop": () => {
            if (liveState != null) {
                stopLiveState()
            }
        },

        "#counter": (multiplier) => {
            // Cannot have two or more live states going at once.
            if (liveState != null) {
                return
            }

            let count = 0;
            output.css("color", "lightgreen");

            liveState = setInterval(() => {
                count += 1 * (multiplier || 1);
                output.val(count)
                document.title = `dhcweblog test - ${count}`
            }, 1000/speed)
        },

        "#speed": (newSpeed) => {
            speed = (newSpeed || 1);
            output.val("Timers/Counters will run at x" + speed + " speed!")
        },
    }

    // Command Handler
    appBtn.on("click", () => {
        let commandSent = input.val().split("==")
        let commandHistoryItem = $(document.createElement("div"))

        if (commandList[commandSent[0]]) {
            commandList[commandSent[0]](commandSent[1] || "")
        } else {
            output.val(`Unknown command "${commandSent[0]}". Try again!`)
        }
    })
})