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
  const imgMatch = document.body.innerText.match(/!bookimg\|?.*?[^)]+/);

  if (!titleEl || !imgMatch) return null;

  return {
    title: titleEl.textContent.trim(),
    link: window.location.href,
    imgMD: imgMatch[0],
    wikilink: `[[${window.location.href}|${titleEl.textContent.trim()}]]`
  };
}

function getLibrary() {
  return JSON.parse(localStorage.getItem('bookLibrary') || '[]');
}

function saveLibrary(lib) {
  localStorage.setItem('bookLibrary', JSON.stringify(lib));
}

function isInLibrary(link) {
  return getLibrary().some(b => b.link === link);
}

function updateButton(link) {
  const btn = document.getElementById('library-toggle');
  if (btn) btn.textContent = isInLibrary(link) ? 'Remove from Library' : 'Add to Library';
}

function toggleLibrary() {
  const book = getBookInfo();
  if (!book) return alert('Book info not found.');

  let lib = getLibrary();
  const exists = lib.some(b => b.link === book.link);

  if (exists) {
    lib = lib.filter(b => b.link !== book.link);
    alert('Removed from library');
  } else {
    lib.unshift(book);
    alert('Added to library');
  }

  saveLibrary(lib);
  updateButton(book.link);
  renderLibrary();
}

function renderLibrary() {
  const container = document.getElementById('library-display');
  if (!container) return;

  const lib = getLibrary();
  if (!lib.length) {
    container.innerText = 'No books in your library.';
    return;
  }

  let md = '';
  lib.forEach((book, i) => {
    md += `${i + 1}\n-\n${book.imgMD}\n-\n${book.wikilink}\n\n`;
  });

  container.innerText = md;
}

document.addEventListener('DOMContentLoaded', () => {
  const book = getBookInfo();
  if (book) updateButton(book.link);
  renderLibrary();
});
</script>
