  function saveLibrary(library) {
    localStorage.setItem("bookLibrary", JSON.stringify(library));
  }

  function isInLibrary(link) {
    const library = getLibrary();
    return library.some(book => book.link === link);
  }