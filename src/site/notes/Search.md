---
{"dg-publish":true,"permalink":"/search/"}
---

<input type="text" id="search" placeholder="Search for books..." disabled>
<div id="results"></div>

<link rel="stylesheet" href="/styles/main.css">

<script>
  let books = [];
  const searchInput = document.getElementById('search');
  const resultsDiv = document.getElementById('results');

  // Show loading message and keep input disabled
  resultsDiv.textContent = "Loading books...";

  fetch('/books.json')
    .then(r => {
      // Defensive: check for fetch errors or non-JSON response
      if (!r.ok) throw new Error("Not found");
      return r.json();
    })
    .then(data => {
      books = data;
      searchInput.disabled = false; // Enable input
      resultsDiv.textContent = "";  // Clear loading message
      showResults(''); // Optionally show all books on load
    })
    .catch(() => {
      resultsDiv.textContent = "Could not load books.json. Search is unavailable.";
    });

  function showResults(query) {
    resultsDiv.innerHTML = '';
    const q = query.trim().toLowerCase();
    const filtered = books.filter(b =>
      typeof b.title === "string" &&
      b.title.toLowerCase().includes(q)
    );
    if (!filtered.length && q.length > 0) {
      resultsDiv.textContent = "No books found.";
      return;
    }
    filtered.forEach(book => {
      // Render wikilink: [[url\|title]]
      const div = document.createElement('div');
      div.textContent = `[[${book.url}|${book.title}]]`;
      resultsDiv.appendChild(div);
    });
  }

  searchInput.addEventListener('input', (e) => showResults(e.target.value));
</script>