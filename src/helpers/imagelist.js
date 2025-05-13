document.addEventListener("DOMContentLoaded", function () {
  // 1. Lazy-load images
  document.querySelectorAll("img:not([loading])").forEach(img => {
    img.setAttribute("loading", "lazy");
  });

  // 2. CSS protection
  const css = `
    img, .img-blocker, .img-wrap {
      -webkit-user-drag: none !important;
      -webkit-user-select: none !important;
      user-select: none !important;
      pointer-events: none !important;
    }
    img, .img-blocker {
      touch-action: none !important;
    }
    body, * {
      -webkit-user-select: none !important;
      user-select: none !important;
    }
  `;
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);

  // 3. Event listeners (capture + bubble)
  const blockEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  // Block context menu everywhere
  document.addEventListener("contextmenu", blockEvent, true);

  // Aggressive long-press block (touch events)
  let timer;
  document.addEventListener("touchstart", function(e) {
    timer = setTimeout(() => {
      blockEvent(e);
    }, 100);  // Shorter duration for quicker blocking
  }, {passive: false, capture: true});
  ["touchend", "touchmove", "touchcancel"].forEach(evt =>
    document.addEventListener(evt, function(e){ clearTimeout(timer); }, {capture: true})
  );

  // Block drag events
  ["dragstart", "mousedown", "selectstart", "gesturestart", "dblclick"].forEach(evt =>
    document.addEventListener(evt, blockEvent, true)
  );

  // Block keyboard shortcuts (copy, save, print, devtools, etc.)
  document.addEventListener("keydown", function(e) {
    // Block Ctrl/Meta + S, P, U, C, A, PrintScreen, F12
    if (
      (e.ctrlKey || e.metaKey) &&
      ["s", "p", "u", "c", "a"].includes(e.key.toLowerCase())
    ) blockEvent(e);
    if (e.key === "PrintScreen" || e.key === "F12") blockEvent(e);
    // Block Shift+Ctrl+I/J (devtools)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j"].includes(e.key.toLowerCase()))
      blockEvent(e);
  }, true);

  // 4. Overlay and wrap all images
  document.querySelectorAll("img").forEach(img => {
    const wrapper = document.createElement("div");
    wrapper.className = "img-wrap";
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";
    wrapper.style.width = img.width + "px";
    wrapper.style.height = img.height + "px";
    wrapper.style.overflow = "hidden";
    wrapper.style.pointerEvents = "auto"; // Needed for overlay to accept pointer events

    // Clone image with pointer-blocking styles
    const clone = img.cloneNode(true);
    clone.style.pointerEvents = "none";
    clone.style.userSelect = "none";
    clone.style.webkitUserDrag = "none";
    clone.style.display = "block";
    clone.style.width = "100%";
    clone.style.height = "100%";

    // Transparent overlay
    const overlay = document.createElement("div");
    overlay.className = "img-blocker";
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "transparent";
    overlay.style.zIndex = "10";
    overlay.style.pointerEvents = "auto";

    // Block all pointer events on overlay
    ["mousedown", "mouseup", "mousemove", "touchstart", "touchend", "click", "contextmenu", "selectstart", "dragstart"].forEach(evt =>
      overlay.addEventListener(evt, blockEvent, true)
    );

    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(clone);
    wrapper.appendChild(overlay);
    img.remove();
  });

  // 5. Aggressive invisible overlay for screenshots (last-resort)
  const blocker = document.createElement("div");
  blocker.style.position = "fixed";
  blocker.style.top = "0";
  blocker.style.left = "0";
  blocker.style.width = "100vw";
  blocker.style.height = "100vh";
  blocker.style.background = "rgba(255,255,255,0.01)";
  blocker.style.zIndex = "99999";
  blocker.style.pointerEvents = "none";
  blocker.style.backdropFilter = "blur(0)";
  blocker.id = "screenshot-blocker";
  document.body.appendChild(blocker);

  // 6. Prevent PrintScreen
  document.addEventListener("keyup", (e) => {
    if (e.key === "PrintScreen") {
      if (navigator.clipboard) navigator.clipboard.writeText("");
    }
  }, true);
});