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
  // Find the "Start Reading" link/button
  const startReadingBtn = document.querySelector('a[href*="/sitn/"], a[href*="/sitnc/"], .start-reading-link');
  
  if (!startReadingBtn) return;
  
  // Create fixed full-width pill container (Wattpad-style)
  const pillContainer = document.createElement("div");
  pillContainer.id = "floating-start-reading";
  pillContainer.style.cssText = `
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 42px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.9);
    backdrop-filter: blur(10px);
    border-radius: 24px 24px 0 0;
    margin: 0 16px;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
  `;
  
  // Style the button for pill appearance
  startReadingBtn.style.cssText = `
    height: 42px;
    line-height: 42px;
    padding: 0 24px;
    margin: 0;
    border-radius: 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white !important;
    text-decoration: none !important;
    font-weight: 600;
    font-size: 16px;
    display: inline-flex;
    align-items: center;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
  `;
  
  // Add hover effect
  startReadingBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
    this.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.6)';
  });
  startReadingBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
  });
  
  // Move button to container
  pillContainer.appendChild(startReadingBtn);
  document.body.appendChild(pillContainer);
  
  // Adjust original table cell
  function adjustOriginalLocation() {
    const tableCell = document.evaluate(
      "//td[.//a[contains(@href, '/sitn/') or contains(@href, '/sitnc/') or contains(text(), 'Start Reading')]]",
      document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;
    
    if (tableCell) {
      // Keep only the rating content
      tableCell.innerHTML = '<small>PG | 13+ | Blood, detailed content</small>';
      tableCell.style.textAlign = 'center';
    }
  }
  
  // Initial adjustment
  adjustOriginalLocation();
  
  // Handle dynamic layout changes
  const observer = new MutationObserver(function() {
    const mainContent = document.querySelector("main.content.cm-s-obsidian");
    if (mainContent && !mainContent.classList.contains("floating-btn-adjusted")) {
      mainContent.classList.add("floating-btn-adjusted");
      adjustOriginalLocation();
    }
  });
  
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
  
  // Prevent body scroll interference
  pillContainer.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});
</script>