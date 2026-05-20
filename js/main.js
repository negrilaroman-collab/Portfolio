/* ============================================
   PORTFOLIO ROMAN NEGRILA - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================
       PROGRESS BAR
       ============================================ */
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = `${progress}%`;
        });
    }

    /* ============================================
       THEME TOGGLE
       ============================================ */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    /* ============================================
       SIDEBAR TOGGLE (MOBILE)
       ============================================ */
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileToggle = document.getElementById('mobile-sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('sidebar-overlay');
    document.body.appendChild(overlay);

    function openSidebar() {
        sidebar.classList.add('is-open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('is-open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            if (sidebar.classList.contains('is-open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', openSidebar);
    }

    overlay.addEventListener('click', closeSidebar);

    // Close sidebar on link click (mobile)
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                closeSidebar();
            }
        });
    });

    /* ============================================
       ACTIVE SIDEBAR LINK ON SCROLL
       ============================================ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-link');

    function updateActiveLink() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    /* ============================================
       TYPING ANIMATION
       ============================================ */
    const typingEl = document.querySelector('.typing');
    const cursor = document.querySelector('.cursor');

    const phrases = [
        'Passionné de cybersécurité 🔐',
        'Étudiant en alternance chez Auchan 🏢',
        'Amateur de CTF et pentest 🎯',
        'En recherche d\'alternance 🚀'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    function typeText() {
        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting) {
            typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                typingTimeout = setTimeout(typeText, 2000);
                return;
            }
        } else {
            typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingTimeout = setTimeout(typeText, 300);
                return;
            }
        }

        const speed = isDeleting ? 50 : 80;
        typingTimeout = setTimeout(typeText, speed);
    }

    if (typingEl) {
        setTimeout(typeText, 500);
    }

    /* ============================================
       LIGHTBOX
       ============================================ */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    document.querySelectorAll('.skill-img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = img.dataset.lightboxCaption || img.alt;
            lightbox.style.display = 'flex';
            lightbox.setAttribute('aria-hidden', 'false');
            setTimeout(() => lightbox.classList.add('active'), 10);
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    /* ============================================
       PROJECT MODAL
       ============================================ */
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-project-title');
    const modalDescription = document.getElementById('modal-project-description');

    const projectData = {
        pepiniere: {
            title: '🏢 Projet Pépinière d\'Entreprise',
            description: `
                <p>Ce projet SAE21/SAE24 consistait à concevoir et déployer une infrastructure réseau complète pour une société de pépinière d'entreprises, comprenant plusieurs services séparés par VLANs.</p>
                <h4>Objectifs</h4>
                <ul>
                    <li>Concevoir une architecture réseau sécurisée multi-VLAN</li>
                    <li>Déployer les services Windows Server (AD DS, DNS, DHCP)</li>
                    <li>Configurer la téléphonie IP avec Asterisk</li>
                    <li>Mettre en place la supervision et la sécurité</li>
                </ul>
                <h4>Architecture déployée</h4>
                <ul>
                    <li><strong>VLAN 10</strong> Administration : 192.168.10.0/24</li>
                    <li><strong>VLAN 20</strong> Production : 192.168.20.0/24</li>
                    <li><strong>VLAN 30</strong> IT : 192.168.30.0/24</li>
                    <li><strong>VLAN 40</strong> Guest : 192.168.40.0/24</li>
                </ul>
                <h4>Résultats</h4>
                <ul>
                    <li>Note obtenue : <strong>16/20</strong></li>
                    <li>Documentation complète de 30 pages</li>
                    <li>Maquette fonctionnelle présentée au jury</li>
                </ul>
            `,
            tech: ['Cisco IOS', 'Windows Server 2019', 'Asterisk', 'Docker', 'VMware', 'Active Directory', 'QoS', 'VLAN']
        },
        sae501: {
            title: '🐳 SAÉ 501 - Infrastructure Conteneurisée',
            description: `
                <p>Déploiement d'une infrastructure complète basée sur Docker avec API REST Flask et dashboard d'administration MySQL.</p>
                <h4>Technologies utilisées</h4>
                <ul>
                    <li>Docker Compose multi-conteneurs</li>
                    <li>API REST avec Flask (Python 3.10)</li>
                    <li>Interface d'administration Web Bootstrap 5</li>
                    <li>Base de données MySQL 8.0</li>
                    <li>Authentification JWT</li>
                    <li>Monitoring avec Portainer</li>
                </ul>
                <h4>Architecture Docker</h4>
                <pre><code>version: '3.8'
services:
  web:
    build: ./app
    ports:
      - "5000:5000"
  db:
    image: mysql:8.0
  portainer:
    image: portainer/portainer-ce</code></pre>
                <h4>Résultats</h4>
                <ul>
                    <li>Note obtenue : <strong>17/20</strong></li>
                    <li>12 conteneurs supervisés en temps réel</li>
                </ul>
            `,
            tech: ['Docker', 'Flask', 'MySQL', 'Python', 'Portainer', 'JWT', 'Bootstrap', 'Git']
        },
        sae5rom03: {
            title: '📞 SAÉ 5 ROM.03 - Services ROM',
            description: `
                <p>Déploiement de services de communication avancés intégrant VoIP, analyse réseau et vision par ordinateur.</p>
                <h4>Composants principaux</h4>
                <ul>
                    <li>Serveur Asterisk 18 avec 10 extensions SIP</li>
                    <li>Caméra IP Vivotek avec flux RTSP</li>
                    <li>Détection QR codes en temps réel avec OpenCV</li>
                    <li>Analyse réseau Wireshark (SIP/RTP)</li>
                </ul>
                <h4>Code de détection QR</h4>
                <pre><code>import cv2
from pyzbar.pyzbar import decode

class QRCodeScanner:
    def __init__(self, rtsp_url):
        self.rtsp_url = rtsp_url
        
    def process_frame(self, frame):
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        qrcodes = decode(gray)
        for qrcode in qrcodes:
            data = qrcode.data.decode('utf-8')
            self.save_qrcode(data)
        return frame</code></pre>
                <h4>Résultats</h4>
                <ul>
                    <li>Note obtenue : <strong>15/20</strong></li>
                    <li>Latence RTSP réduite via QoS + threading OpenCV</li>
                </ul>
            `,
            tech: ['Asterisk', 'VoIP', 'SIP/RTP', 'Python', 'OpenCV', 'Wireshark', 'Docker', 'Alpine Linux']
        }
    };

    document.querySelectorAll('.project-card').forEach(card => {
        const btn = card.querySelector('.project-card-button');
        if (btn) {
            btn.addEventListener('click', () => {
                const projectId = card.dataset.projectId;
                const project = projectData[projectId];

                if (project && projectModal) {
                    modalTitle.textContent = project.title;
                    modalDescription.innerHTML = project.description;

                    const techContainer = projectModal.querySelector('.project-tech-modal');
                    if (techContainer) {
                        techContainer.innerHTML = project.tech
                            .map(t => `<span>${t}</span>`)
                            .join('');
                    }

                    projectModal.style.display = 'flex';
                    projectModal.setAttribute('aria-hidden', 'false');
                    setTimeout(() => projectModal.classList.add('active'), 10);
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    });

    function closeModal() {
        if (!projectModal) return;
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            projectModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 400);
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeModal();
        });
    }

    /* ============================================
       KEYBOARD NAVIGATION
       ============================================ */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (projectModal && projectModal.classList.contains('active')) closeModal();
            if (lightbox && lightbox.classList.contains('active')) closeLightbox();
            if (sidebar && sidebar.classList.contains('is-open')) closeSidebar();
        }
    });

    /* ============================================
       SMOOTH SCROLL
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = window.innerWidth <= 1024 ? 70 : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ============================================
       SCROLL ANIMATIONS
       ============================================ */
    const animatedEls = document.querySelectorAll(
        '.ac-card, .project-card, .cert-card, .timeline-item, .info-card, .reflex-item'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

});
