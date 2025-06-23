function getBookInfo() {
  // 1. Vertical layout (table header)
  const ths = document.querySelectorAll('table th');
  if (ths.length > 0) {
    for (const th of ths) {
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
    const fallbackTh = ths[0].textContent.trim();
    if (fallbackTh) return {
      title: fallbackTh,
      link: window.location.href
    };
  }
  // 2. Horizontal table: image in first cell
  const tables = document.querySelectorAll('table');
 ++i) {
      const cells = rows[i].querySelectorAll('td');
      if (cells.length > 0 && cells[0].querySelector('img')) {
        if (rows[i + 1]) {
          const possibleTitle = rows[i + 1].textContent.trim();
          if (possibleTitle) return {
            title: possibleTitle,
            link: window.location.href
          };
        }
        if (cells.length > 1 && cells[1].textContent.trim()) {
          return {
            title: cells[1].textContent.trim(),
            link: window.location.href
          };
        }
      }
    }
  }
  // 3. Original layout (H1)
  const h1 = document.querySelector('h1');
  if (h1 && h1.textContent.trim()) {
    return {
      title: h1.textContent.trim(),
      link: window.location.href
    };
  }
  // 4. Fallback: after the reading list button
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
  // 5. Fallback: document.title
  if (document.title) {
    return {
      title: document.title,
      link: window.location.href
    };
  }
  // 6. Not found
  return null;
}

// --- MINIMAL NEEDED LIBRARY FUNCTIONALITY FOR COMPATIBILITY ---

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

function updateLibraryButton() {
  const book = getBookInfo();
  if (!book) return;
  const button = document.getElementById("library-toggle");
  if (button) {
    button.textContent = isInLibrary(book.link) ? "Remove from Reading List" : "Add to Reading List";
  }
}

function toggleLibrary() {
  const book = getBookInfo();
  if (!book) return;
  let library = getLibrary();
  const existingBookIndex = library.findIndex(b => b.link === book.link);

  if (existingBookIndex !== -1) {
    library.splice(existingBookIndex, 1);
  } else {
    library.unshift(book);
  }
  saveLibrary(library);
  updateLibraryButton();
}

document.addEventListener("DOMContentLoaded", updateLibraryButton);