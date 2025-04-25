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

  let table = "";
  lib.forEach((book, i) => {
    table += `| | |\n|-|-|\n| **Cover** | ${book.imgMD} |\n| **Title** | ${book.wikilink} |\n\n`;
  });
  display.innerText = table;
}

document.addEventListener("DOMContentLoaded", renderLibrary);
</script>
