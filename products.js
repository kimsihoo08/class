document.addEventListener('DOMContentLoaded', function () {

    /* ─────────────────────────────────────────
       A. 제품 리스트 가로 스크롤바
          (기존 코드를 함수로 묶어서 리스트마다 한 번씩 실행)
    ───────────────────────────────────────── */
    function initScroll(wrap) {
        const list = wrap.querySelector('.products-grid');
        const track = wrap.querySelector('.products-track');
        const thumb = track && track.querySelector('span');
        if (!list || !track || !thumb) return;

        let dragging = false;
        let startX = 0;
        let startScroll = 0;

        function syncTrack() {
            const maxScroll = list.scrollWidth - list.clientWidth;
            const visibleRatio = list.clientWidth / list.scrollWidth;
            const thumbWidth = maxScroll <= 0 ? 100 : Math.max(12, visibleRatio * 100);
            const progress = maxScroll <= 0 ? 0 : list.scrollLeft / maxScroll;

            thumb.style.width = thumbWidth + '%';
            thumb.style.left = progress * (100 - thumbWidth) + '%';
            track.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
        }

        function scrollToTrackPosition(clientX) {
            const rect = track.getBoundingClientRect();
            const thumbWidthPx = thumb.getBoundingClientRect().width;
            const usableWidth = rect.width - thumbWidthPx;
            const position = Math.max(0, Math.min(1, (clientX - rect.left - thumbWidthPx / 2) / usableWidth));

            list.scrollLeft = position * (list.scrollWidth - list.clientWidth);
        }

        track.addEventListener('pointerdown', function (event) {
            dragging = true;
            startX = event.clientX;
            startScroll = list.scrollLeft;
            track.setPointerCapture(event.pointerId);
            scrollToTrackPosition(event.clientX);
            event.preventDefault();
        });

        track.addEventListener('pointermove', function (event) {
            if (!dragging) return;

            const rect = track.getBoundingClientRect();
            const thumbWidthPx = thumb.getBoundingClientRect().width;
            const usableWidth = rect.width - thumbWidthPx;
            const delta = event.clientX - startX;

            list.scrollLeft = startScroll + delta / Math.max(1, usableWidth) * (list.scrollWidth - list.clientWidth);
        });

        track.addEventListener('pointerup', function () { dragging = false; });
        track.addEventListener('pointercancel', function () { dragging = false; });

        track.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowRight') {
                list.scrollBy({ left: list.clientWidth * 0.75, behavior: 'smooth' });
                event.preventDefault();
            }
            if (event.key === 'ArrowLeft') {
                list.scrollBy({ left: -list.clientWidth * 0.75, behavior: 'smooth' });
                event.preventDefault();
            }
            if (event.key === 'Home') {
                list.scrollTo({ left: 0, behavior: 'smooth' });
                event.preventDefault();
            }
            if (event.key === 'End') {
                list.scrollTo({ left: list.scrollWidth, behavior: 'smooth' });
                event.preventDefault();
            }
        });

        list.addEventListener('scroll', syncTrack, { passive: true });
        window.addEventListener('resize', syncTrack);
        syncTrack();
    }

    document.querySelectorAll('.products-list-wrap').forEach(initScroll);


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

});