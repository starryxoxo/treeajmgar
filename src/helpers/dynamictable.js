document.addEventListener("DOMContentLoaded", () => {
  const zone = document.getElementById("dynamic-table-zone");
  if (!zone) return;

  const table = zone.querySelector("table");
  if (!table) return;

  const rows = Array.from(table.rows);
  const numCols = rows[0]?.cells.length || 0;
  if (numCols <= 1) return;

  // Shuffle columns except the first
  const fixedIndex = 0;
  const movableIndexes = [...Array(numCols).keys()].slice(1);
  for (let i = movableIndexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [movableIndexes[i], movableIndexes[j]] = [movableIndexes[j], movableIndexes[i]];
  }

  // Rebuild rows
  rows.forEach(row => {
    const cells = Array.from(row.cells);
    const fixedCell = cells[fixedIndex];
    const shuffledCells = movableIndexes.map(i => cells[i]);
    while (row.firstChild) row.removeChild(row.firstChild);
    row.appendChild(fixedCell);
    shuffledCells.forEach(cell => row.appendChild(cell));
  });
});
