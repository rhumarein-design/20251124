
// menu Bureau
(function () {
    const btn = document.getElementById('menuToggleDesktop');
    const menu = document.getElementById('list-menuDesktop');

    function toggleMenu(open) {
        const isOpen = typeof open === 'boolean'
            ? open
            : !btn.getAttribute('aria-expanded').startsWith('t');

        btn.setAttribute('aria-expanded', String(isOpen));
        menu.classList.toggle('active', isOpen);
        btn.classList.toggle('active', isOpen); // 🔥 synchronise l’icône
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // évite que ça déclenche la fermeture directe
        toggleMenu();
    });

    // fermer au clic hors menu
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // fermer sur Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') toggleMenu(false);
    });

    // accessibilité clavier
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
})();
// Menu Mobile
(function () {
    const btn = document.getElementById('menuToggleMobile');
    const menu = document.getElementById('list-menuMobile');
    const closeBtn = document.getElementById('closeMenuMobile'); // ← ✕

    function toggleMenu(open) {
        const isOpen = typeof open === 'boolean'
            ? open
            : !btn.getAttribute('aria-expanded').startsWith('t');

        btn.setAttribute('aria-expanded', String(isOpen));
        menu.classList.toggle('active', isOpen);
        btn.classList.toggle('active', isOpen); // synchronise l’icône
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // évite que ça déclenche la fermeture directe
        toggleMenu();
    });
        // fermeture via la croix
    closeBtn.addEventListener('click', () => toggleMenu(false));
    // fermer au clic hors menu
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // fermer sur Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') toggleMenu(false);
    });

    // accessibilité clavier
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
})();


document.addEventListener("DOMContentLoaded", function () {

    const menuDesktop = document.querySelector(".menuFormatBureau");
    const menuMobile = document.querySelector(".menuFormatMobile");

    // on garde une copie du menu bureau pour pouvoir le réinsérer
    const parent = menuDesktop.parentNode;
    const desktopClone = menuDesktop.cloneNode(true);

    function updateMenuVisibility() {
        if (window.innerWidth < 600) {
            if (parent.contains(menuDesktop)) {
                parent.removeChild(menuDesktop);
            }
            menuMobile.style.display = "block";
        } else {
            if (!parent.contains(menuDesktop)) {
                parent.insertBefore(desktopClone, menuMobile);
            }
            menuMobile.style.display = "none";
        }
    }

    updateMenuVisibility(); // au chargement

    window.addEventListener("resize", updateMenuVisibility); // si on redimensionne
});
