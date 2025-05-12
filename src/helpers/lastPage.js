function ensureAnchors() {
  const container = document.querySelector('.content.cm-s-obsidian');
  if (!container) return;
  container.querySelectorAll('p').forEach(p => {
    if (!p.querySelector('.scroll-anchor')) {
      const div = document.createElement('div');
      div.className = 'scroll-anchor';
      div.style.position = 'absolute';
      div.style.left = '-9999px';
      div.style.height = '1px';
      p.prepend(div);
    }
  });
}

function getTopVisibleAnchorIndex() {
  const container = document.querySelector('.content.cm-s-obsidian');
  if (!container) return 0;
  const anchors = container.querySelectorAll('.scroll-anchor');
  const containerTop = container.scrollTop;
  for (let i = 0; i < anchors.length; i++) {
    const off = anchors[i].parentElement.offsetTop;
    if (off >= containerTop) {
      return i;
    }
  }
  return 0;
}

function saveProgress() {
  const container = document.querySelector('.content.cm-s-obsidian');
  if (!container) return;
  const anchorIndex = getTopVisibleAnchorIndex();
  localStorage.setItem('lastPageData', JSON.stringify({
    page: window.location.href,
    anchorIndex: anchorIndex
  }));
}

window.addEventListener("DOMContentLoaded", () => {
  ensureAnchors();
  // Restore
  const lastPageDataRaw = localStorage.getItem('lastPageData');
  let anchorIndex = null;
  if (lastPageDataRaw) {
    try {
      const data = JSON.parse(lastPageDataRaw);
      if (typeof data.anchorIndex === 'number' && !isNaN(data.anchorIndex)) {
        anchorIndex = data.anchorIndex;
      }
    } catch (e) {}
  }
  const container = document.querySelector('.content.cm-s-obsidian');
  if (anchorIndex !== null && container) {
    const anchors = container.querySelectorAll('.scroll-anchor');
    const target = anchors[anchorIndex] || anchors[0];
    if (target) {
      setTimeout(() => {
        container.scrollTop = target.parentElement.offsetTop;
      }, 50);
    }
  }
});

// Save on scroll, before unload, or tab hidden
window.addEventListener("DOMContentLoaded", () => {
  ensureAnchors();
  const container = document.querySelector('.content.cm-s-obsidian');
  if (container) {
    container.addEventListener('scroll', saveProgress);
    window.addEventListener('beforeunload', saveProgress);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') saveProgress();
    });
  }
});