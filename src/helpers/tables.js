  document.addEventListener("DOMContentLoaded", () => {
    // 1. Shuffle Table Rows (Dynamic Row Zone)
    const zone = document.getElementById("dynamic-row-zone");
    if (zone) {
      const table = zone.querySelector("table");
      if (table) {
        const tbody = table.tBodies[0] || table; // Support <tbody> or direct <table>
        const rows = Array.from(tbody.rows);

        if (rows.length > 1) {
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
        }
      }
    }

    // 2. Shuffle Table Columns (Dynamic Table Zone)
const tableZone = document.getElementById("dynamic-table-zone");
if (tableZone) {
  const table = tableZone.querySelector("table");
  if (table) {
    const rows = Array.from(table.rows);
    const numCols = rows[0]?.cells.length || 0;
    if (numCols > 1) {
      // For the first row, fix the first cell (0,0), shuffle rest
      const firstRowCells = Array.from(rows[0].cells);
      const firstRowMovableIndexes = [...Array(numCols).keys()].slice(1);

      // Shuffle the first row's movable columns (columns 1..N)
      for (let i = firstRowMovableIndexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [firstRowMovableIndexes[i], firstRowMovableIndexes[j]] = [firstRowMovableIndexes[j], firstRowMovableIndexes[i]];
      }

      // Rebuild the first row: keep (0,0) fixed
      while (rows[0].firstChild) rows[0].removeChild(rows[0].firstChild);
      rows[0].appendChild(firstRowCells[0]);
      firstRowMovableIndexes.forEach(idx => rows[0].appendChild(firstRowCells[idx]));

      // For all other rows, shuffle ALL columns (including col 0)
      for (let r = 1; r < rows.length; r++) {
        const cells = Array.from(rows[r].cells);
        // Create a shuffled array of all column indices for this row
        const rowIndexes = [...Array(numCols).keys()];
        for (let i = rowIndexes.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [rowIndexes[i], rowIndexes[j]] = [rowIndexes[j], rowIndexes[i]];
        }
        while (rows[r].firstChild) rows[r].removeChild(rows[r].firstChild);
        rowIndexes.forEach(idx => rows[r].appendChild(cells[idx]));
      }
    }
  }
}

    // 3. Change Header Phrase (Alt Table Header)
    const phrases = [
      "Other Stories",
      "Other Reads",
      "Suggested Titles",
      "You Might Enjoy",
      "Explore More",
      "You May Like",
      "Take a Break",
      "Check This Out",
      "Other Books"
    ];

    // Select the specific wrapper div
    const wrapper = document.querySelector(".alt-table-header");
    if (wrapper) {
      const table = wrapper.querySelector("table");
      const firstCell = table?.querySelector("tr:first-child th, tr:first-child td");
      if (firstCell) {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        firstCell.textContent = randomPhrase;
      }
    }
  });
