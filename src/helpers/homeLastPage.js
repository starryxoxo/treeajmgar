// Retrieve last read page and anchorId from localStorage
const lastPageDataRaw = localStorage.getItem('lastPageData');
let lastPage = null, anchorId = null;
if (lastPageDataRaw) {
  try {
    const data = JSON.parse(lastPageDataRaw);
    lastPage = data.page;
    anchorId = data.anchorId || null;
  } catch (e) {}
}

// section = document.getElementById("continue-section");
const currentPage = window.location.href;

if (lastPage && anchorId && lastPage !== currentPage) {
  section.style.display = "block";
  document.getElementById("continueBtn").onclick = function () {
    sessionStorage.setItem("resumeAnchorId", anchorId);
    window.location.href = lastPage;
  };
} else {
  section.style.display = "none";
}

// On destination page load, restore scroll position using anchorId
window.addEventListener("DOMContentLoaded", () => {
  const anchorId = sessionStorage.getItem("resumeAnchorId");
  const container = document.querySelector('.content.cm-s-obsidian');
  if (container && anchorId) {
    setTimeout(() => {
      const anchor = document.getElementById(anchorId);
      if (anchor && anchor.parentElement) {
        container.scrollTop = anchor.parentElement.offsetTop;
        sessionStorage.removeItem("resumeAnchorId");
      }
    }, 50);
  }
});