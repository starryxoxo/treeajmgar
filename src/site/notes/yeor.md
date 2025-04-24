---
{"dg-publish":true,"permalink":"/yeor/","title":"Your Eyes Only"}
---

This is a testing page.

![bookimg|360](/img/user/yeo/yeostorage/yeocover.webp)

<button id="library-toggle" onclick="toggleLibrary()">Add to Library</button>

###### ENHYPEN AU
# Your Eyes Only

<script>
function getCurrentBookInfo() {
    const button = document.getElementById('library-toggle');
    const allH1s = Array.from(document.querySelectorAll('h1'));

    const titleEl = allH1s.find(h1 => h1.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_PRECEDING);
    const imgEl = document.querySelector('img[alt^="bookimg"]');

    if (!titleEl || !imgEl) return null;

    return {
        title: titleEl.textContent.trim(),
        fullUrl: window.location.href,
        link: decodeURIComponent(window.location.pathname.replace(/^\/+/, '')),
        imgHTML: imgEl.outerHTML,
    };
}

function isBookInLibrary(link) {
    const library = JSON.parse(localStorage.getItem('bookLibrary')) || [];
    return library.some(book => book.link === link);
}

function toggleLibrary() {
    const book = getCurrentBookInfo();
    if (!book) {
        alert('Book info not found.');
        return;
    }

    let library = JSON.parse(localStorage.getItem('bookLibrary')) || [];
    const exists = library.some(b => b.link === book.link);

    if (exists) {
        library = library.filter(b => b.link !== book.link);
        alert('Removed from your library.');
    } else {
        library.push(book);
        alert('Book added to your library!');
    }

    localStorage.setItem('bookLibrary', JSON.stringify(library));
    updateLibraryButton(book.link);
    renderVerticalLibrary();
}

function updateLibraryButton(link) {
    const btn = document.getElementById('library-toggle');
    if (!btn) return;
    const saved = isBookInLibrary(link);
    btn.textContent = saved ? 'Remove from Library' : 'Add to Library';
}

function renderVerticalLibrary() {
    const library = JSON.parse(localStorage.getItem('bookLibrary')) || [];
    const container = document.getElementById('library-md');
    if (!container) return;

    if (library.length === 0) {
        container.innerHTML = '<p>No books in your library.</p>';
        return;
    }

    let html = `<table>
        <thead><tr><th>#</th><th>Cover</th><th>Title</th></tr></thead>
        <tbody>`;

    library.slice().reverse().forEach((book, index) => {
        const num = index + 1;
        const img = book.imgHTML;
        const link = `[[${book.link}|${book.title}]]`; // still looks like a wikilink

        html += `<tr>
            <td>${num}</td>
            <td>${img}</td>
            <td>${link}</td>
        </tr>`;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    const book = getCurrentBookInfo();
    if (book) updateLibraryButton(book.link);
    renderVerticalLibrary();
});
</script>