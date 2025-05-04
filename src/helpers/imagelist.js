  // Disable right-click
  document.addEventListener("contextmenu", event => event.preventDefault());

  // Disable long-press on mobile
  let touchDuration = 500;
  let timer;

  document.addEventListener("touchstart", function (e) {
    timer = setTimeout(() => {
      e.preventDefault();
    }, touchDuration);
  });

  document.addEventListener("touchend", function () {
    clearTimeout(timer);
  });

  document.addEventListener("touchmove", function () {
    clearTimeout(timer);
  });

  // Create overlay over all images
  window.addEventListener("load", () => {
    document.querySelectorAll("img").forEach(img => {
      // Wrap the image in a container
      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-block";
      wrapper.style.width = img.width + "px";

      // Clone image and apply non-interactive styles
      const clone = img.cloneNode(true);
      clone.style.pointerEvents = "none";
      clone.style.userSelect = "none";
      clone.style.webkitUserDrag = "none";
      clone.style.display = "block";
      clone.style.width = "100%";

      // Transparent overlay
      const overlay = document.createElement("div");
      overlay.style.position = "absolute";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.background = "transparent";
      overlay.style.zIndex = "10";

      // Replace original image
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(clone);
      wrapper.appendChild(overlay);
      img.remove();
    });
  });

  // Prevent screenshots with Incognito-like technique
  function preventScreenshots() {
    // Detect the PrintScreen key and clear the clipboard
    document.addEventListener("keyup", (e) => {
      if (e.key === "PrintScreen") {
        navigator.clipboard.writeText(""); // Clear clipboard
        alert("Screenshots are disabled on this site.");
      }
    });

    // Use hardware-accelerated overlay
    window.addEventListener("load", () => {
      const blocker = document.createElement("div");
      blocker.style.position = "absolute";
      blocker.style.top = "0";
      blocker.style.left = "0";
      blocker.style.width = "100vw";
      blocker.style.height = "100vh";
      blocker.style.background = "rgba(255, 255, 255, 0.01)"; // Invisible overlay
      blocker.style.zIndex = "9999";
      blocker.style.pointerEvents = "none"; // Allow interaction below it
      blocker.style.backdropFilter = "blur(0)"; // Anti-screenshot filter
      blocker.id = "screenshot-blocker";

      document.body.appendChild(blocker);
    });

    // Detect screen recording using WebGL
    setInterval(() => {
      const gl = document.createElement("canvas").getContext("webgl");
      if (!gl) {
        alert("Screen recording is disabled on this site.");
      }
    }, 1000);
  }

  preventScreenshots();

  // Lazy load images
  document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("img:not([loading])");
    images.forEach(img => {
      img.setAttribute("loading", "lazy");
    });
  });

  // Book library functionality
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

  function isInLibrary(link) {
    const library = getLibrary();
    return library.some(book => book.link === link);
  }
