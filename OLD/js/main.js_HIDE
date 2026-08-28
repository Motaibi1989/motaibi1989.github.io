// main.js - shared functionality for all pages
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks || hamburger.dataset.bound === '1') return;
  hamburger.dataset.bound = '1';
  hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
    }
  });
}

function setCurrentYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

function initScrollTop() {
  const scrollTop = document.getElementById('scrollTop');
  if (!scrollTop || scrollTop.dataset.bound === '1') return;
  scrollTop.dataset.bound = '1';
  window.addEventListener('scroll', () => scrollTop.classList.toggle('visible', window.scrollY > 300));
  scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  const fadeInOnScroll = () => {
    fadeElements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  window.addEventListener('scroll', fadeInOnScroll, { passive: true });
  fadeInOnScroll();
}

function initActiveNav() {
  const links = document.querySelectorAll('.nav-links a');
  if (!links.length) return;
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach((link) => {
    const href = link.getAttribute('href') || '';
    const hrefPage = href.split('#')[0] || 'index.html';
    if (hrefPage === currentPage && !href.includes('#')) link.classList.add('active');
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    if (anchor.dataset.bound === '1') return;
    anchor.dataset.bound = '1';
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const hash = href.includes('#') ? href.substring(href.indexOf('#')) : '';
      if (!hash || hash === '#') return;
      const samePage = !href.split('#')[0] || href.split('#')[0] === window.location.pathname.split('/').pop();
      const target = samePage ? document.querySelector(hash) : null;
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) navLinks.classList.remove('active');
      }
    });
  });
}

function initSharedUI() {
  initMobileMenu();
  setCurrentYear();
  initScrollTop();
  initAnimations();
  initActiveNav();
  initSmoothScroll();
}

document.addEventListener('includes:loaded', initSharedUI);
document.addEventListener('DOMContentLoaded', () => setTimeout(initSharedUI, 150));
