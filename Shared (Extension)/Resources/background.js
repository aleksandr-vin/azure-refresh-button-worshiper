

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

const onCommand = () => {
    if (typeof browser !== 'undefined') {
        return browser.commands.onCommand;
    } else if (typeof chrome !== 'undefined') {
        return chrome.commands.onCommand;
    }
};

onCommand().addListener((command) => {
    if (command === "highligh-refresh-buttons") {
        //console.log("Toggling the highligh-refresh-buttons feature!");
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "highligh-refresh-buttons"}, function(response) {});
        });
    }

    if (command === "toggle-worshipping") {
        chrome.storage.local.get(['worshipping'], (result) => {
            //console.log('Loaded setting:', result);
            const worshipping = (result.worshipping ?? "yes") === "yes" ? "no" : "yes";
            chrome.storage.local.set({ 'worshipping': worshipping }, () => {
                console.log('Changed worshipping to', worshipping);
            });
        });
    }
});

onMessage().addListener((request, sender, sendResponse) => {
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
                    sendMessage({ worshipped: result.worshipped });
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
