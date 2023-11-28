{ // Block used to avoid setting global variables

    const sendMessage = (msg) => {
        if (typeof browser !== 'undefined') {
            return browser.runtime.sendMessage(msg);
        } else if (typeof chrome !== 'undefined') {
            return chrome.runtime.sendMessage(msg);
        }
    };

    const onMessage = () => {
        if (typeof browser !== 'undefined') {
            return browser.runtime.onMessage;
        } else if (typeof chrome !== 'undefined') {
            return chrome.runtime.onMessage;
        }
    };
    
    const pushTheButton = (e) => {
        //console.log("Worshipping", e);
        e.classList.add('arb-worship-effect');

        setTimeout(() => {
            e.classList.remove('arb-worship-effect');
            e.click();
            sendMessage({ worshipped: "+1" });
        }, 314);
    }

    const highlightTheButton = (e) => {
        //console.log("Highlighting", e);
        e.classList.add('arb-slow-worship-effect');

        setTimeout(() => {
            e.classList.remove('arb-slow-worship-effect');
        }, 1314);
    }

    onMessage().addListener((request, sender, sendResponse) => {
        //console.log("Received request: ", request);

        if (request.action === "highligh-refresh-buttons") {
            queryAllRefreshButtons()
                .forEach(highlightTheButton);
        }
    });

    const queryAllRefreshButtons = () => {
        return document
        .querySelectorAll('button.fui-Button[name="Refresh"], button.fui-Button[aria-label="Refresh"], div.azc-toolbarButton-container[title="Refresh"], div.azc-toolbarButton-container[aria-label="Refresh"], button.ms-Button[name="Refresh"], button.ms-Button[aria-label="Refresh"]');
    }

    var worshipTimer;

    const resetWorshipTimer = () => {
        if (worshipTimer) {
            clearTimeout(worshipTimer);
        }
        worshipTimer = setTimeout(() => {
            sendMessage({ worshipping: "?" }).then((response) => {
                if (response) {
                    const worshipping = response.worshipping;
                    if (worshipping === 'yes') {
                        queryAllRefreshButtons()
                            .forEach(pushTheButton);
                    }
                }
            });

            resetWorshipTimer();
        }, 10000);
    }

    document.addEventListener('keydown', (event) => {
        resetWorshipTimer();
    });

    document.addEventListener('mousemove', (event) => {
        resetWorshipTimer();
    });

    console.debug("Azure Refresh Button Worshiper entered the room", window.location.href);
    resetWorshipTimer();
}
