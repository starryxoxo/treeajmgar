document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("img");

    // Move src to data-src and clear src
    images.forEach(img => {
      if (img.getAttribute("src")) {
        img.setAttribute("data-src", img.getAttribute("src"));
        img.removeAttribute("src");
      }
    });

    // Check for IntersectionObserver support
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

      // Observe all images
      images.forEach(img => observer.observe(img));
    } else {
      // Fallback: just load all images immediately
      images.forEach(img => {
        const realSrc = img.getAttribute("data-src");
        if (realSrc) {
          img.setAttribute("src", realSrc);
          img.removeAttribute("data-src");
        }
      });
    }
  });
