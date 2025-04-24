---
{"dg-publish":true,"permalink":"/yeor/","title":"Your Eyes Only"}
---

This is a testing page.

![bookimg|360](/img/user/yeo/yeostorage/yeocover.webp)

<button id="library-toggle" onclick="toggleLibrary()">Add to Library</button>

###### ENHYPEN AU
# Your Eyes Only

<script>
document.addEventListener('DOMContentLoaded', () => {
  function getBook() {
    const btn = document.getElementById('library-toggle');
    const h1 = [...document.querySelectorAll('h1')].find(h => h.compareDocumentPosition(btn) & 2);
    const img = document.querySelector('img[alt^="bookimg"]');

    if (!h1 || !img) {
      alert('Missing title or image.');
      return null;
    }

    const altText = img.alt.split('|')[0] || 'cover';
    const imgMD = `![${altText}](${img.src})`;  // Standard Markdown format

    return {
      title: h1.textContent.trim(),
      link: window.location.href,               // Full page URL
      imgMD: imgMD
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
    const exists = getLibrary().some(b => b.link === link);
    btn.textContent = exists ? 'Remove from Library' : 'Add to Library';
  }

  function toggleLibrary() {
    const book = getBook();
    if (!book) return;

    let lib = getLibrary();
    const index = lib.findIndex(b => b.link === book.link);
    if (index !== -1) {
      lib.splice(index, 1);
      alert('Removed from library');
    } else {
      lib.unshift(book);
      alert('Added to library');
    }

    saveLibrary(lib);
    updateBtn(book.link);
  }

  const book = getBook();
  if (book) updateBtn(book.link);
  window.toggleLibrary = toggleLibrary;
});
</script>
