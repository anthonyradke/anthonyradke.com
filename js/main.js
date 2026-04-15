/* ===========================================
   PORTFOLIO — main.js
   =========================================== */

// ── Section switching ──────────────────────
const sections = Array.from(document.querySelectorAll('.page-section'));
const navItems = Array.from(document.querySelectorAll('.sidebar-nav .nav-item[data-section]'));

function activateSection(id) {
    const target = document.getElementById(id);
    if (!target) return;

    sections.forEach(s => s.classList.remove('active'));
    navItems.forEach(a => a.classList.remove('active'));

    target.classList.add('active');
    target.scrollTop = 0;

    navItems.forEach(a => {
        if (a.dataset.section === id) a.classList.add('active');
    });
}

navItems.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        const id = item.dataset.section;
        activateSection(id);
        history.pushState(null, '', '#' + id);
        closeMobileSidebar();
    });
});

function loadFromHash() {
    const hash = window.location.hash.slice(1);
    const valid = sections.find(s => s.id === hash);
    activateSection(valid ? hash : (sections[0] ? sections[0].id : 'about'));
}

window.addEventListener('popstate', loadFromHash);
loadFromHash();

// ── Mobile sidebar ─────────────────────────
const mobileToggle   = document.getElementById('mobileToggle');
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function closeMobileSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
}

if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
        const isOpen = sidebar.classList.toggle('open');
        if (sidebarOverlay) sidebarOverlay.classList.toggle('active', isOpen);
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeMobileSidebar);
}

// ── Sidebar card fade-in on load ───────────
const fadeTargets = document.querySelectorAll('.sidebar-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeTargets.forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${i * 65}ms`;
    fadeObserver.observe(el);
});

// ── Contact form ───────────────────────────
const contactForm = document.getElementById('contactForm');
const formNotice  = document.getElementById('formNotice');

if (contactForm && formNotice) {
    contactForm.addEventListener('submit', async function (e) {
        if (this.dataset.static) {
            e.preventDefault();
            formNotice.textContent = '⚠ Form not yet connected. See the comment in index.html for Formspree setup.';
            formNotice.className = 'form-notice error';
            return;
        }

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
}

// ── Certification image modal ──────────────
const certModal      = document.getElementById('pdfModal');
const certImg        = document.getElementById('certImg');
const certModalTitle = document.getElementById('pdfModalTitle');
const certModalClose = document.getElementById('pdfModalClose');

function openCertModal(path, title) {
    if (!certModal) return;
    certImg.src = path;
    certModalTitle.textContent = title;
    certModal.classList.add('active');
}

function closeCertModal() {
    if (!certModal) return;
    certModal.classList.add('closing');
    setTimeout(() => {
        certModal.classList.remove('active', 'closing');
        certImg.src = '';
    }, 180);
}

document.querySelectorAll('.cert-item[data-cert]').forEach(item => {
    item.addEventListener('click', () => {
        openCertModal(item.dataset.cert, item.textContent.trim());
    });
});

if (certModalClose) {
    certModalClose.addEventListener('click', closeCertModal);
}

if (certModal) {
    certModal.addEventListener('click', e => {
        if (e.target === certModal) closeCertModal();
    });
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
        closeCertModal();
    }
});

// ── Avatar breathing animation ─────────────
const avatar = document.querySelector('.sidebar-avatar');
if (avatar) {
    let avatarHovered = false;

    avatar.addEventListener('mouseenter', () => {
        avatarHovered = true;
        avatar.classList.add('avatar-breathing');
    });

    avatar.addEventListener('mouseleave', () => {
        avatarHovered = false;
        // Don't remove immediately — let the current cycle complete
    });

    avatar.addEventListener('animationiteration', () => {
        if (!avatarHovered) {
            avatar.classList.remove('avatar-breathing');
        }
    });
}

// ── Footer year ────────────────────────────
document.querySelectorAll('.footer-year').forEach(el => {
    el.textContent = new Date().getFullYear();
});
