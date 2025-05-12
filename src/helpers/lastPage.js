function saveProgress() {
  localStorage.setItem('lastPageData', JSON.stringify({
    page: window.location.href,
    scroll: window.scrollY
  }));
}

window.addEventListener('scroll', saveProgress);
window.addEventListener('beforeunload', saveProgress);
window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') saveProgress();
});

window.addEventListener("DOMContentLoaded", () => {
  const resumePos = sessionStorage.getItem("resumeScrollPos");
  const scrollContainer = document.querySelector('.content.cm-s-obsidian');
  if (resumePos && scrollContainer) {
    // Try to restore scroll when the container is tall enough
    const tryRestoreScroll = () => {
      // Only restore if the content is tall enough to scroll
      if (scrollContainer.scrollHeight > scrollContainer.clientHeight + 10) {
        scrollContainer.scrollTop = parseInt(resumePos, 10);
        sessionStorage.removeItem("resumeScrollPos");
      } else {
        // Try again in 50ms
        setTimeout(tryRestoreScroll, 50);
      }
    };
    tryRestoreScroll();
  }
});