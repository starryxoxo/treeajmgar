---
{"dg-publish":true,"permalink":"/search/"}
---

<input type="text" id="search" placeholder="Search books...">
<div id="results"></div>

<script>
let books = [];
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

fetch('https://swrn.vercel.app/books.json')
  .then(r => r.json())
  .then(data => {
    books = data;
    searchInput.disabled = false;
  })
  .catch(() => {
    resultsDiv.textContent = "Could not load books.json. Search is unavailable.";
  });

function showResults(query) {
  resultsDiv.innerHTML = '';
  const q = query.trim().toLowerCase();
  const filtered = books.filter(
    b => b.title && b.title.toLowerCase().includes(q)
  );
  if (!filtered.length && q.length > 0) {
    resultsDiv.textContent = "No books found.";
    return;
  }
  filtered.forEach(book => {
    // Create an actual clickable HTML link, not a wikilink
    const a = document.createElement('a');
    a.href = book.url;
    a.textContent = book.title; // Use the title as the link text
    a.target = "_blank";
    a.rel = "noopener";
    resultsDiv.appendChild(a);
    resultsDiv.appendChild(document.createElement('br'));

    // If you want to also display the wikilink syntax as plain text (optional):
    // const wikiSyntax = document.createElement('code');
    // wikiSyntax.textContent = `[[${book.url}|${book.title}]]`;
    // resultsDiv.appendChild(wikiSyntax);
    // resultsDiv.appendChild(document.createElement('br'));
  });
}

searchInput.addEventListener('input', (e) => showResults(e.target.value));
</script>