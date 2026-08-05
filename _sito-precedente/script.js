/* ═══════════════════════════════════════════════════════════════
   DISORDER PUBLIC HOUSE — JavaScript
   Scroll-driven animation, menu tabs, scroll reveals, navigation
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     1. SCROLL-DRIVEN FRAME ANIMATION (Hero)
     ───────────────────────────────────────────── */
  const TOTAL_FRAMES = 240;
  const FRAME_PATH = 'TRAILER/frames/frame_';
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  const heroSection = document.querySelector('.hero');
  const heroLogo = document.getElementById('heroLogo');
  const scrollHint = document.getElementById('scrollHint');
  const heroLoader = document.getElementById('heroLoader');
  const loaderFill = document.getElementById('loaderFill');
  const loaderText = document.getElementById('loaderText');

  // Frame image cache
  const frames = new Array(TOTAL_FRAMES);
  let loadedCount = 0;
  let currentFrame = 0;
  let canvasReady = false;

  // Build padded frame filename
  function frameSrc(index) {
    const num = String(index + 1).padStart(5, '0');
    return `${FRAME_PATH}${num}.webp`;
  }

  // Set canvas size to match viewport
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (frames[currentFrame]) drawFrame(currentFrame);
  }

  // Draw a frame on the canvas (cover mode)
  function drawFrame(index) {
    const img = frames[index];
    if (!img || !img.complete) return;

    const cw = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
    const ch = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover fit
    const scale = Math.max(cw / iw, ch / ih);
    const w = iw * scale;
    const h = ih * scale;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, w, h);
  }

  // Preload all frames
  function preloadFrames() {
    // Load priority frames first (every 10th), then fill in
    const priorityIndices = [];
    for (let i = 0; i < TOTAL_FRAMES; i += 8) priorityIndices.push(i);

    const allIndices = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (!priorityIndices.includes(i)) allIndices.push(i);
    }

    const loadOrder = [...priorityIndices, ...allIndices];
    let loadIndex = 0;

    function loadNext() {
      if (loadIndex >= loadOrder.length) return;

      const batchSize = 6;
      const batch = loadOrder.slice(loadIndex, loadIndex + batchSize);
      loadIndex += batchSize;

      batch.forEach(i => {
        const img = new Image();
        img.onload = () => {
          frames[i] = img;
          loadedCount++;

          const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
          loaderFill.style.width = pct + '%';
          loaderText.textContent = pct + '%';

          // Draw first frame as soon as it loads
          if (i === 0 && !canvasReady) {
            canvasReady = true;
            drawFrame(0);
          }

          // Hide loader when enough frames are loaded
          if (loadedCount >= 30 && heroLoader && !heroLoader.classList.contains('loaded')) {
            heroLoader.classList.add('loaded');
          }

          if (loadedCount >= loadOrder.length) return;
        };
        img.onerror = () => {
          loadedCount++;
        };
        img.src = frameSrc(i);
      });

      // Schedule next batch
      requestAnimationFrame(() => {
        setTimeout(loadNext, 16);
      });
    }

    loadNext();
  }

  // Update frame based on scroll position
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateHero);
      ticking = true;
    }
  }

  function updateHero() {
    ticking = false;

    const heroRect = heroSection.getBoundingClientRect();
    const heroHeight = heroSection.offsetHeight - window.innerHeight;
    const scrolled = -heroRect.top;
    const progress = Math.max(0, Math.min(1, scrolled / heroHeight));

    // Map scroll progress to frame index
    const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));

    // Only redraw if frame changed
    if (frameIndex !== currentFrame && frames[frameIndex]) {
      currentFrame = frameIndex;
      drawFrame(frameIndex);
    }

    // Logo reveal — starts at 75% scroll, full at 90%
    const logoStart = 0.70;
    const logoEnd = 0.90;
    const logoProgress = Math.max(0, Math.min(1, (progress - logoStart) / (logoEnd - logoStart)));

    if (logoProgress > 0) {
      heroLogo.classList.add('revealed');
      // Add blur to canvas as logo reveals
      canvas.style.filter = `blur(${logoProgress * 12}px) brightness(${1 - logoProgress * 0.4})`;
    } else {
      heroLogo.classList.remove('revealed');
      canvas.style.filter = 'none';
    }

    // Hide scroll hint after initial scroll
    if (progress > 0.05) {
      scrollHint.classList.add('hidden');
    } else {
      scrollHint.classList.remove('hidden');
    }
  }

  /* ─────────────────────────────────────────────
     2. NAVIGATION
     ───────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function updateNav() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Active section highlighting
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ─────────────────────────────────────────────
     3. MENU TABS
     ───────────────────────────────────────────── */
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuPanels = document.querySelectorAll('.menu-panel');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update tabs
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panels
      menuPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === target) {
          panel.classList.add('active');
        }
      });

      // Scroll tabs to show active tab (mobile)
      tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });

  /* ─────────────────────────────────────────────
     4. SCROLL REVEAL (IntersectionObserver)
     ───────────────────────────────────────────── */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ─────────────────────────────────────────────
     5. TODAY'S HOURS HIGHLIGHT
     ───────────────────────────────────────────── */
  function highlightToday() {
    const today = new Date().getDay(); // 0 = Sunday
    const rows = document.querySelectorAll('.hours-row');
    rows.forEach(row => {
      if (parseInt(row.dataset.day) === today) {
        row.classList.add('today');
      }
    });
  }

  /* ─────────────────────────────────────────────
     6. SMOOTH SCROLL for anchor links
     ───────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = target.id === 'home' ? 0 : 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─────────────────────────────────────────────
     7. MENU CARD STAGGER ANIMATION
     ───────────────────────────────────────────── */
  function animateMenuCards() {
    const activePanel = document.querySelector('.menu-panel.active');
    if (!activePanel) return;

    const cards = activePanel.querySelectorAll('.menu-card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `opacity 0.5s ease ${i * 0.04}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      });
    });
  }

  // Re-animate on tab switch
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      setTimeout(animateMenuCards, 50);
    });
  });

  /* ─────────────────────────────────────────────
     8. INIT
     ───────────────────────────────────────────── */
  function init() {
    resizeCanvas();
    preloadFrames();
    highlightToday();
    animateMenuCards();

    window.addEventListener('scroll', () => {
      onScroll();
      updateNav();
      updateActiveLink();
    }, { passive: true });

    window.addEventListener('resize', () => {
      resizeCanvas();
    });

    // Initial state
    updateNav();
    updateActiveLink();
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
