// search.js - Vanilla IndexedDB book search with dynamic shuffle for blank input

const searchInput = document.getElementById('search');
const resultsTable = document.getElementById('results');
const BOOKS_DB_NAME = 'BooksDB';
const BOOKS_STORE = 'books';
const META_STORE = 'meta';
const BOOKS_JSON_URL = '/books.json'; // Adjust if needed

function openDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(BOOKS_DB_NAME, 2); // Use version 2 for meta store
        req.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(BOOKS_STORE)) {
                db.createObjectStore(BOOKS_STORE, { keyPath: 'title' }); // Use 'id' if present
            }
            if (!db.objectStoreNames.contains(META_STORE)) {
                db.createObjectStore(META_STORE, { keyPath: 'key' });
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

function getMetaVersion() {
    return openDB().then(db => {
        return new Promise((resolve) => {
            const tx = db.transaction(META_STORE, 'readonly');
            const store = tx.objectStore(META_STORE);
            const req = store.get('version');
            req.onsuccess = () => resolve(req.result ? req.result.value : null);
            req.onerror = () => resolve(null);
        });
    });
}

function setMetaVersion(version) {
    return openDB().then(db => {
        return new Promise((resolve) => {
            const tx = db.transaction(META_STORE, 'readwrite');
            const store = tx.objectStore(META_STORE);
            store.put({ key: 'version', value: version });
            tx.oncomplete = resolve;
        });
    });
}

function storeBooks(books) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(BOOKS_STORE, 'readwrite');
            const store = tx.objectStore(BOOKS_STORE);
            store.clear();
            books.forEach(book => store.put(book));
            tx.oncomplete = resolve;
            tx.onerror = e => reject(e.target.error);
        });
    });
}

function getAllBooks() {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(BOOKS_STORE, 'readonly');
            const store = tx.objectStore(BOOKS_STORE);
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = e => reject(e.target.error);
        });
    });
}

// Fisher-Yates shuffle
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Always pick a new random 3 from a shuffled list
function getRandomBooks(count = 3) {
    return getAllBooks().then(books => {
        if (books.length <= count) return shuffleArray(books.slice());
        const shuffled = shuffleArray(books.slice());
        return shuffled.slice(0, count);
    });
}

function searchBooks(query) {
    return getAllBooks().then(books => {
        const q = query.trim().toLowerCase();
        return books.filter(b => b.title && b.title.toLowerCase().includes(q));
    });
}

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

// Version-aware initialization
function initializeBooks() {
    fetch(BOOKS_JSON_URL)
        .then(r => r.json())
        .then(data => {
            const newVersion = data.version;
            const books = data.books;
            getMetaVersion().then(currentVersion => {
                if (currentVersion !== newVersion) {
                    // New version -- update DB
                    storeBooks(books)
                        .then(() => setMetaVersion(newVersion))
                        .then(() => {
                            searchInput.disabled = false;
                            getRandomBooks(3).then(renderResults);
                        });
                } else {
                    // Version matches -- use existing DB
                    searchInput.disabled = false;
                    getRandomBooks(3).then(renderResults);
                }
            });
        })
        .catch(() => {
            resultsTable.innerHTML = "<tr><td>Could not load books.json. Search is unavailable.</td></tr>";
        });
}

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (!query) {
        getRandomBooks(3).then(renderResults); // always new shuffle
    } else {
        searchBooks(query).then(renderResults);
    }
});

initializeBooks();