// background.js

// Function to get the highlighted text
function getSelectionText() {
  return window.getSelection().toString();
}

// Listen for the keyboard shortcut Ctrl+Shift+Y
chrome.commands.onCommand.addListener(function (command) {
  if (command === "open_youglish") {
    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];

      // Execute a script in the active tab to get the selected text
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          func: getSelectionText,
        },
        function (selection) {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
          }

          const text = selection[0]?.result; // Using optional chaining for safety

          if (text) {
            // Open the popup and pass the selected text as a query parameter
            chrome.windows.create({
              url: chrome.runtime.getURL(
                `popup.html?query=${encodeURIComponent(text)}`
              ),
              type: "popup",
              width: 700,
              height: 500,
            });
          }
        }
      );
    });
  }
});
