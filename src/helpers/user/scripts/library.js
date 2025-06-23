// library.js

function getBookInfoFromButton(button) {
  const title = findBookTitle(button);
  return {
    title,
    link: window.location.href
  };
}

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

// Function to render the library
function renderLibrary() {
  const e = document.getElementById("library-display");
  if (!e) return;

  const library = getLibrary();
  if (library.length === 0) {
    e.innerText = "No books in your reading list just yet.";
    return;
  }

  let displayContent = "";
  library.forEach((book, index) => {
    displayContent += `${index + 1}. <a class="internal-link" href="${book.link}" target="_blank">${book.title}</a><br><br>`;
  });

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