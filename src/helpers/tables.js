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
      // 1. Shuffle indexes for columns 1..N (leave 0 fixed)
      const fixedIndex = 0;
      const movableIndexes = [...Array(numCols).keys()].slice(1);

      // Fisher-Yates shuffle on movableIndexes
      for (let i = movableIndexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [movableIndexes[i], movableIndexes[j]] = [movableIndexes[j], movableIndexes[i]];
      }

      // 2. Rebuild the first row: keep cell 0, shuffle the rest
      const firstRowCells = Array.from(rows[0].cells);
      while (rows[0].firstChild) rows[0].removeChild(rows[0].firstChild);
      rows[0].appendChild(firstRowCells[fixedIndex]);
      movableIndexes.forEach(i => rows[0].appendChild(firstRowCells[i]));

      // 3. Rebuild other rows: apply the same movableIndexes (no fixed column)
      for (let r = 1; r < rows.length; r++) {
        const cells = Array.from(rows[r].cells);
        // Collect cells in the shuffled order (including col 0 cell)
        const newOrder = [cells[fixedIndex], ...movableIndexes.map(i => cells[i])];
        while (rows[r].firstChild) rows[r].removeChild(rows[r].firstChild);
        newOrder.forEach(cell => rows[r].appendChild(cell));
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
