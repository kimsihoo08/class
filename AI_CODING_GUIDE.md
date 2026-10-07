# AI_CODING_GUIDE.md

## 1. 목적

이 문서는 현재 GitHub 저장소의 `bergerking/login.html`과 `css/default.css`를 기준으로, 기존 버거킹 로그인 UI의 HTML/CSS 작성 방식과 스타일을 유지하면서 새로운 화면을 제작하기 위한 AI 코딩 가이드다.

새 화면을 만들 때 기존 코드를 무조건 새 방식으로 바꾸지 않는다.

기본 원칙:
1. 기존 코드의 구조와 작성 방식을 먼저 이해한다.
2. 기존 화면에서 재사용할 수 있는 구조와 스타일을 우선 활용한다.
3. 새로운 화면에서 실제로 필요한 부분만 추가하거나 수정한다.
4. HTML은 콘텐츠의 의미와 역할을 기준으로 작성한다.
5. CSS는 기존 프로젝트의 변수, 단위, 레이아웃 방식, 클래스 작성 방식을 우선 따른다.
6. 새로운 라이브러리나 복잡한 기술을 임의로 추가하지 않는다.
7. 기존 코드에 문제가 있더라도 전체 코드를 임의로 갈아엎지 않고 문제의 위치와 이유를 먼저 설명한다.

## 2. 현재 프로젝트 구조

```text
class/
├─ index.html
├─ bergerking/
│  ├─ login.html
│  └─ img/
│     ├─ apple_logo_icon.svg
│     ├─ back_icon.svg
│     ├─ cancle_icon.svg
│     ├─ checkBox_active.svg
│     ├─ checkBox_disabled.svg
│     ├─ check_large_inactive.svg
│     ├─ check_large_on.svg
│     ├─ check_small_icon.svg
│     ├─ close_icon.svg
│     ├─ eye_icon.svg
│     ├─ kakao_logo_icon.svg
│     ├─ naver_logo_icon.svg
│     ├─ right_icon.svg
│     └─ samsung_logo_icon.svg
├─ css/
│  └─ default.css
└─ font/
   ├─ BKBulMatPro-Bold.woff
   ├─ PretendardVariable.woff2
   ├─ SDGothicNeoRound-eMd.woff
   ├─ SDGothicNeoRound-gBd.woff
   ├─ SDGothicNeoRound-hEb.woff
   └─ css/
```

### 파일 역할

- `css/default.css`: 공통 reset 및 기본 스타일.
- `bergerking/login.html`: 버거킹 로그인 화면의 HTML과 화면 전용 CSS.
- `bergerking/img/`: 로그인 화면에서 사용하는 이미지와 아이콘.
- `font/`: 프로젝트에서 사용하는 폰트 파일과 폰트 CSS.

새 화면을 추가할 때 파일 위치와 상대경로를 먼저 확인한다.

## 3. 현재 로그인 HTML의 기준 구조

```html
<div id="wrap">
    <header>
        <h1>로그인</h1>
        <button class="prev_btn">
            <span class="sr-only">이전버튼</span>
        </button>
    </header>

    <main>
        <h2 class="title">
            <span>안녕하세요 :)</span>
            <span>버거킹입니다.</span>
        </h2>

        <form>
            <fieldset>
                <legend class="sr-only">로그인 화면</legend>

                <!-- 입력 영역 -->

                <button type="submit" class="login_btn">
                    로그인
                </button>
            </fieldset>
        </form>

        <div class="login_link">
            <!-- 관련 페이지 링크 -->
        </div>

        <div class="sns_login">
            <!-- SNS 로그인 영역 -->
        </div>
    </main>
</div>
```

화면의 역할이 같다면 다음 구조를 우선 검토한다.

- 전체 영역 → `#wrap`
- 상단 → `<header>`
- 페이지 대표 제목 → `<h1>`
- 핵심 콘텐츠 → `<main>`
- 주요 콘텐츠 제목 → `<h2>`
- 사용자 입력/제출 → `<form>`
- 관련 입력 그룹 → `<fieldset>` / `<legend>`
- 사용자 입력 → `<input>`
- 기능 실행 → `<button>`
- 페이지 이동 → `<a>`
- 단순 레이아웃 그룹 → `<div>`

단, 새로운 화면의 의미가 다르면 기존 태그를 억지로 유지하지 않는다.

## 4. Semantic HTML 원칙

HTML 태그는 화면의 모양이 아니라 콘텐츠의 의미와 역할을 기준으로 결정한다.

판단 순서:

```text
이 영역은 무엇인가?
↓
의미가 있는 HTML 요소가 있는가?
↓
있으면 해당 요소 사용
↓
적절한 의미 요소가 없고 레이아웃 그룹만 필요하면 div 사용
```

`div`를 먼저 선택하지 않는다.

반복되는 동일 유형의 콘텐츠라면 목록인지 먼저 확인하고 필요하면 `<ul><li>`를 사용한다.

## 5. Heading 원칙

현재:

```html
<h1>로그인</h1>
```

은 페이지 제목이고,

```html
<h2 class="title">
    <span>안녕하세요 :)</span>
    <span>버거킹입니다.</span>
</h2>
```

은 주요 콘텐츠 제목이다.

heading은 글자 크기가 아니라 문서의 계층을 기준으로 결정한다.

```text
h1
└─ 페이지 대표 제목

h2
├─ 주요 콘텐츠 제목
├─ 주요 콘텐츠 제목
└─ 주요 콘텐츠 제목

h3
└─ h2의 하위 주제
```

## 6. Form 원칙

현재 로그인 화면은 사용자가 이메일과 비밀번호를 입력하고 로그인하는 과정이므로 `<form>`을 사용한다.

기본 구조:

```html
<form action="">
    <fieldset>
        <legend class="sr-only">로그인 화면</legend>

        <label for="email" class="email">
            이메일 로그인
        </label>

        <div class="input_box">
            <input
                type="email"
                id="email"
                name="email"
                placeholder="아이디(이메일)을 입력해 주세요."
            >
        </div>

        <div class="input_box rela">
            <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해 주세요"
            >

            <button type="button" class="pw_btn">
                <span class="sr-only">비밀번호 보기</span>
            </button>
        </div>

        <button type="submit" class="login_btn">
            로그인
        </button>
    </fieldset>
</form>
```

새 화면에도 입력과 제출 과정이 있다면 기존의 `form`, `fieldset`, `legend`, `label`, `input`, `button` 구조를 우선 검토한다.

입력 종류와 실제 콘텐츠에 맞게 `type`, `id`, `name`, `placeholder` 등은 변경한다.

## 7. Button과 Link 구분

현재 코드의 기준:

- 이전 버튼 → `<button>`
- 비밀번호 보기 → `<button type="button">`
- 로그인 → `<button type="submit">`
- 아이디 찾기 → `<a>`
- 비밀번호 재설정 → `<a>`
- 회원가입 → `<a>`

판단 기준은 다음과 같다.

- 화면 안에서 기능을 실행하면 → `button`
- 다른 페이지나 경로로 이동하면 → `a`

새 화면에서도 같은 기준을 사용한다.

## 8. 접근성

현재 프로젝트는 `css/default.css`의 `.sr-only`를 사용한다.

```css
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

아이콘 버튼처럼 화면에는 텍스트가 보이지 않더라도 의미가 필요한 경우 기존 `.sr-only`를 사용한다.

## 9. 공통 CSS 유지

`css/default.css`의 기존 reset과 공통 스타일을 유지한다. 새 화면을 만들기 위해 전체 파일을 임의로 다시 작성하거나 교체하지 않는다.

## 10. CSS 변수

현재 로그인 화면은 `:root`에서 주요 디자인 값을 변수로 관리한다.

```css
:root {
    --font: "Sadoll GothicNeoRound", sans-serif;
    --font-pre: "Pretendard Variable", sans-serif;
    --font-BKR: "BKR", sans-serif;
    --primary: #512314;
    --focus: #D62302;
    --baseBorder: #D9CFC6;
    --inputBg: #FFFCF9;
    --errorColor: #C54734;
    --placeholder: #EBE6E2;
    --text: #766053;
    --bg: #F4EBDC;
    --button: #E9DDCD;
}
```

반복해서 사용하는 색상이나 폰트 값은 기존처럼 CSS 변수로 관리한다.

## 11. 단위와 반응형

현재 화면은 `rem`, `%`, `px`, `100dvh` 등을 사용하며 다음과 같은 기본 구조를 가진다.

```css
html {
    font-size: 62.5%;
}

#wrap {
    width: 100%;
    max-width: 1024px;
    min-width: 360px;
    min-height: 100dvh;
    margin: 0 auto;
}
```

새 화면에서도 기존 프로젝트의 단위와 반응형 방식을 우선 유지한다.

## 12. Layout

현재 로그인 화면은 Flexbox를 사용한다.

```css
header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
}
```

```css
.sns_list {
    display: flex;
    justify-content: center;
    column-gap: 20px;
}
```

새 화면에서도 단순한 가로/세로 정렬에는 기존 프로젝트와 같은 Flexbox 중심 방식을 우선 사용한다.

## 13. 이미지 처리

현재 아이콘은 CSS `background-image`를 사용하는 부분이 있다.

```css
.prev_btn {
    background: url(img/back_icon.svg) no-repeat scroll center / auto;
}

.pw_btn {
    background: url(img/eye_icon.svg) no-repeat center / 26px;
}
```

새 화면에서도 실제 제공된 이미지 파일이 있다면 기존 프로젝트의 이미지 처리 방식과 상대경로 구조를 우선 검토한다.

실제로 존재하지 않는 이미지 파일명이나 경로를 임의로 만들어내지 않는다.

## 14. Typography

현재 프로젝트에는 다음과 같은 폰트 변수가 있다.

```css
--font: "Sadoll GothicNeoRound", sans-serif;
--font-pre: "Pretendard Variable", sans-serif;
--font-BKR: "BKR", sans-serif;
```

새 화면에서도 현재 프로젝트의 폰트를 재사용할 수 있다면 우선 재사용한다.

## 15. Class 작성

현재 클래스는 역할을 설명하는 이름을 사용한다.

```text
.prev_btn
.title
.input_box
.login_option
.login_btn
.login_link
.sns_login
.sns_list
.pw_btn
```

새 클래스도 역할 중심으로 작성한다.

## 16. 새 화면 제작 우선순위

1. 기존 HTML 구조 재사용
2. 기존 공통 CSS와 변수 재사용
3. 기존 클래스 재사용
4. 필요한 새 클래스 추가
5. 정말 필요한 경우에만 새로운 기술 추가

## 17. AI의 새 화면 제작 절차

### STEP 1. 현재 자료 확인
사용자가 제공한 이미지, Figma, HTML, CSS, 텍스트를 먼저 확인한다.

### STEP 2. 콘텐츠 역할 분석
페이지 제목, 주요 콘텐츠 제목, 설명, 입력, 버튼, 링크, 목록, 안내사항, 장식, 레이아웃으로 분류한다.

### STEP 3. 기존 버거킹 구조와 비교
같은 역할은 기존 구조를 재사용하고, 다른 역할은 필요한 만큼 구조를 변경한다.

### STEP 4. HTML 결정
태그는 화면의 모양이 아니라 의미를 기준으로 선택한다.

### STEP 5. CSS 작성
기존 reset, CSS 변수, font, rem, Flexbox, 클래스명, 이미지 처리 방식을 우선 유지한다.

### STEP 6. 경로 확인
새 HTML의 실제 위치를 먼저 확인하고 CSS/이미지/폰트 상대경로를 계산한다.

### STEP 7. 결과 확인
HTML 의미, heading 계층, label/input 연결, button/a 구분, 기존 CSS 유지, 경로, 반응형을 확인한다.

## 18. 기존 코드 오류 처리

기존 코드에 문제가 발견되면 전체 코드를 새로 작성하지 않는다.

다음 순서로 설명한다.

1. 문제가 있는 코드
2. 코드가 의도한 것으로 보이는 것
3. 실제 문제
4. 수정해야 하는 이유
5. 최소 수정 방법

예를 들어 현재 코드의 `input[type=".email"]`은 실제 `type="email"` input을 선택하지 않는다. 이런 문제는 해당 부분을 먼저 설명하고 최소 수정한다.

## 19. 금지 사항

1. 기존 HTML 전체를 새로운 스타일로 재작성하지 않는다.
2. 기존 `default.css`를 전부 삭제하지 않는다.
3. 새로운 라이브러리나 프레임워크를 임의로 추가하지 않는다.
4. 존재하지 않는 이미지 파일이나 경로를 만들어내지 않는다.
5. 화면에서 버튼처럼 보인다는 이유만으로 무조건 `<button>`을 사용하지 않는다.
6. 기존 클래스명을 이유 없이 전부 변경하지 않는다.
7. 현재 프로젝트에서 사용하지 않는 복잡한 기술을 우선 도입하지 않는다.
8. 사용자가 제공하지 않은 실제 콘텐츠나 경로를 임의로 확정하지 않는다.

## 20. AI 답변 방식

AI가 새 화면의 코드를 작성하거나 수정할 때 다음 순서를 따른다.

### 먼저 설명
- 기존 버거킹 코드에서 재사용할 구조
- 현재 화면에서 달라지는 부분
- 새로 필요한 구조

### HTML
HTML을 작성하고 중요한 semantic 요소의 선택 이유를 간단히 설명한다.

### CSS
재사용한 부분, 변경한 부분, 새로 추가한 부분을 구분한다.

### 확인사항
사용자가 직접 확인할 수 있는 항목을 알려준다.

## 21. 핵심 원칙

> 버거킹 코드를 복사하는 것이 아니라, 버거킹 코드에서 사용한 구조와 작성 원리를 재사용한다.

```text
기존 버거킹 화면
        ↓
HTML 구조와 CSS 작성 방식 분석
        ↓
새 화면의 콘텐츠 역할 분석
        ↓
같은 역할 → 기존 구조 재사용
        ↓
다른 역할 → 필요한 만큼 구조 변경
        ↓
기존 CSS 스타일 원칙 유지
        ↓
필요한 CSS만 추가
        ↓
경로 / 반응형 / 접근성 확인
```

목표는 버거킹과 똑같은 코드를 반복하는 것이 아니라, **현재 프로젝트의 코드 스타일과 학습 수준을 유지하면서 새로운 화면의 의미와 디자인을 정확하게 구현하는 것**이다.
