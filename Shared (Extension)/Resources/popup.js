console.log("Azure Refresh Button Worshiper popup!", browser);

document.addEventListener('DOMContentLoaded', function() {

    browser.runtime.sendMessage({ worshipping: "?" }).then((response) => {
        console.log("Received response: ", response);
        var worshiperCheckbox = document.getElementById('worshiperCheckbox');
        document.getElementById('worshiperCheckbox').checked = (response.worshipping ?? "yes") !== "no";
    });

    // Save the new state to settings when changed
    worshiperCheckbox.addEventListener('change', function() {
        browser.runtime.sendMessage({ worshipping: this.checked ? "yes" : "no" }).then((response) => {
            console.log("Received response: ", response);
        });
    });
});
