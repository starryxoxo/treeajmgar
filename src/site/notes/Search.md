---
{"dg-publish":true,"permalink":"/search/"}
---


  <style>
    body { font-family: Arial, sans-serif; }
    .book-list a {
      display: block;
      margin: 8px 0;
      color: #3366cc;
      text-decoration: none;
      font-size: 1.2em;
    }
    .book-list a:hover { text-decoration: underline; }
  </style>

  <h1>Search</h1>
  <div class="book-list" id="book-list">Loading…</div>
  <script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>
  <script>
    async function fetchYamlBookTitles() {
      const repoOwner = "treeajmgar";
      const repoName = "treeajmgar";
      const branch = "main";
      const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/git/trees/${branch}?recursive=1`;
      const fileList = await fetch(apiUrl).then(r => r.json());

      // Get YAML files
      const yamlFiles = (fileList.tree || []).filter(f =>
        f.type === "blob" && (f.path.endsWith(".yaml") || f.path.endsWith(".yml"))
      );

      const books = [];

      // For each YAML file, fetch and parse contents
      await Promise.all(
        yamlFiles.map(async file => {
          const rawUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/${file.path}`;
          try {
            const text = await fetch(rawUrl).then(r => r.text());
            const doc = jsyaml.load(text);
            if (
              doc &&
              Array.isArray(doc.tags) &&
              doc.tags.includes("book") &&
              doc.title
            ) {
              books.push({ title: doc.title, url: rawUrl });
            }
          } catch (e) {}
        })
      );

      return books;
    }

    async function renderBookTitles() {
      const list = document.getElementById("book-list");
      list.innerHTML = "";
      const books = await fetchYamlBookTitles();
      if (!books.length) {
        list.textContent = "No books found.";
        return;
      }
      books.forEach(book => {
        const a = document.createElement("a");
        a.href = book.url;
        a.textContent = book.title;
        a.target = "_blank";
        list.appendChild(a);
      });
    }

    renderBookTitles();
  </script>