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
  const bookTitleElement = Array.from(document.querySelectorAll("h1")).find((h1) => !h1.closest("nav"));
  if (!bookTitleElement) return null;

  return {
    title: bookTitleElement.textContent.trim(),
    link: window.location.href // This should be the correct current link
  };
}

function updateLibraryButton() {
  const book = getBookInfo();
  if (!book) return;
  const button = document.getElementById("library-toggle");
  if (button) {
    button.textContent = isInLibrary(book.link) ? "Remove from Library" : "Add to Library";
  }
}

function toggleLibrary() {
  const book = getBookInfo();
  if (!book) return alert("Book info not found.");

  let library = getLibrary();
  const existingBookIndex = library.findIndex(b => b.link === book.link);
  
  if (existingBookIndex !== -1) {
    library.splice(existingBookIndex, 1); // Remove from library
    alert("Removed from your library.");
  } else {
    library.unshift(book); // Add to library
    alert("Book added to your library!");
  }

  saveLibrary(library);
  updateLibraryButton();
}
</script>
