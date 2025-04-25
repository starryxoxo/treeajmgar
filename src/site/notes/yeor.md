---
{"dg-publish":true,"permalink":"/yeor/","title":"Your Eyes Only"}
---

This is a testing page.

![bookimg|360](/img/user/yeo/yeostorage/yeocover.webp)

<button id="library-toggle" onclick="toggleLibrary()">Add to Library</button>

###### ENHYPEN AU
# Your Eyes Only

<script>
  // Function to fetch book info (title and link), ignoring the first H1 in navbar
  function getBookInfo() {
    const h1Elements = Array.from(document.querySelectorAll("h1"));
    const bookTitleElement = h1Elements.find(h1 => h1.closest("main")); // Look for the first H1 inside <main>

    if (!bookTitleElement) return null;

    return {
      title: bookTitleElement.textContent.trim(),
      link: window.location.href // Get the current URL for the book
    };
  }

  // Function to update the button text based on whether the book is in the library
  function updateLibraryButton() {
    const book = getBookInfo();
    if (!book) return;
    const button = document.getElementById("library-toggle");
    if (button) {
      button.textContent = isInLibrary(book.link) ? "Remove from Library" : "Add to Library";
    }
  }

  // Function to toggle adding/removing book from the library
  function toggleLibrary() {
    const book = getBookInfo();
    if (!book) return alert("Book info not found.");

    let library = getLibrary(); // Fetch the current library
    const existingBookIndex = library.findIndex(b => b.link === book.link);

    if (existingBookIndex !== -1) {
      library.splice(existingBookIndex, 1); // Remove book from library
      alert("Removed from your library.");
    } else {
      library.unshift(book); // Add book to library
      alert("Book added to your library!");
    }
    saveLibrary(library); // Save the updated library
    updateLibraryButton(); // Update the button text
  }

  // Event listener to update the button text once the page has loaded
  document.addEventListener("DOMContentLoaded", () => {
    updateLibraryButton();
  });

  // Helper function to get the library from localStorage (ensure this is implemented somewhere)
  function getLibrary() {
    return JSON.parse(localStorage.getItem("bookLibrary") || "[]");
  }

  // Helper function to save the library to localStorage (ensure this is implemented somewhere)
  function saveLibrary(library) {
    localStorage.setItem("bookLibrary", JSON.stringify(library));
  }

  // Helper function to check if a book is already in the library (ensure this is implemented somewhere)
  function isInLibrary(link) {
    const library = getLibrary();
    return library.some(book => book.link === link);
  }
</script>