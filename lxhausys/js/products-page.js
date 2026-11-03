document.addEventListener("DOMContentLoaded", () => {
    const tabs = [...document.querySelectorAll(".category-tab")];
    const cards = [...document.querySelectorAll(".catalog-card")];
    const queryInput = document.querySelector("#product-query");
    const clearButton = document.querySelector("#clear-search");
    const count = document.querySelector("#result-count");
    const emptyState = document.querySelector("#empty-state");
    let activeCategory = "all";

    function updateCatalog() {
        const query = queryInput.value.trim().toLocaleLowerCase("ko");
        let visibleCount = 0;
        cards.forEach((card) => {
            const categoryMatches = activeCategory === "all" || card.dataset.category === activeCategory;
            const searchMatches = !query || (card.dataset.search || "").toLocaleLowerCase("ko").includes(query);
            const visible = categoryMatches && searchMatches;
            card.hidden = !visible;
            if (visible) visibleCount += 1;
        });
        count.textContent = String(visibleCount);
        emptyState.hidden = visibleCount !== 0;
    }

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            activeCategory = tab.dataset.category;
            tabs.forEach((item) => {
                const active = item === tab;
                item.classList.toggle("is-active", active);
                item.setAttribute("aria-selected", String(active));
            });
            updateCatalog();
        });
    });

    queryInput.addEventListener("input", updateCatalog);
    clearButton.addEventListener("click", () => {
        queryInput.value = "";
        queryInput.focus();
        updateCatalog();
    });

    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.querySelector("#mobile-menu");
    if (menuToggle && mobileMenu) {
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
    }

    if (window.Swiper && document.querySelector(".featured-swiper")) {
        new Swiper(".featured-swiper", {
            slidesPerView: "auto",
            spaceBetween: 24,
            watchOverflow: true,
            navigation: {
                prevEl: ".featured-prev",
                nextEl: ".featured-next"
            },
            scrollbar: {
                el: ".featured-scrollbar",
                draggable: true
            },
            breakpoints: {
                1025: { spaceBetween: 32 }
            }
        });
    }
});