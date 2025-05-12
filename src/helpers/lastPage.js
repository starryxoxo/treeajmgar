// Find the first scrollable element in the DOM
function findScrollableContainer() {
  let el = document.body;
  while (el) {
    // Checks if the element is scrollable (vertical)
    const hasScrollableContent = el.scrollHeight > el.clientHeight;
    const overflowYStyle = window.getComputedStyle(el).overflowY;
    const isScrollable = (overflowYStyle !== "visible" && overflowYStyle !== "hidden");
    if (hasScrollableContent && isScrollable) {
      return el;
    }
    el = el.parentElement;
  }
  // fallback to document.scrollingElement (usually <html> or <body>)
  return document.scrollingElement || document.documentElement;
}

// Save scroll position (container + scrollTop) and page URL to localStorage
function saveProgress() {
  const container = findScrollableContainer();
  if (!container) return;
  localStorage.setItem('lastPageData', JSON.stringify({
    page: window.location.href,
    scrollTop: container.scrollTop
  }));
}

// Restore scroll position if available
window.addEventListener("DOMContentLoaded", () => {
  const container = findScrollableContainer();
  const lastPageDataRaw = localStorage.getItem('lastPageData');
  if (container && lastPageDataRaw) {
    try {
      const data = JSON.parse(lastPageDataRaw);
      if (typeof data.scrollTop === "number") {
        setTimeout(() => {
          container.scrollTop = data.scrollTop;
        }, 50); // Wait for content load
      }
    } catch (e) {}
  }

  // Save progress on scroll, before unload, visibility change, and periodically
  if (container) {
    container.addEventListener('scroll', saveProgress);
  }
  window.addEventListener('beforeunload', saveProgress);
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') saveProgress();
  });
  setInterval(saveProgress, 3000);
});