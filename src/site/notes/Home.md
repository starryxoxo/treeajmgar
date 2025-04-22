---
{"dg-publish":true,"permalink":"/home/","title":"the sworn library","tags":["gardenEntry"]}
---

# the sworn library
Welcome to the sworn library!

> New to sworn library?
Click the [[light blue text\|light blue text]] to enter a link or a [[mpt/YHMAH\|book]].

<span style="color:#FFA500">Notice
This website is currently not optimized for desktop devices. Use a mobile device to ensure complete functionality.</span> [[dev/desktop\|Learn more]]

***

# Published Books
![sitnbanner.webp](/img/user/sitn/sitnbanner.webp)
> ➔ [[sitn/sitn\|Strangers by Midnight]] • Romance • Light AU


***

# Soon
![yeobanner.webp](/img/user/yeo/yeostorage/yeobanner.webp)
> ➔ [[yeo/yeo\|Your Eyes Only]] • Romance • Series

![tmpbanner.webp](/img/user/b%20storage/a%20storage/tmpbanner.webp)
>  ➔ [[mpt/YHMAH\|The Mafia's Princess]] 

---
Copyright © 2025 the sworn library
All Rights Reserved.

***

Bookmark this website and visit it every once in a while. Accompany us while we grow our collection! <3

<script>
const toggleButton = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

// Apply the saved theme preference on page load
if (currentTheme) {
  document.body.classList.add(currentTheme);
  toggleButton.textContent = currentTheme === "dark-mode" ? "☀️" : "🌙";
}

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  // Determine the active theme
  const newTheme = document.body.classList.contains("dark-mode") ? "dark-mode" : "light-mode";

  // Store the preference in localStorage
  localStorage.setItem("theme", newTheme);
  toggleButton.textContent = newTheme === "dark-mode" ? "☀️" : "🌙";
});

setInterval(() => {
    window.location.reload(true);
}, 300000); // Refresh every 5 minutes
</script>

<button id="theme-toggle" aria-label="Toggle theme">🌙</button>
