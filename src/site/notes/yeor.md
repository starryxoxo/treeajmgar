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
  const titleElement = document.querySelector("h1");
  const imageElement = document.querySelector('img[alt="bookimg"]');
  if (!titleElement || !imageElement) return null;

  const title = titleElement.textContent.trim();
  const imageSrc = imageElement.getAttribute("src");
  const imageAlt = imageElement.getAttribute("alt");
  const bookLink = window.location.href;

  return {
    title: title,
    imgMD: `![${imageAlt}](${imageSrc.startsWith("http") ? imageSrc : location.origin + imageSrc})`,
    wikilink: `[[${bookLink}|${title}]]`
  };
}

function getLibrary() {
  return JSON.parse(localStorage.getItem("bookLibrary") || "[]");
}

function saveLibrary(library) {
  localStorage.setItem("bookLibrary", JSON.stringify(library));
}

function isInLibrary(bookLink) {
  return getLibrary().some(book => book.link === bookLink);
}

function updateButton(bookLink) {
  const button = document.getElementById("library-toggle");
  if (button) {
    button.textContent = isInLibrary(bookLink) ? "Remove from Library" : "Add to Library";
  }
}

function toggleLibrary() {
  const bookInfo = getBookInfo();
  if (!bookInfo) return alert("Book info not found.");

  let library = getLibrary();
  if (isInLibrary(bookInfo.link)) {
    library = library.filter(book => book.link !== bookInfo.link);
    alert("Removed from your library.");
  } else {
    library.unshift(bookInfo);
    alert("Book added to your library!");
  }

  saveLibrary(library);
  updateButton(bookInfo.link);
}

document.addEventListener("DOMContentLoaded", () => {
  const bookInfo = getBookInfo();
  if (bookInfo) updateButton(bookInfo.link);
});
</script>