{ // Block used to avoid setting global variables

    const sendMessage = (msg) => {
        if (typeof browser !== 'undefined') {
            return browser.runtime.sendMessage(msg);
        } else if (typeof chrome !== 'undefined') {
            return chrome.runtime.sendMessage(msg);
        }
    };

    const pushTheButton = (e) => {
        e.classList.add('arb-worship-effect');

        setTimeout(() => {
            e.classList.remove('arb-worship-effect');
            e.click();
            sendMessage({ worshipped: "+1" });
        }, 314);
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
                        document
                            .querySelectorAll('button.fui-Button[name="Refresh"], button.fui-Button[aria-label="Refresh"], div.azc-toolbarButton-container[title="Refresh"], div.azc-toolbarButton-container[aria-label="Refresh"]')
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

    console.debug("Azure Refresh Button Worshiper entered the room");
    resetWorshipTimer();
}
