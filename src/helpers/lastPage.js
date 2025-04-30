function saveProgress() {
  const scrollY = window.scrollY;
  const href = window.location.href;
  localStorage.setItem("lastPage", href);
  localStorage.setItem("scrollPos", scrollY);
  console.log("[Save] Page:", href);
  console.log("[Save] ScrollY:", scrollY);
}

// Save when leaving or tab hides
window.addEventListener("beforeunload", saveProgress);
window.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    saveProgress();
  }
});
