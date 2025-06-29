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
  const TABLE_SIZE = 4; // 4 columns per table

  for (let i = 0; i < library.length; i += TABLE_SIZE) {
    const booksChunk = library.slice(i, i + TABLE_SIZE);
    displayContent += `<table style="margin: 0px; border-spacing: 0px;"><tbody>`;

    // Row 1: Covers (images)
    displayContent += `<tr>`;
    for (let j = 0; j < TABLE_SIZE; j++) {
      const book = booksChunk[j];
      displayContent += `<td style="text-align:center; width: 190px; height: 190px;">${
        book && book.cover
          ? `<img src="${book.cover}" alt="cover" style="max-width:175px; max-height:175px; border-radius: 0px; box-shadow: 0 2px 4px rgba(0,0,0,0.13); background: #eee;" />`
          : ""
      }</td>`;
    }
    displayContent += `</tr>`;

    // Row 2: Titles
    displayContent += `<tr>`;
    for (let j = 0; j < TABLE_SIZE; j++) {
      const book = booksChunk[j];
      displayContent += `<td style="text-align:center; vertical-align:top; height: 40px;">${
        book
          ? `<a class="internal-link" href="${book.link}" target="_blank" style="font-weight:bold; font-size: 1.05em;">${book.title}</a>`
          : ""
      }</td>`;
    }
    displayContent += `</tr>`;

    displayContent += `</tbody></table>`;
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
document.getElementById("reset-collection").addEventListener("click", resetLibrary);

// Wait for the DOM to load, then render the library
document.addEventListener("DOMContentLoaded", renderLibrary);
