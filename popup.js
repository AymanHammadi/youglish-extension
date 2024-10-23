// popup.js

document.addEventListener("DOMContentLoaded", function () {
  // Load the YouGlish widget without an initial search
  loadYouglishWidget();
});

// Function to load the YouGlish widget
function loadYouglishWidget() {
  var tag = document.createElement("script");
  tag.src = "widget.js"; // Load the widget script
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  tag.onload = function () {
    // Initialize the widget
    window.widget = new YG.Widget("widget-1", {
      width: 640,
      components: 9,
      events: {
        onFetchDone: onFetchDone,
        onVideoChange: onVideoChange,
        onCaptionConsumed: onCaptionConsumed,
      },
    });

    // Get the query text from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const queryText = urlParams.get("query") || ""; // Default to an empty string

    // Set the search bar value if there is a query
    if (queryText) {
      document.getElementById("search-bar").value = queryText;
      widget.fetch(queryText, "english"); // Optionally, fetch results immediately if desired
    }

    // Set up form submission
    document
      .getElementById("search-form")
      .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting normally
        const query = document.getElementById("search-bar").value;
        if (query) {
          widget.fetch(query, "english"); // Fetch results for the user's query
        }
      });

    // Set up navigation buttons
    document.getElementById("prev-btn").addEventListener("click", function () {
      widget.previous(); // Navigate to the previous video
    });

    document.getElementById("next-btn").addEventListener("click", function () {
      widget.next(); // Navigate to the next video
    });
  };
}

// Event handlers for the YouGlish widget
function onFetchDone(event) {
  if (event.totalResult === 0) {
    alert("No result found");
  }
}

function onVideoChange(event) {
  console.log("Video changed to track number:", event.trackNumber);
}

function onCaptionConsumed(event) {
  console.log("Caption consumed for track number:", event.trackNumber);
}
