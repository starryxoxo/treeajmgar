---
{"dg-publish":true,"permalink":"/library/"}
---

## Library

<div id="library-md"></div>

<script>
function renderVerticalLibrary() {
    const library = JSON.parse(localStorage.getItem('bookLibrary')) || [];
    const container = document.getElementById('library-md');

    if (library.length === 0) {
        container.innerText = 'No books in your library.';
        return;
    }

    // Newest books first
    const rows = library.slice().reverse().map((book, index) => {
        const num = index + 1;
        const img = book.imgMD;
        const wikiLink = `[[${book.link}|${book.title}]]`;

        return `${num}<br>---<br>${img}<br>---<br>${wikiLink}`;
    });

    container.innerHTML = rows.join('<br><br>');
}

renderVerticalLibrary();
</script>
