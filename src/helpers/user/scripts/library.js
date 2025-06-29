function renderLibrary() {
  const e = document.getElementById("library-display");
  if (!e) return;

  const library = getLibrary();
  if (library.length === 0) {
    e.innerText = "No books in your reading list just yet.";
    return;
  }

  let displayContent = "";
  const TABLE_SIZE = 2; // 2 columns per table

  for (let i = 0; i < library.length; i += TABLE_SIZE) {
    const booksChunk = library.slice(i, i + TABLE_SIZE);
    displayContent += `<table style="margin: 12px auto; border-collapse: separate;"><tbody>`;

    // Row 1: Covers
    displayContent += `<tr>`;
    for (let j = 0; j < TABLE_SIZE; j++) {
      const book = booksChunk[j];
      displayContent += `<td style="text-align:center; width: 190px; height: 190px;">${
        book && book.cover
          ? `<img src="${book.cover}" alt="cover" style="width:175px;height:175px;object-fit:cover; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.13);" />`
          : ""
      }</td>`;
    }
    displayContent += `</tr>`;

    // Row 2: Titles
    displayContent += `<tr>`;
    for (let j = 0; j < TABLE_SIZE; j++) {
      const book = booksChunk[j];
      displayContent += `<td style="text-align:center; vertical-align:top; height: 40px;">${
        book
          ? `<a class="internal-link" href="${book.link}" target="_blank" style="font-weight:bold; font-size: 1.05em;">${book.title}</a>`
          : ""
      }</td>`;
    }
    displayContent += `</tr>`;

    displayContent += `</tbody></table>`;
  }

  e.innerHTML = displayContent;
}
