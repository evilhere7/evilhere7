/**
 * ROSH4N | Personal Portfolio Script
 * Vanilla JavaScript for Hack Club Stardance Mission
 * Pure native JavaScript - Zero external dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================
     1. Dynamic Copyright Year
     ========================================== */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ==========================================
     2. Sticky Header & Navbar Scroll Effect
     ========================================== */
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.getElementById('back-to-top');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Header background blur effect
    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top floating button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check on load

  /* ==========================================
     3. Mobile Navigation Menu Toggle
     ========================================== */
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

    // Close when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // Close on ESC key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* ==========================================
     4. Scrollspy (Active Navigation Link on Scroll)
     ========================================== */
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY + 120;

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

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  /* ==========================================
     5. Hero Section Typing Animation
     ========================================== */
  const typedTextSpan = document.querySelector('.typed-text');
  if (typedTextSpan) {
    const textArray = [
      'Software Developer',
      'Full-Stack Developer',
      'Cybersecurity Learner',
      'Open Source Enthusiast',
      'Builder from Nepal 🇳🇵'
    ];
    const typingDelay = 90;
    const erasingDelay = 45;
    const newTextDelay = 1800;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        setTimeout(erase, newTextDelay);
      }
    }

    function erase() {
      if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 300);
      }
    }

    // Start typewriter
    setTimeout(type, 800);
  }

  /* ==========================================
     6. Scroll Reveal Animations (Intersection Observer)
     ========================================== */
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
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* ==========================================
     7. Interactive Developer Terminal
     ========================================== */
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-content');

  if (terminalInput && terminalBody) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        // Print command line
        const cmdLine = document.createElement('div');
        cmdLine.className = 'terminal-line';
        cmdLine.innerHTML = `<span class="prompt">rosh4n@dev:~$</span> <span class="term-cmd">${escapeHTML(cmd)}</span>`;
        terminalBody.appendChild(cmdLine);

        // Process response
        let responseHTML = '';
        switch (cmd) {
          case 'help':
            responseHTML = `
              <div class="term-output">
                <div>Available commands:</div>
                <div>  <span class="term-accent">whoami</span>      - Display developer identity</div>
                <div>  <span class="term-accent">skills</span>      - List core tech stack</div>
                <div>  <span class="term-accent">projects</span>    - Summary of featured projects</div>
                <div>  <span class="term-accent">location</span>    - Current location</div>
                <div>  <span class="term-accent">interests</span>   - Learning focus & passions</div>
                <div>  <span class="term-accent">contact</span>     - Quick contact channels</div>
                <div>  <span class="term-accent">clear</span>       - Clear the terminal console</div>
              </div>`;
            break;

          case 'whoami':
            responseHTML = `
              <div class="term-output">
                <span class="term-success">ROSH4N (Roshan Rimal)</span><br>
                &gt; Software Developer &amp; Full-Stack Developer<br>
                &gt; Cybersecurity Learner &amp; Open Source Explorer<br>
                &gt; Passionate builder turning ideas into reliable software
              </div>`;
            break;

          case 'skills':
            responseHTML = `
              <div class="term-output">
                <div><span class="term-accent">[Languages]</span> C, C++, Python, JavaScript, TypeScript</div>
                <div><span class="term-accent">[Web Dev]</span> HTML5, CSS3, JavaScript, React, Node.js</div>
                <div><span class="term-accent">[Tools]</span> Git, GitHub, VS Code, Vercel</div>
                <div><span class="term-accent">[Interests]</span> Cybersecurity, AI, Databases, Open Source</div>
              </div>`;
            break;

          case 'projects':
            responseHTML = `
              <div class="term-output">
                <div>1. <span class="term-accent">Godam360</span> - Nepal e-commerce &amp; logistics platform concept</div>
                <div>2. <span class="term-accent">GramMate</span> - Social video community platform concept</div>
                <div>3. <span class="term-accent">Minecraft / BedWars</span> - Server plugins &amp; automation tooling</div>
              </div>`;
            break;

          case 'location':
            responseHTML = `<div class="term-output">📍 Nepal 🇳🇵</div>`;
            break;

          case 'interests':
            responseHTML = `
              <div class="term-output">
                &gt; Full-Stack &amp; Web Development<br>
                &gt; Cybersecurity &amp; Ethical Hacking<br>
                &gt; Artificial Intelligence &amp; Automation<br>
                &gt; Minecraft Server Engineering &amp; Open Source
              </div>`;
            break;

          case 'contact':
            responseHTML = `
              <div class="term-output">
                &gt; GitHub: <a href="https://github.com/evilhere7" target="_blank" style="color:var(--accent-cyan)">https://github.com/evilhere7</a><br>
                &gt; Use the contact form below to drop a message!
              </div>`;
            break;

          case 'clear':
            terminalBody.innerHTML = `
              <div class="terminal-line">
                <span class="prompt">rosh4n@dev:~$</span> <span class="term-cmd">whoami</span>
              </div>
              <div class="terminal-line term-output">
                <span class="term-success">ROSH4N</span><br>
                &gt; Software Developer<br>
                &gt; Cybersecurity Learner<br>
                &gt; Full-Stack Developer<br>
                &gt; Builder from Nepal 🇳🇵
              </div>
            `;
            return;

          case '':
            break;

          default:
            responseHTML = `<div class="term-output" style="color:var(--accent-red)">bash: command not found: ${escapeHTML(cmd)}. Type <span class="term-accent">'help'</span> for a list of commands.</div>`;
        }

        if (responseHTML) {
          const respLine = document.createElement('div');
          respLine.className = 'terminal-line';
          respLine.innerHTML = responseHTML;
          terminalBody.appendChild(respLine);
        }

        // Scroll terminal to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });
  }

  /* ==========================================
     8. Contact Form Validation & Demo Toast
     ========================================== */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  function showToast(title, message, isError = false) {
    if (!toast) return;

    const toastTitle = toast.querySelector('.toast-title');
    const toastDesc = toast.querySelector('.toast-desc');
    const toastIcon = toast.querySelector('.toast-icon');

    if (toastTitle) toastTitle.textContent = title;
    if (toastDesc) toastDesc.textContent = message;
    
    if (isError) {
      toast.style.borderColor = 'var(--accent-red)';
      if (toastIcon) toastIcon.style.color = 'var(--accent-red)';
    } else {
      toast.style.borderColor = 'var(--accent-green)';
      if (toastIcon) toastIcon.style.color = 'var(--accent-green)';
    }

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      // Clear previous error messages
      document.querySelectorAll('.form-feedback').forEach((el) => {
        el.classList.remove('visible');
      });

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showError(nameInput, 'Please enter your name (at least 2 characters).');
        isValid = false;
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showError(messageInput, 'Please write a message with at least 10 characters.');
        isValid = false;
      }

      if (isValid) {
        // Show demo notification
        showToast(
          'Message Received (Demo Mode)',
          'Thanks for reaching out! The form is currently a demo. Connect a backend or Formspree to enable live email delivery.'
        );
        contactForm.reset();
      }
    });

    function showError(inputEl, message) {
      const feedbackEl = inputEl.parentElement.querySelector('.form-feedback');
      if (feedbackEl) {
        feedbackEl.textContent = message;
        feedbackEl.classList.add('visible');
      }
      inputEl.focus();
    }
  }

  /* ==========================================
     9. Interactive Modal Handler (For Project Demos & Notes)
     ========================================== */
  const modalOverlay = document.getElementById('info-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close');

  const openModal = (title, htmlContent) => {
    if (!modalOverlay || !modalTitle || !modalContent) return;
    modalTitle.textContent = title;
    modalContent.innerHTML = htmlContent;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // Modal triggers for project demos
  document.querySelectorAll('[data-demo-target]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-demo-target');

      if (target === 'godam360') {
        openModal(
          'Godam360 Project Details',
          `
          <p style="color:var(--text-secondary); margin-bottom:1rem;">
            <strong>Godam360</strong> is an e-commerce platform concept focused on making online shopping and logistics easier for users in Nepal.
          </p>
          <div style="background:rgba(0,245,160,0.06); padding:1rem; border-radius:8px; border:1px solid rgba(0,245,160,0.2); margin-bottom:1rem;">
            <h5 style="color:var(--accent-green); margin-bottom:0.5rem;">Tech Stack:</h5>
            <p style="font-family:var(--font-mono); font-size:0.85rem; color:#cbd5e1;">React • TypeScript • Node.js • PostgreSQL • Supabase</p>
          </div>
          <p style="font-size:0.9rem; color:var(--text-muted);">
            <em>Status: Concept &amp; Prototype. Live deployment link can be configured in <code>index.html</code> when ready.</em>
          </p>
          `
        );
      } else if (target === 'grammate') {
        openModal(
          'GramMate Project Details',
          `
          <p style="color:var(--text-secondary); margin-bottom:1rem;">
            <strong>GramMate</strong> is a social media platform concept where users can create and share video content and interact with a community.
          </p>
          <div style="background:rgba(236,72,153,0.06); padding:1rem; border-radius:8px; border:1px solid rgba(236,72,153,0.2); margin-bottom:1rem;">
            <h5 style="color:var(--accent-pink); margin-bottom:0.5rem;">Tech Stack:</h5>
            <p style="font-family:var(--font-mono); font-size:0.85rem; color:#cbd5e1;">React • JavaScript • Supabase • Firebase</p>
          </div>
          <p style="font-size:0.9rem; color:var(--text-muted);">
            <em>Status: Concept &amp; UI exploration. Replace with live preview URL in <code>index.html</code>.</em>
          </p>
          `
        );
      } else if (target === 'minecraft') {
        openModal(
          'Minecraft & BedWars Tooling',
          `
          <p style="color:var(--text-secondary); margin-bottom:1rem;">
            Experimenting with custom Minecraft servers, plugins, automation, and AI-related gameplay integrations while mastering backend logic and Java.
          </p>
          <div style="background:rgba(59,130,246,0.06); padding:1rem; border-radius:8px; border:1px solid rgba(59,130,246,0.2); margin-bottom:1rem;">
            <h5 style="color:var(--accent-blue); margin-bottom:0.5rem;">Key Focus:</h5>
            <p style="font-family:var(--font-mono); font-size:0.85rem; color:#cbd5e1;">Spigot / Paper API • Java Plugins • Automation • Game Logic</p>
          </div>
          <p style="font-size:0.9rem; color:var(--text-muted);">
            <em>Visit GitHub for open repositories and automation scripts.</em>
          </p>
          `
        );
      }
    });
  });

  // Modal triggers for placeholder blog articles
  document.querySelectorAll('[data-blog-target]').forEach((card) => {
    card.addEventListener('click', () => {
      const blogId = card.getAttribute('data-blog-target');
      let title = 'Article Note';
      let content = '';

      if (blogId === 'article-1') {
        title = 'What I Learned Building My First Website';
        content = `
          <p style="color:var(--text-secondary); margin-bottom:1rem;">
            Building my first website taught me the importance of foundational HTML structure, semantic tags, and how CSS layout systems like Flexbox and CSS Grid organize content cleanly across all devices.
          </p>
          <p style="color:var(--text-muted); font-size:0.9rem;">
            <em>Note: This is an editable placeholder card for future blog articles. You can add full markdown or separate HTML pages as you write new posts!</em>
          </p>
        `;
      } else if (blogId === 'article-2') {
        title = 'My Journey Into Cybersecurity';
        content = `
          <p style="color:var(--text-secondary); margin-bottom:1rem;">
            Exploring fundamental networking concepts, the OSI model, Linux terminal mastery, and web security vulnerabilities (OWASP Top 10) to write safer, resilient code.
          </p>
          <p style="color:var(--text-muted); font-size:0.9rem;">
            <em>Note: Placeholder note card for upcoming cybersecurity writeups and CTF notes.</em>
          </p>
        `;
      } else if (blogId === 'article-3') {
        title = "Things I'm Learning About Full-Stack Development";
        content = `
          <p style="color:var(--text-secondary); margin-bottom:1rem;">
            Bridging responsive frontend user interfaces with robust backend architectures, PostgreSQL schemas, real-time sync with Supabase, and REST/GraphQL APIs.
          </p>
          <p style="color:var(--text-muted); font-size:0.9rem;">
            <em>Note: Placeholder note card ready to be customized with your development stories.</em>
          </p>
        `;
      }

      openModal(title, content);
    });
  });

  // Helper function to prevent XSS in terminal command echo
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
});
