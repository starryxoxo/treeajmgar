// Given: 'button' is the Add to Reading List button element
function findBookTitle(button) {
  // 1. Find the closest table ancestor
  const table = button.closest('table');
  if (!table) return null;

  // 2. Get all rows
  const rows = table.querySelectorAll('tr');
  if (!rows.length) return null;

  // 3. Check for header row (first row)
  const headerRow = rows[0];
  let title = null;

  // Case 1: Single column (header in <th>)
  const th = headerRow.querySelector('th');
  if (th && th.textContent.trim()) {
    title = th.textContent.trim();
  } else {
    // Case 2: Two columns (look in the row with the image)
    for (let row of rows) {
      const cells = row.querySelectorAll('td');
      if (cells.length === 2) {
        // Assume right cell is the title if left cell has an image
        const leftCellHasImage = cells[0].querySelector('img');
        if (leftCellHasImage) {
          title = cells[1].textContent.trim();
          break;
        }
      }
    }
  }

  // Fallback 1: Try first non-empty <td> (if above didn't work)
  if (!title) {
    for (let row of rows) {
      const td = row.querySelector('td');
      if (td && td.textContent.trim()) {
        title = td.textContent.trim();
        break;
      }
    }
  }

  // Fallback 2: Try aria-label or data-title on table
  if (!title) {
    title = table.getAttribute('aria-label') || table.getAttribute('data-title') || null;
  }

  return title;
}