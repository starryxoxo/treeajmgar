---
{"dg-publish":true,"permalink":"/you-had-me-at-hello/prologue/"}
---

# Prologue

Time truly is something, isn't it? They say time *heals*—but why am I covered in blood? It is but one of a true battle between our hearts; something that's been interwoven, like two threads sewn together, hanging by a metal stick that keeps us alive. I do not dare touch this thread, as I warned myself it is sharp; it's a thread that can make my finger bleed. 

Like glass, I became fragile. Something didn't feel right.

Like a river lost in time, I could only differentiate so much between our realities and the fictional stories I've *dreamt of* every night
Wishing I won't the one that you'd be regretting to know. But, at last, it is me.

Father gave in to greed, as always. Anything from the lesser part of the family or, rather, *me* wouldn't be appreciated; my mouth didn't speak any further.

The time I raised the gun *only meters apart*, my eyes felt like I was swimming in the Atlantic Ocean, cold and drowning.

《 [[You Had Me at Hello/Chapter 1\|Chapter 1]] 》
《 [[home\|Home]]

 <script>
        function delayLink(link, delay) {
            const countdownElement = document.getElementById('countdown');
            countdownElement.style.display = 'block';

            let remainingTime = delay / 10000; // Convert milliseconds to seconds
            countdownElement.textContent = 'Redirecting in ' + remainingTime + ' seconds...';

            const interval = setInterval(function() {
                remainingTime--;
                countdownElement.textContent = 'Redirecting in ' + remainingTime + ' seconds...';
                if (remainingTime <= 0) {
                    clearInterval(interval);
                    window.location.href = link;
                }
            }, 10000); // Update every second
        }

        function handleLinkClick(event, link, delay) {
            event.preventDefault(); // Prevent the default link behavior
            delayLink(link, delay);
        }