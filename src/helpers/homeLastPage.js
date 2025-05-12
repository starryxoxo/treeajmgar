const lastPageDataRaw = localStorage.getItem('lastPageData');
let lastPage = null, anchorIndex = null, wordContext = null;
if (lastPageDataRaw) {
  try {
    const data = JSON.parse(lastPageDataRaw);
    lastPage = data.page;
    if (typeof data.anchorIndex === 'number' && !isNaN(data.anchorIndex)) {
      anchorIndex = data.anchorIndex;
    }
    if (typeof data.wordContext === 'string' && data.wordContext.length > 0) {
      wordContext = data.wordContext;
    }
  } catch (e) {}
}

const section = document.getElementById("continue-section");
const currentPage = window.location.href;

if (lastPage && (anchorIndex !== null || wordContext) && lastPage !== currentPage) {
  section.style.display = "block";
  document.getElementById("continueBtn").onclick = function () {
    sessionStorage.setItem("resumeAnchorIndex", anchorIndex !== null ? anchorIndex : "");
    sessionStorage.setItem("resumeWordContext", wordContext || "");
    window.location.href = lastPage;
  };
} else {
  section.style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
  const anchorIndexStr = sessionStorage.getItem("resumeAnchorIndex");
  const wordContext = sessionStorage.getItem("resumeWordContext");
  const anchorIndex = anchorIndexStr !== null && anchorIndexStr !== "" ? parseInt(anchorIndexStr, 10) : null;
  const container = document.querySelector('.content.cm-s-obsidian');
  if (container) {
    setTimeout(() => {
      ensureAnchors();
      const anchors = container.querySelectorAll('.scroll-anchor');
      // Try anchorIndex first
      if (anchorIndex !== null && !isNaN(anchorIndex) && anchors[anchorIndex]) {
        container.scrollTop = anchors[anchorIndex].parentElement.offsetTop;
        sessionStorage.removeItem("resumeAnchorIndex");
        sessionStorage.removeItem("resumeWordContext");
        return;
      }
      // Fallback: try word context
      if (wordContext && wordContext.length > 0) {
        const ps = container.querySelectorAll('p');
        for (let i = 0; i < ps.length; i++) {
          let words = ps[i].textContent.trim().split(/\s+/);
          for (let j = 0; j < words.length; j++) {
            let prev = words[j - 1] || '';
            let curr = words[j] || '';
            let next = words[j + 1] || '';
            let context = [prev, curr, next].join(' ');
            if (context === wordContext) {
              container.scrollTop = ps[i].offsetTop;
              sessionStorage.removeItem("resumeAnchorIndex");
              sessionStorage.removeItem("resumeWordContext");
              return;
            }
          }
        }
      }
      sessionStorage.removeItem("resumeAnchorIndex");
      sessionStorage.removeItem("resumeWordContext");
    }, 50);
  }
});

// Helper for this file too
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