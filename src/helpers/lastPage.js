function saveProgress() {
  localStorage.setItem("lastPage", window.location.href);
  localStorage.setItem("scrollPos", window.scrollY);
}

window.addEventListener("beforeunload", saveProgress);
window.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    saveProgress();
  }
});
