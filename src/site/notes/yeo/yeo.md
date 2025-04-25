---
{"dg-publish":true,"permalink":"/yeo/yeo/"}
---

[[Home\|Home]]

***

![bookimg\|360](/img/user/yeo/yeostorage/yeocover.webp)

***
<button id="library-toggle" onclick="toggleLibrary()">Add to Reading List</button>

###### ENHYPEN AU
# Your Eyes Only
#romance #enhypen 

**Description**
I always catch you looking at me and it isn't the same as anyone else's gaze. There's something about you that feels **different** and **soothing** at the same time. 
*Ano ka ba sa'kin?* 

**Author**: the sworn library
**Languages**: Tagalog, English
**Status**: Not yet available
**Date**:

**Before Reading**
[[dev/slowload\|Read Notice: Slowload]]
This book is rated **PG**.

[[yeo/yeop1\|Read]]

***

| Other Stories                    |                      |
| :------------------------------- | -------------------- |
| ![coverimg\|185](/img/user/sitn/sitncover.webp) | More stories soon... |
| [[sitn/sitn\|Strangers by Midnight]]  |                      |

***

[[Home\|Home]]

***

Copyright © 2025 the sworn library
All Rights Reserved.

<script>
  function getBookInfo() {
    const h1Elements = Array.from(document.querySelectorAll("h1"));
    const bookTitleElement = h1Elements.find(h1 => h1.closest("main"));

    if (!bookTitleElement) return null;

    return {
      title: bookTitleElement.textContent.trim(),
      link: window.location.href
    };
  }

  function updateLibraryButton() {
    const book = getBookInfo();
    if (!book) return;
    const button = document.getElementById("library-toggle");
    if (button) {
      button.textContent = isInLibrary(book.link) ? "Remove from Reading List" : "Add to Reading List";
    }
  }

  function toggleLibrary() {
    const book = getBookInfo();
    if (!book) return;

    let library = getLibrary();
    const existingBookIndex = library.findIndex(b => b.link === book.link);

    if (existingBookIndex !== -1) {
      library.splice(existingBookIndex, 1);
    } else {
      library.unshift(book);
    }
    saveLibrary(library);
    updateLibraryButton();
  }
  document.addEventListener("DOMContentLoaded", () => {
    updateLibraryButton();
  });

  function getLibrary() {
    return JSON.parse(localStorage.getItem("bookLibrary") || "[]");
  }

  function saveLibrary(library) {
    localStorage.setItem("bookLibrary", JSON.stringify(library));
  }

  // Helper function to check if a book is already in the library
  function isInLibrary(link) {
    const library = getLibrary();
    return library.some(book => book.link === link);
  }
</script>