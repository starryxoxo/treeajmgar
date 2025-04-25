---
{"dg-publish":true,"permalink":"/yeor/","title":"Your Eyes Only"}
---

This is a testing page.

![bookimg|360](/img/user/yeo/yeostorage/yeocover.webp)

<button id="library-toggle" onclick="toggleLibrary()">Add to Library</button>

###### ENHYPEN AU
# Your Eyes Only

<script>
function getBookInfo() {
  // Find the first H1 that isn't part of the navbar
  const bookTitle = Array.from(document.querySelectorAll("h1"))
    .find(h1 => !h1.closest('nav')); // Exclude navbar H1

  if (!bookTitle) return null;

  // Get the title and current link of the book
  const title = bookTitle.textContent.trim();
  const link = window.location.href;

  return { title, link };
}

function updateLibraryButton() {
  const bookInfo = getBookInfo();
  if (!bookInfo) return;

  const button = document.getElementById("library-toggle");
  if (!button) return;

  button.textContent = isInLibrary(bookInfo.link) ? "Remove from Library" : "Add to Library";
}

function toggleLibrary() {
  const bookInfo = getBookInfo();
  if (!bookInfo) return alert("Book info not found.");

  let library = getLibrary();
  const existingBook = library.find(book => book.link === bookInfo.link);

  if (existingBook) {
    // Remove book from library
    library = library.filter(book => book.link !== bookInfo.link);
    alert("Removed from your library.");
  } else {
    // Add book to library
    library.unshift(bookInfo);
    alert("Book added to your library!");
  }

  saveLibrary(library);
  updateLibraryButton();
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

// Initialize button state on page load
document.addEventListener("DOMContentLoaded", () => {
  updateLibraryButton();
});
</script>