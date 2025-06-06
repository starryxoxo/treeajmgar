// search.js
let books = [];
const searchInput = document.getElementById('search');
const resultsTable = document.getElementById('results');

fetch('https://swrn.vercel.app/books.json')
  .then(r => r.json())
  .then(data => {
    books = data;
    searchInput.disabled = false;
    showResults(''); // Optionally show initial random 3
  })
  .catch(() => {
    resultsTable.innerHTML = "<tr><td>Could not load books.json. Search is unavailable.</td></tr>";
  });

function getRandomBooks(arr, limit = 3) {
  // Shuffle a copy, then take limit
  return arr.slice().sort(() => Math.random() - 0.5).slice(0, limit);
}

function showResults(query) {
  resultsTable.innerHTML = '';
  const q = query.trim().toLowerCase();
  let filtered;

  if (q === '') {
    // Show random 3 books on blank search
    filtered = getRandomBooks(books, 3);
  } else {
    filtered = books.filter(
      b => b.title && b.title.toLowerCase().includes(q)
    );
  }

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
    cell.appendChild(a);
    row.appendChild(cell);
    resultsTable.appendChild(row);
  });
}

searchInput.addEventListener('input', (e) => showResults(e.target.value));
