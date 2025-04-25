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
    container.innerText = "No books in your library.";
    return;
  }

  let output = "";
  library.forEach((book, index) => {
    output += `<p>${index + 1}</p><hr>${book.imgMD}<hr><p>[[${book.title}]](${book.link})</p><br>`;
  });

  container.innerHTML = output;
}

document.addEventListener("DOMContentLoaded", renderLibrary);
</script>