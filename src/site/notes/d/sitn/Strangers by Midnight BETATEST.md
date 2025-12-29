---
{"dg-publish":true,"dg-permalink":"d/sitn/strangers-by-midnight/TEST","permalink":"/d/sitn/strangers-by-midnight/TEST/","title":"Strangers by Midnight test","tags":["book"]}
---


[[Home\|Home]]

***

|                                                                      Strangers by Midnight                                                                       |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                   ![coverimg](/img/user/d/sitn/sitncover.webp)                                                                    |
|                                                                2 pages • [[d/sitn/sitnc\|Start Reading]]                                                                |
| <button id="library-toggle" class="squared-button" onclick="toggleLibrary()">Add to Reading List</button><br><small>PG \| 13+ \| Blood, detailed content</small> |

<div class="fake-button-container">  <span class="fake-button">enhypen</span>  <span class="fake-button">oneshot</span>  <span class="fake-button">romance</span></div>

**Description** • <small>COMPLETED</small>
"If love isn't forever, why waste your time on it?"
That's what they always say. But with you, there's certainly more than love that I feel. Just as I began to realize my feelings deeper for you, nahanap ako ng tadhana. Why now...

**Author**: the sworn library
**Languages**: Tagalog, English
**Date**: April 14, 2025

| About ENHYPEN                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------- |
| ![[1ccb72d12a9042a171d481ee54dcf85e.jpg\|1ccb72d12a9042a171d481ee54dcf85e.jpg]]                                                                                     |
| **ENHYPEN** is a **South Korean** boy band formed by Belift Lab. Formerly a joint venture between CJ ENM [[arc/enh/ENHYPEN\|more...]] |
| <small>Source: Wikipedia CC-BY-SA 4.0</small>                                                                                 |

***

[[Home\|Home]]


Copyright © the sworn library
All Rights Reserved.

<script src="https://starryxoxo.github.io/treeajmgar/src/helpers/user/scripts/list.js"></script> 
<script src="https://starryxoxo.github.io/treeajmgar/src/helpers/user/scripts/ffunction.js"></script>

<script>
document.addEventListener("DOMContentLoaded", function() {
  // Find ANY "Start Reading" button/link - no path restrictions
  const startReadingBtn = Array.from(document.querySelectorAll('a, button')).find(el => 
    el.textContent.trim().includes('Start Reading')
  );
  
  if (!startReadingBtn) return;
  
  // Create transparent fixed full-width container
  const pillContainer = document.createElement("div");
  pillContainer.id = "floating-start-reading";
  pillContainer.style.cssText = `
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 42px;
    z-index: 10000;
    pointer-events: none;
  `;
  
  // Style button: 24px height, full width, white bg, black text, fully rounded
  startReadingBtn.style.cssText = `
    height: 24px !important;
    width: 100vw !important;
    max-width: 100% !important;
    line-height: 24px !important;
    margin: 0 !important;
    padding: 0 16px !important;
    border-radius: 12px !important;
    background: white !important;
    color: black !important;
    text-decoration: none !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    display: block !important;
    text-align: center !important;
    border: none !important;
    cursor: pointer !important;
    pointer-events: all !important;
    box-sizing: border-box !important;
    position: absolute !important;
    bottom: 9px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    box-shadow: 0 -2px 12px rgba(0,0,0,0.15) !important;
  `;
  
  // Remove from original location and move to container
  startReadingBtn.remove();
  pillContainer.appendChild(startReadingBtn);
  document.body.appendChild(pillContainer);
  
  // Handle mobile viewport adjustment
  window.addEventListener('resize', function() {
    startReadingBtn.style.width = window.innerWidth + 'px';
  });
});
</script>