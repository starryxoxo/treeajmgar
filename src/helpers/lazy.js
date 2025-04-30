
  document.addEventListener("DOMContentLoaded", function () {
    function setupLazyImages() {
      const images = document.querySelectorAll("img:not([data-lazy])");

      images.forEach(img => {
        const src = img.getAttribute("src");
        if (src && !img.hasAttribute("data-src")) {
          img.setAttribute("data-src", src);
          img.setAttribute("data-lazy", "true");
          // Do NOT touch the src — let it stay for sizing
          img.setAttribute("loading", "lazy"); // modern lazy loading
          img.style.visibility = "hidden";     // hide it until it's loaded
        }
      });

      function loadImage(img) {
        const realSrc = img.getAttribute("data-src");
        if (realSrc) {
          // Reload the image only if needed
          const clone = new Image();
          clone.src = realSrc;
          clone.onload = function () {
            img.style.visibility = "visible"; // show when loaded
            img.classList.add("loaded");
            img.removeAttribute("data-src");
          };
        }
      }

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              loadImage(entry.target);
              obs.unobserve(entry.target);
            }
          });
        });

        document.querySelectorAll("img[data-lazy]").forEach(img => observer.observe(img));
      } else {
        // Fallback: load all immediately
        document.querySelectorAll("img[data-lazy]").forEach(img => loadImage(img));
      }
    }

    setupLazyImages();

    // Re-run for dynamically added markdown
    const mo = new MutationObserver(setupLazyImages);
    mo.observe(document.body, { childList: true, subtree: true });
  });
