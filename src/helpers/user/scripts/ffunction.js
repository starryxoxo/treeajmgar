// ffunction.js
function showFeatureIfEnabled(flagId, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  if (localStorage.getItem(flagId) === 'true') {
    el.style.display = '';
  } else {
    el.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Add one line for each feature-flagged section you want to control
  showFeatureIfEnabled('my-ab-div', 'my-ab-div');
  showFeatureIfEnabled('enable-search', 'enable-search');

  // For more features, repeat with their IDs:
  // showFeatureIfEnabled('feature-xyz', 'xyz');
});
