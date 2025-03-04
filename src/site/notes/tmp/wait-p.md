---
{"dg-publish":true,"permalink":"/tmp/wait-p/"}
---


Loading...

ENHYPEN is a K-pop group in which leads this story. 
Check them out:
[Spotify](https://open.spotify.com/artist/5t5FqBwTcgKTaWmfEbwQY9?si=Z5WvcRiRRyGSlPOpt6hgJg) • [YouTube](https://youtube.com/@enhypenofficial?si=2biUjp3NN3Gsmktz)


<script>
document.addEventListener('DOMContentLoaded', (event) => {
    // Delay in milliseconds
    const delay = 30000; // 30 seconds

// Create a progress bar container
    const progressBarContainer = document.createElement('div');
    progressBarContainer.style.width = '100%';
    progressBarContainer.style.height = '20px';
    progressBarContainer.style.backgroundColor = '#ccc';
    progressBarContainer.style.marginTop = '10px';
    
    // Create the progress bar
    const progressBar = document.createElement('div');
    progressBar.style.width = '0%';
    progressBar.style.height = '100%';
    progressBar.style.backgroundColor = '#4caf50';
    
    // Append progress bar to the container
    progressBarContainer.appendChild(progressBar);
    document.body.appendChild(progressBarContainer);
    
    // Set the progress interval
    const interval = 1000; // Update every second
    let elapsedTime = 0;
    
    const progressInterval = setInterval(() => {
        elapsedTime += interval;
        const progressPercentage = (elapsedTime / delay) * 100;
        progressBar.style.width = progressPercentage + '%';
        
        if (elapsedTime >= delay) {
            clearInterval(progressInterval);
            window.location.href = 'https://yhmah.vercel.app/tmp/prologue'; // Change to your desired URL
        }
    }, interval);
});
</script>

![1ccb72d12a9042a171d481ee54dcf85e.jpg](/img/user/a%20storage/1ccb72d12a9042a171d481ee54dcf85e.jpg)