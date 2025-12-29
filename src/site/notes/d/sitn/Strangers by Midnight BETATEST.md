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
  // Find ANY "Start Reading" link/button - no path restrictions
  const startReadingBtn = document.querySelector('a[href*="Start Reading"], a:contains("Start Reading"), .start-reading-link, [class*="start-reading"], td:has-text("Start Reading") a');
  
  if (!startReadingBtn || document.getElementById('floating-start-reading')) return;
  
  // Create transparent fixed container (Wattpad-style bottom bar)
  const pillContainer = document.createElement("div");
  pillContainer.id = "floating-start-reading";
  pillContainer.style.cssText = `
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 42px;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    pointer-events: none;
  `;
  
  // Style button as full-width 24px pill (white bg, black text, 100% rounded)
  startReadingBtn.style.cssText = `
    height: 24px;
    line-height: 24px;
    width: 100%;
    max-width: 100%;
    padding: 0 20px;
    margin: 0;
    border-radius: 100px;
    background: white;
    color: black !important;
    text-decoration: none !important;
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
    pointer-events: auto;
    text-align: center;
  `;
  
  // Hover effect
  startReadingBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-1px)';
    this.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)';
  });
  startReadingBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
  });
  
  // ONLY move the button - nothing else
  pillContainer.appendChild(startReadingBtn);
  document.body.appendChild(pillContainer);
});
</script>