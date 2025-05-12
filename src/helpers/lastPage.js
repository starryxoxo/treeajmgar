// Find the ID of the top-most visible anchor in the scroll container
function getTopVisibleAnchorId() {
  const container = document.querySelector('.content.cm-s-obsidian');
  if (!container) return null;
  // Change the selector if your anchors are not direct children of container
  const anchors = container.querySelectorAll('div[id^="scroll-anchor-"]');
  const containerTop = container.scrollTop;
  const containerBottom = containerTop + container.clientHeight;
  for (let anchor of anchors) {
    const p = anchor.parentElement;
    const pTop = p.offsetTop;
    const pBottom = pTop + p.offsetHeight;
    if (pBottom > containerTop && pTop < containerBottom) {
      return anchor.id;
    }
  }
  return anchors.length ? anchors[0].id : null;
}

// Save the current anchor ID and page URL to localStorage
function saveProgress() {
  const anchorId = getTopVisibleAnchorId();
  if (!anchorId) return;
  localStorage.setItem('lastPageData', JSON.stringify({
    page: window.location.href,
    anchorId
  }));
}

window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.content.cm-s-obsidian');
  if (!container) return;

  // Restore scroll position
  const lastPageDataRaw = localStorage.getItem('lastPageData');
  if (lastPageDataRaw) {
    try {
      const data = JSON.parse(lastPageDataRaw);
      setTimeout(() => {
        if (data.anchorId) {
          const anchor = document.getElementById(data.anchorId);
          if (anchor && anchor.parentElement) {
            container.scrollTop = anchor.parentElement.offsetTop;
          }
        }
      }, 50);
    } catch (e) {}
  }

  // Save progress on scroll, before unload, visibility change, and periodically
  container.addEventListener('scroll', saveProgress);
  window.addEventListener('beforeunload', saveProgress);
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') saveProgress();
  });
  setInterval(saveProgress, 3000);
});