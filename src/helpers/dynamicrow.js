document.addEventListener("DOMContentLoaded", () => {
  const zone = document.getElementById("dynamic-row-zone");
  if (!zone) return;

  const table = zone.querySelector("table");
  if (!table) return;

  const tbody = table.tBodies[0] || table; // Support <tbody> or direct <table>
  const rows = Array.from(tbody.rows);

  if (rows.length <= 1) return; // Nothing to shuffle

  const fixedRow = rows[0];
  const movableRows = rows.slice(1);

  // Shuffle movable rows
  for (let i = movableRows.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [movableRows[i], movableRows[j]] = [movableRows[j], movableRows[i]];
  }

  // Clear tbody and re-append rows
  while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
  tbody.appendChild(fixedRow);
  movableRows.forEach(row => tbody.appendChild(row));
});