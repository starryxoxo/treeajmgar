// Find the first scrollable element in the DOM
function findScrollableContainer() {
  let el = document.body;
  while (el) {
    const style = window.getComputedStyle(el);
    const hasScrollableContent = el.scrollHeight > el.clientHeight;
    const isScrollable = (
      (style.overflowY === 'auto' || style.overflowY === 'scroll') ||
      (el === document.body || el === document.documentElement)
    );
    if (hasScrollableContent && isScrollable) {
      return el;
    }
    el = el.parentElement;
  }
  // fallback to document.scrollingElement (usually <html> or <body>)
  return document.scrollingElement || document.documentElement;
}

// Save scroll position (per page) to localStorage
function saveProgress() {
  const container = findScrollableContainer();
  if (!container) return;
  localStorage.setItem('lastPageData', JSON.stringify({
    page: window.location.href,
    scrollTop: container.scrollTop
  }));
}

window.addEventListener("DOMContentLoaded", () => {
  const container = findScrollableContainer();
  const lastPageDataRaw = localStorage.getItem('lastPageData');
  if (container && lastPageDataRaw) {
    try {
      const data = JSON.parse(lastPageDataRaw);
      // Only restore if the saved page matches the current page!
      if (typeof data.scrollTop === "number" && data.page === window.location.href) {
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
