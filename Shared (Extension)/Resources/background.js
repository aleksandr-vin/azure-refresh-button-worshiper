browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //console.log("Received request: ", request);

    var keepMessageChannelOpen = false;

    if (request.worshipping === "yes" || request.worshipping === "no") {
        chrome.storage.local.set({ 'worshipping': request.worshipping }, () => {
            //console.log('Settings saved');
            sendResponse({ reply: "Settings saved: " + request.worshipping });
        });

        keepMessageChannelOpen = true; // Keep the message channel open for the asynchronous response
    }

    if (request.worshipping === "?") {
        chrome.storage.local.get(['worshipping'], (result) => {
            //console.log('Loaded setting:', result);
            sendResponse({ worshipping: result.worshipping ?? "yes" });
        });

        keepMessageChannelOpen = true; // Keep the message channel open for the asynchronous response
    }

    return keepMessageChannelOpen;
});
