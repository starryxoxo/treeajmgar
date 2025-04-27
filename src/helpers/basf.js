(function() {
  async function imgToBase64(img) {
    return new Promise((resolve, reject) => {
      const tempImg = new Image();
      tempImg.crossOrigin = "Anonymous";
      tempImg.src = img.src;

      tempImg.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width || tempImg.width;
        canvas.height = img.height || tempImg.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);
        try {
          const dataURL = canvas.toDataURL('image/png');
          resolve(dataURL);
        } catch (e) {
          reject(e);
        }
      };

      tempImg.onerror = (e) => reject(e);
    });
  }

  async function replaceImage(img) {
    // Save original style
    const prevFilter = img.style.filter;
    
    // Blur it immediately
    img.style.filter = 'blur(10px)';
    
    try {
      const base64 = await imgToBase64(img);
      img.src = base64;
    } catch (e) {
      console.error('Failed to convert image', e);
    } finally {
      // Remove blur after
      img.style.filter = prevFilter || '';
    }
  }

  async function replaceAllImgs() {
    const imgs = document.querySelectorAll('img');
    for (let img of imgs) {
      if (img.src.includes('imgur.com')) {
        await replaceImage(img);
      }
    }
  }

  // Also observe DOM changes in case images are added later
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      for (let node of mutation.addedNodes) {
        if (node.tagName === 'IMG' && node.src.includes('imgur.com')) {
          replaceImage(node);
        }
      }
    });
  });

  window.addEventListener('DOMContentLoaded', () => {
    replaceAllImgs();
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();