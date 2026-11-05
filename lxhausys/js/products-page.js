document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.querySelector("#mobile-menu");
    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener("click", () => {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!expanded));
        menuToggle.setAttribute("aria-label", expanded ? "메뉴 열기" : "메뉴 닫기");
        mobileMenu.hidden = expanded;
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "메뉴 열기");
            mobileMenu.hidden = true;
        });
    });
});