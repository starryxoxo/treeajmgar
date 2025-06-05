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
      // For the first row, fix the first column
      const fixedCellFirstRow = rows[0].cells[0];
      const movableIndexesFirstRow = [...Array(numCols).keys()].slice(1);

      // Shuffle indexes for the first row (except the first column)
      for (let i = movableIndexesFirstRow.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [movableIndexesFirstRow[i], movableIndexesFirstRow[j]] = [movableIndexesFirstRow[j], movableIndexesFirstRow[i]];
      }

      // Rebuild the first row
      const firstRowCells = Array.from(rows[0].cells);
      while (rows[0].firstChild) rows[0].removeChild(rows[0].firstChild);
      rows[0].appendChild(fixedCellFirstRow);
      movableIndexesFirstRow.forEach(i => rows[0].appendChild(firstRowCells[i]));

      // For subsequent rows, shuffle columns 1..N in the same order as first row
      for (let r = 1; r < rows.length; r++) {
        const cells = Array.from(rows[r].cells);
        const fixedCell = cells[0];
        const shuffledCells = movableIndexesFirstRow.map(i => cells[i]);
        while (rows[r].firstChild) rows[r].removeChild(rows[r].firstChild);
        rows[r].appendChild(fixedCell);
        shuffledCells.forEach(cell => rows[r].appendChild(cell));
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
