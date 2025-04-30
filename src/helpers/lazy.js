
  document.addEventListener("DOMContentLoaded", function () {
    function setupLazyImages() {
      const images = document.querySelectorAll("img:not([data-lazy])");

      images.forEach(img => {
        const src = img.getAttribute("src");
        if (src) {
          img.setAttribute("data-src", src);
          img.removeAttribute("src");
        }
        img.setAttribute("data-lazy", "true"); // mark as processed
      });

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              const realSrc = img.getAttribute("data-src");
              if (realSrc) {
                img.setAttribute("src", realSrc);
                img.removeAttribute("data-src");
                observer.unobserve(img);
              }
            }
          });
        });

        document.querySelectorAll("img[data-lazy]").forEach(img => observer.observe(img));
      } else {
        // Fallback for old browsers: load all immediately
        document.querySelectorAll("img[data-lazy]").forEach(img => {
          const realSrc = img.getAttribute("data-src");
          if (realSrc) {
            img.setAttribute("src", realSrc);
            img.removeAttribute("data-src");
          }
        });
      }
    }

    // Initial setup
    setupLazyImages();

    // Optional: rerun when dynamic images are added
    // Use MutationObserver if your page adds images after load
    const observer = new MutationObserver(setupLazyImages);
    observer.observe(document.body, { childList: true, subtree: true });
  });
