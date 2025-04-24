---
{"dg-publish":true,"permalink":"/library/"}
---

## Library

<div id="library-display"></div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('library-display');
  const library = JSON.parse(localStorage.getItem('bookLibrary') || '[]');

  if (!library.length) {
    container.innerText = 'Your library is empty.';
    return;
  }

  let markdown = '';
  library.forEach((book, index) => {
    markdown += `${index + 1}\n-\n${book.imgMD}\n-\n${book.wikilink}\n\n`;
  });

  container.innerText = markdown;
});
</script>