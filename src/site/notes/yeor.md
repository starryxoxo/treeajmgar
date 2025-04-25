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
  const titleEl = document.querySelector('h1');
  const imgEl = document.querySelector('img[alt^="bookimg"]');

  if (!titleEl || !imgEl) return null;

  const title = titleEl.textContent.trim();
  const link = window.location.href;
  const src = imgEl.getAttribute('src');
  const alt = imgEl.getAttribute('alt') || 'bookimg';
  const imgMD = `![${alt}](${src})`;
  const wikilink = `[[${link}|${title}]]`;

  return { title, link, imgMD, wikilink };
}

function getLibrary() {
  return JSON.parse(localStorage.getItem("bookLibrary") || "[]");
}

function saveLibrary(lib) {
  localStorage.setItem("bookLibrary", JSON.stringify(lib));
}

function isInLibrary(link) {
  return getLibrary().some(book => book.link === link);
}

function updateButton(link) {
  const btn = document.getElementById("library-toggle");
  if (btn) btn.textContent = isInLibrary(link) ? "Remove from Library" : "Add to Library";
}

function toggleLibrary() {
  const book = getBookInfo();
  if (!book) {
    alert("Book info not found.");
    return;
  }

  let lib = getLibrary();
  const exists = isInLibrary(book.link);

  if (exists) {
    lib = lib.filter(b => b.link !== book.link);
    alert("Removed from library");
  } else {
    lib.unshift(book);
    alert("Added to library");
  }

  saveLibrary(lib);
  updateButton(book.link);
  renderLibrary();
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

document.addEventListener("DOMContentLoaded", () => {
  const book = getBookInfo();
  if (book) updateButton(book.link);
  renderLibrary();
});
</script>