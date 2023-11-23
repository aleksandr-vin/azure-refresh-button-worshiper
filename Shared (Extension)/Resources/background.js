browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    if (request.worshipping === "yes") {
        sendResponse({ farewell: "Azure Refresh Button Worshiper entered the room" });
    }
    if (request.worshipping === "no") {
        sendResponse({ farewell: "Azure Refresh Button Worshiper left the room" });
    }
});
