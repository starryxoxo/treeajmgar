// Book library functionality
  function getBookInfo() {
    const h1Elements = Array.from(document.querySelectorAll("h1"));
    const bookTitleElement = h1Elements.find(h1 => h1.closest("main"));

    if (!bookTitleElement) return null;

    return {
      title: bookTitleElement.textContent.trim(),
      link: window.location.href
    };
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
