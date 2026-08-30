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

  /* --- 2. Live Nepal Clock (UTC+5:45) --- */
  const clockElement = document.getElementById('nepal-clock');
  const updateNepalClock = () => {
    if (!clockElement) return;
    try {
      const now = new Date();
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kathmandu',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      clockElement.textContent = `${timeFormatter.format(now)} NPT`;
    } catch (e) {
      // Fallback
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const nptDate = new Date(utc + (3600000 * 5.75));
      clockElement.textContent = nptDate.toLocaleTimeString() + ' NPT';
    }
  };
  updateNepalClock();
  setInterval(updateNepalClock, 1000);

  /* --- 3. Mobile Menu Toggle --- */
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
  }

  /* --- 4. Scrollspy (Active Nav Link & Back to Top Visibility) --- */
  const sections = document.querySelectorAll('section[id]');
  const floatingTop = document.getElementById('floating-top');

  const handleScrollState = () => {
    const scrollPosition = window.scrollY + 120;

    if (floatingTop) {
      if (window.scrollY > 350) {
        floatingTop.classList.add('visible');
      } else {
        floatingTop.classList.remove('visible');
      }
    }

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

  /* --- 5. Scroll Reveal Animations --- */
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

  /* --- 6. Notification Toast Utility --- */
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

  /* --- 7. Copy Email to Clipboard --- */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'evilmc777@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copied to clipboard: ' + email);
        copyEmailBtn.textContent = '✓ Copied';
        setTimeout(() => {
          copyEmailBtn.textContent = '📋 Copy';
        }, 2500);
      }).catch(() => {
        showToast('Email: ' + email);
      });
    });
  }

  /* --- 8. Project Category Filters --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* --- 8.1 Skill Category Tabs Filter --- */
  const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCategoryRows = document.querySelectorAll('.skill-category-row');

  skillTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      skillTabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const tab = btn.getAttribute('data-skill-tab');

      skillCategoryRows.forEach((row) => {
        const group = row.getAttribute('data-skill-group');
        if (tab === 'all' || group === tab) {
          row.classList.remove('hidden');
        } else {
          row.classList.add('hidden');
        }
      });
    });
  });

  /* --- 9. Interactive About Terminal --- */
  const terminalInput = document.getElementById('terminal-inline-input');
  const terminalLog = document.getElementById('about-terminal-log');

  if (terminalInput && terminalLog) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        // Add user command line
        const cmdRow = document.createElement('div');
        cmdRow.className = 'term-line';
        cmdRow.innerHTML = `<span class="term-prompt">rosh4n@dev:~$</span> ${escapeHTML(cmd)}`;
        terminalLog.appendChild(cmdRow);

        let outputHTML = '';
        switch (cmd) {
          case 'help':
            outputHTML = `
              Available commands:<br>
              &gt; <span style="color:var(--accent-green)">whoami</span> - Developer bio summary<br>
              &gt; <span style="color:var(--accent-green)">skills</span> - List core languages &amp; tools<br>
              &gt; <span style="color:var(--accent-green)">projects</span> - Active project summary<br>
              &gt; <span style="color:var(--accent-green)">time</span> - Current Nepal local time<br>
              &gt; <span style="color:var(--accent-green)">clear</span> - Reset terminal output
            `;
            break;

          case 'whoami':
            outputHTML = `ROSH4N (Roshan Rimal) &gt; Software Developer from Nepal 🇳🇵 passionate about cybersecurity, full-stack web development, and Minecraft server systems.`;
            break;

          case 'skills':
            outputHTML = `
              <strong>[Languages]</strong> C, C++, Python, JavaScript (ES6+), TypeScript, Java, SQL, Bash<br>
              <strong>[Frontend &amp; Web]</strong> HTML5, CSS3, React, Next.js, Tailwind CSS, Responsive Design<br>
              <strong>[Backend &amp; DB]</strong> Node.js, Express.js, PostgreSQL, Supabase, Firebase, REST APIs<br>
              <strong>[Tools &amp; DevOps]</strong> Git, GitHub, VS Code, Linux, Vercel, Docker Basics, Postman<br>
              <strong>[Security &amp; Systems]</strong> Network Protocols, OWASP Top 10, Linux Admin, Packet Analysis
            `;
            break;

          case 'projects':
            outputHTML = `1. Godam360 (E-commerce)<br>2. GramMate (Video Social)<br>3. Minecraft &amp; BedWars Tools`;
            break;

          case 'time':
            const now = new Date();
            outputHTML = `Local Time: ${now.toLocaleTimeString()} (Kathmandu, Nepal UTC+5:45)`;
            break;

          case 'clear':
            terminalLog.innerHTML = `
              <div class="term-line">
                <span class="term-prompt">rosh4n@dev:~$</span> whoami
              </div>
              <div class="term-output-text">
                ROSH4N &gt; Software Developer &amp; Cybersecurity Learner (Nepal 🇳🇵)
              </div>
            `;
            return;

          case '':
            break;

          default:
            outputHTML = `<span style="color:var(--accent-red)">bash: command not found: ${escapeHTML(cmd)}. Type 'help' for available commands.</span>`;
        }

        if (outputHTML) {
          const outRow = document.createElement('div');
          outRow.className = 'term-output-text';
          outRow.innerHTML = outputHTML;
          terminalLog.appendChild(outRow);
        }

        terminalLog.scrollTop = terminalLog.scrollHeight;
      }
    });
  }

  /* --- 10. Command Palette Modal & Keyboard Shortcuts --- */
  const paletteModal = document.getElementById('palette-modal');
  const openPaletteBtn = document.getElementById('open-palette-btn');
  const closePaletteBtn = document.getElementById('close-palette-btn');

  const openPalette = () => {
    if (paletteModal) paletteModal.classList.add('active');
  };

  const closePalette = () => {
    if (paletteModal) paletteModal.classList.remove('active');
  };

  if (openPaletteBtn) openPaletteBtn.addEventListener('click', openPalette);
  if (closePaletteBtn) closePaletteBtn.addEventListener('click', closePalette);

  // Global hotkeys
  document.addEventListener('keydown', (e) => {
    // Ignore hotkeys when typing in form inputs
    const activeTag = document.activeElement.tagName.toLowerCase();
    if (activeTag === 'input' || activeTag === 'textarea') {
      if (e.key === 'Escape') {
        document.activeElement.blur();
      }
      return;
    }

    if (e.key === '?' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      if (paletteModal && paletteModal.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape') {
      closePalette();
      closeNoteModal();
    } else if (e.key === '1') {
      scrollToId('home');
    } else if (e.key === '2') {
      scrollToId('about');
    } else if (e.key === '3') {
      scrollToId('skills');
    } else if (e.key === '4') {
      scrollToId('projects');
    } else if (e.key === '5') {
      scrollToId('journey');
    } else if (e.key === '6') {
      scrollToId('contact');
    } else if (e.key.toLowerCase() === 'g') {
      window.open('https://github.com/evilhere7', '_blank');
    } else if (e.key.toLowerCase() === 'c') {
      if (copyEmailBtn) copyEmailBtn.click();
    }
  });

  const scrollToId = (id) => {
    closePalette();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  document.querySelectorAll('.palette-item').forEach((item) => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      if (action === 'github') {
        window.open('https://github.com/evilhere7', '_blank');
        closePalette();
      } else if (action === 'copy') {
        if (copyEmailBtn) copyEmailBtn.click();
        closePalette();
      } else {
        scrollToId(action);
      }
    });
  });

  if (paletteModal) {
    paletteModal.addEventListener('click', (e) => {
      if (e.target === paletteModal) closePalette();
    });
  }

  /* --- 11. Note Reader Modal --- */
  const noteModal = document.getElementById('note-modal');
  const noteModalTitle = document.getElementById('note-modal-title');
  const noteModalBody = document.getElementById('note-modal-body');
  const closeNoteBtn = document.getElementById('close-note-btn');

  const notesContent = {
    'html-css': {
      title: 'Learning HTML & CSS',
      body: `
        <h4>Foundations Before Frameworks</h4>
        <p>When starting web development, it's tempting to immediately jump into modern component libraries or CSS frameworks. However, mastering native semantic HTML tags (&lt;header&gt;, &lt;section&gt;, &lt;article&gt;) and core CSS concepts (Flexbox, CSS Grid, custom properties) creates an intuition that makes learning any framework much faster.</p>
        <br>
        <p><em>Key Takeaways:</em> Clean structure simplifies accessibility, improves SEO, and ensures your websites remain fast and maintainable on any device.</p>
      `
    },
    'cybersecurity': {
      title: 'Getting Started With Cybersecurity',
      body: `
        <h4>Curiosity, Networks &amp; Defensive Coding</h4>
        <p>Cybersecurity is about understanding how protocols and systems operate beneath the surface. From packet inspection with Wireshark to Linux privilege escalation and web security vectors (SQL injection, XSS, CSRF), hands-on experimentation in isolated environments is the best learning ground.</p>
        <br>
        <p><em>Focus Areas:</em> Network security, defensive programming, and learning tools like Nmap, Burp Suite, and Kali Linux.</p>
      `
    },
    'projects': {
      title: 'Things I Learned Building Projects',
      body: `
        <h4>Why Real Projects Beat Tutorial Hell</h4>
        <p>Building real software—like e-commerce platforms (Godam360) or Minecraft server automation plugins—forces you to solve real constraints: database schema design, state management, asynchronous data fetching, and error handling.</p>
        <br>
        <p><em>Takeaway:</em> Don't be afraid of breaking things while coding. Every error log is a step toward understanding how software actually runs.</p>
      `
    }
  };

  const openNoteModal = (noteId) => {
    const note = notesContent[noteId];
    if (!note || !noteModal || !noteModalTitle || !noteModalBody) return;

    noteModalTitle.textContent = note.title;
    noteModalBody.innerHTML = note.body;
    noteModal.classList.add('active');
  };

  const closeNoteModal = () => {
    if (noteModal) noteModal.classList.remove('active');
  };

  if (closeNoteBtn) closeNoteBtn.addEventListener('click', closeNoteModal);

  document.querySelectorAll('.note-card').forEach((card) => {
    card.addEventListener('click', () => {
      const noteId = card.getAttribute('data-note-id');
      if (noteId) openNoteModal(noteId);
    });
  });

  if (noteModal) {
    noteModal.addEventListener('click', (e) => {
      if (e.target === noteModal) closeNoteModal();
    });
  }

  /* --- 12. Contact Form Validation --- */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      document.querySelectorAll('.field-error').forEach((el) => {
        el.classList.remove('visible');
      });

      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showFieldError(nameInput, 'Please enter your name (at least 2 characters).');
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showFieldError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      }

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

  /* --- 13. Demo Link Feedback --- */
  document.querySelectorAll('.demo-placeholder-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
        showToast('Live preview link placeholder: Update href in index.html when deployed.');
      }
    });
  });

  // Helper escape
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
