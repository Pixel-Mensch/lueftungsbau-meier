// Lüftungsbau Meier - Hauptskript
// Formular-Validierung, CSRF-Token-Generierung und Navigation

(function () {
  'use strict';

  // ==========================================
  // CSRF-Token beim Laden generieren
  // ==========================================
  function generateCSRFToken() {
    const tokenField = document.getElementById('csrf_token');
    if (!tokenField) return;

    // Token aus SessionStorage holen oder neu erstellen
    let token = sessionStorage.getItem('csrf_token');
    if (!token) {
      token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      sessionStorage.setItem('csrf_token', token);
    }
    tokenField.value = token;

    // Token auch an Backend senden für Session-Sync
    fetch('backend/csrf_init.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'csrf_token=' + encodeURIComponent(token),
    }).catch(() => {
      // Fallback: Token bleibt client-seitig
    });
  }

  // ==========================================
  // Formular-Validierung und Submit-Handling
  // ==========================================
  function setupFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Client-seitige Validierung
      let isValid = true;
      const errors = [];

      // Name validieren
      if (!nameField.value.trim()) {
        errors.push('Bitte geben Sie Ihren Namen ein.');
        nameField.classList.add('error');
        isValid = false;
      } else {
        nameField.classList.remove('error');
      }

      // E-Mail validieren
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailField.value.trim() || !emailPattern.test(emailField.value)) {
        errors.push('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        emailField.classList.add('error');
        isValid = false;
      } else {
        emailField.classList.remove('error');
      }

      // Nachricht validieren
      if (!messageField.value.trim() || messageField.value.trim().length < 10) {
        errors.push('Bitte geben Sie eine Nachricht mit mindestens 10 Zeichen ein.');
        messageField.classList.add('error');
        isValid = false;
      } else {
        messageField.classList.remove('error');
      }

      // Fehler anzeigen
      if (!isValid) {
        showFormMessage(errors.join('<br>'), 'error');
        return;
      }

      // Loading-State aktivieren
      submitButton.disabled = true;
      submitButton.textContent = 'Wird gesendet...';
      submitButton.classList.add('loading');

      // Formular via AJAX senden
      const formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Serverfehler: ' + response.status);
          }
          return response.text();
        })
        .then((html) => {
          // Erfolg
          if (html.includes('Vielen Dank')) {
            showFormMessage(
              'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns schnellstmöglich bei Ihnen.',
              'success'
            );
            form.reset();
            generateCSRFToken(); // Neues Token generieren
          } else {
            // Fehler vom Server
            showFormMessage(
              'Es gab ein Problem beim Versenden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.',
              'error'
            );
          }
        })
        .catch(() => {
          showFormMessage(
            'Verbindungsfehler. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
            'error'
          );
        })
        .finally(() => {
          // Loading-State deaktivieren
          submitButton.disabled = false;
          submitButton.textContent = 'Nachricht senden';
          submitButton.classList.remove('loading');
        });
    });
  }

  // Feedback-Nachricht anzeigen
  function showFormMessage(message, type) {
    // Alte Nachricht entfernen
    const oldMessage = document.querySelector('.form-message');
    if (oldMessage) oldMessage.remove();

    const messageBox = document.createElement('div');
    messageBox.className = 'form-message form-message-' + type;
    messageBox.innerHTML = message;

    const form = document.querySelector('.contact-form');
    form.insertAdjacentElement('beforebegin', messageBox);

    // Nach 8 Sekunden ausblenden
    setTimeout(() => {
      messageBox.style.opacity = '0';
      setTimeout(() => messageBox.remove(), 300);
    }, 8000);
  }

  // ==========================================
  // Navigation: Smooth Scroll & Active State
  // ==========================================
  function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            const headerHeight = document.querySelector('.site-header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 16;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth',
            });
          }
        }
      });
    });

    // Active State bei Scroll
    window.addEventListener('scroll', function () {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }

  // ==========================================
  // Initialisierung
  // ==========================================
  document.addEventListener('DOMContentLoaded', function () {
    generateCSRFToken();
    setupFormValidation();
    setupNavigation();
  });
})();
