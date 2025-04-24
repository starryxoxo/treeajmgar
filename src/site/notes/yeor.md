---
{"dg-publish":true,"permalink":"/yeor/"}
---

This is a testing page.

![alt=bookimg|360](/img/user/yeo/yeostorage/yeocover.webp)

###### ENHYPEN AU
<h1> Your Eyes Only </h1>


<button onclick="addCurrentBookToLibrary()">Add to Library</button>

<script>
function addCurrentBookToLibrary() {
    const titleEl = document.querySelector('h1');
    const imgEl = document.querySelector('img[alt="bookimg"]');

    if (!titleEl || !imgEl) {
        alert('Book title or image not found.');
        return;
    }

    const book = {
        title: titleEl.textContent.trim(),
        link: window.location.href,
        imgSrc: imgEl.src,
        imgAlt: imgEl.alt || 'Book Cover'
    };

    let library = JSON.parse(localStorage.getItem('bookLibrary')) || [];

    if (!library.some(b => b.link === book.link)) {
        library.push(book);
        localStorage.setItem('bookLibrary', JSON.stringify(library));
        alert('Book added to your library!');
    } else {
        alert('This book is already in your library.');
    }
}
</script>