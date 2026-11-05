document.addEventListener("DOMContentLoaded", () => {
 const catalog = {
  architecture: { title:"건축장식자재", desc:"공간의 기능과 디자인을 완성하는 건축장식자재를 살펴보세요.", items:["창호","벽지&벽장재","바닥재(주거)","바닥재(상업)","인테리어필름","인테리어스톤","중문","도어","키친","빌트인 시스템","보드","단열재"] },
  lonchel: { title:"LONCHEL", desc:"LONCHEL 제품과 브랜드 콘텐츠를 확인해 보세요.", items:["브랜드 이야기","창호","바닥재","이스톤","포세린","중문","퍼니처 도어","포트폴리오"] },
  kitchen: { title:"수입 주방", desc:"수입 주방 브랜드와 주방 공간 제안을 살펴보세요.", items:["rastelli","Cucine LUBE","포트폴리오"] },
  automotive: { title:"자동차소재부품", desc:"자동차 산업에 적용되는 소재와 부품 분야입니다.", items:["원단","경량화 부품","자동차 부품"] },
  film: { title:"산업용 필름", desc:"다양한 산업과 제품 표면에 적용되는 필름입니다.", items:["데코필름","가전필름","Sign&Graphic"] },
  energy: { title:"신재생 에너지", desc:"지속가능한 에너지 분야의 제품을 살펴보세요.", items:["솔라시스템루버"] },
  insulation: { title:"단열재", desc:"건축물의 단열 성능을 위한 제품 정보를 확인해 보세요.", items:["PF보드"] }
 };
 const params = new URLSearchParams(location.search);
 const key = params.get("category") || "architecture";
 const data = catalog[key] || catalog.architecture;
 const selectedItem = params.get("item") || "전체";
 const title = document.querySelector("#board-title");
 const description = document.querySelector("#board-description");
 const current = document.querySelector("#breadcrumb-current");
 const nav = document.querySelector("#category-navigation");
 const subTitle = document.querySelector("#subcategory-title");
 const list = document.querySelector("#board-list");
 const count = document.querySelector("#board-count");
 const search = document.querySelector("#board-search");
 const clear = document.querySelector("#search-clear");
 const empty = document.querySelector("#board-empty");
 title.textContent = data.title;
 description.textContent = data.desc;
 current.textContent = data.title;
 subTitle.textContent = selectedItem;
 const allItems = ["전체", ...data.items];
 nav.innerHTML = allItems.map(item => {
  const href = item === "전체" ? `product-board.html?category=${key}` : `product-board.html?category=${key}&item=${encodeURIComponent(item)}`;
  return `<a href="${href}" class="${item === selectedItem ? "is-active" : ""}" ${item === selectedItem ? 'aria-current="page"' : ""}>${item}</a>`;
 }).join("");
 const examples = [
  ["제품 소개","제품의 주요 특징과 적용 공간을 확인할 수 있습니다."],
  ["제품 사양","용도와 소재 특성에 맞춘 제품 정보를 살펴보세요."],
  ["디자인 옵션","다양한 색상과 표면 디자인을 비교해 보세요."],
  ["적용 사례","실제 공간과 산업 환경에서의 활용 방향을 확인하세요."]
 ];
 let records = allItems.filter(item => item !== "전체").filter(item => selectedItem === "전체" || item === selectedItem).map((item, index) => ({
  category: item, name: item + " 제품 안내", description: examples[index % examples.length][1], tag: examples[index % examples.length][0]
 }));
 if (records.length < 4) {
  const filler = ["제품 특징","주요 사양","디자인 및 컬러","활용 안내"];
  records = [...records, ...filler.map((name,index)=>({category:selectedItem === "전체" ? data.title : selectedItem,name,description:examples[index % examples.length][1],tag:examples[index % examples.length][0]}))];
 }
 function render() {
  const q = search.value.trim().toLocaleLowerCase("ko");
  const filtered = records.filter(record => (record.name + record.category + record.description).toLocaleLowerCase("ko").includes(q));
  list.innerHTML = filtered.map(record => `<article class="board-item"><div class="board-thumb" aria-hidden="true">PRODUCT</div><div class="board-item-copy"><small>${record.category} · ${record.tag}</small><h3>${record.name}</h3><p>${record.description}</p></div><span class="board-arrow" aria-hidden="true">↗</span></article>`).join("");
  count.textContent = filtered.length;
  empty.hidden = filtered.length > 0;
 }
 search.addEventListener("input", render);
 clear.addEventListener("click", () => { search.value = ""; search.focus(); render(); });
 render();
 const toggle = document.querySelector(".mobile-menu-toggle");
 const mobile = document.querySelector("#mobile-menu");
 if (toggle && mobile) toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  toggle.setAttribute("aria-label", open ? "메뉴 열기" : "메뉴 닫기");
  mobile.hidden = open;
 });
});