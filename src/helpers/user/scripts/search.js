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
            const store =