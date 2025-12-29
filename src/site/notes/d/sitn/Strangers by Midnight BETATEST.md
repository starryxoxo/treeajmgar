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
|                                                                                                                               |
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
  
  // Create fixed pill container
  const pillContainer = document.createElement("div");
  pillContainer.id = "floating-start-reading";
  
  // Move the button to the new container
  pillContainer.appendChild(startReadingBtn);
  
  // Insert container at body end (will be positioned fixed)
  document.body.appendChild(pillContainer);
  
  // Handle responsive layout adjustment
  function adjustLayout() {
    const mainContent = document.querySelector("main.content.cm-s-obsidian");
    if (!mainContent) return;
    
    const isTwoColumn = mainContent.classList.contains("two-column-layout");
    const sidebar = document.querySelector(".sidebar-column");
    
    // Find the original table cell/row that contained the button
    const originalCell = document.evaluate(
      "//td[contains(., 'Start Reading') or .//a[contains(@href, '/sitn/') or contains(@href, '/sitnc/')]]",
      document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;
    
    if (originalCell) {
      // Clear the original cell content but keep structure
      const remainingContent = originalCell.cloneNode(true);
      const btnClone = remainingContent.querySelector('a[href*="/sitn/"], a[href*="/sitnc/"], .start-reading-link');
      if (btnClone) btnClone.remove();
      
      // Replace with rating/content only
      originalCell.innerHTML = remainingContent.innerHTML || '<small>PG | 13+ | Blood, detailed content</small>';
    }
    
    // Adjust sidebar content spacing if two-column layout
    if (isTwoColumn && sidebar) {
      const buttonsRow = sidebar.querySelector("td:has(.squared-button)");
      if (buttonsRow) {
        buttonsRow.style.paddingBottom = "20px";
      }
    }
  }
  
  // Initial adjustment
  adjustLayout();
  
  // Re-adjust on layout changes (for dynamic sidebar creation)
  const observer = new MutationObserver(debounce(adjustLayout, 100));
  observer.observe(document.body, { 
    childList: true, 
    subtree: true, 
    attributes: true, 
    attributeFilter: ['class'] 
  });
  
  // Handle window resize
  window.addEventListener("resize", debounce(adjustLayout, 100));
  
  // Utility debounce function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
});
</script>