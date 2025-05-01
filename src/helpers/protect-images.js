// Disable right-click
document.addEventListener("contextmenu", event => event.preventDefault());

// Disable long-press on mobile
let touchDuration = 500;
let timer;

document.addEventListener("touchstart", function (e) {
  timer = setTimeout(() => {
    e.preventDefault();
  }, touchDuration);
});

document.addEventListener("touchend", function () {
  clearTimeout(timer);
});

document.addEventListener("touchmove", function () {
  clearTimeout(timer);
});

// Create overlay over all images
window.addEventListener("load", () => {
  document.querySelectorAll("img").forEach(img => {
    // Wrap the image in a container
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";
    wrapper.style.width = img.width + "px";

    // Clone image and apply non-interactive styles
    const clone = img.cloneNode(true);
    clone.style.pointerEvents = "none";
    clone.style.userSelect = "none";
    clone.style.webkitUserDrag = "none";
    clone.style.display = "block";
    clone.style.width = "100%";

    // Transparent overlay
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "transparent";
    overlay.style.zIndex = "10";

    // Replace original image
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(clone);
    wrapper.appendChild(overlay);
    img.remove();
  });
});

// Prevent screenshots
function preventScreenshots() {
  // For desktop: detect PrintScreen key
  document.addEventListener("keyup", (e) => {
    if (e.key === "PrintScreen") {
      navigator.clipboard.writeText(""); // Clear clipboard
      alert("Screenshots are disabled on this site.");
    }
  });

  // For mobile: prevent screen recording and screenshots
  setInterval(() => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Try to draw something on the canvas
    ctx.drawImage(video, 0, 0);
    const pixelData = ctx.getImageData(0, 0, 1, 1).data;

    // If the pixel data is empty, a screenshot is being taken
    if (!pixelData.length) {
      alert("Screenshots and screen recording are disabled on this site.");
    }
  }, 1000);
}

preventScreenshots();
