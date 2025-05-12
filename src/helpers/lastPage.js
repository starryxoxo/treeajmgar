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