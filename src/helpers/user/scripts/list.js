function getBookInfo() {
  // 1. Try to find a table header <th> (vertical layout)
  const ths = document.querySelectorAll('table th');
  if (ths.length > 0) {
    for (const th of ths) {
      // Prefer centered, colspan, or first row/column
      const style = th.getAttribute('style') || '';
      const colspan = th.getAttribute('colspan');
      if (
        style.includes('center') ||
        colspan ||
        th.cellIndex === 0 ||
        th.parentElement.rowIndex === 0
      ) {
        const text = th.textContent.trim();
        if (text.length > 0) return {
          title: text,
          link: window.location.href
        };
      }
    }
    // Fallback: just first <th>
    const fallbackTh = ths[0].textContent.trim();
    if (fallbackTh) return {
      title: fallbackTh,
      link: window.location.href
    };
  }

  // 2. Horizontal table: If table has image in first cell, title in the next row or cell
  const tables = document.querySelectorAll('table');
  for (const table of tables) {
    const rows = table.querySelectorAll('tr');
    for (let i = 0; i < rows.length; ++i) {
      const cells = rows[i].querySelectorAll('td');
      if (cells.length > 0 && cells[0].querySelector('img')) {
        // Horizontal format: try next row (if exists) for the title
        if (rows[i + 1]) {
          const possibleTitle = rows[i + 1].textContent.trim();
          if (possibleTitle) return {
            title: possibleTitle,
            link: window.location.href
          };
        }
        // Or, if 2 columns: right cell might be the title
        if (cells.length > 1 && cells[1].textContent.trim()) {
          return {
            title: cells[1].textContent.trim(),
            link: window.location.href
          };
        }
      }
    }
  }

  // 3. Fallback: original H1 method (classic layout)
  const h1 = document.querySelector('h1');
  if (h1 && h1.textContent.trim()) {
    return {
      title: h1.textContent.trim(),
      link: window.location.href
    };
  }

  // 4. Fallback: look after the reading list button (legacy)
  const libraryBtn = document.getElementById('library-toggle');
  if (libraryBtn) {
    let next = libraryBtn.nextElementSibling;
    while (next) {
      if (
        next.tagName === 'H1' ||
        next.classList.contains('page-title') ||
        (next.className && next.className.includes('title'))
      ) {
        return {
          title: next.textContent.trim(),
          link: window.location.href
        };
      }
      next = next.nextElementSibling;
    }
  }

  // 5. Fallback: document title
  if (document.title) {
    return {
      title: document.title,
      link: window.location.href
    };
  }

  // 6. Not found
  return null;
}