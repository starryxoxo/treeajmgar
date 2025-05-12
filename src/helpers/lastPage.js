// Inject a scroll-anchor div at the top of each paragraph if not already present
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

// Find the top-most visible anchor and extract word context from its parent <p>
function getTopVisibleAnchorIndexAndContext() {
  const container = document.querySelector('.content.cm-s-obsidian');
  if (!container) return { anchorIndex: 0, wordContext: "" };
  const anchors = container.querySelectorAll('.scroll-anchor');
  const containerTop = container.scrollTop;
  const containerBottom = containerTop + container.clientHeight;
  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i];
    const p = anchor.parentElement;
    const pTop = p.offsetTop;
    const pBottom = pTop + p.offsetHeight;
    // If any part of the <p> is visible in the container
    if (pBottom > containerTop && pTop < containerBottom) {
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

// Save progress to localStorage
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

window.addEventListener("DOMContentLoaded", () => {
  ensureAnchors();

  const container = document.querySelector('.content.cm-s-obsidian');
  if (!container) return;

  // Restore scroll position
  const lastPageDataRaw = localStorage.getItem('lastPageData');
  if (lastPageDataRaw) {
    try {
      const data = JSON.parse(lastPageDataRaw);
      ensureAnchors();
      setTimeout(() => {
        const anchors = container.querySelectorAll('.scroll-anchor');
        if (typeof data.anchorIndex === 'number' && anchors[data.anchorIndex]) {
          container.scrollTop = anchors[data.anchorIndex].parentElement.offsetTop;
        } else if (typeof data.wordContext === 'string' && data.wordContext.length > 0) {
          // Fallback: search for wordContext
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

  // Save on scroll, unload, visibilitychange
  container.addEventListener('scroll', saveProgress);
  window.addEventListener('beforeunload', saveProgress);
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') saveProgress();
  });
  // Periodic save (in case user is idle)
  setInterval(saveProgress, 3000);
});