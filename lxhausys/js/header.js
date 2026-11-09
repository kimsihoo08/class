/* Responsive global header menu */
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header");
    if (!header) return;

    const toggle = header.querySelector(".mobile-menu-toggle");
    const menu = header.querySelector(".mobile-menu");
    if (!toggle || !menu) return;

    function closeMenu() {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "메뉴 열기");
        menu.hidden = true;
    }

    function openMenu() {
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "메뉴 닫기");
        menu.hidden = false;
    }

    toggle.addEventListener("click", function () {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        if (isOpen) closeMenu();
        else openMenu();
    });

    menu.addEventListener("click", function (event) {
        if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (event) {
        if (!header.contains(event.target)) closeMenu();
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 1100) closeMenu();
    });
});
