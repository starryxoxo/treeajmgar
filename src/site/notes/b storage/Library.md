---
{"dg-publish":true,"permalink":"/b-storage/library/"}
---

## Library

**This feature is experimental and unstable as of now.** It may be deprecated or included in later versions. It may break functionality for this website. Use with caution.

<div id="library-display"></div>

<script>
function renderLibrary() {
  const e = document.getElementById("library-display");
  if (!e) return;

  const library = JSON.parse(localStorage.getItem("bookLibrary") || "[]");
  if (library.length === 0) return void (e.innerText = "No books in your library.");

  let displayContent = "";
  library.forEach((book, index) => {
    // Using the saved link in the library data
    displayContent += `${index + 1}. <a class="internal-link" href="${book.link}" target="_blank">${book.title}</a><br><br>`;
  });

  // Insert the formatted book list into the HTML
  e.innerHTML = displayContent;
}

document.addEventListener("DOMContentLoaded", renderLibrary);
</script>