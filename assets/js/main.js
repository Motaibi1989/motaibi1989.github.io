// ============================================
// MAIN JS - Mohammed Alotaibi Portfolio
// ============================================

(function() {
    'use strict';

    // ─── DOM Elements ───
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const scrollTopButton = document.getElementById('scrollTop');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    // ─── Hamburger Toggle ───
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            const open = navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(open));
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !open);
                icon.classList.toggle('fa-times', open);
            }
        });
    }

    // ─── Close Nav on Link Click ───
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            if (hamburger) {
                hamburger.setAttribute('aria-expanded', 'false');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    });

    // ─── Active Nav Link & Scroll-top Visibility ───
    var sections = document.querySelectorAll('main section[id]');
    var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateUI() {
        var current = '';
        var scrollY = window.scrollY || window.pageYOffset || 0;

        sections.forEach(function(section) {
            var rect = section.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom >= 120) {
                current = section.id;
            }
        });

        navAnchors.forEach(function(link) {
            var href = link.getAttribute('href');
            link.classList.toggle('active', href === '#' + current);
        });

        if (scrollTopButton) {
            scrollTopButton.classList.toggle('visible', scrollY > 300);
        }
    }

    window.addEventListener('scroll', updateUI, { passive: true });
    window.addEventListener('resize', updateUI, { passive: true });

    // ─── Scroll to Top ───
    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ─── Current Year ───
    var yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ─── Intersection Observer for Fade-in ───
    var fadeElements = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
        fadeElements.forEach(function(el) {
            observer.observe(el);
        });
    } else {
        fadeElements.forEach(function(el) {
            el.classList.add('visible');
        });
    }

    // ─── Formspree AJAX Submission ───
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset status
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

            const formData = new FormData(contactForm);

            fetch('https://formspree.io/f/maewzwal', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(function(response) {
                    if (response.ok) {
                        formStatus.className = 'form-status success';
                        formStatus.style.display = 'block';
                        formStatus.textContent = '✅ Thanks! Your message was sent successfully.';
                        contactForm.reset();
                    } else {
                        return response.json().then(function(data) {
                            if (Object.keys(data).length > 0 && data.error) {
                                throw new Error(data.error);
                            }
                            throw new Error('Form submission failed.');
                        });
                    }
                })
                .catch(function(error) {
                    formStatus.className = 'form-status error';
                    formStatus.style.display = 'block';
                    formStatus.textContent = '❌ Oops! Something went wrong. Please try again.';
                    console.error('Formspree error:', error);
                })
                .finally(function() {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                });
        });
    }

    // ─── Initial Call ───
    updateUI();

})();
