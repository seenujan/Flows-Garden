/* ═══════════════════════════════════════════════════════
   FLOWS GARDEN — main.js
   Scroll effects, mobile menu, flora carousel
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Navbar: glassmorphism on scroll ─── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ─── Mobile hamburger menu ─── */
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* ─── Flora carousel (simple offset on mobile) ─── */
  let floraIndex = 0;
  const cards = document.querySelectorAll('.flora-card');
  const totalCards = cards.length;

  function isMobile() { return window.innerWidth < 768; }

  document.getElementById('flora-next').addEventListener('click', () => {
    if (isMobile() && floraIndex < totalCards - 1) {
      floraIndex++;
      scrollToCard(floraIndex);
    }
  });
  document.getElementById('flora-prev').addEventListener('click', () => {
    if (isMobile() && floraIndex > 0) {
      floraIndex--;
      scrollToCard(floraIndex);
    }
  });

  function scrollToCard(index) {
    const track = document.getElementById('flora-track');
    const card = track.children[index];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }

  /* ─── Intersection Observer: fade-in on scroll ─── */
  const fadeEls = document.querySelectorAll(
    '.hero-text, .hero-images, .philosophy-text, .philosophy-images, ' +
    '.flora-header, .flora-card, .workshop-inner, .footer-inner'
  );
  fadeEls.forEach(el => el.classList.add('fade-in'));

  // Small delay so first paint always shows content (screenshots, no-JS)
  setTimeout(() => {
    fadeEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      // Only hide elements that are below the fold
      if (rect.top > window.innerHeight) {
        el.classList.add('will-animate');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    fadeEls.forEach(el => {
      if (el.classList.contains('will-animate')) observer.observe(el);
    });
  }, 100);

  /* ─── Stagger flora cards ─── */
  document.querySelectorAll('.flora-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.12}s`;
  });


});
