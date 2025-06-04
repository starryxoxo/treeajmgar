---
{"dg-publish":true,"permalink":"/search/"}
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Auto Site Title Search</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8f9fa; margin: 0; padding: 2em; }
    h1 { color: #345; }
    #search { 
      width: 100%; max-width: 400px; padding: 10px; margin-bottom: 20px; 
      border-radius: 4px; border: 1px solid #ccc; font-size: 1em;
    }
    .results a {
      display: block;
      margin: 8px 0;
      color: #3366cc;
      text-decoration: none;
      font-size: 1.15em;
      padding: 6px 10px;
      border-radius: 3px;
      transition: background 0.2s;
    }
    .results a:hover {
      background: #e8eefd;
      text-decoration: underline;
    }
    .loading { color: #888; }
  </style>
</head>
<body>
  <h1>Site Search</h1>
  <input type="text" id="search" placeholder="Type to search titles...">
  <div class="results loading" id="results">Loading...</div>
  <script>
    // The root to crawl from:
    const rootUrl = location.origin + '/';
    const maxPages = 25; // Limit to avoid overloading

    const resultsDiv = document.getElementById('results');
    const searchInput = document.getElementById('search');
    let pages = [];

    async function fetchLinks(url) {
      try {
        let resp = await fetch(url);
        let html = await resp.text();
        let doc = new DOMParser().parseFromString(html, "text/html");
        let anchors = Array.from(doc.querySelectorAll('a'));
        let links = anchors
            .map(a => a.href)
            .filter(href =>
                href.startsWith(location.origin) && // same domain only
                !href.includes('#') && // skip anchors
                !href.endsWith('.png') && !href.endsWith('.jpg') && !href.endsWith('.jpeg') && !href.endsWith('.svg') &&
                !href.endsWith('.pdf')
            );
        // Remove duplicates and keep only root-relative links
        let uniqueLinks = Array.from(new Set(links));
        // Limit to avoid too many requests
        return uniqueLinks.slice(0, maxPages);
      } catch (e) {
        return [url];
      }
    }

    async function fetchTitle(url) {
      try {
        let resp = await fetch(url);
        let html = await resp.text();
        let titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        if (titleMatch) {
          return { title: titleMatch[1].trim(), url };
        }
      } catch (e) {}
      return null;
    }

    (async function main() {
      let links = await fetchLinks(rootUrl);
      // Always include the homepage as well!
      if (!links.includes(rootUrl)) links.unshift(rootUrl);
      // Fetch titles in parallel
      let results = await Promise.all(
        links.map(fetchTitle)
      );
      pages = results.filter(Boolean);
      resultsDiv.classList.remove('loading');
      showResults('');
    })();

    function showResults(query) {
      resultsDiv.innerHTML = '';
      let filtered = pages.filter(page =>
        page.title.toLowerCase().includes(query.toLowerCase())
      );
      if (!filtered.length) {
        resultsDiv.textContent = "No results found.";
        return;
      }
      filtered.forEach(page => {
        let a = document.createElement('a');
        a.href = page.url;
        a.textContent = page.title;
        a.target = "_blank";
        resultsDiv.appendChild(a);
      });
    }

    searchInput.addEventListener('input', e => {
      showResults(e.target.value);
    });
  </script>
</body>
</html>