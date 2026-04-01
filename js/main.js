document.addEventListener('DOMContentLoaded', function() {
    // --- Cache DOM elements ---
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const typingElement = document.querySelector('.typing');
    const cursorElement = document.querySelector('.cursor');
    const projectButtons = document.querySelectorAll('.project-card-button');
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const progressBar = document.getElementById('progress-bar');
    const skillImages = document.querySelectorAll('.skill-img');

    // --- Theme Management ---
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        body.dataset.theme = theme;
    }

    function toggleTheme() {
        const isDark = body.dataset.theme === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        body.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);
        updateThemeToggleIcon();
    }

    function updateThemeToggleIcon() {
        const isDark = body.dataset.theme === 'dark';
themeToggle.innerHTML = '<i class="fas fa-' + (isDark ? 'sun' : 'moon') + '" aria-hidden="true"></i>';
        themeToggle.setAttribute('aria-label', `Passer en mode ${isDark ? 'clair' : 'sombre'}`);
    }

    themeToggle.addEventListener('click', toggleTheme);

    // --- Mobile Sidebar Toggle ---
    function toggleSidebar() {
        sidebar.classList.toggle('is-open');
        body.classList.toggle('sidebar-open');
    }

    sidebarToggle.addEventListener('click', toggleSidebar);

    // Close sidebar on link click (mobile)
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('is-open');
                body.classList.remove('sidebar-open');
            }
        });
    });

    // Close sidebar on overlay click (mobile)
    body.addEventListener('click', (e) => {
if (window.innerWidth <= 768 && e.target === body && sidebar.classList.contains('is-open')) {
            toggleSidebar();
        }
    });

    // --- Smooth Scrolling &amp; Active Nav ---
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                updateActiveNav(targetId);
            }
        });
    });

    function updateActiveNav(currentSection) {
        sidebarLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`a[href="${currentSection}"]`);
        if (activeLink) activeLink.classList.add('active');
    }

    // Update active nav on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const sections = Array.from(document.querySelectorAll('section[id]')).map(sec => sec.id);
        const scrollPos = window.scrollY + 100;

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                updateActiveNav(`#${sectionId}`);
            }
        });

        // Progress bar
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / maxScroll) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // --- Typing Effect ---
    const phrases = [
"Développeur Réseaux & Cybersécurité",
"Étudiant BUT R&T parcours Cybersécurité",
        "Alternant chez Auchan Retail",
"Passionné d'infrastructure & sécurité"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typePhrase() {
        if (isDeleting) {
            typingElement.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = phrases[phraseIndex].substring(0, charIndex + 1);
            charIndex++;
        }

        const typeSpeed = isDeleting ? 50 : 100;
        setTimeout(() => {
if (!isDeleting && charIndex === phrases[phraseIndex].length) {
                isDeleting = true;
                cursorElement.classList.add('blink-pause');
                setTimeout(typePhrase, 1500);
else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                cursorElement.classList.remove('blink-pause');
                setTimeout(typePhrase, 500);
            } else {
                typePhrase();
            }
        }, typeSpeed);
    }

    if (typingElement) typePhrase();

    // --- Project Modal ---
    const projects = {
        pepiniere: {
            title: 'Projet Pépinière d\\'Entreprise',
            description: `Infrastructure réseau complète pour une pépinière d'entreprises (SAE21/24).

**Équipements:**
- Routeur Cisco C927-4P (NAT, ACL, DHCP, QoS, VLAN)
- Switch Cisco Catalyst 2960 (24 ports trunk/access)
- Windows Server 2019 (AD DS, DNS, DHCP)
- Asterisk VoIP (10 extensions SIP)
- Caméra IP Vivotek + OpenCV QR detection
- 4 VLANs segmentés (Admin/Prod/IT/Guest)

**Résultats:** Note 16/20, infrastructure 100% fonctionnelle.`,
            tech: ['Cisco IOS', 'Windows Server', 'Asterisk', 'Docker', 'Python', 'OpenCV']
        },
        sae501: {
            title: 'SAÉ 501 - Infrastructure Conteneurisée',
            description: `Plateforme de monitoring Docker avec API Flask.

**Composants:**
- Docker Compose (12 conteneurs)
- Flask API REST + MySQL 8.0
- Portainer pour administration
- Dashboard monitoring machines
- Authentification JWT

**Fonctionnalités:**
- Suivi CPU/RAM/Stockage realtime
- API REST documentée Swagger
- Interface responsive Bootstrap

**Résultats:** Note 17/20.`,
            tech: ['Docker', 'Flask', 'MySQL', 'Python', 'Portainer', 'JWT']
        },
        sae5rom03: {
            title: 'SAÉ 5 ROM.03 - Services Multimédias',
            description: `Déploiement services ROM/VoIP avec analyse réseau.

**Services déployés:**
- Asterisk 18 (trunks SIP, 10 extensions)
- Analyse Wireshark (SIP/RTP)
- Caméra Vivotek RTSP + OpenCV
- Script capture trafic automatisé

**Analyse sécurité:**
- Détection anomalies trafic VoIP
- Configuration QoS prioritaire
- Protection ACL anti-DDoS

**Résultats:** Note 15/20.`,
            tech: ['Asterisk', 'Wireshark', 'OpenCV', 'Python', 'QoS', 'Linux']
        }
    };

    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.closest('.project-card').dataset.projectId;
            const project = projects[projectId];
            if (project) {
                document.getElementById('modal-project-title').textContent = project.title;
                document.getElementById('modal-project-description').innerHTML = project.description;
                const techContainer = document.querySelector('.project-tech-modal');
techContainer.innerHTML = project.tech.map(function(tech) { return '<span>' + tech + '</span>'; }).join('');
                projectModal.classList.add('active');
                body.style.overflow = 'hidden';
            }
        });
    });

    modalClose.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) closeProjectModal();
    });

    function closeProjectModal() {
        projectModal.classList.remove('active');
        body.style.overflow = '';
    }

    // --- Lightbox ---
    skillImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = img.dataset.lightboxCaption || img.alt;
            lightbox.classList.add('active');
            body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        body.style.overflow = '';
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
            closeLightbox();
        }
    });

    // --- Intersection Observer for animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .timeline-item, .ac-card, .project-card, .cert-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // --- Initialize ---
    loadTheme();
    updateThemeToggleIcon();

    // Prevent body scroll on mobile sidebar
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('is-open');
            body.classList.remove('sidebar-open');
            body.style.overflow = '';
        }
    });
});
