/**
 * Contact Form Interaction
 * Handles form validation, shake animation on error,
 * asynchronous submission via fetch, and success state display.
 */
export function initContact() {
  const btn = document.getElementById('submitBtn');
  if (!btn) return;

  const label = btn.textContent;
  btn.addEventListener('click', async () => {
    const n = document.querySelector('[name=name]')?.value?.trim();
    const e = document.querySelector('[name=email]')?.value?.trim();
    const m = document.querySelector('[name=message]')?.value?.trim();
    const s = document.querySelector('[name=subject]')?.value || '';

    if (!n || !e || !m) {
      btn.style.animation = 'shake .4s ease';
      setTimeout(() => (btn.style.animation = ''), 400);
      return;
    }

    btn.disabled = true;
    btn.textContent = '⏳ Envoi...';

    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: n, email: e, subject: s, message: m }),
      });
      const d = await r.json();
      if (d.success) {
        const successMsg = document.getElementById('successMsg');
        if (successMsg) successMsg.style.display = 'block';
        document.querySelectorAll('[name]').forEach(i => (i.value = ''));
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
    } finally {
      btn.disabled = false;
      btn.textContent = label;
    }
  });
}

