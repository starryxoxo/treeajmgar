// ffunction.js
function showFeatureIfEnabled(flagId, elementId) {
  if (localStorage.getItem(flagId) === 'true') {
    document.getElementById(elementId).style.display = '';
  } else {
    document.getElementById(elementId).style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Example for the "ab" feature
  if (document.getElementById('ab')) {
    showFeatureIfEnabled('my-ab-div');
  }
  // For more features, repeat as needed:
  // showFeatureIfEnabled('feature', 'xyz');
});