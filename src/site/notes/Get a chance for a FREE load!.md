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
<button id="spinButton" style="width: 100%; padding: 30px; border-radius: 12px; font-size: 1.2rem;" >Spin</button>
<div id="resultText"></div>

<script>
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const center = canvas.width / 2;

const segments = [
  { label: 'FREE LOAD', weight: 0  },
  { label: 'Spin Again', weight: 900 },
  { label: '₱2 OFF', weight: 400 },
  { label: 'FREE LOAD', weight: 0 },
  { label: 'Spin Again', weight: 1000 },
  { label: 'FREE LOAD', weight: 0 },
  { label: '₱4 OFF', weight: 200 }
];

// Runtime state
let currentRotation = 0;
let isSpinning = false;
let spinStartTime = 0;
let spinDuration = 5000;
let spinEndAngle = 0;
let chosenSegmentIndex = null;

function drawWheel(rotation = 0) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(center, center);
  ctx.rotate(rotation);

  const segmentAngle = 2 * Math.PI / segments.length;

  for (let i = 0; i < segments.length; i++) {
    const startAngle = i * segmentAngle;
    const endAngle = startAngle + segmentAngle;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, center - 10, startAngle, endAngle);
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fill();
    ctx.stroke();

    // Label
    ctx.save();
    ctx.rotate(startAngle + segmentAngle / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px Arial';
    ctx.fillText(segments[i].label, center - 20, 10);
    ctx.restore();
  }

  ctx.restore();
}

function weightedRandomSegment() {
  // Exclude zero-weight segments from selection
  const pool = segments
    .map((s, idx) => ({ label: s.label, weight: s.weight, originalIndex: idx }))
    .filter(s => s.weight > 0);

  const total = pool.reduce((acc, s) => acc + s.weight, 0);
  let r = Math.random() * total;

  for (const s of pool) {
    r -= s.weight;
    if (r < 0) return s.originalIndex;
  }

  // Fallback (shouldn’t happen)
  return pool[pool.length - 1].originalIndex;
}

function animateSpin(timestamp) {
  if (!spinStartTime) spinStartTime = timestamp;
  const elapsed = timestamp - spinStartTime;

  const progress = Math.min(elapsed / spinDuration, 1);
  const ease = 1 - Math.pow(1 - progress, 3);
  currentRotation = ease * spinEndAngle;

  drawWheel(currentRotation);

  if (progress < 1) {
    requestAnimationFrame(animateSpin);
  } else {
    isSpinning = false;
    // Show the fixed, chosen result
    const label = segments[chosenSegmentIndex].label;
    document.getElementById('resultText').innerText = 'You won: ' + label;
  }
}

// Initialize
drawWheel(currentRotation);

document.getElementById('spinButton').addEventListener('click', () => {
  if (isSpinning) return;
  isSpinning = true;

  chosenSegmentIndex = weightedRandomSegment();

  const segmentAngle = 2 * Math.PI / segments.length;
  const minAngle = chosenSegmentIndex * segmentAngle;
  const maxAngle = minAngle + segmentAngle;

  // Spin a few rotations plus land in the chosen segment
  const fullRotations = Math.floor(Math.random() * 3) + 4; // 4-6 full spins
  const landing = Math.random() * (maxAngle - minAngle) + minAngle;
  spinEndAngle = fullRotations * 2 * Math.PI + landing;

  spinStartTime = null;
  requestAnimationFrame(animateSpin);
});

// Styling hook for stroke/fill if you use a CSS variable
const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();
if (textColor) {
  ctx.strokeStyle = textColor;
  ctx.fillStyle = textColor;
}
</script>

<br>
<details>
<summary>
Mechanics
</summary>
• You are given two chances to spin the wheel per load, unless given another round by the wheel. <br>
• You will be monitored as you spin the wheel. <br>
• The free load which you can get through spinning the wheel.<br>
• Your last spin will be the spin that is valid and the one that will be used.<br>
• The free load must not exceed ₱100, excluding the charge fee.<br>
• The ₱2 and ₱4 off is only usable to your next load.
</details>
<br>

<details>
<summary>
Wheel Chances
</summary>
• Free Load: 1%, 3%, 5%, increasing chances per spin.<br>
• ₱2 Off: 20%, 40%, 80%, increasing chances per spin. <br>
• ₱4 Off: 10%, 30%, 70%, increasing chances per spin.<br>
• Spin Again: 50%
</details>






