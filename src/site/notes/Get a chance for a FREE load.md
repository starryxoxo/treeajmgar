---
{"dg-publish":true,"dg-permalink":"load-spin","permalink":"/load-spin/"}
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

<canvas id="wheelCanvas" width="400" height="400"></canvas>
<button id="spinButton">Spin</button>
<div id="resultText"></div>

<script>
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const center = canvas.width / 2;
  const segments = [
    { label: 'FREE LOAD', weight: 0.007, color: '#FF5733' },
    { label: 'Spin Again', weight: 9, color: '#33FF57' },
    { label: '₱3 OFF', weight: 5, color: '#3357FF' },
    { label: 'FREE LOAD', weight: 0.005, color: '#FF33A1' },
    { label: 'Spin Again', weight: 9, color: '#A133FF' }
  ];

  let totalWeight = segments.reduce((sum, seg) => sum + seg.weight, 0);
  let startAngle = 0;
  let currentRotation = 0;
  let isSpinning = false;
  let spinStartTime = 0;
  let spinDuration = 5000; // spin duration in ms
  let spinEndAngle = 0;

  function drawWheel(rotation) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let anglePerUnit = (2 * Math.PI) / totalWeight;
    let angle = rotation;

    for (let i = 0; i < segments.length; i++) {
      let segmentAngle = segments[i].weight * anglePerUnit;
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, center - 10, angle, angle + segmentAngle);
      ctx.fillStyle = segments[i].color;
      ctx.fill();
      ctx.stroke();

      // draw label
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(angle + segmentAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = '18px Arial';
      ctx.fillText(segments[i].label, center - 20, 10);
      ctx.restore();

      angle += segmentAngle;
    }
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
    // ease out cubic for slowing down effect
    let easeOutProgress = 1 - Math.pow(1 - progress, 3);
    currentRotation = easeOutProgress * spinEndAngle;

    drawWheel(currentRotation);

    if (progress < 1) {
      requestAnimationFrame(animateSpin);
    } else {
      isSpinning = false;
      showResult(currentRotation);
    }
  }

  function showResult(rotation) {
    // Normalize rotation within 0 to 2PI
    let normalized = rotation % (2 * Math.PI);
    // Find which segment rotation stopped at, counting from top (270 degrees = -PI/2)
    // so adjust by -PI/2 for pointer at top center
    normalized = (2 * Math.PI + (3 * Math.PI / 2) - normalized) % (2 * Math.PI);

    let anglePerUnit = (2 * Math.PI) / totalWeight;
    let cumulativeAngle = 0;
    for (let i = 0; i < segments.length; i++) {
      cumulativeAngle += segments[i].weight * anglePerUnit;
      if (normalized <= cumulativeAngle) {
        document.getElementById('resultText').innerText = 'You won: ' + segments[i].label;
        break;
      }
    }
  }

  document.getElementById('spinButton').addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;

    let winningSegmentIndex = weightedRandomSegment();

    // Calculate spin angle to land on winning segment with some random offset
    let anglePerUnit = (2 * Math.PI) / totalWeight;
    let minAngle = 0;
    for (let i = 0; i < winningSegmentIndex; i++) {
      minAngle += segments[i].weight * anglePerUnit;
    }
    let maxAngle = minAngle + segments[winningSegmentIndex].weight * anglePerUnit;

    // Spin several full rotations plus land randomly within the winning segment angle
    let fullRotations = Math.floor(Math.random() * 3) + 4; // 4-6 spins
    let randomAngleInSegment = Math.random() * (maxAngle - minAngle) + minAngle;
    spinEndAngle = fullRotations * 2 * Math.PI + randomAngleInSegment;

    spinStartTime = null;
    requestAnimationFrame(animateSpin);
  });

  // draw initially at zero rotation
  drawWheel(0);
</script>
