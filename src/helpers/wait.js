(function() {
  async function imgToBase64(img) {
    return new Promise((resolve, reject) => {
      const tempImg = new Image();
      tempImg.crossOrigin = "Anonymous";
      tempImg.src = img.src;

      tempImg.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = tempImg.width;
        canvas.height = tempImg.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(tempImg, 0, 0);
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

  async function convertImage(img) {
    try {
      const base64 = await imgToBase64(img);
      img.src = base64;
    } catch (e) {
      console.error('Failed to convert image:', img.src, e);
    }
  }

  async function preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  }

  async function convertAllImgs() {
    const imgs = document.querySelectorAll('img');
    const imgSrcs = [];

    for (const img of imgs) {
      if (img.src.includes('imgur.com') && !img.src.startsWith('data:')) {
        imgSrcs.push(img.src); // Save the source for preloading
      }
    }

    // Preload all imgur images in the background
    const preloadPromises = imgSrcs.map(preloadImage);
    await Promise.all(preloadPromises);

    // Once preloaded, convert them to base64
    for (const img of imgs) {
      if (img.src.includes('imgur.com') && !img.src.startsWith('data:')) {
        await convertImage(img);
      }
    }
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.tagName === 'IMG' && node.src.includes('imgur.com')) {
          preloadImage(node.src).then(() => convertImage(node));
        }
      }
    }
  });

  window.addEventListener('DOMContentLoaded', () => {
    convertAllImgs();
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();