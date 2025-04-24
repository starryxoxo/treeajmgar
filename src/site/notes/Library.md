---
{"dg-publish":true,"permalink":"/library/"}
---

## Library


<table id="lib-table"></table>

<script>
function renderLibraryTable() {
    const library = JSON.parse(localStorage.getItem('bookLibrary')) || [];
    if (library.length === 0) {
        document.getElementById('lib-table').innerHTML = '<tr><td>No books in your library.</td></tr>';
        return;
    }

    const lastBook = library[library.length - 1];

    const tableHTML = `
        <tr><th>Library</th></tr>
        <tr><td>${lastBook.imgMD}</td></tr>
        <tr><td>[[${lastBook.link}\|${lastBook.title}]]</td></tr>
    `;

    document.getElementById('lib-table').innerHTML = tableHTML;
}

renderLibraryTable();
</script>