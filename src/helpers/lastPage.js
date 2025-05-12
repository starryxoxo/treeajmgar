function ensureAnchors() {
  const container = document.querySelector('.content.cm-s-obsidian');
  if (!container) return;
  container.querySelectorAll('p').forEach(p => {
    if (!p.querySelector('.scroll-anchor')) {
      const div = document.createElement('div');
      div.className = 'scroll-anchor';
      div.style.height = '1px';
      div.style.margin = '0';
      div.style.padding = '0';
      div.style.border = '0';
      div.style.pointerEvents = 'none';
      div.style.userSelect = 'none';
      p.prepend(div);
    }
  });
}

function getTopVisibleAnchorIndexAndContext() {
  const container = document.querySelector('.content.cm-s-obsidian');
  if (!container) return { anchorIndex: 0, wordContext: "" };
  const anchors = container.querySelectorAll('.scroll-anchor');
  const containerTop = container.scrollTop;
  for (let i = 0; i < anchors.length; i++) {
    const p = anchors[i].parentElement;
    if (p.offsetTop + p.offsetHeight > containerTop) {
      // Fallback word context
      let words = p.textContent.trim().split(/\s+/);
      let idx = words.findIndex(w => w.length > 0);
      let prev = words[idx - 1] || '';
      let curr = words[idx] || '';
      let next = words[idx + 1] || '';
      let wordContext = [prev, curr, next].join(' ');
      return { anchorIndex: i, wordContext };
    }
  }
  return { anchorIndex: 0, wordContext: "" };
}

function getFirstVisibleWordContext() {
  const container = document.querySelector('.content.cm-s-obsidian');
  if (!container) return null;
  const ps = container.querySelectorAll('p');
  const containerTop = container.scrollTop;
  const containerHeight = container.clientHeight;
  for (let i = 0; i < ps.length; i++) {
    const p = ps[i];
    // Calculate the position of the paragraph relative to the container
    const pTop = p.offsetTop;
    const pBottom = pTop + p.offsetHeight;
    // Check if any part of the paragraph is visible in the container
    if (pBottom > containerTop && pTop < containerTop + containerHeight) {
      // Found the first visible paragraph
      let words = p.textContent.trim().split(/\s+/);
      let idx = words.findIndex(w => w.length > 0);
      let prev = words[idx - 1] || '';
      let curr = words[idx] || '';
      let next = words[idx + 1] || '';
      return [prev, curr, next].join(' ');
    }
  }
  return null;
}

function saveProgress() {
  const container = document.querySelector('.content.cm-s-obsidian');
  if (!container) return;
  const { anchorIndex, wordContext } = getTopVisibleAnchorIndexAndContext();
  localStorage.setItem('lastPageData', JSON.stringify({
    page: window.location.href,
    anchorIndex,
    wordContext
  }));
}

// Ensure anchors always present (on DOM load and when saving)
window.addEventListener("DOMContentLoaded", () => {
  ensureAnchors();

  // Restore scroll
  const lastPageDataRaw = localStorage.getItem('lastPageData');
  if (lastPageDataRaw) {
    try {
      const data = JSON.parse(lastPageDataRaw);
      const container = document.querySelector('.content.cm-s-obsidian');
      if (!container) return;
      ensureAnchors();
      setTimeout(() => {
        const anchors = container.querySelectorAll('.scroll-anchor');
        // Try anchorIndex first
        if (typeof data.anchorIndex === 'number' && anchors[data.anchorIndex]) {
          container.scrollTop = anchors[data.anchorIndex].parentElement.offsetTop;
        } else if (typeof data.wordContext === 'string' && data.wordContext.length > 0) {
          // Fallback: try word context matching
          const ps = container.querySelectorAll('p');
          for (let i = 0; i < ps.length; i++) {
            let words = ps[i].textContent.trim().split(/\s+/);
            for (let j = 0; j < words.length; j++) {
              let prev = words[j - 1] || '';
              let curr = words[j] || '';
              let next = words[j + 1] || '';
              let context = [prev, curr, next].join(' ');
              if (context === data.wordContext) {
                container.scrollTop = ps[i].offsetTop;
                return;
              }
            }
          }
        }
      }, 50);
    } catch (e) {}
  }
});

window.addEventListener("DOMContentLoaded", () => {
  ensureAnchors();
  const container = document.querySelector('.content.cm-s-obsidian');
  if (container) {

// Save progress every 3 seconds (adjust interval as needed)
setInterval(saveProgress, 3000);    container.addEventListener('scroll', saveProgress);

    window.addEventListener('beforeunload', saveProgress);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') saveProgress();
    });
  }
});