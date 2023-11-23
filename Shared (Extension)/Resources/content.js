browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});


console.debug("Azure Refresh Button Worshiper entered the room");


const pushTheButton = (e) => {
    console.log("Worshipping refresh button", e);
    e.click();
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


/*

 <button type="button" aria-label="Refresh" data-automation-id="RefreshButton" class="fui-Button rsawnvh default-button ___1gxfrns fhovq9v f1p3nwhy f11589ue f1q5o8ev f1pdflbu fkfq4zb f1t94bn6 f1s2uweq fr80ssc f1ukrpxl fecsdlb fnwyq0v fy5bs14 fsv2rcd f1h0usnq fs4ktlq f16h9ulv fx2bmrt f1omzyqd fj8yq94" data-overflow-item=""><span class="fui-Button__icon rywnvv2 ___963sj20 f1nizpg2"><svg fill="currentColor" class="___12fm75w f1w7gpdv fez10in fg4l7m0" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.41 3.64a.5.5 0 0 0 0-.71L9.3.8a.5.5 0 0 0-.7.7l1 1a7.5 7.5 0 0 0-4.08 13.5.5.5 0 0 0 .6-.8A6.5 6.5 0 0 1 10.14 3.5L8.59 5.04a.5.5 0 0 0 .7.7l2.12-2.11ZM8.6 16.36a.5.5 0 0 0 0 .71l2.12 2.12a.5.5 0 0 0 .7-.7l-1-1a7.5 7.5 0 0 0 4.07-13.5.5.5 0 1 0-.59.8A6.5 6.5 0 0 1 9.86 16.5l1.55-1.55a.5.5 0 1 0-.7-.7l-2.12 2.11Z" fill="currentColor"></path></svg></span>Refresh</button>

 <div aria-label="Refresh" title="Refresh" role="button" class="azc-toolbarButton-container fxs-fxclick fxs-portal-hover" id="_weave_e_232" tabindex="0" aria-disabled="false"><!--_weave_cstart_183--><div class="azc-toolbarButton-icon" id="_weave_e_233"><svg height="100%" width="100%" aria-hidden="true" role="presentation" focusable="false"><use href="#FxSymbol0-025"></use></svg></div><!--_weave_cend_183--><!--_weave_cstart_184--><div class="azc-toolbarButton-label fxs-commandBar-item-text" data-telemetryname="Command-arg-refresh" id="_weave_e_234"><!--_weave_cstart_185-->Refresh<!--_weave_cend_185--></div><!--_weave_cend_184--></div>
 */
