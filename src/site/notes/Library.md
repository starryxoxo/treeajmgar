---
{"dg-publish":true,"permalink":"/library/"}
---

## Library

<div id="library-display"></div>

<script>
function renderLibrary() {
  const container = document.getElementById("library-display");
  if (!container) return;

  const library = JSON.parse(localStorage.getItem("bookLibrary") || "[]");
  if (library.length === 0) {
    container.innerHTML = "No books in your library.";
    return;
  }

  let output = "";
  library.forEach((book, index) => {
    output += `${index + 1}\n---\n${book.imgMD}\n---\n[[${book.link}|${book.title}]]\n\n`;
  });

  container.innerHTML = output;
}

document.addEventListener("DOMContentLoaded", renderLibrary);
</script>