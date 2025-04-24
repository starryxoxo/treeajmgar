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
  return {
    title: h1.textContent.trim(),
    link: location.href,
    imgMD: `![[${img.alt}]]`
  };
}

function updateBtn(link) {
  const btn = document.getElementById('library-toggle');
  if (btn) btn.textContent = (JSON.parse(localStorage.bookLibrary || '[]').some(b => b.link === link) ? 'Remove from Library' : 'Add to Library');
}

function toggleLibrary() {
  const book = getBook();
  if (!book) return alert('Book info not found.');
  let lib = JSON.parse(localStorage.bookLibrary || '[]');
  const i = lib.findIndex(b => b.link === book.link);
  i > -1 ? lib.splice(i, 1) : lib.unshift(book);
  localStorage.bookLibrary = JSON.stringify(lib);
  updateBtn(book.link);
  alert(i > -1 ? 'Removed' : 'Added');
}

document.addEventListener('DOMContentLoaded', () => {
  const book = getBook();
  if (book) updateBtn(book.link);
});
</script>
