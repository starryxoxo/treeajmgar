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
    // Grab the title from the frontmatter (search for 'title' in the page)
    const titleEl = document.querySelector('meta[name="title"]')?.getAttribute('content');
    
    // If there's no title, return null
    if (!titleEl) return null;

    // Grab the book's image
    const imgEl = document.querySelector('img[alt^="bookimg"]');

    if (!imgEl) return null;

    return {
        title: titleEl.trim(),
        link: window.location.pathname.replace(/^\/+/, ''), // e.g. "yeo/yeo"
        imgMD: imgEl.outerHTML.match(/!.*[^)]+/)?.[0] || imgEl.outerHTML,
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
}

function updateLibraryButton(link) {
    const btn = document.getElementById('library-toggle');
    if (!btn) return;
    const saved = isBookInLibrary(link);
    btn.textContent = saved ? 'Remove from Library' : 'Add to Library';
}

document.addEventListener('DOMContentLoaded', () => {
    const book = getCurrentBookInfo();
    if (book) updateLibraryButton(book.link);
});
</script>