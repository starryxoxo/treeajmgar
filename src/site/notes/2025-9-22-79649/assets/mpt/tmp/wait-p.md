---
{"dg-publish":true,"permalink":"/2025-9-22-79649/assets/mpt/tmp/wait-p/"}
---


Loading...

ENHYPEN is a K-pop group in which leads this story. 
Check them out:
[Spotify](https://open.spotify.com/artist/5t5FqBwTcgKTaWmfEbwQY9?si=Z5WvcRiRRyGSlPOpt6hgJg) • [YouTube](https://youtube.com/@enhypenofficial?si=2biUjp3NN3Gsmktz)


<script>
document.addEventListener('DOMContentLoaded', (event) => {
    // Delay in milliseconds
    const delay = 25000; // 30 seconds

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
    let elapsedTime = 0;
    
    function updateProgress() {
        if (elapsedTime >= delay) {
            window.location.href = 'https://yhmah.vercel.app/mpt/tmp/prologue'; // Change to your desired URL
            return;
        }
        
        // Generate a random delay between 200ms and 1500ms
        let randomDelay = Math.random() * 1800 + 200;
        
        // Simulate random progress increments
        let progressBoost = Math.random() * 10 + 5; // Between 2% and 12%
        elapsedTime += randomDelay;
        let progressPercentage = Math.min((elapsedTime / delay) * 100, 100);
        progressBar.style.width = progressPercentage + '%';
        
        setTimeout(updateProgress, randomDelay);
    }
    
    updateProgress();
});
</script>

![1ccb72d12a9042a171d481ee54dcf85e.jpg](/img/user/2025-9-22-79649/assets/a%20storage/1ccb72d12a9042a171d481ee54dcf85e.jpg)