---
{"dg-publish":true,"dg-permalink":"publish-letter","permalink":"/publish-letter/"}
---

![unsentbanner.png](/img/user/loveletter/unsentbanner.png)
# Want to publish your own letter?

<form id="emailForm">
  <input type="text" style="width: 100%; padding: 24px; border-radius: 12px; margin-bottom: 12px;" id="subject" placeholder="To" required>
  <textarea id="body" style="width: 100%; padding: 24px; border-radius: 12px; margin-bottom: 12px; font-weight: 600; resize: vertical;" rows="6" placeholder="Your letter" required></textarea>
  <br>
  <button type="submit" style="padding: 30px; width: 100%; font-size: 1.1rem; border-radius: 12px;">Request</button>
</form>

This form will compose an email. Simply send the email to finalize the request.

<script>
  const form = document.getElementById('emailForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const to = "swornlibrary@gmail.com";
    const subject = encodeURIComponent(document.getElementById('subject').value);
    const body = encodeURIComponent(document.getElementById('body').value);

    let mailtoLink = 'mailto:';
    if (to) {
      mailtoLink += to;
    }
    mailtoLink += `?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  });
</script>

***

[[Home\|Home]] • Timeless Archives
Copyright © the sworn library
All Rights Reserved.

<script src="https://starryxoxo.github.io/treeajmgar/src/helpers/user/scripts/list.js"></script> 
<script src="https://starryxoxo.github.io/treeajmgar/src/helpers/user/scripts/ffunction.js"></script>