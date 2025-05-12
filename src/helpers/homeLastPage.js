const lastPageDataRaw = localStorage.getItem('lastPageData');
let lastPage = null, paraIndex = null;
if (lastPageDataRaw) {
  try {
    const data = JSON.parse(lastPageDataRaw);
    lastPage = data.page;
    // Defensive: check for integer-ness and not undefined/null
    if (typeof data.paraIndex === 'number' && !isNaN(data.paraIndex)) {
      paraIndex = data.paraIndex;
    }
  } catch (e) {}
}

const section = document.getElementById("continue-section");
const currentPage = window.location.href;

if (lastPage && paraIndex !== null && lastPage !== currentPage) {
  section.style.display = "block";
  document.getElementById("continueBtn").onclick = function () {
    sessionStorage.setItem("resumeParaIndex", paraIndex);
    window.location.href = lastPage;
  };
} else {
  section.style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
  const paraIndexStr = sessionStorage.getItem("resumeParaIndex");
  // Defensive: convert string to number and check for validity
  const paraIndex = paraIndexStr !== null ? parseInt(paraIndexStr, 10) : null;
  if (paraIndex !== null && !isNaN(paraIndex)) {
    const container = document.querySelector('.content.cm-s-obsidian');
    const ps = container ? container.querySelectorAll('p') : [];
    const targetP = ps[paraIndex] || ps[0];
    if (container && targetP) {
      setTimeout(() => {
        container.scrollTop = targetP.offsetTop;
      }, 50);
    }
    sessionStorage.removeItem("resumeParaIndex");
  }
});