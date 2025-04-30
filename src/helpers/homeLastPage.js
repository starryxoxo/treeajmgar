document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("continue-section");
  const continueBtn = document.getElementById("continueBtn");

  const lastPage = localStorage.getItem("lastPage");
  const scrollPos = localStorage.getItem("scrollPos");
  const currentPage = window.location.href;

  console.log("[Homepage] Current page:", currentPage);
  console.log("[Homepage] Last page:", lastPage);
  console.log("[Homepage] Saved scrollPos:", scrollPos);

  if (lastPage && scrollPos !== null && lastPage !== currentPage) {
    section.style.display = "block";

    continueBtn.addEventListener("click", () => {
      console.log("[Button Clicked] Navigating to:", lastPage);
      console.log("[Button Clicked] ScrollY to restore:", scrollPos);
      sessionStorage.setItem("resumeScrollPos", scrollPos);
      window.location.href = lastPage;
    });
  } else {
    console.log("[Homepage] No valid saved page or already on it. Hiding button.");
    section.style.display = "none";
  }

  // Try to restore scroll after load
  window.addEventListener("load", () => {
    const resumePos = sessionStorage.getItem("resumeScrollPos");
    if (resumePos && !isNaN(resumePos) && parseInt(resumePos) > 0) {
      console.log("[Scroll Restore] Resuming scroll to:", resumePos);
      window.scrollTo({ top: parseInt(resumePos), behavior: "auto" });
      sessionStorage.removeItem("resumeScrollPos");
    } else {
      console.log("[Scroll Restore] No scroll position to resume.");
    }
  });
});
