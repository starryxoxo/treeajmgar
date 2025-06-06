// feature.js
const FLAGS = [
  { id: "my-ab-div", label: "Show the About Artist section" },
  { id: "enable-search", label: "Enable Search Bar" }
  // Add more flags here as needed, e.g.:
  // { id: "feature-xyz", label: "Enable XYZ Feature" }
];

function createToggle(flag) {
  const label = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = flag.id;
  input.checked = localStorage.getItem(flag.id) === 'true';
  input.addEventListener('change', () => {
    localStorage.setItem(flag.id, input.checked ? 'true' : 'false');
  });
  label.appendChild(input);
  label.appendChild(document.createTextNode(" " + flag.label));
  return label;
}

function renderFeatureFlags(containerId = "feature-flags") {
  const container = document.getElementById(containerId);
  FLAGS.forEach(flag => {
    container.appendChild(document.createElement('br')); // blank line before
    container.appendChild(createToggle(flag));
    container.appendChild(document.createElement('br')); // blank line after
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderFeatureFlags(); // expects a div with id="feature-flags"
});
