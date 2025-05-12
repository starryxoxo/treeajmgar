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
  const resumePos = sessionStorage.getItem("resumeScrollPos");
  const scrollContainer = document.querySelector('.theme-dark.markdown-preview.markdown-rendered.markdown-preview-section');
  if (resumePos && scrollContainer) {
    scrollContainer.scrollTop = parseInt(resumePos, 10);
    sessionStorage.removeItem("resumeScrollPos");
  }
});