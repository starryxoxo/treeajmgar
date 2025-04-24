---
{"dg-publish":true,"permalink":"/library/"}
---

## Library

<script>
function renderLibraryMarkdown() {
    const library = JSON.parse(localStorage.getItem('bookLibrary')) || [];
    const container = document.getElementById('library-md');

    if (library.length === 0) {
        container.textContent = 'Your library is empty.';
        return;
    }

    const md = library.map(book => {
        return `![${book.imgAlt}](${book.imgSrc})\n\n[${book.title}](${book.link})\n`;
    }).join('\n---\n\n');

    container.textContent = md;
}

renderLibraryMarkdown();
</script>