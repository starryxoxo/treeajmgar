---
{"dg-publish":true,"permalink":"/search/"}
---

<input type="text" id="search" placeholder="Search books...">
<table id="results"></table>

<script>
let books = [];
const searchInput = document.getElementById('search');
const resultsTable = document.getElementById('results');

fetch('https://swrn.vercel.app/books.json')
  .then(r => r.json())
  .then(data => {
    books = data;
    searchInput.disabled = false;
  })
  .catch(() => {
    resultsTable.innerHTML = "<tr><td>Could not load books.json. Search is unavailable.</td></tr>";
  });

function showResults(query) {
  resultsTable.innerHTML = '';
  const q = query.trim().toLowerCase();
  const filtered = books.filter(
    b => b.title && b.title.toLowerCase().includes(q)
  );
  if (!filtered.length && q.length > 0) {
    resultsTable.innerHTML = "<tr><td>No books found.</td></tr>";
    return;
  }
  filtered.forEach(book => {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    const a = document.createElement('a');
    a.href = book.url;
    a.textContent = book.title;
    // No a.target or a.rel here — opens in same tab
    cell.appendChild(a);
    row.appendChild(cell);
    resultsTable.appendChild(row);
  });
}

searchInput.addEventListener('input', (e) => showResults(e.target.value));
</script>