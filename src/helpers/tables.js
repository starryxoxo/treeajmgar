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
      // Create array of column indexes except 0
      const colIndexes = [...Array(numCols).keys()].slice(1);

      // Shuffle colIndexes
      for (let i = colIndexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colIndexes[i], colIndexes[j]] = [colIndexes[j], colIndexes[i]];
      }

      // For first row: always keep cell 0, then append shuffled cells
      const firstRowCells = Array.from(rows[0].cells);
      while (rows[0].firstChild) rows[0].removeChild(rows[0].firstChild);
      rows[0].appendChild(firstRowCells[0]);
      colIndexes.forEach(i => rows[0].appendChild(firstRowCells[i]));

      // For other rows: shuffle ALL columns (including col 0)
      for (let r = 1; r < rows.length; r++) {
        const cells = Array.from(rows[r].cells);
        // Create an array of shuffled indexes for this row (including 0)
        const allIndexes = [0, ...colIndexes];
        // Shuffle the indexes for this row
        for (let i = allIndexes.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [allIndexes[i], allIndexes[j]] = [allIndexes[j], allIndexes[i]];
        }
        // Rebuild the row with the shuffled cells
        while (rows[r].firstChild) rows[r].removeChild(rows[r].firstChild);
        allIndexes.forEach(idx => rows[r].appendChild(cells[idx]));
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
