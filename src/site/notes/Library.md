---
{"dg-publish":true,"permalink":"/library/"}
---

## Library

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