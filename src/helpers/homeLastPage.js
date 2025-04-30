document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("continue-section");
  const continueBtn = document.getElementById("continueBtn");

  const lastPage = localStorage.getItem("lastPage");
  const scrollPos = localStorage.getItem("scrollPos");
  const currentPage = window.location.href;

  // Only show section if valid last page exists and it's not this one
  if (lastPage && scrollPos !== null && lastPage !== currentPage) {
    section.style.display = "block";

    continueBtn.addEventListener("click", () => {
      sessionStorage.setItem("resumeScrollPos", scrollPos);
      window.location.href = lastPage;
    });
  } else {
    section.style.display = "none";
  }

  // Apply scroll after navigation to last page
  window.addEventListener("load", () => {
    const resumePos = sessionStorage.getItem("resumeScrollPos");
    if (resumePos !== null) {
      window.scrollTo({ top: parseInt(resumePos), behavior: "auto" });
      sessionStorage.removeItem("resumeScrollPos");
    }
  });
});
