// list.js

// --- Book Title Extraction ---
function findBookTitle(button) {
  const table = button.closest('table');
  if (!table) return null;

  const rows = table.querySelectorAll('tr');
  if (!rows.length) return null;

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
      if (cells.length === 2 && cells[0].querySelector('img')) {
        title = cells[1].textContent.trim();
        break;
      }
    }
  }

  // Fallback 1: First non-empty <td>
  if (!title) {
    for (let row of rows) {
      const td = row.querySelector('td');
      if (td && td.textContent.trim()) {
        title = td.textContent.trim();
        break;
      }
    }
  }

  // Fallback 2: aria-label or data-title on table
  if (!title) {
    title = table.getAttribute('aria-label') || table.getAttribute('data-title') || null;
  }

  return title;
}

// --- Local Storage Helpers ---
function getLibrary() {
  return JSON.parse(localStorage.getItem("bookLibrary") || "[]");
}

function saveLibrary(library) {
  localStorage.setItem("bookLibrary", JSON.stringify(library));
}

function isInLibrary(link) {
  const library = getLibrary();
  return library.some(book => book.link === link);
}

// --- Main Logic ---
function getBookInfoFromButton(button) {
  return {
    title: findBookTitle(button),
    link: window.location.href
  };
}

function updateLibraryButton(button) {
  const book = getBookInfoFromButton(button);
  if (!book || !book.title) return;
  button.textContent = isInLibrary(book.link)
    ? "Remove from Reading List"
    : "Add to Reading List";
}

function toggleLibrary(button) {
  const book = getBookInfoFromButton(button);
  if (!book || !book.title) return;
  let library = getLibrary();
  const index = library.findIndex(b => b.link === book.link);

  if (index !== -1) {
    library.splice(index, 1);
  } else {
    library.unshift(book);
  }
  saveLibrary(library);
  updateLibraryButton(button);
}

// --- Event Listener Registration ---
document.addEventListener("DOMContentLoaded", function() {
  var btn = document.getElementById("library-toggle");
  if (btn) {
    updateLibraryButton(btn);
    btn.addEventListener("click", function() {
      toggleLibrary(this);
    });
  }
});