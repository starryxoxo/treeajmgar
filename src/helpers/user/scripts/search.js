// search.js - Vanilla IndexedDB book search with random display on blank input

const searchInput = document.getElementById('search');
const resultsTable = document.getElementById('results');
const BOOKS_DB_NAME = 'BooksDB';
const BOOKS_STORE = 'books';
const BOOKS_JSON_URL = '/books.json'; // <-- Adjust path if needed

// Open or create the IndexedDB database
function openDB() {
    console.log('Opening IndexedDB...');
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(BOOKS_DB_NAME, 1);
        req.onupgradeneeded = function(event) {
            console.log('Upgrading database...');
            const db = event.target.result;
            if (!db.objectStoreNames.contains(BOOKS_STORE)) {
                db.createObjectStore(BOOKS_STORE, { keyPath: 'title' }); // Use 'id' if present
                console.log('Created object store:', BOOKS_STORE);
            }
        };
        req.onsuccess = function(event) {
            console.log('Database opened successfully');
            resolve(event.target.result);
        };
        req.onerror = function(event) {
            console.error('Database failed to open:', event.target.error);
            reject(event.target.error);
        };
    });
}

// Store an array of books in IndexedDB
function storeBooks(books) {
    console.log('Storing books:', books);
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(BOOKS_STORE, 'readwrite');
            const store = tx.objectStore(BOOKS_STORE);
            store.clear();
            books.forEach(book => {
                console.log('Adding book to store:', book);
                store.put(book);
            });
            tx.oncomplete = () => {
                console.log('All books stored successfully');
                resolve();
            };
            tx.onerror = e => {
                console.error('Error storing books:', e.target.error);
                reject(e.target.error);
            };
        });
    });
}

// Get all books from IndexedDB
function getAllBooks() {
    console.log('Fetching all books...');
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(BOOKS_STORE, 'readonly');
            const store = tx.objectStore(BOOKS_STORE);
            const req = store.getAll();
            req.onsuccess = () => {
                console.log('Fetched books:', req.result);
                resolve(req.result);
            };
            req.onerror = e => {
                console.error('Error fetching books:', e.target.error);
                reject(e.target.error);
            };
        });
    });
}

// Get 3 random books from IndexedDB
function getRandomBooks(count = 3) {
    console.log(`Getting ${count} random books...`);
    return getAllBooks().then(books => {
        if (books.length <= count) {
            console.log('Total books less than or equal to count:', books);
            return books;
        }
        const randomBooks = books.sort(() => Math.random() - 0.5).slice(0, count);
        console.log('Random books:', randomBooks);
        return randomBooks;
    });
}

// Search books by query (title)
function searchBooks(query) {
    console.log('Searching books with query:', query);
    return getAllBooks().then(books => {
        const q = query.trim().toLowerCase();
        const results = books.filter(b => b.title && b.title.toLowerCase().includes(q));
        console.log('Search results:', results);
        return results;
    });
}

// Render books in the resultsTable
function renderResults(books) {
    console.log('Rendering results:', books);
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
    console.log('Initializing books...');
    getAllBooks().then(books => {
        if (!books.length) {
            console.log('No books found in IndexedDB. Fetching from JSON...');
            fetch(BOOKS_JSON_URL)
                .then(r => r.json())
                .then(data => storeBooks(data))
                .then(() => {
                    searchInput.disabled = false;
                    getRandomBooks(3).then(renderResults);
                })
                .catch((e) => {
                    console.error('Could not load books.json:', e);
                    resultsTable.innerHTML = "<tr><td>Could not load books.json. Search is unavailable.</td></tr>";
                });
        } else {
            console.log('Books already present in IndexedDB:', books);
            searchInput.disabled = false;
            getRandomBooks(3).then(renderResults);
        }
    });
}

// Main search event
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    console.log('Search input changed:', query);
    if (!query) {
        getRandomBooks(3).then(renderResults);
    } else {
        searchBooks(query).then(renderResults);
    }
});

// Start everything
initializeBooks();
