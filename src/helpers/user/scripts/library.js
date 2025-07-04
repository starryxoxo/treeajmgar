// library.js

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
  const existingBookIndex = library.findIndex(b => b.link === book.link);

  if (existingBookIndex !== -1) {
    library.splice(existingBookIndex, 1);
  } else {
    library.unshift(book);
  }
  saveLibrary(library);
  updateLibraryButton(button);
}

// Function to render the library as a set of tables (2 columns, 2 rows: covers, then titles)
function renderLibrary() {
  const e = document.getElementById("library-display");
  if (!e) return;

  const library = getLibrary();
  if (library.length === 0) {
    e.innerText = "No books in your reading list just yet.";
    return;
  }

  let displayContent = "";
  const TABLE_SIZE = 2; // 2 columns per table

  for (let i = 0; i < library.length; i += TABLE_SIZE) {
    const booksChunk = library.slice(i, i + TABLE_SIZE);
    displayContent += `<table style="margin: 0 0 30px 0; border-spacing: 0; border: none;">`; 
    // Bottom margin 30px to separate tables (row 2 and next row 1)

    // Row: Covers
    displayContent += `<tr style="margin: 0; padding: 0;">`;
    for (let j = 0; j < TABLE_SIZE; j++) {
      const book = booksChunk[j];
      displayContent += `<td style="text-align:center; width: 190px; border: none; height: 190px; padding: 0;">${
        book && book.cover
          ? `<img src="${book.cover}" alt="cover" style="max-width:220px; max-height:220px; border-radius: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.13); background: #eee;" />`
          : ""
      }</td>`;
    }
    displayContent += `</tr>`;

    // Row 2: Titles (closer to row 1)
    displayContent += `<tr style="margin: 0; padding: 0;">`;
    for (let j = 0; j < TABLE_SIZE; j++) {
      const book = booksChunk[j];
      displayContent += `<td style="text-align:center; vertical-align:top; border: none; height: 30px; padding-top: 4px;">${
        book
          ? `<a class="internal-link" href="${book.link}" style="font-weight:bold; font-size: 1.05em;">${book.title}</a>`
          : ""
      }</td>`;
    }
    displayContent += `</tr>`;

    displayContent += `</table>`;
  }

  e.innerHTML = displayContent;
}

// Function to reset the library (clear all saved books)
function resetLibrary() {
  if (confirm("This will remove all books from your reading list. Continue?")) {
    localStorage.removeItem("bookLibrary");
    renderLibrary();
  }
}

// Attach event listener for reset button
const resetBtn = document.getElementById("reset-collection");
if (resetBtn) {
  resetBtn.addEventListener("click", resetLibrary);
}

// Wait for the DOM to load, then render the library
document.addEventListener("DOMContentLoaded", renderLibrary);

// Note: You need to define getBookInfoFromButton(button) elsewhere
// It should extract {title, link, cover} info from the button's context
