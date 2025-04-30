document.addEventListener("DOMContentLoaded", () => {
  const lastPage = localStorage.getItem("lastPage");
  const scrollPos = localStorage.getItem("scrollPos");
  const currentPage = window.location.href;
  const continueBtn = document.getElementById("continueBtn");

  // Only show the button if lastPage exists and isn't the current home page
  if (lastPage && lastPage !== currentPage) {
    continueBtn.style.display = "inline-block";

    continueBtn.addEventListener("click", () => {
      // Store scrollPos separately so we can use it *after* navigation
      sessionStorage.setItem("resumeScrollPos", scrollPos);
      window.location.href = lastPage;
    });
  }

  // If returning to the saved page, scroll to position
  const resumePos = sessionStorage.getItem("resumeScrollPos");
  if (resumePos !== null) {
    window.scrollTo(0, parseInt(resumePos));
    sessionStorage.removeItem("resumeScrollPos"); // only scroll once
  }
});
