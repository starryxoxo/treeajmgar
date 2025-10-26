---
{"dg-publish":true,"dg-permalink":"load-spins","permalink":"/load-spins/"}
---


# Get a chance for a FREE load!

<style>
  #wheelCanvas {
    border: 2px solid #444;
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
<button id="spinButton">Spin</button>
<div id="resultText"></div>

<script>
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const center = canvas.width / 2;
  const segments = [
    { label: 'FREE LOAD', weight: 0.007  },
    { label: 'Spin Again', weight: 9 },
    { label: '₱3 OFF', weight: 5 },
    { label: 'FREE LOAD', weight: 0.005 },
    { label: 'Spin Again', weight: 9 }
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
      ctx.fillStyle = '#000'; // black text for contrast
      ctx.font = '18px Arial';
      ctx.fillText(segments[i].label, center - 20, 10);
      ctx.restore();
    }

    ctx.restore();
  }

  function weightedRandomSegment() {
    let rand = Math.random() * totalWeight;
    let cumulative = 0;
    for (let i = 0; i < segments.length; i++) {
      cumulative += segments[i].weight;
      if (rand < cumulative) {
        return i;
      }
    }
    return segments.length - 1; // fallback
  }

  function animateSpin(timestamp) {
    if (!spinStartTime) spinStartTime = timestamp;
    let elapsed = timestamp - spinStartTime;

    let progress = Math.min(elapsed / spinDuration, 1);
    let easeOutProgress = 1 - Math.pow(1 - progress, 3); // cubic easing out
    currentRotation = easeOutProgress * spinEndAngle;

    drawWheelEqual(currentRotation);

    if (progress < 1) {
      requestAnimationFrame(animateSpin);
    } else {
      isSpinning = false;
      showResult(currentRotation);
    }
  }

  function showResult(rotation) {
    let normalized = rotation % (2 * Math.PI);
    normalized = (2 * Math.PI + (3 * Math.PI / 2) - normalized) % (2 * Math.PI);

    const segmentAngle = 2 * Math.PI / segments.length;
    let index = Math.floor(normalized / segmentAngle);

    document.getElementById('resultText').innerText = 'You won: ' + segments[index].label;
  }

  document.getElementById('spinButton').addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;

    let winningSegmentIndex = weightedRandomSegment();

    const segmentAngle = 2 * Math.PI / segments.length;
    // Calculate angle range for chosen segment with random offset
    let minAngle = winningSegmentIndex * segmentAngle;
    let maxAngle = minAngle + segmentAngle;

    // Spin several full rotations plus land within winning segment
    let fullRotations = Math.floor(Math.random() * 3) + 4; // 4-6 full spins
    let randomAngleInSegment = Math.random() * (maxAngle - minAngle) + minAngle;
    spinEndAngle = fullRotations * 2 * Math.PI + randomAngleInSegment;

    spinStartTime = null;
    requestAnimationFrame(animateSpin);
  });

  drawWheelEqual(0);
</script>
