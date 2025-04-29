document.addEventListener("DOMContentLoaded", function () {
    const phrases = [
      "Other Stories",
      "Other Reads",
      "Suggested Titles",
      "You Might Enjoy",
      "Explore More",
      "You May Like",
      "Take a Break",
      "Check This Out",
      "Other Books"
    ];

    // Select the specific wrapper div
    const wrapper = document.querySelector(".alt-table-header");
    if (!wrapper) return;

    const table = wrapper.querySelector("table");
    const firstCell = table?.querySelector("tr:first-child th, tr:first-child td");
    if (firstCell) {
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      firstCell.textContent = randomPhrase;
    }
  });