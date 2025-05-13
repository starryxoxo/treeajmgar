// Lazy-load images as soon as possible
document.addEventListener("DOMContentLoaded", function () {
  // 1. Lazy-load all images that don't have loading attribute
  document.querySelectorAll("img:not([loading])").forEach(img => {
    img.setAttribute("loading", "lazy");
  });

  // 2. Disable right-click context menu everywhere
  document.addEventListener("contextmenu", event => event.preventDefault());

  // 3. Disable long-press on mobile devices
  let touchDuration = 500;
  let timer;
  document.addEventListener("touchstart", function (e) {
    timer = setTimeout(() => { e.preventDefault(); }, touchDuration);
  }, { passive: false });
  document.addEventListener("touchend", function () { clearTimeout(timer); });
  document.addEventListener("touchmove", function () { clearTimeout(timer); });

  // 4. Overlay and wrap all images to prevent interaction
  document.querySelectorAll("img").forEach(img => {
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";
    wrapper.style.width = img.width + "px";

    const clone = img.cloneNode(true);
    clone.style.pointerEvents = "none";
    clone.style.userSelect = "none";
    clone.style.webkitUserDrag = "none";
    clone.style.display = "block";
    clone.style.width = "100%";

    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "transparent";
    overlay.style.zIndex = "10";

    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(clone);
    wrapper.appendChild(overlay);
    img.remove();
  });

  // 5. Add invisible overlay to discourage screenshots (optional)
  const blocker = document.createElement("div");
  blocker.style.position = "fixed";
  blocker.style.top = "0";
  blocker.style.left = "0";
  blocker.style.width = "100vw";
  blocker.style.height = "100vh";
  blocker.style.background = "rgba(255, 255, 255, 0.01)";
  blocker.style.zIndex = "9999";
  blocker.style.pointerEvents = "none";
  blocker.style.backdropFilter = "blur(0)";
  blocker.id = "screenshot-blocker";
  document.body.appendChild(blocker);