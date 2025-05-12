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
} else if (section) {
  section.style.display = "none";
}

// On destination page load, restore scroll position using scrollTop
window.addEventListener("DOMContentLoaded", () => {
  const scrollTop = sessionStorage.getItem("resumeScrollTop");
  if (scrollTop !== null) {
    const container = (function findScrollableContainer() {
      let el = document.body;
      while (el) {
        const style = window.getComputedStyle(el);
        const hasScrollableContent = el.scrollHeight > el.clientHeight;
        const isScrollable = (
          (style.overflowY === 'auto' || style.overflowY === 'scroll') ||
          (el === document.body || el === document.documentElement)
        );
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