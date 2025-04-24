---
{"dg-publish":true,"permalink":"/yeor/","title":"Your Eyes Only"}
---

This is a testing page.

![bookimg|360](/img/user/yeo/yeostorage/yeocover.webp)

<button id="library-toggle" onclick="toggleLibrary()">Add to Library</button>

###### ENHYPEN AU
# Your Eyes Only


<script>
function getBook() {
  const btn = document.getElementById('library-toggle');
  const h1 = [...document.querySelectorAll('h1')].find(h => h.compareDocumentPosition(btn) & 2);
  const img = document.querySelector('img[alt^="bookimg"]');
  if (!h1 || !img) return null;

  const alt = img.alt;
  const src = img.src.split('/').pop(); // get just the filename
  const imgMD = `![[${src}|${alt.split('|')[1] || '360'}]]`;
  const fullURL = location.href;

  return {
    title: h1.textContent.trim(),
    link: fullURL,
    imgMD
  };
}

function getLibrary() {
  return JSON.parse(localStorage.bookLibrary || '[]');
}

function saveLibrary(lib) {
  localStorage.bookLibrary = JSON.stringify(lib);
}

function updateBtn(link) {
  const btn = document.getElementById('library-toggle');
  if (!btn) return;
  const exists = getLibrary().some(b => b.link === link);
  btn.textContent = exists ? 'Remove from Library' : 'Add to Library';
}

function toggleLibrary() {
  const book = getBook();
  if (!book) return alert('Book info not found.');

  let lib = getLibrary();
  const idx = lib.findIndex(b => b.link === book.link);
  idx > -1 ? lib.splice(idx, 1) : lib.unshift(book);
  saveLibrary(lib);
  updateBtn(book.link);
  alert(idx > -1 ? 'Removed from library' : 'Added to library');
}

document.addEventListener('DOMContentLoaded', () => {
  const book = getBook();
  if (book) updateBtn(book.link);
});
</script>