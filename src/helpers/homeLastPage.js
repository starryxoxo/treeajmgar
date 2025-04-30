document.addEventListener("DOMContentLoaded", () => {
  const lastPage = localStorage.getItem("lastPage");
  const scrollPos = localStorage.getItem("scrollPos");
  const currentPage = window.location.href;

  const section = document.getElementById("continue-section");
  const continueBtn = document.getElementById("continueBtn");

  // Check for valid saved data and not already on last page
  if (lastPage && scrollPos !== null && lastPage !== currentPage) {
    section.style.display = "block";

    continueBtn.addEventListener("click", () => {
      sessionStorage.setItem("resumeScrollPos", scrollPos);
      window.location.href = lastPage;
    });
  } else {
    // No data or already on last page, hide section
    section.style.display = "none";
  }

  // If resuming to last page, apply scroll
  const resumePos = sessionStorage.getItem("resumeScrollPos");
  if (resumePos !== null) {
    window.scrollTo(0, parseInt(resumePos));
    sessionStorage.removeItem("resumeScrollPos");
  }
});
