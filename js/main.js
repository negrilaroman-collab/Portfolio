document.addEventListener('DOMContentLoaded', function() {
    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Set initial theme based on localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;    if (savedTheme) {
        body.dataset.theme = savedTheme;
    } else if (prefersDark) {
        body.dataset.theme = 'dark';
    } else {
        body.dataset.theme = 'light';
    }

    // Update theme toggle icon    function updateThemeToggleIcon() {
        const isDark = body.dataset.theme === 'dark';
        themeToggle.innerHTML = `<i class="fas fa-${isDark ? 'moon' : 'sun'}" aria-hidden="true"></i>`;
        themeToggle.setAttribute('aria-label',
