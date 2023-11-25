console.log("Azure Refresh Button Worshiper popup!", browser);

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.worshipped) {
        const e = document.getElementById('amountWorshipped')
        e.textContent = request.worshipped ?? "0";
    }
});

document.addEventListener('DOMContentLoaded', function() {

    browser.runtime.sendMessage({ worshipping: "?" }).then((response) => {
        console.log("Received response: ", response);
        document.getElementById('worshiperCheckbox').checked = (response.worshipping ?? "yes") !== "no";
    });

    // Save the new state to settings when changed
    worshiperCheckbox.addEventListener('change', function() {
        browser.runtime.sendMessage({ worshipping: this.checked ? "yes" : "no" }).then((response) => {
            console.log("Received response: ", response);
        });
    });

    browser.runtime.sendMessage({ worshipped: "?" }).then((response) => {
        console.log("Received response: ", response);
        document.getElementById('amountWorshipped').textContent = response.worshipped ?? "0";
    });
});
