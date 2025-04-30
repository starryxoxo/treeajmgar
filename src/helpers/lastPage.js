// Force saving scroll position every second
  setInterval(() => {
    const scrollY = window.scrollY;
    localStorage.setItem("scrollPos", scrollY);
    console.log("[Force Save] Scroll position saved:", scrollY);
  }, 3000); // Save every 3 seconds

  // Save last page when the page is unloaded or hidden (for navigation purposes)
  window.addEventListener("pagehide", () => {
    const scrollY = window.scrollY;
    localStorage.setItem("scrollPos", scrollY);
    console.log("[Pagehide] Saved scrollPos:", scrollY);
    localStorage.setItem("lastPage", window.location.href);
    console.log("[Pagehide] Saved lastPage:", window.location.href);
  });

  // Debugging output to check scroll position on page load
  window.addEventListener("load", () => {
    console.log("[Initial Load] Initial scroll position:", window.scrollY);
  });
