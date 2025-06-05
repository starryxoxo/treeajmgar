---
{"dg-publish":true,"permalink":"/search/"}
---

<input type="text" id="search" placeholder="Search books...">
<div id="results"></div>
<link rel="stylesheet" href="/styles/main.css">
<script>
  let books = [];
  const searchInput = document.getElementById('search');
  const resultsDiv = document.getElementById('results');

  fetch('/books.json')
    .then(r => r.json())
    .then(data => {
      books = data;
      showResults('');
    });

function showResults(query) {
    resultsDiv.innerHTML = '';
    const q = query.trim().toLowerCase();
    const filtered = books.filter(b => b.title.toLowerCase().includes(q));
    if (!filtered.length && q.length > 0) {
      resultsDiv.textContent = "No books found.";
      return;
    }
    filtered.forEach(book => {
      const a = document.createElement('a');
      a.href = book.url;
      a.textContent = book.title;
      a.className = "book-link";
      a.target = "_blank";
      resultsDiv.appendChild(a);
    });
  }

  searchInput.addEventListener('input', (e) => showResults(e.target.value));
</script>

<style>
  #search {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1em;
  }
  #results a.book-link {
    display: block;
    margin: 8px 0;
    color: #3366cc;
    text-decoration: none;
    font-size: 1.15em;
    padding: 6px 10px;
    border-radius: 3px;
    transition: background 0.2s;
  }
  #results a.book-link:hover {
    background: #e8eefd;
    text-decoration: underline;
  }
</style>