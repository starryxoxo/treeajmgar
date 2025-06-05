function getSavedTheme() {
  return localStorage.getItem('theme');
}

document.addEventListener('DOMContentLoaded', function() {
  const saved = getSavedTheme();
  if (saved) setTheme(saved);
  // If no saved theme, do nothing (original/default)
});