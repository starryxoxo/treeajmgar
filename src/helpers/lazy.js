document.addEventListener("DOMContentLoaded", function () {
    const transparentPlaceholder = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

    function setupLazyImages() {
      const images = document.querySelectorAll("img:not([data-lazy])");

      images.forEach(img => {
        const realSrc = img.getAttribute("src");
        if (realSrc && !img.hasAttribute("data-src")) {
          img.setAttribute("data-src", realSrc);
          img.setAttribute("src", transparentPlaceholder); // Keep sizing, delay load
        }
        img.setAttribute("data-lazy", "true");
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
        // Fallback for older browsers
        document.querySelectorAll("img[data-lazy]").forEach(img => {
          const realSrc = img.getAttribute("data-src");
          if (realSrc) {
            img.setAttribute("src", realSrc);
            img.removeAttribute("data-src");
          }
        });
      }
    }

    setupLazyImages();

    // Observe new images if dynamically added (e.g., Obsidian re-renders)
    const mo = new MutationObserver(setupLazyImages);
    mo.observe(document.body, { childList: true, subtree: true });
  });
