window.addEventListener("DOMContentLoaded", () => {
  // Restore scroll after navigation (on any page)
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