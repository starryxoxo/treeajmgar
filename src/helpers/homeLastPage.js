const lastPageDataRaw = localStorage.getItem('lastPageData');
let lastPage = null, anchorIndex = null;
if (lastPageDataRaw) {
  try {
    const data = JSON.parse(lastPageDataRaw);
    lastPage = data.page;
    // Defensive: check for integer-ness and not undefined/null
    if (typeof data.anchorIndex === 'number' && !isNaN(data.anchorIndex)) {
      anchorIndex = data.anchorIndex;
    }
  } catch (e) {}
}

const section = document.getElementById("continue-section");
const currentPage = window.location.href;

if (lastPage && anchorIndex !== null && lastPage !== currentPage) {
  section.style.display = "block";
  document.getElementById("continueBtn").onclick = function () {
    sessionStorage.setItem("resumeAnchorIndex", anchorIndex);
    window.location.href = lastPage;
  };
} else {
  section.style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
  const anchorIndexStr = sessionStorage.getItem("resumeAnchorIndex");
  // Defensive: convert string to number and check for validity
  const anchorIndex = anchorIndexStr !== null ? parseInt(anchorIndexStr, 10) : null;
  if (anchorIndex !== null && !isNaN(anchorIndex)) {
    const container = document.querySelector('.content.cm-s-obsidian');
    const anchors = container ? container.querySelectorAll('.scroll-anchor') : [];
    const target = anchors[anchorIndex] || anchors[0];
    if (container && target) {
      setTimeout(() => {
        container.scrollTop = target.parentElement.offsetTop;
      }, 50);
    }
    sessionStorage.removeItem("resumeAnchorIndex");
  }
});