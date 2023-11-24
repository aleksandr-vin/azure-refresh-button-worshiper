browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});


console.debug("Azure Refresh Button Worshiper entered the room");

console.log("TODO: add toggle switch to popup menu");


const pushTheButton = (e) => {
    console.log("Worshipping refresh button", e);

    e.classList.add('arb-worship-effect');

    const oldStyle =e.getAttribute('style');
    e.setAttribute('style', 'background-color: rgba(242, 0, 0, 0.6);'); // WORKAROUND: until styles.css is loaded in Safari (have no idea why it's not)

    setTimeout(() => {
        e.classList.remove('arb-worship-effect');
        e.setAttribute('style', oldStyle); // WORKAROUND: until styles.css is loaded in Safari (have no idea why it's not)

        e.click();
    }, 314);


}


var worshipTimer;

const resetWorshipTimer = () => {
    if (worshipTimer) {
        //console.debug("clearing timeout");
        clearTimeout(worshipTimer);
    }
    worshipTimer = setTimeout(() => {
        const notWorshippingAzureRefreshButtons = localStorage.getItem('notWorshippingAzureRefreshButtons');
        console.log("[content] notWorshippingAzureRefreshButtons", notWorshippingAzureRefreshButtons);
        if (notWorshippingAzureRefreshButtons !== 'yes') {
            console.log("Are there any Refresh buttons or div elements?..");
            document
                .querySelectorAll('button.fui-Button[name="Refresh"], button.fui-Button[aria-label="Refresh"], div.azc-toolbarButton-container[title="Refresh"], div.azc-toolbarButton-container[aria-label="Refresh"]')
                .forEach(pushTheButton);
        }
        resetWorshipTimer();
    }, 10000);
    //console.debug("new timeout set");
}

document.addEventListener('keydown', function(event) {
    //console.debug('Key pressed:', event.key);
    resetWorshipTimer();
});

document.addEventListener('mousemove', function(event) {
    //console.debug('Mouse moved. X:', event.clientX, 'Y:', event.clientY);
    resetWorshipTimer();
});
