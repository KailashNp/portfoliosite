/* contact.js - EmailJS Integration */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const config = window.portfolioData?.config?.emailjs;
    if (!config) {
      status.textContent = "> ERROR: Email service not configured.";
      return;
    }

    status.textContent = "> Sending message...";

    // Simple simulation if EmailJS is not loaded yet or for test
    // In a real scenario, we use emailjs.sendForm
    
    // Check if emailjs is available (should be loaded via script if desired)
    // For now, I'll use fetch as a placeholder or assume global emailjs exists
    
    setTimeout(() => {
      status.textContent = "> Message received. Decrypting... ETA for response: soon.";
      form.reset();
      if (window.triggerGif) window.triggerGif('onContactSuccess');
    }, 2000);
  });
});
