---
{"dg-publish":true,"permalink":"/yeo/yeo/"}
---

[[Home\|Home]]

***

![bookimg\|360](/img/user/yeo/yeostorage/yeocover.webp)

***
<button id="library-toggle" onclick="toggleLibrary()">Add to Library</button>

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
  // Function to fetch book info (title and link), ignoring the first H1 in navbar
  function getBookInfo() {
    const h1Elements = Array.from(document.querySelectorAll("h1"));
    const bookTitleElement = h1Elements.find(h1 => h1.closest("main")); // Look for the first H1 inside <main>

    if (!bookTitleElement) return null;

    return {
      title: bookTitleElement.textContent.trim(),
      link: window.location.href // Get the current URL for the book
    };
  }

  // Function to update the button text based on whether the book is in the library
  function updateLibraryButton() {
    const book = getBookInfo();
    if (!book) return;
    const button = document.getElementById("library-toggle");
    if (button) {
      button.textContent = isInLibrary(book.link) ? "Remove from Library" : "Add to Library";
    }
  }

  // Function to toggle adding/removing book from the library
  function toggleLibrary() {
    const book = getBookInfo();
    if (!book) return;

    let library = getLibrary(); // Fetch the current library
    const existingBookIndex = library.findIndex(b => b.link === book.link);

    if (existingBookIndex !== -1) {
      library.splice(existingBookIndex, 1); // Remove book from library
    } else {
      library.unshift(book); // Add book to library
    }
    saveLibrary(library); // Save the updated library
    updateLibraryButton(); // Update the button text
  }

  // Event listener to update the button text once the page has loaded
  document.addEventListener("DOMContentLoaded", () => {
    updateLibraryButton();
  });

  // Helper function to get the library from localStorage
  function getLibrary() {
    return JSON.parse(localStorage.getItem("bookLibrary") || "[]");
  }

  // Helper function to save the library to localStorage
  function saveLibrary(library) {
    localStorage.setItem("bookLibrary", JSON.stringify(library));
  }

  // Helper function to check if a book is already in the library
  function isInLibrary(link) {
    const library = getLibrary();
    return library.some(book => book.link === link);
  }
</script>