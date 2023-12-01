'use strict';

const i18n = () => {
    if (typeof browser !== 'undefined') {
        return browser.i18n;
    } else if (typeof chrome !== 'undefined') {
        return chrome.i18n;
    }
};

// Translation
// Check if a custom attribute is being translated using [attribute]key
const trAttribute = (key) => {
    let attr = /\[(\w+)\]/.exec(key);
    if (attr) {
        attr = attr[1];
        key = key.slice(key.indexOf(']') + 1);
    }
    return [ attr, key ];
};

const items = document.querySelectorAll('[data-i18n]');
for (const item of items) {
    let key = item.getAttribute('data-i18n');
    if (key) {
        let attr = '';
        [ attr, key ] = trAttribute(key);

        const placeholder = item.getAttribute('data-i18n-placeholder');
        const translated = (placeholder ? i18n().getMessage(key, placeholder) : i18n().getMessage(key));
        if (translated === "") {
            console.error("translation not found for", item);
        }
        const translation = translated === "" ? key : translated;
        if (attr) {
            item.setAttribute(attr, translation);
        } else if (item.hasAttribute('href')) {
            item.text = translation;
        } else {
            item.innerHTML = translation;
        }

        // Remove the translation attribute from the HTML element
        item.removeAttribute('data-i18n');
    }
}

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
        return i18n().getMessage("short_secods", seconds.toString());
    } else if (seconds < 3600) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        return i18n().getMessage("short_minutes_seconds", [minutes.toString(), remainingSeconds.toString()]);
    } else {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let remainingSeconds = seconds % 60;
        return i18n().getMessage("short_hours_minutes_seconds", [hours.toString(), minutes.toString(), remainingSeconds.toString()]);
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
