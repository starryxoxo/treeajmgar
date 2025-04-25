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
  const titleEl = Array.from(document.querySelectorAll("h1")).find(
    h => h.id && h.textContent.trim() !== "the sworn library"
  );
  const imgEl = document.querySelector('img[alt^="bookimg"]');
  if (!titleEl || !imgEl) return null;

  const title = titleEl.textContent.trim();
  const link = window.location.href;

  const altText = imgEl.getAttribute("alt");
  const imgPath = imgEl.getAttribute("src");
  const imgURL = imgPath.startsWith("http") ? imgPath : `${location.origin}${imgPath}`;
  const imgMD = `![${altText}](${imgURL})`;

  const wikilink = `[[${link}|${title}]]`;

  return { title, link, imgMD, wikilink };
}

function getLibrary() {
  return JSON.parse(localStorage.getItem("bookLibrary") || "[]");
}

function saveLibrary(library) {
  localStorage.setItem("bookLibrary", JSON.stringify(library));
}

function isInLibrary(link) {
  return getLibrary().some(book => book.link === link);
}

function updateButton(link) {
  const btn = document.getElementById("library-toggle");
  if (btn) {
    btn.textContent = isInLibrary(link) ? "Remove from Library" : "Add to Library";
  }
}

function toggleLibrary() {
  const book = getBookInfo();
  if (!book) return alert("Book info not found.");

  let library = getLibrary();
  const exists = library.find(b => b.link === book.link);

  if (exists) {
    library = library.filter(b => b.link !== book.link);
    alert("Removed from your library.");
  } else {
    library.unshift(book);
    alert("Book added to your library!");
  }

  saveLibrary(library);
  updateButton(book.link);
}

document.addEventListener("DOMContentLoaded", () => {
  const book = getBookInfo();
  if (book) updateButton(book.link);
});
</script>