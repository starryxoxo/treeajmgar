// Book library functionality

function getBookInfo() {
  // 1. Try to find a table header <th> that looks like a title
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

  // 2. Fallback: look for first <h1>
  const h1 = document.querySelector('h1');
  if (h1 && h1.textContent.trim()) {
    return {
      title: h1.textContent.trim(),
      link: window.location.href
    };
  }

  // 3. Fallback: previous logic (e.g. after the reading list button)
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

  // 4. Fallback: document title
  if (document.title) {
    return {
      title: document.title,
      link: window.location.href
    };
  }

  // 5. Not found
  return null;
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

document.addEventListener("DOMContentLoaded", () => {
  updateLibraryButton();
});

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