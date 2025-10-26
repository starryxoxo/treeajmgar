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

  let totalWeight = segments.reduce((sum, seg) => sum + seg.weight, 0);
  let currentRotation = 0;
  let isSpinning = false;
  let spinStartTime = 0;
  let spinDuration = 5000; // spin duration in ms
  let spinEndAngle = 0;

  function drawWheelEqual(rotation = 0) {
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
      ctx.fillStyle = 'rgba(0,0,0,0)'; // transparent fill to remove colors
      ctx.fill();
      ctx.stroke();

      // Draw text label
      ctx.save();
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff'; // black text for contrast
      ctx.font = '18px Arial';
      ctx.fillText(segments[i].label, center - 20, 10);
      ctx.restore();
    }

    ctx.restore();
  }

function weightedRandomSegment() {
  // Filter only non-zero weight segments with their original indexes
  const filteredSegments = segments
    .map((seg, idx) => ({ ...seg, originalIndex: idx }))
    .filter(seg => seg.weight > 0);

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

let currentRotation = 0;
let isSpinning = false;
let spinStartTime = 0;
let spinDuration = 5000; // ms
let spinEndAngle = 0;
let chosenSegmentIndex = null;

function drawWheelEqual(rotation = 0) {
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
  const filteredSegments = segments
    .map((seg, idx) => ({ ...seg, originalIndex: idx }))
    .filter(seg => seg.weight > 0);

  const totalFilteredWeight = filteredSegments.reduce((sum, seg) => sum + seg.weight, 0);
  let rand = Math.random() * totalFilteredWeight;

  for (let seg of filteredSegments) {
    rand -= seg.weight;
    if (rand < 0) {
      return seg.originalIndex;
    }
  }
  return filteredSegments[filteredSegments.length - 1].originalIndex;
}

function animateSpin(timestamp) {
  if (!spinStartTime) spinStartTime = timestamp;
  let elapsed = timestamp - spinStartTime;

  let progress = Math.min(elapsed / spinDuration, 1);
  let easeOutProgress = 1 - Math.pow(1 - progress, 3);
  currentRotation = easeOutProgress * spinEndAngle;

  drawWheelEqual(currentRotation);

  if (progress < 1) {
    requestAnimationFrame(animateSpin);
  } else {
    isSpinning = false;
    showResult();
  }
}

function showResult() {
  document.getElementById('resultText').innerText = 'You won: ' + segments[chosenSegmentIndex].label;
}

document.getElementById('spinButton').addEventListener('click', () => {
  if (isSpinning) return;
  isSpinning = true;

  chosenSegmentIndex = weightedRandomSegment();

  const segmentAngle = 2 * Math.PI / segments.length;
  let minAngle = chosenSegmentIndex * segmentAngle;
  let maxAngle = minAngle + segmentAngle;

  let fullRotations = Math.floor(Math.random() * 3) + 4;
  let randomAngleInSegment = Math.random() * (maxAngle - minAngle) + minAngle;
  spinEndAngle = fullRotations * 2 * Math.PI + randomAngleInSegment;

  spinStartTime = null;
  requestAnimationFrame(animateSpin);
});

const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();
ctx.strokeStyle = textColor || '#fff';
ctx.fillStyle = textColor || '#fff';

drawWheelEqual(currentRotation);

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






