const THEMES = [
  'theme-light',
  'theme-paper',
  'theme-green',
  'theme-purple',
  'theme-dark-paper',
  'theme-dark-green',
  'theme-dark-purple'
];

function setTheme(theme) {
  // Remove any previous theme class
  THEMES.forEach(t => document.body.classList.remove(t));
  if (theme) {
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  } else {
    localStorage.removeItem('theme');
  }
}

function getSavedTheme() {
  return localStorage.getItem('theme');
}

document.addEventListener('DOMContentLoaded', function() {
  const saved = getSavedTheme();
  if (saved && THEMES.includes(saved)) setTheme(saved);

  // Use event delegation for theme buttons with data-theme attribute
  document.body.addEventListener('click', function(event) {
    const btn = event.target.closest('[data-theme]');
    if (btn) {
      const theme = btn.getAttribute('data-theme');
      setTheme(theme === 'default' ? null : theme);
    }
  });
});