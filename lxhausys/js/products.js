document.addEventListener('DOMContentLoaded', function () {
    /* A. 제품 목록을 Swiper로 초기화 */
    const productSwipers = [];

    document.querySelectorAll('.products-list-wrap').forEach(function (wrap) {
        const container = wrap.querySelector('.products-grid');
        if (!container || typeof window.Swiper === 'undefined') return;

        // Swiper의 필수 구조: container > swiper-wrapper > swiper-slide
        const wrapper = document.createElement('div');
        wrapper.className = 'swiper-wrapper';

        Array.from(container.children).forEach(function (card) {
            card.classList.add('swiper-slide');
            wrapper.appendChild(card);
        });

        container.appendChild(wrapper);
        container.classList.add('swiper');

        // 기존 커스텀 스크롤바는 Swiper와 중복되므로 숨김
        const track = wrap.querySelector('.products-track');
        if (track) track.hidden = true;

        const swiper = new window.Swiper(container, {
            direction: 'horizontal',
            slidesPerView: 'auto',
            spaceBetween: 24,
            speed: 600,
            watchOverflow: true,
            observer: true,
            observeParents: true
        });

        productSwipers.push(swiper);
    });

    /* B. 탭 전환: 기존 동작 유지 */
    function setupTabs(buttons, targets) {
        function select(index) {
            buttons.forEach(function (button, i) {
                const active = i === index;
                button.classList.toggle('is-active', active);
                button.setAttribute('aria-pressed', active ? 'true' : 'false');
            });

            targets.forEach(function (target, i) {
                target.classList.toggle('is-hidden', i !== index);
            });

            // 탭 전환 후 표시된 Swiper의 크기와 위치 갱신
            requestAnimationFrame(function () {
                productSwipers.forEach(function (swiper) {
                    swiper.update();
                });
            });
        }

        buttons.forEach(function (button, i) {
            button.addEventListener('click', function () {
                select(i);
            });
        });

        const first = Array.from(buttons).findIndex(function (button) {
            return button.classList.contains('is-active');
        });
        select(first < 0 ? 0 : first);
    }

    const panels = document.querySelectorAll('.products-panel');

    // 탭1 → 제품 대분류 panel
    setupTabs(document.querySelectorAll('.products-main-tab'), panels);

    // 탭2 → panel 안의 제품 소분류 리스트
    panels.forEach(function (panel) {
        setupTabs(
            panel.querySelectorAll('.products-sub-tabs button'),
            panel.querySelectorAll('.products-list-wrap')
        );
    });
});
