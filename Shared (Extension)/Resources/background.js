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

    if (request.worshipped === "+1") {
        chrome.storage.local.get(['worshipped'], (result) => {
            chrome.storage.local.set({ 'worshipped': (result.worshipped ?? 0) + 1 }, () => {
                console.log('Worshipped', result.worshipped);
                setTimeout(() => {
                    // Updating popup after 1 second
                    browser.runtime.sendMessage({ worshipped: result.worshipped });
                }, 1000);
            });
        });
    }

    if (request.worshipped === "?") {
        chrome.storage.local.get(['worshipped'], (result) => {
            sendResponse({ worshipped: result.worshipped ?? 0 });
        });

        keepMessageChannelOpen = true; // Keep the message channel open for the asynchronous response
    }

    return keepMessageChannelOpen;
});
