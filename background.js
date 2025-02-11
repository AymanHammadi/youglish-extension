/**
 * Constants for configuration
 */
const CONFIG = {
  WINDOW_WIDTH: 420,
  WINDOW_HEIGHT: 600,
  COMMAND_NAME: "open_youglish",
};

/**
 * Extracts the currently selected text from the active page
 * @returns {string} The selected text
 */
function getSelectionText() {
  return window.getSelection().toString().trim();
}

/**
 * Opens a YouGlish popup window for the selected text
 * @param {string} text - The text to search for
 */
function openYouGlishPopup(text) {
  if (!text) return;

  chrome.windows
    .create({
      url: `popup.html?query=${encodeURIComponent(text)}`,
      type: "popup",
      width: CONFIG.WINDOW_WIDTH,
      height: CONFIG.WINDOW_HEIGHT,
    })
    .catch((err) => console.error("Failed to create popup:", err));
}

/**
 * Handles the keyboard shortcut command
 */
chrome.commands.onCommand.addListener(async (command) => {
  if (command !== CONFIG.COMMAND_NAME) return;

  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    const [selection] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: getSelectionText,
    });

    openYouGlishPopup(selection?.result);
  } catch (err) {
    console.error("Error executing script:", err);
  }
});

// Installation listener
chrome.runtime.onInstalled.addListener(() => {
  console.info(
    "YouGlish Extension installed. Use Ctrl+Shift+S to search highlighted text."
  );
});
