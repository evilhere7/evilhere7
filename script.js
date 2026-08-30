/**
 * ROSH4N | Personal Developer Portfolio
 * Vanilla JavaScript
 * Lightweight, accessible, no external dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --- 1. Dynamic Footer Year --- */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* --- 2. Mobile Menu Toggle --- */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    const toggleMenu = () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    };

    const closeMenu = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', toggleMenu);

    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* --- 3. Scrollspy (Active Nav Link & Back to Top Visibility) --- */
  const sections = document.querySelectorAll('section[id]');
  const floatingTop = document.getElementById('floating-top');

  const handleScrollState = () => {
    const scrollPosition = window.scrollY + 100;

    // Floating top button visibility
    if (floatingTop) {
      if (window.scrollY > 350) {
        floatingTop.classList.add('visible');
      } else {
        floatingTop.classList.remove('visible');
      }
    }

    // Active nav link
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => link.classList.remove('active'));
        if (matchingLink) {
          matchingLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScrollState, { passive: true });
  handleScrollState();

  /* --- 4. Scroll Reveal Animations --- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* --- 5. Contact Form Validation & Toast --- */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      // Clear errors
      document.querySelectorAll('.field-error').forEach((el) => {
        el.classList.remove('visible');
      });

      // Name validation
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showFieldError(nameInput, 'Please enter your name (at least 2 characters).');
        isValid = false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showFieldError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      }

      // Message validation
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showFieldError(messageInput, 'Please write a message with at least 10 characters.');
        isValid = false;
      }

      if (isValid) {
        showToast('This form is currently a demo. Connect a backend or Formspree to receive messages.');
        contactForm.reset();
      }
    });

    function showFieldError(inputEl, message) {
      const errorEl = inputEl.parentElement.querySelector('.field-error');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
      }
      inputEl.focus();
    }
  }

  /* --- 6. Demo Placeholder Click Feedback --- */
  document.querySelectorAll('.demo-placeholder-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
        showToast('Live preview link placeholder: Update href in index.html when deployed.');
      }
    });
  });

  document.querySelectorAll('.note-card').forEach((card) => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-note-title') || 'Note';
      showToast(`Note placeholder: "${title}" — Add your full post in index.html!`);
    });
  });
});
