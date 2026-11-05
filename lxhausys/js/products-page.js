document.addEventListener("DOMContentLoaded", () => {
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

    const tabs = document.querySelectorAll(".category-tab");
    const cards = Array.from(document.querySelectorAll(".catalog-card"));
    const search = document.querySelector("#product-search");
    const clear = document.querySelector("#product-search-clear");
    const count = document.querySelector("#product-result-count");
    const empty = document.querySelector("#product-empty");
    if (!tabs.length || !cards.length) return;

    let activeCategory = "전체제품";
    cards.forEach((card) => {
        const category = card.querySelector(".catalog-category")?.textContent.trim() || "";
        card.dataset.category = category;
    });

    function renderProducts() {
        const keyword = search?.value.trim().toLocaleLowerCase("ko") || "";
        let visibleCount = 0;
        cards.forEach((card) => {
            const categoryMatch = activeCategory === "전체제품" || card.dataset.category === activeCategory;
            const keywordMatch = card.textContent.toLocaleLowerCase("ko").includes(keyword);
            const visible = categoryMatch && keywordMatch;
            card.hidden = !visible;
            if (visible) visibleCount++;
        });
        if (count) count.textContent = String(visibleCount);
        if (empty) empty.hidden = visibleCount > 0;
    }

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            activeCategory = tab.dataset.category || "전체제품";
            tabs.forEach((item) => {
                const selected = item === tab;
                item.classList.toggle("is-active", selected);
                item.setAttribute("aria-selected", String(selected));
            });
            renderProducts();
        });
    });

    search?.addEventListener("input", renderProducts);
    clear?.addEventListener("click", () => {
        if (!search) return;
        search.value = "";
        search.focus();
        renderProducts();
    });
    renderProducts();
});