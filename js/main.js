// Main Portfolio JS - Navigation, Theme, Progress
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    themeToggle.onclick = () => {
        const isDark = body.dataset.theme !== 'light';
        body.dataset.theme = isDark ? 'light' : 'dark';
        localStorage.theme = body.dataset.theme;
    };
    if (localStorage.theme === 'light') body.dataset.theme = 'light';

    // Progress bar
    window.onscroll = () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.getElementById('progress-bar').style.width = scrolled + '%';
    };

// Project Modal Logic
function openProjectModal(projectTitle, projectDetails) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h4>${projectTitle}</h4>
        ${projectDetails}
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
document.addEventListener('click', e => {
    if (e.target.classList.contains('project-modal') || e.target.classList.contains('modal-close')) {
        document.getElementById('project-modal').classList.remove('active');
        document.body.style.overflow = '';
    }
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.getElementById('project-modal').classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Sidebar navigation - scroll smooth
document.querySelectorAll('.sidebar-link').forEach(link => {
    link.onclick = e => {
        e.preventDefault();
        const target = link.getAttribute('href').substring(1);
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    };
});

    // Active sidebar on scroll (optimized)
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                let current = '';
                document.querySelectorAll('section[id]').forEach(section => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        current = section.getAttribute('id');
                    }
                });
                document.querySelectorAll('.sidebar-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // Typing animation
    const typing = document.querySelector('.typing');
    if (typing) {
        const texts = ["Étudiant BUT R&T", "Passionné Cybersécurité", "Administrateur Réseau"];
        let i = 0, j = 0, del = false;
        function type() {
            typing.textContent = texts[i].slice(0, j) + '|';
            if (!del && j === texts[i].length) del = true;
            else if (del && j === 0) { del = false; i = (i+1) % texts.length; }
            else j += del ? -1 : 1;
            setTimeout(type, del ? 50 : 100);
        }
        type();
    }

    // Lightbox
    document.querySelectorAll('img[onclick]').forEach(() => {});
    window.onclick = e => {
        if (e.target.id === 'lightbox') e.target.classList.remove('active');
    };
});
