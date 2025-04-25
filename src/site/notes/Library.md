---
{"dg-publish":true,"permalink":"/library/"}
---

## Library

<div id="library-display"></div>

<script>
function getLibrary() {
  return JSON.parse(localStorage.getItem("bookLibrary") || "[]");
}

function renderLibrary() {
  const display = document.getElementById("library-display");
  if (!display) return;

  const lib = getLibrary();
  if (!lib.length) {
    display.innerText = "No books in your library.";
    return;
  }

  let result = "";
  lib.forEach((book, index) => {
    result += `${index + 1}\n---\n${book.imgMD}\n---\n[[${book.title}]](${book.link})\n\n`;
  });

  display.innerText = result;
}

document.addEventListener("DOMContentLoaded", renderLibrary);
</script>
