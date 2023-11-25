//browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
//    console.log("Received request: ", request);
//});


const pushTheButton = (e) => {
    e.classList.add('arb-worship-effect');

    setTimeout(() => {
        e.classList.remove('arb-worship-effect');
        e.click();
    }, 314);
}

var worshipTimer;

const resetWorshipTimer = () => {
    if (worshipTimer) {
        clearTimeout(worshipTimer);
    }
    worshipTimer = setTimeout(() => {
        browser.runtime.sendMessage({ worshipping: "?" }).then((response) => {
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
