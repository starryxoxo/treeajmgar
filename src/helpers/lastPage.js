window.addEventListener("beforeunload", () => {
  localStorage.setItem("lastPage", window.location.href);
  localStorage.setItem("scrollPos", window.scrollY);
});
