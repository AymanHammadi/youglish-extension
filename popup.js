// Initialize state
let player = null;
let currentQuery = "hello";

/**
 * YouGlish Widget configuration
 */
const WIDGET_CONFIG = {
  width: 420,
  height: 600,
  components: 8415,
  autoStart: 1,
  closeDelay: 2000,
};

/**
 * Initializes and configures the YouGlish widget
 * @param {string} searchQuery - The text to search for
 * @returns {YG.Widget|null} - The widget instance or null if initialization fails
 */
function initializeWidget(searchQuery) {
  try {
    const widget = new YG.Widget("yg-widget-0", {
      ...WIDGET_CONFIG,
      events: {
        onError: (e) => handleError(e),
      },
    });

    if (searchQuery) {
      widget.fetch(searchQuery, "english");
    }

    return widget;
  } catch (err) {
    console.error("Failed to initialize widget:", err);
    return null;
  }
}

/**
 * Handles the completion of a search request
 * @param {Object} event - The fetch done event
 */
function handleFetchDone(event) {
  if (event.totalResult === 0) {
    showMessage("No results found");
    setTimeout(() => window.close(), WIDGET_CONFIG.closeDelay);
  }
}

/**
 * Handles widget errors
 * @param {Object} error - The error event
 */
function handleError(error) {
  console.error("Widget error:", error);
  showMessage("An error occurred while searching");
}

/**
 * Displays a message to the user
 * @param {string} message - The message to display
 */
function showMessage(message) {
  const messageElement = document.getElementById("message");
  if (messageElement) {
    messageElement.textContent = message;
  }
}

// Initialize widget when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("query");
  initializeWidget(searchQuery);
});
