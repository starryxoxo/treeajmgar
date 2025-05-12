const lastPageDataRaw = localStorage.getItem('lastPageData');
let lastPage = null, scrollPos = null;
if (lastPageDataRaw) {
  try {
    const data = JSON.parse(lastPageDataRaw);
    lastPage = data.page;
    scrollPos = data.scroll;
  } catch (e) {}
}

const section = document.getElementById("continue-section");
const currentPage = window.location.href;

if (lastPage && scrollPos !== null && lastPage !== currentPage) {
  section.style.display = "block";
  document.getElementById("continueBtn").onclick = function () {
    sessionStorage.setItem("resumeScrollPos", scrollPos);
    window.location.href = lastPage;
  };
} else {
  section.style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
  // Restore scroll position after navigation
  const resumePos = sessionStorage.getItem("resumeScrollPos");
  const scrollContainer = document.querySelector('.content.cm-s-obsidian');
  if (resumePos && !isNaN(resumePos)) {
    if (scrollContainer) {
      scrollContainer.scrollTo(0, parseInt(resumePos, 10));
    } else {
      window.scrollTo(0, parseInt(resumePos, 10));
    }
    sessionStorage.removeItem("resumeScrollPos");
  }
});