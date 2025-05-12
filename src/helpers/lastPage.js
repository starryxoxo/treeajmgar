// --- Save progress by paragraph index (no IDs needed) ---

function getTopVisibleParaIndex() {
  const container = document.querySelector('.content.cm-s-obsidian');
  if (!container) return 0;
  const ps = container.querySelectorAll('p');
  const containerTop = container.scrollTop;
  for (let i = 0; i < ps.length; i++) {
    if (ps[i].offsetTop >= containerTop) {
      return i;
    }
  }
  return 0;
}

function saveProgress() {
  const container = document.querySelector('.content.cm-s-obsidian');
  if (!container) return;
  const paraIndex = getTopVisibleParaIndex();
  localStorage.setItem('lastPageData', JSON.stringify({
    page: window.location.href,
    paraIndex: paraIndex
  }));
}

const container = document.querySelector('.content.cm-s-obsidian');
if (container) {
  container.addEventListener('scroll', saveProgress);
  window.addEventListener('beforeunload', saveProgress);
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') saveProgress();
  });
}

// --- Restore scroll to saved paragraph index ---
window.addEventListener("DOMContentLoaded", () => {
  const lastPageDataRaw = localStorage.getItem('lastPageData');
  let paraIndex = null;
  if (lastPageDataRaw) {
    try {
      const data = JSON.parse(lastPageDataRaw);
      // Defensive: check for integer-ness and not undefined/null
      if (typeof data.paraIndex === 'number' && !isNaN(data.paraIndex)) {
        paraIndex = data.paraIndex;
      }
    } catch (e) {}
  }
  if (paraIndex !== null) {
    const container = document.querySelector('.content.cm-s-obsidian');
    const ps = container ? container.querySelectorAll('p') : [];
    const targetP = ps[paraIndex] || ps[0];
    if (container && targetP) {
      setTimeout(() => {
        container.scrollTop = targetP.offsetTop;
      }, 50);
    }
  }
});