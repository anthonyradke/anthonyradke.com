/* ===========================================
   PORTFOLIO — main.js
   =========================================== */

// ── Navbar scroll shadow ───────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Active nav link on scroll ──────────────
const sections     = Array.from(document.querySelectorAll('section[id]'));
const navAnchors   = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));

function updateActiveLink() {
    const scrollMid = window.scrollY + window.innerHeight / 3;
    let current = sections[0];

    for (const sec of sections) {
        if (scrollMid >= sec.offsetTop) current = sec;
    }

    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current.id);
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// ── Smooth scroll for all in-page anchors ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        // close mobile menu if open
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// ── Mobile nav toggle ──────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});

// ── Fade-in on scroll (IntersectionObserver) ──
const fadeTargets = document.querySelectorAll(
    '.project-card, .timeline-item, .sidebar-card, .about-content, .contact-form'
);

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target); // only animate once
        }
    });
}, { threshold: 0.12 });

fadeTargets.forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 4) * 60}ms`; // stagger siblings
    fadeObserver.observe(el);
});

// ── Contact form ───────────────────────────
const contactForm = document.getElementById('contactForm');
const formNotice  = document.getElementById('formNotice');

contactForm.addEventListener('submit', async function (e) {
    // If data-static is present, we're not connected to Formspree yet
    if (this.dataset.static) {
        e.preventDefault();
        formNotice.textContent = '⚠ Form not yet connected. See the README for Formspree setup.';
        formNotice.className = 'form-notice error';
        return;
    }

    // With Formspree: let the form submit normally via fetch for a nicer UX
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
        const res = await fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: { Accept: 'application/json' }
        });

        if (res.ok) {
            formNotice.textContent = '✓ Message sent! I\'ll get back to you soon.';
            formNotice.className = 'form-notice';
            this.reset();
        } else {
            throw new Error('Server error');
        }
    } catch {
        formNotice.textContent = 'Something went wrong — please email me directly.';
        formNotice.className = 'form-notice error';
    } finally {
        btn.textContent = 'Send Message';
        btn.disabled = false;
    }
});

// ── Footer year ────────────────────────────
const yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();
