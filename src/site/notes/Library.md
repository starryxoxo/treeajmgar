---
{"dg-publish":true,"permalink":"/library/"}
---

## Library

<pre id="library-md"></pre>

<script>
function renderVerticalLibrary() {
    const library = JSON.parse(localStorage.getItem('bookLibrary')) || [];

    if (library.length === 0) {
        document.getElementById('library-md').textContent = 'No books in your library.';
        return;
    }

    const rows = library.slice().reverse().map((book, index) => {
        const num = index + 1;
        const cover = book.imgMD;
        const link = `[[${book.link}|${book.title}]]`;

        return `${num}\n---\n${cover}\n---\n${link}`;
    });

    document.getElementById('library-md').textContent = rows.join('\n\n');
}

renderVerticalLibrary();
</script>
