/* ============================================================
   DEXIN Automotive Engineering - Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navbar scroll effect --- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* --- Mobile nav toggle --- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.navbar-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    // close on link click
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  /* --- Counter animation --- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const animateCount = (el) => {
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out quad
        const eased = 1 - (1 - progress) * (1 - progress);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(c => observer.observe(c));
  }

  /* --- Lightbox --- */
  const lightbox = document.querySelector('.lightbox-overlay');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = el.dataset.lightbox || el.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxClose) closeLightbox();
  });
  lightboxClose?.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* --- Project year filter --- */
  const filterBtns = document.querySelectorAll('.year-btn');
  const projectYears = document.querySelectorAll('.timeline-year');

  if (filterBtns.length && projectYears.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const year = btn.dataset.year;
        projectYears.forEach(y => {
          if (year === 'all' || y.dataset.year === year) {
            y.style.display = '';
          } else {
            y.style.display = 'none';
          }
        });
      });
    });
  }

  /* --- AOS-like scroll reveal (lightweight) --- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));
  }

});
