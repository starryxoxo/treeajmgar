---
{"dg-publish":true,"permalink":"/wait-p/"}
---


ADVERTISEMENT

<script>
    document.addEventListener('DOMContentLoaded', (event) => {
        // Delay in milliseconds
        const delay = 30000; // 30 seconds

        // Create a countdown element
        const countdownElement = document.createElement('div');
        countdownElement.id = 'countdown';
        countdownElement.style.fontSize = '20px';
        countdownElement.style.marginTop = '10px';
        document.body.appendChild(countdownElement);

        // Set the countdown timer
        let remainingTime = delay / 1000; // Convert milliseconds to seconds
        countdownElement.textContent = 'Redirecting in ' + remainingTime + ' seconds...';

        const interval = setInterval(() => {
            remainingTime--;
            countdownElement.textContent = 'Redirecting in ' + remainingTime + ' seconds...';
            if (remainingTime <= 0) {
                clearInterval(interval);
                window.location.href = 'https://yhmah.vercel.app/prologue'; // Change to your desired URL
            }
        }, 1000); // Update every second
    });
</script>
