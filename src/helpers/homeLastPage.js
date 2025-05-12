// Retrieve last read page and scrollTop from localStorage
const lastPageDataRaw = localStorage.getItem('lastPageData');
let lastPage = null, scrollTop = null;
if (lastPageDataRaw) {
  try {
    const data = JSON.parse(lastPageDataRaw);
    lastPage = data.page;
    scrollTop = typeof data.scrollTop === "number" ? data.scrollTop : null;
  } catch (e) {}
}

// Show "Continue Reading" button if valid
const section = document.getElementById("continue-section");
const currentPage = window.location.href;

if (lastPage && scrollTop !== null && lastPage !== currentPage) {
  section.style.display = "block";
  document.getElementById("continueBtn").onclick = function () {
    sessionStorage.setItem("resumeScrollTop", scrollTop);
    window.location.href = lastPage;
  };
} else {
  section.style.display = "none";
}

// On destination page load, restore scroll position using scrollTop
window.addEventListener("DOMContentLoaded", () => {
  const scrollTop = sessionStorage.getItem("resumeScrollTop");
  if (scrollTop !== null) {
    const container = (function findScrollableContainer() {
      let el = document.body;
      while (el) {
        const hasScrollableContent = el.scrollHeight > el.clientHeight;
        const overflowYStyle = window.getComputedStyle(el).overflowY;
        const isScrollable = (overflowYStyle !== "visible" && overflowYStyle !== "hidden");
        if (hasScrollableContent && isScrollable) {
          return el;
        }
        el = el.parentElement;
      }
      return document.scrollingElement || document.documentElement;
    })();
    setTimeout(() => {
      container.scrollTop = parseInt(scrollTop, 10);
      sessionStorage.removeItem("resumeScrollTop");
    }, 50);
  }
});