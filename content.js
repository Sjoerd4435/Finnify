// Function to replace all visible text with "Finn"
function replaceAllTextWithFinn() {
    const textNodes = document.evaluate(
        "//text()[normalize-space()]",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    for (let i = 0; i < textNodes.snapshotLength; i++) {
        const currentNode = textNodes.snapshotItem(i);
        // Replace text with "Finn"
        currentNode.nodeValue = "Finn";
    }
}

// Function to add a photo overlay on thumbnails
function addPhoto() {
    const thumbnails = document.querySelectorAll('ytd-thumbnail');

    thumbnails.forEach(thumbnail => {
        // Ensure the thumbnail has relative positioning
        thumbnail.style.position = "relative"; 

        // Check if the overlay already exists
        let existingOverlay = thumbnail.querySelector("img.overlay-image");
        if (existingOverlay) {
            return; // If overlay exists, skip adding
        }

        // Create the overlay image
        const img = document.createElement("img");
        img.src = chrome.runtime.getURL("photo.jpg"); // Ensure photo.jpg is in the extension directory
        img.alt = "Overlay Image";
        img.className = "overlay-image"; // Add a class for the overlay
        img.style.position = "absolute"; // Position it absolutely
        img.style.top = "0"; // Align to the top
        img.style.left = "0"; // Align to the left
        img.style.width = "100%"; // Cover the entire thumbnail
        img.style.height = "100%"; // Cover the entire thumbnail
        img.style.pointerEvents = "none"; // Allow clicks to go through the overlay

        // Append the overlay image
        thumbnail.appendChild(img);
    });
}

// Function to handle both text replacement and thumbnail addition
function handlePageContent() {
    replaceAllTextWithFinn();
    addPhoto();
}

// Run functions on page load
window.addEventListener("load", () => {
    handlePageContent(); // Handle content on initial load
});

// Observe changes in the DOM to manage dynamically added content
const observer = new MutationObserver(() => {
    handlePageContent(); // Apply changes whenever the DOM updates
});

// Start observing changes in the body
observer.observe(document.body, { childList: true, subtree: true });
