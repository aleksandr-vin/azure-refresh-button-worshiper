
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

const formatSeconds = (seconds) => {
    if (seconds < 120) {
        return seconds + "s";
    } else if (seconds < 3600) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        return minutes + "m " + remainingSeconds + "s";
    } else {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let remainingSeconds = seconds % 60;
        return hours + "h " + minutes + "m " + remainingSeconds + "s";
    }
}

const setTimeSaved = (clicks) => {
    const SECONDS_PER_CLICK = 0.13;
    const seconds = Math.floor(clicks * SECONDS_PER_CLICK);
    document
        .getElementById('timeSaved')
        .textContent = formatSeconds(seconds);
}

const setAmountWorshipped = (times) => {
    document
        .getElementById('amountWorshipped')
        .textContent = times;
}

onMessage().addListener((request, sender, sendResponse) => {
    if (request.worshipped) {
        setAmountWorshipped(request.worshipped ?? 0);

        if (request.worshipped != "+1") {
            setTimeSaved(request.worshipped ?? 0);
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {

    sendMessage({ worshipping: "?" }).then((response) => {
        console.log("Received response: ", response);
        document.getElementById('worshiperCheckbox').checked = (response.worshipping ?? "yes") !== "no";
    });

    // Save the new state to settings when changed
    worshiperCheckbox.addEventListener('change', function () {
        sendMessage({ worshipping: this.checked ? "yes" : "no" }).then((response) => {
            console.log("Received response: ", response);
        });
    });

    sendMessage({ worshipped: "?" }).then((response) => {
        console.log("Received response: ", response);
        setAmountWorshipped(response.worshipped ?? 0);
        setTimeSaved(response.worshipped ?? 0);
    });
});
