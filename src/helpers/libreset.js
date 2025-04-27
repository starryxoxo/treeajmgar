// Function to reset the library (clear all saved books)
  function resetLibrary() {
    if (confirm("This will remove all books from your reading list. Continue?")) {
      localStorage.removeItem("bookLibrary");
      renderLibrary();
    }
  }

document.getElementById("reset-collection").addEventListener("click", resetLibrary);