function saveProgress() {
  const scrollContainer = document.querySelector('.content.cm-s-obsidian');
  const scrollPos = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
  localStorage.setItem('lastPage', window.location.href);
  localStorage.setItem('scrollPos', scrollPos);
}

const scrollContainer = document.querySelector('.content.cm-s-obsidian');
if (scrollContainer) {
  scrollContainer.addEventListener('scroll', saveProgress);
} else {
  window.addEventListener('scroll', saveProgress);
}
window.addEventListener('beforeunload', saveProgress);
window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') saveProgress();
});