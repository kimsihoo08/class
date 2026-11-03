document.addEventListener('DOMContentLoaded', function () {

    /* ─────────────────────────────────────────
       A. PRODUCTS Swiper 초기화
    ───────────────────────────────────────── */
    document.querySelectorAll('.products-list-wrap').forEach(function (wrap) {
        const slides = wrap.querySelectorAll('.swiper-slide');
        const track = wrap.querySelector('.products-track');

        // 실제 제품 슬라이드가 있는 목록만 Swiper로 초기화
        if (!slides.length || !track) return;

        new Swiper(wrap, {
            slidesPerView: 'auto',
            spaceBetween: 24,
            watchOverflow: true,
            observer: true,
            observeParents: true,
            scrollbar: {
                el: track,
                draggable: true
            }
        });
    });


    /* ─────────────────────────────────────────
       B. 탭 전환
          "버튼 i번째를 누르면 칸 i번째만 보이고 나머지는 숨김"
    ───────────────────────────────────────── */
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

            // 숨겨져 있던 리스트는 크기가 0이라서, 보이게 된 뒤 스크롤바를 다시 계산하게 알림
            window.dispatchEvent(new Event('resize'));
        }

        buttons.forEach(function (button, i) {
            button.addEventListener('click', function () {
                select(i);
            });
        });

        // HTML에서 is-active가 붙어 있는 버튼을 처음 화면으로 사용 (없으면 첫 번째)
        const first = Array.from(buttons).findIndex(function (button) {
            return button.classList.contains('is-active');
        });
        select(first < 0 ? 0 : first);
    }

    const panels = document.querySelectorAll('.products-panel');

    // 탭1 → 탭2 묶음(panel) 바꾸기
    setupTabs(document.querySelectorAll('.products-main-tab'), panels);

    // 탭2 → 리스트 바꾸기 (panel마다 따로)
    panels.forEach(function (panel) {
        setupTabs(
            panel.querySelectorAll('.products-sub-tabs button'),
            panel.querySelectorAll('.products-list-wrap')
        );
    });


    /* ─────────────────────────────────────────
       C. NEWS 섹션 Swiper 슬라이드 초기화
    ───────────────────────────────────────── */
    const newsSwiper = new Swiper('.news-list-wrap', {
        slidesPerView: 'auto',
        spaceBetween: 32,
        freeMode: true,
        scrollbar: {
            el: '.news-track',
            draggable: true,
        },
    });
    /* ─────────────────────────────────────────
       CUSTOMER CENTER 탭 전환 기능
    ───────────────────────────────────────── */
    setupTabs(
        document.querySelectorAll('.customer-tab'),
        document.querySelectorAll('.customer-panel')
    );

});