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
    
    // Match literal image markdown from innerText
    const mdSource = document.body.innerText;
    const imgMatch = mdSource.match(/!bookimg\|?\d*[^)]+/); // e.g. ![bookimg|360](file.webp)

    if (!h1 || !imgMatch) {
      alert('Missing title or image markdown.');
      return null;
    }

    const title = h1.textContent.trim();
    const fullLink = window.location.href;
    const imgMD = imgMatch[0];
    const wikilink = `[[${fullLink}|${title}]]`;

    return { title, link: fullLink, imgMD, wikilink };
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