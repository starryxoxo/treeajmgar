---
{"dg-publish":true,"permalink":"/yeor/"}
---

This is a testing page.

![bookimg|360](/img/user/yeo/yeostorage/yeocover.webp)

###### ENHYPEN AU
<h1> Your Eyes Only </h1>


<button onclick="addBookToLibrary()">Add to Library</button>
<script>
function addBookToLibrary() {
    const titleEl = document.querySelector('h1, h1#user-content');
    const imgEl = document.querySelector('img[alt^="bookimg"]');

    if (!titleEl || !imgEl) {
        alert('Could not find title or book image.');
        return;
    }

    const title = titleEl.textContent.trim();
    const link = window.location.pathname.replace(/^\/+/, ''); // e.g., "yeo/yeo"
    const imgMD = imgEl.outerHTML.match(/!.*[^)]+/)?.[0] || imgEl.outerHTML;

    const book = { title, link, imgMD };

    let library = JSON.parse(localStorage.getItem('bookLibrary')) || [];
    library = library.filter(b => b.link !== book.link); // Remove if exists
    library.push(book); // Save latest last
    localStorage.setItem('bookLibrary', JSON.stringify(library));

    alert('Book added to your library!');
}
</script>