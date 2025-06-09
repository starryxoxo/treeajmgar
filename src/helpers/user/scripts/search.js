// search.js - Vanilla IndexedDB book search with shuffle for blank input

const searchInput = document.getElementById('search');
const resultsTable = document.getElementById('results');
const BOOKS_DB_NAME = 'BooksDB';
const BOOKS_STORE = 'books';
const BOOKS_JSON_URL = '/books.json'; // <-- Adjust path if needed

// Open or create the IndexedDB database
function openDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(BOOKS_DB_NAME, 1);
        req.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(BOOKS_STORE)) {
                db.createObjectStore(BOOKS_STORE, { keyPath: 'title' }); // Use 'id' if present
            }
        };
        req.onsuccess = function(event) {
            resolve(event.target.result);
        };
        req.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

// Store an array of books in IndexedDB
function storeBooks(books) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(BOOKS_STORE, 'readwrite');
            const store = tx.objectStore(BOOKS_STORE);
            store.clear();
            books.forEach(book => {
                store.put(book);
            });
            tx.oncomplete = () => {
                resolve();
            };
            tx.onerror = e => {
                reject(e.target.error);
            };
        });
    });
}

// Get all books from IndexedDB
function getAllBooks() {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(BOOKS_STORE, 'readonly');
            const store = tx.objectStore(BOOKS_STORE);
            const req = store.getAll();
            req.onsuccess = () => {
                resolve(req.result);
            };
            req.onerror = e => {
                reject(e.target.error);
            };
        });
    });
}

// Shuffle utility
function shuffleArray(arr) {
    // Fisher-Yates shuffle
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Get 3 random books from IndexedDB (shuffle full list, then pick 3)
function getRandomBooks(count = 3) {
    return getAllBooks().then(books => {
        if (books.length <= count) return shuffleArray(books.slice());
        const shuffled = shuffleArray(books.slice());
        return shuffled.slice(0, count);
    });
}

// Search books by query (title)
function searchBooks(query) {
    return getAllBooks().then(books => {
        const q = query.trim().toLowerCase();
        return books.filter(b => b.title && b.title.toLowerCase().includes(q));
    });
}

// Render books in the resultsTable
function renderResults(books) {
    resultsTable.innerHTML = '';
    if (!books.length) {
        resultsTable.innerHTML = "<tr><td>No books found.</td></tr>";
        return;
    }
    books.forEach(book => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        const a = document.createElement('a');
        a.href = book.url || '#';
        a.textContent = book.title || 'Untitled';
        cell.appendChild(a);
        row.appendChild(cell);
        resultsTable.appendChild(row);
    });
}

// Initialize: load books into IndexedDB if not present
function initializeBooks() {
    getAllBooks().then(books => {
        if (!books.length) {
            fetch(BOOKS_JSON_URL)
                .then(r => r.json())
                .then(data => storeBooks(data))
                .then(() => {
                    searchInput.disabled = false;
                    getRandomBooks(3).then(renderResults);
                })
                .catch(() => {
                    resultsTable.innerHTML = "<tr><td>Could not load books.json. Search is unavailable.</td></tr>";
                });
        } else {
            searchInput.disabled = false;
            getRandomBooks(3).then(renderResults);
        }
    });
}

// Main search event
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (!query) {
        getRandomBooks(3).then(renderResults);
    } else {
        searchBooks(query).then(renderResults);
    }
});

// Start everything
initializeBooks();