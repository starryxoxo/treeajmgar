document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("continue-section");
  const continueBtn = document.getElementById("continueBtn");

  const lastPage = localStorage.getItem("lastPage");
  const scrollPos = localStorage.getItem("scrollPos");
  const currentPage = window.location.href;

  // Only show button if lastPage is valid and not this page
  if (lastPage && scrollPos !== null && lastPage !== currentPage) {
    section.style.display = "block";

    continueBtn.addEventListener("click", () => {
      sessionStorage.setItem("resumeScrollPos", scrollPos);
      window.location.href = lastPage;
    });
  } else {
    section.style.display = "none";
  }

  // Restore scroll AFTER all content has loaded
  window.addEventListener("load", () => {
    const resumePos = sessionStorage.getItem("resumeScrollPos");
    if (resumePos !== null) {
      window.scrollTo({ top: parseInt(resumePos), behavior: "auto" });
      sessionStorage.removeItem("resumeScrollPos");
    }
  });
});
