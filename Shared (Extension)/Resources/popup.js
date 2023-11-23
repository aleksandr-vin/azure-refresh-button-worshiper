console.log("Azure Refresh Button Worshiper popup!", browser);


document.addEventListener('DOMContentLoaded', function() {
    var worshiperCheckbox = document.getElementById('worshiperCheckbox');

    // Load the saved state from settings
    const notWorshippingAzureRefreshButtons = localStorage.getItem('notWorshippingAzureRefreshButtons');
    console.log("[popup] notWorshippingAzureRefreshButtons", notWorshippingAzureRefreshButtons);
    document.getElementById('worshiperCheckbox').checked = notWorshippingAzureRefreshButtons !== 'yes';

    // Save the new state to settings when changed
    worshiperCheckbox.addEventListener('change', function() {
        localStorage.setItem('notWorshippingAzureRefreshButtons', this.checked ? 'no' : 'yes');
    });
});
