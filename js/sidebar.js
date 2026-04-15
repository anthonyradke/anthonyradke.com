/* ===========================================
   SIDEBAR WEB COMPONENT
   Single source of truth for the sidebar.
   Edit here → updates every page automatically.
   =========================================== */

class AppSidebar extends HTMLElement {
    connectedCallback() {
        const isProjectPage = document.location.href.includes('/projects/');
        const base = isProjectPage ? '../' : '';

        // Nav differs by context: project pages link back to index;
        // index.html uses data-section for JS-driven switching.
        const nav = isProjectPage
            ? `<a href="../index.html#about"    class="nav-item">About</a>
               <a href="../index.html#projects" class="nav-item active">Projects</a>
               <a href="../index.html#contact"  class="nav-item">Contact</a>
               <a href="../files/resume.pdf" target="_blank" rel="noopener" class="nav-item nav-item-resume">Resume ↗</a>`
            : `<a href="#about"    data-section="about"    class="nav-item active">About</a>
               <a href="#projects" data-section="projects" class="nav-item">Projects</a>
               <a href="#contact"  data-section="contact"  class="nav-item">Contact</a>
               <a href="files/resume.pdf" target="_blank" rel="noopener" class="nav-item nav-item-resume">Resume ↗</a>`;

        this.innerHTML = `
            <aside class="sidebar" id="sidebar">

                <div class="sidebar-profile">
                    <img src="${base}images/profile.jpg" alt="Anthony Radke" class="sidebar-avatar">
                    <h1 class="sidebar-name">Anthony Radke</h1>
                    <p class="sidebar-role">Mechanical Engineer</p>
                    <p class="sidebar-location">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        Boulder, CO
                    </p>
                    <div class="sidebar-socials">
                        <a href="https://linkedin.com/in/anthonyradke" target="_blank" rel="noopener" class="social-btn">
                            <img src="${base}images/linkedin-icon.png" alt="" class="social-icon" aria-hidden="true">
                            LinkedIn
                        </a>
                        <a href="https://github.com/anthonyradke" target="_blank" rel="noopener" class="social-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            GitHub
                        </a>
                    </div>
                </div>

                <nav class="sidebar-nav" aria-label="Main navigation">
                    ${nav}
                </nav>

                <div class="sidebar-card">
                    <h3 class="sidebar-label">Education</h3>
                    <div class="education-item">
                        <div class="edu-header">
                            <img src="${base}images/cu-logo.png" alt="CU Boulder" class="edu-logo">
                            <div>
                                <p class="edu-school">University of Colorado Boulder</p>
                                <p class="edu-degree">B.S. Mechanical Engineering</p>
                                <p class="edu-year">Aug 2022 &ndash; May 2026</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="sidebar-card">
                    <h3 class="sidebar-label">Certifications</h3>
                    <ul class="cert-list">
                        <li class="cert-item" data-cert="${base}files/cswp-cert.png">
                            <img src="${base}images/solidworks-icon.png" alt="" class="cert-icon" aria-hidden="true">
                            Certified SolidWorks Professional (CSWP)
                        </li>
                    </ul>
                </div>

                <p class="sidebar-footer">&copy; <span class="footer-year"></span> Anthony Radke</p>

            </aside>
        `;
    }
}

customElements.define('app-sidebar', AppSidebar);
