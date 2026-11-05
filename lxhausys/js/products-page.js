document.addEventListener("DOMContentLoaded", () => {
 const toggle=document.querySelector(".mobile-menu-toggle"), mobile=document.querySelector("#mobile-menu");
 if(toggle&&mobile){toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")==="true";toggle.setAttribute("aria-expanded",String(!open));toggle.setAttribute("aria-label",open?"메뉴 열기":"메뉴 닫기");mobile.hidden=open;});mobile.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","메뉴 열기");mobile.hidden=true;}));}
 const tabs=[...document.querySelectorAll(".category-tab")],list=document.querySelector("#product-board-list"),search=document.querySelector("#product-search"),clear=document.querySelector("#product-search-clear"),count=document.querySelector("#product-result-count"),empty=document.querySelector("#product-empty"),title=document.querySelector("#board-title"),desc=document.querySelector("#board-description");
 if(!tabs.length||!list)return;
 // 실제 DB 대신 카테고리 전환과 게시판 레이아웃 확인을 위한 예시 데이터입니다.
 const products={
 "건축장식자재":[["건축장식자재 대표 제품","창호 · 바닥재 · 벽장재","공간의 기능과 디자인을 완성하는 건축 마감 제품을 살펴보세요."],["공간 마감 솔루션","인테리어 자재","주거 및 상업 공간에 적용할 수 있는 마감 솔루션입니다."],["건축 자재 제품 안내","건축장식자재","다양한 공간 환경에 맞춘 제품 정보를 확인해 보세요."]],
 "LONCHEL":[["LONCHEL 대표 제품","프리미엄 소재","LONCHEL 브랜드의 주요 소재와 제품 정보를 소개합니다."],["LONCHEL 소재 라인업","소재 솔루션","공간에 적용되는 프리미엄 소재를 확인해 보세요."],["LONCHEL 제품 안내","제품 정보","브랜드 제품의 특징과 활용 정보를 살펴보세요."]],
 "수입 주방":[["수입 주방 대표 제품","주방 가구","해외 주방 브랜드의 주요 제품 정보를 확인해 보세요."],["프리미엄 주방 솔루션","주방 시스템","주방 공간을 위한 제품과 구성 정보를 소개합니다."],["수입 주방 제품 안내","제품 정보","다양한 주방 스타일에 맞는 제품을 살펴보세요."]],
 "자동차소재부품":[["자동차 내장 소재","자동차 소재","자동차 실내 공간에 적용되는 소재 정보를 소개합니다."],["자동차 외장 소재","자동차 부품","차량 외장에 활용되는 소재와 부품을 확인해 보세요."],["자동차 소재 제품 안내","제품 정보","자동차 산업에 적용되는 소재 솔루션입니다."]],
 "산업용 필름":[["산업용 필름 대표 제품","산업용 필름","다양한 산업 환경에 활용되는 필름 제품을 소개합니다."],["표면 마감 필름","표면 소재","제품 표면의 디자인과 기능을 고려한 필름입니다."],["산업용 필름 제품 안내","제품 정보","산업 분야별 필름 활용 정보를 확인해 보세요."]],
 "신재생 에너지":[["신재생 에너지 대표 제품","에너지 솔루션","지속가능한 에너지 분야의 제품 정보를 소개합니다."],["에너지 관련 제품","친환경 기술","에너지 활용을 고려한 제품 솔루션입니다."],["신재생 에너지 제품 안내","제품 정보","관련 제품의 특징과 활용 정보를 살펴보세요."]],
 "단열재":[["건축용 단열재 대표 제품","단열재","건축물의 에너지 효율을 고려한 단열 제품입니다."],["고성능 단열 솔루션","건축 소재","건축 환경에 맞춘 단열 소재 정보를 확인해 보세요."],["단열재 제품 안내","제품 정보","단열 성능과 적용 분야를 살펴보세요."]]
 };
 const descriptions={"건축장식자재":"창호부터 바닥재, 벽장재까지 공간의 가치를 높이는 제품을 확인해 보세요.","LONCHEL":"프리미엄 소재와 공간 솔루션을 확인해 보세요.","수입 주방":"해외 주방 브랜드와 제품 정보를 확인해 보세요.","자동차소재부품":"자동차 내·외장에 적용되는 소재와 부품을 살펴보세요.","산업용 필름":"다양한 산업 분야에 활용되는 필름 제품을 살펴보세요.","신재생 에너지":"지속가능한 에너지 분야의 제품 정보를 확인해 보세요.","단열재":"건축물의 에너지 효율을 고려한 단열 제품을 살펴보세요."};
 let active="건축장식자재";
 function render(){const key=search?.value.trim().toLocaleLowerCase("ko")||"",rows=(products[active]||[]).filter(row=>row.join(" ").toLocaleLowerCase("ko").includes(key));list.innerHTML=rows.map(([name,type,summary],i)=>`<article class="product-board-item"><div class="board-thumb"><img src="img/products1.png" alt=""></div><div class="board-item-copy"><p class="board-item-category">${type}</p><h4>${name}</h4><p>${summary}</p></div><span class="board-item-index">${String(i+1).padStart(2,"0")}</span></article>`).join("");if(count)count.textContent=String(rows.length);if(empty)empty.hidden=rows.length>0;if(title)title.textContent=active+" 제품";if(desc)desc.textContent=descriptions[active]||"";}
 tabs.forEach(tab=>tab.addEventListener("click",()=>{active=tab.dataset.category||"건축장식자재";tabs.forEach(item=>{const selected=item===tab;item.classList.toggle("is-active",selected);item.setAttribute("aria-selected",String(selected));});if(search)search.value="";render();}));
 search?.addEventListener("input",render);clear?.addEventListener("click",()=>{if(search){search.value="";search.focus();render();}});render();
});