function setTheme(theme) {
  document.body.classList.remove('theme-light', 'theme-paper', 'theme-green', 'theme-purple', 'd-theme-paper', 'd-theme-green', 'd-theme-purple');
  if (theme) {
    document.body.classList.add('theme-' + theme);
    localStorage.setItem('theme', theme);
  } else {
    // No theme: remove localStorage and class (restores original/default)
    localStorage.removeItem('theme');
  }
}

function getSavedTheme() {
  return localStorage.getItem('theme');
}

document.addEventListener('DOMContentLoaded', function() {
  const saved = getSavedTheme();
  if (saved) setTheme(saved);
  // If no saved theme, do nothing (original/default)
});

// Button handlers
document.getElementById('theme-light').onclick = () => setTheme('light');
document.getElementById('theme-paper').onclick = () => setTheme('paper');
document.getElementById('theme-green').onclick = () => setTheme('green');
document.getElementById('theme-purple').onclick = () => setTheme('purple');
document.getElementById('theme-dark-paper').onclick = () => setTheme('dark-paper');
document.getElementById('theme-dark-green').onclick = () => setTheme('dark-green');
document.getElementById('theme-dark-purple').onclick = () => setTheme('dark-purple');
document.getElementById('theme-default').onclick = () => setTheme(null);
