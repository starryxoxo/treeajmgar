  // Function to render the library
  function renderLibrary() {
    const e = document.getElementById("library-display");
    if (!e) return;

    const library = JSON.parse(localStorage.getItem("bookLibrary") || "[]");
    if (library.length === 0) return void (e.innerText = "No books in your reading list just yet.");

    let displayContent = "";
    library.forEach((book, index) => {
      // Using the saved link in the library data
      displayContent += `${index + 1}. <a class="internal-link" href="${book.link}" target="_blank">${book.title}</a><br><br>`;
    });

    // Insert the formatted book list into the HTML
    e.innerHTML = displayContent;
  }

  // Function to reset the library (clear all saved books)
  function resetLibrary() {
    if (confirm("This will remove all books from your reading list. Continue?")) {
      localStorage.removeItem("bookLibrary");
      renderLibrary(); // Re-render the library after resetting
    }
  }

  // Event listener to reset the library when the reset button is clicked
  document.getElementById("reset-collection").addEventListener("click", resetLibrary);

  // Wait for the DOM to load, then render the library
  document.addEventListener("DOMContentLoaded", renderLibrary);
