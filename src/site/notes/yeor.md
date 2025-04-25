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
    const titleEl = [...document.querySelectorAll('h1')].find(h1 => h1.compareDocumentPosition(button) & 2);
    const rawText = document.body.innerText;
    const imageMatch = rawText.match(/!bookimg\|?\d*[^)]+/);

    if (!titleEl || !imageMatch) return null;

    const title = titleEl.textContent.trim();
    const link = window.location.href;
    const imgMD = imageMatch[0];
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
    const exists = lib.findIndex(b => b.link === book.link);

    if (exists !== -1) {
      lib.splice(exists, 1);
      alert('Removed from library');
    } else {
      lib.unshift(book);
      alert('Added to library');
    }

    saveLibrary(lib);
    updateButton(book.link);
    renderLibrary(); // Optional: Live update
  };

  const book = getBookInfo();
  if (book) updateButton(book.link);
  renderLibrary(); // Load existing on page load

  window.renderLibrary = () => {
    const container = document.getElementById('library-display');
    if (!container) return;

    const lib = getLibrary();
    if (!lib.length) {
      container.innerText = 'Your library is empty.';
      return;
    }

    let markdown = '';
    lib.forEach((book, i) => {
      markdown += `${i + 1}\n-\n${book.imgMD}\n-\n${book.wikilink}\n\n`;
    });

    container.innerText = markdown;
  };
});
</script>
