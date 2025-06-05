---
{"dg-publish":true,"permalink":"/dev/settings/"}
---

Feature Flags

<p>
<div id="feature-flags"></div>
<script src="https://starryxoxo.github.io/treeajmgar/src/helpers/feature.js"></script>

<button id="theme-light" style="squared-button">Light</button>
<button id="theme-paper" style="squared-button">Paper</button>

<script>
function setTheme(theme) {
  document.body.classList.remove('theme-light', 'theme-paper');
  document.body.classList.add('theme-' + theme);
  localStorage.setItem('theme', theme);
}

function getSavedTheme() {
  return localStorage.getItem('theme') || 'dark';
}

document.addEventListener('DOMContentLoaded', function() {
  setTheme(getSavedTheme());
});

document.getElementById('theme-light').onclick = () => setTheme('light');
document.getElementById('theme-paper').onclick = () => setTheme('paper');
</script>