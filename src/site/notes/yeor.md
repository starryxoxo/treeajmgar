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
  function getBookInfo() {
    const button = document.getElementById('library-toggle');
    const h1 = [...document.querySelectorAll('h1')]
      .find(h => h.compareDocumentPosition(button) & 2); // H1 comes after button

    const imgMatch = document.body.innerText.match(/!bookimg\|?.*?[^)]+/);

    if (!h1 || !imgMatch) return null;

    const title = h1.textContent.trim();
    const link = window.location.href;
    const imgMD = imgMatch[0];
    const wikilink = `[[${link}|${title}]]`;

    return { title, link, imgMD, wikilink };
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

  window.toggleLibrary = () => {
    const book = getBookInfo();
    if (!book) return alert('Book info not found.');

    let lib = getLibrary();
    const index = lib.findIndex(b => b.link === book.link);

    if (index !== -1) {
      lib.splice(index, 1);
      alert('Removed from library');
    } else {
      lib.unshift(book); // new book goes to top
      alert('Added to library');
    }

    saveLibrary(lib);
    updateButton(book.link);
    renderLibrary();
  };

  window.renderLibrary = () => {
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
  };

  const book = getBookInfo();
  if (book) updateButton(book.link);
  renderLibrary();
});
</script>
