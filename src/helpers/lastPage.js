// Debounce function to limit how often we save scroll position
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

function saveProgress() {
  localStorage.setItem("lastPage", window.location.href);
  localStorage.setItem("scrollPos", window.scrollY);
}

// Save on scroll, but not too often
window.addEventListener("scroll", debounce(saveProgress, 200));

// Also save on unload and when hidden (as you had)
window.addEventListener("beforeunload", saveProgress);
window.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    saveProgress();
  }
});

// Restore scroll position when page loads
window.addEventListener("DOMContentLoaded", () => {
  const lastPage = localStorage.getItem("lastPage");
  const scrollPos = localStorage.getItem("scrollPos");
  if (lastPage === window.location.href && scrollPos) {
    window.scrollTo(0, parseInt(scrollPos, 10));
  }
});