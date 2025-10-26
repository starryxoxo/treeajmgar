---
{"dg-publish":true,"dg-permalink":"freeload","permalink":"/freeload/"}
---


# Get a chance for a FREE load!

<style>
  #wheelCanvas {
    border: 2px solid #fff;
    border-radius: 50%;
    display: block;
    margin: 20px auto;
  }
  #spinButton {
    display: block;
    margin: 0 auto;
    padding: 10px 20px;
    font-size: 18px;
  }
  #resultText {
    text-align: center;
    font-size: 22px;
    margin-top: 20px;
  }
</style>

<canvas id="wheelCanvas" width="300" height="300"></canvas>
<button id="spinButton" style="padding: 24px; font-size: 1.2rem; border-radius: 12px; width: 100%;">Spin</button>
<div id="resultText"></div>

<script>
  // Canvas setup
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const center = canvas.width / 2;

  // Segments and weights (customize as needed)
  const segments = [
    { label: 'FREE LOAD', weight: 0  },
    { label: 'Spin Again', weight: 2000 },
    { label: '₱2 OFF', weight: 400000 },
    { label: 'FREE LOAD', weight: 0.01 },
    { label: 'Spin Again', weight: 60000 },
    { label: 'No Spins', weight: 99999 },
    { label: 'FREE LOAD', weight: 0 },
    { label: '₱4 OFF', weight: 100010 }
  ];

  // State
  let currentRotation = 0;
  let isSpinning = false;
  let spinStartTime = 0;
  let spinDuration = 5000; // ms
  let spinEndAngle = 0;
  let chosenSegmentIndex = null;
  let snapTargetAngle = 0; // angle to snap to in last phase

  // Draw the wheel (no fill colors for clarity; customize if needed)
  function drawWheel(rotation = 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(rotation);

    const segmentAngle = (2 * Math.PI) / segments.length;

    for (let i = 0; i < segments.length; i++) {
      const a0 = i * segmentAngle;
      const a1 = a0 + segmentAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, center - 10, a0, a1);
      ctx.lineTo(0, 0);
      ctx.closePath();

      // Optional: alternate fill for readability
      ctx.fillStyle = (i % 2 === 0) ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.0)';
      ctx.fill();
      ctx.stroke();

      // Draw label
      ctx.save();
      ctx.rotate(a0 + segmentAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = '18px Arial';
      ctx.fillText(segments[i].label, center - 20, 10);
      ctx.restore();
    }

    ctx.restore();
  }

  // Weighted random (excludes zero-weight segments)
  function weightedRandomSegment() {
    const pool = segments
      .map((s, idx) => ({ label: s.label, weight: s.weight, index: idx }))
      .filter(s => s.weight > 0);

    const total = pool.reduce((acc, s) => acc + s.weight, 0);
    let r = Math.random() * total;

    for (const s of pool) {
      r -= s.weight;
      if (r < 0) return s.index;
    }
    // Fallback
    return pool[pool.length - 1].index;
  }

  // Animation
  function animateSpin(ts) {
    if (!spinStartTime) spinStartTime = ts;
    const elapsed = ts - spinStartTime;
    const progress = Math.min(elapsed / spinDuration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);

    // Snap logic in final phase
    if (progress >= 0.9) {
      currentRotation = snapTargetAngle;
    } else {
      currentRotation = easeOut * spinEndAngle;
    }

    drawWheel(currentRotation);

    if (progress < 1) {
      requestAnimationFrame(animateSpin);
    } else {
      isSpinning = false;
      // Use the exact chosen index for display
      document.getElementById('resultText').innerText = 'You won: ' + segments[chosenSegmentIndex].label;
    }
  }

  // Spin start
  document.getElementById('spinButton').addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;

    // Determine winner
    chosenSegmentIndex = weightedRandomSegment();

    // Calculate landing angles
    const segmentAngle = (2 * Math.PI) / segments.length;
    const targetCenter = chosenSegmentIndex * segmentAngle + segmentAngle / 2;
    const fullRotations = 4 + Math.floor(Math.random() * 3); // 4-6 full spins
    const landing = fullRotations * 2 * Math.PI + targetCenter;

    spinEndAngle = landing; // used for the main easing path
    snapTargetAngle = targetCenter + fullRotations * 2 * Math.PI; // exact center after full rotations

    // Reset timer and start
    spinStartTime = null;
    requestAnimationFrame(animateSpin);
  });

  // Initial render
  drawWheel(currentRotation);
</script>


<br>
<details>
<summary>
Mechanics
</summary>
• You are given two chances to spin the wheel per load, unless given another round by the wheel. <br>
• You will be monitored as you spin the wheel.<br>
• Your last spin will be the spin that is valid and the one that will be used.<br>
• The free load must not exceed ₱100, excluding the charge fee.<br>
• The ₱2 and ₱4 off is only usable to your next load.<br>
• The location of the spinner's hand can change.<br>
• There will be no charges for the free load.
</details>
<br>

<details>
<summary>
Wheel Chances
</summary>
• Free Load: 0.5%, 1%, 3%, increasing chances per spin.<br>
• ₱2 Off: 20%, 40%, 80%, increasing chances per spin. <br>
• ₱4 Off: 10%, 30%, 70%, increasing chances per spin.<br>
• Spin Again: 50%<br>
• No Spins: 20%
</details>
<br>

<details>
<summary>
Event information
</summary>
<b>In: Phase 1</b> - Free load chances are extremely low. Free load chances lay around 0.5% to 3%.<br>
<b>Phase 2</b> - Free load chances slightly increase from 0.5% to 4-6% (peak).<br>
<b>Phase 3</b> - Free load chances slightly increase from 6% to 7-10% (peak). ₱4 OFF is removed. Second ₱2 OFF is added.<br>
<b>Phase 4</b> - Given only one chance, free load chances increase from 10% to 15% (peak). ₱5 OFF is added.<br>
<b>Phase 5</b> - Given only one chance, free load chances increase from 15% to 20%. ₱5 OFF is removed, ₱2 OFF is removed (both). Spin again is removed.
</details>








