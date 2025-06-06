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
  // Only remove theme classes if there's a change
  for (const t of THEMES) document.body.classList.remove(t);
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

  // Single event delegation for all theme buttons
  document.body.addEventListener('click', function(event) {
    // Buttons should have data-theme attribute matching the theme class
    const btn = event.target.closest('[data-theme]');
    if (btn) {
      const theme = btn.getAttribute('data-theme');
      setTheme(theme === 'default' ? null : theme);
    }
  });
});