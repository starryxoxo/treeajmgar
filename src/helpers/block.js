document.addEventListener("DOMContentLoaded", () => {
  const parent = document.body; // Or use a more specific wrapper if needed

  // Get all divs with IDs like 'block1', 'block2', etc.
  const allBlocks = Array.from(document.querySelectorAll('div[id^="block"]'));

  if (allBlocks.length <= 1) return;

  // Shuffle all blocks (none are fixed)
  const shuffledBlocks = [...allBlocks];
  for (let i = shuffledBlocks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledBlocks[i], shuffledBlocks[j]] = [shuffledBlocks[j], shuffledBlocks[i]];
  }

  // Re-append blocks in new shuffled order
  shuffledBlocks.forEach(block => parent.appendChild(block));
});