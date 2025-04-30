document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("img:not([loading])");
    images.forEach(img => {
      img.setAttribute("loading", "lazy");
    });
  });
