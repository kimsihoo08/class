document.addEventListener("DOMContentLoaded", () => {
 const toggle=document.querySelector(".mobile-menu-toggle"), mobile=document.querySelector("#mobile-menu");
 if(toggle&&mobile){toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")==="true";toggle.setAttribute("aria-expanded",String(!open));toggle.setAttribute("aria-label",open?"메뉴 열기":"메뉴 닫기");mobile.hidden=open;});mobile.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","메뉴 열기");mobile.hidden=true;}));}
 const tabs=[...document.querySelectorAll(".category-tab")],list=document.querySelector("#product-board-list"),search=document.querySelector("#product-search"),clear=document.querySelector("#product-search-clear"),count=document.querySelector("#product-result-count"),empty=document.querySelector("#product-empty"),title=document.querySelector("#board-title"),desc=document.querySelector("#board-description"),toolbar=document.querySelector(".board-toolbar"),total=document.querySelector(".board-total"),heading=document.querySelector(".board-heading");
 if(!tabs.length||!list)return;
 // 실제 DB 대신 카테고리별 화면 구성을 확인할 수 있도록 예시 데이터를 사용합니다.
 const products={
 "LONCHEL":[["LONCHEL 대표 제품","프리미엄 소재","LONCHEL 브랜드의 주요 소재와 제품 정보를 소개합니다."],["LONCHEL 소재 라인업","소재 솔루션","공간에 적용되는 프리미엄 소재를 확인해 보세요."],["LONCHEL 제품 안내","제품 정보","브랜드 제품의 특징과 활용 정보를 살펴보세요."]],
 "수입 주방":[["수입 주방 대표 제품","주방 가구","해외 주방 브랜드의 주요 제품 정보를 확인해 보세요."],["프리미엄 주방 솔루션","주방 시스템","주방 공간을 위한 제품과 구성 정보를 소개합니다."],["수입 주방 제품 안내","제품 정보","다양한 주방 스타일에 맞는 제품을 살펴보세요."]],
 "자동차소재부품":[["자동차 내장 소재","자동차 소재","자동차 실내 공간에 적용되는 소재 정보를 소개합니다."],["자동차 외장 소재","자동차 부품","차량 외장에 활용되는 소재와 부품을 확인해 보세요."],["자동차 소재 제품 안내","제품 정보","자동차 산업에 적용되는 소재 솔루션입니다."]],
 "산업용 필름":[["산업용 필름 대표 제품","산업용 필름","다양한 산업 환경에 활용되는 필름 제품을 소개합니다."],["표면 마감 필름","표면 소재","제품 표면의 디자인과 기능을 고려한 필름입니다."],["산업용 필름 제품 안내","제품 정보","산업 분야별 필름 활용 정보를 확인해 보세요."]],
 "신재생 에너지":[["신재생 에너지 대표 제품","에너지 솔루션","지속가능한 에너지 분야의 제품 정보를 소개합니다."],["에너지 관련 제품","친환경 기술","에너지 활용을 고려한 제품 솔루션입니다."],["신재생 에너지 제품 안내","제품 정보","관련 제품의 특징과 활용 정보를 살펴보세요."]],
 "단열재":[["건축용 단열재 대표 제품","단열재","건축물의 에너지 효율을 고려한 단열 제품입니다."],["고성능 단열 솔루션","건축 소재","건축 환경에 맞춘 단열 소재 정보를 확인해 보세요."],["단열재 제품 안내","제품 정보","단열 성능과 적용 분야를 살펴보세요."]]
 };
 const descriptions={"LONCHEL":"프리미엄 소재와 공간 솔루션을 확인해 보세요.","수입 주방":"해외 주방 브랜드와 제품 정보를 확인해 보세요.","자동차소재부품":"자동차 내·외장에 적용되는 소재와 부품을 살펴보세요.","산업용 필름":"다양한 산업 분야에 활용되는 필름 제품을 살펴보세요.","신재생 에너지":"지속가능한 에너지 분야의 제품 정보를 확인해 보세요.","단열재":"건축물의 에너지 효율을 고려한 단열 제품을 살펴보세요."};
 const architectureItems=["창호","벽지 & 벽장재","바닥재(주거)","바닥재(상업)","인테리어필름","인테리어스톤","중문","도어","키친","빌트인 시스템","보드","단열재"];
 const categoryByHash={"category-architecture":"건축장식자재","category-lonchel":"LONCHEL","category-kitchen":"수입 주방","category-automotive":"자동차소재부품","category-film":"산업용 필름","category-energy":"신재생 에너지","category-insulation":"단열재"};
 let active=categoryByHash[location.hash.slice(1)]||"건축장식자재";

 const materialData={
   "창호":{description:"LX Z:IN의 창호 제품과 다양한 타입을 확인해 보세요.",filters:["전체","뷰프레임","시스템창호","커튼월","차별화 옵션 상품"],items:[
     ["시스템창호 Top Hung (전동)","시스템창호","E9-ATH220 AUTO","img/product01.png"],
     ["뷰프레임","뷰프레임","F-145/145S/265/265S/285(베젤리스)","img/product02.png"],
     ["시스템창호 Lift & Slide","시스템창호","E9-PLS200/250N","img/product03.png"],
     ["시스템창호 Lift & Slide","시스템창호","E9-ALS283D","img/product04.png"],
     ["시스템창호 Lift & Slide","시스템창호","E9-ALS245","img/product05.png"],
     ["커튼월 시스템창호 Façade","커튼월","E9-ACW","img/product06.png"],
     ["먼지필터 방충망","차별화 옵션 상품","","img/product07.png"],
     ["시스템창호 Tilt & Turn","시스템창호","E9-PTT85","img/products1.png"]
   ]},
   "벽지 & 벽장재":{description:"공간의 분위기를 완성하는 벽지와 벽장재 제품 분야입니다.",filters:["전체","디아망","실크벽지","방염벽지","뮤럴벽지","합지벽지","조습벽재","에디톤"],items:[["디아망","디아망"],["실크벽지","실크벽지"],["방염벽지","방염벽지"],["뮤럴벽지","뮤럴벽지"],["합지벽지","합지벽지"],["조습벽재","조습벽재"],["에디톤","에디톤"]]},
   "바닥재(주거)":{description:"주거 공간에 어울리는 바닥재 제품 분야입니다.",filters:["전체","에디톤","마루","시트","타일"],items:[["에디톤","에디톤"],["마루","마루"],["시트","시트"],["타일","타일"]]},
   "바닥재(상업)":{description:"상업 공간의 사용 환경을 고려한 바닥재 제품 분야입니다.",filters:["전체","LVT","VCT","전도성 타일","카펫타일","이중바닥재","Looselay","상업용 시트"],items:[["LVT","LVT"],["VCT","VCT"],["전도성 타일","전도성 타일"],["카펫타일","카펫타일"],["이중바닥재","이중바닥재"],["Looselay","Looselay"],["상업용 시트","상업용 시트"]]},
   "인테리어필름":{description:"다양한 표면에 적용할 수 있는 인테리어 필름 제품 분야입니다.",filters:["전체","솔리드","메탈","우드","스톤","텍스타일","레더","아웃도어"],items:[["솔리드","솔리드"],["메탈","메탈"],["우드","우드"],["스톤","스톤"],["텍스타일","텍스타일"],["레더","레더"],["아웃도어","아웃도어"]]},
   "인테리어스톤":{description:"고급스러운 공간 연출을 위한 인테리어 스톤 제품 분야입니다.",filters:["전체","비아테라"],items:[["비아테라","이스톤"]] },
   "중문":{description:"공간을 분리하고 연결하는 중문 제품 분야입니다.",filters:["전체","슬라이딩 중문","스윙 중문"],items:[["슬라이딩 중문","중문"],["스윙 중문","중문"]]},
   "도어":{description:"공간의 디자인과 기능을 고려한 도어 제품 분야입니다.",filters:["전체","디자인 도어","글라스 도어","안전 도어","3연동 미서기 도어"],items:[["디자인 도어","도어"],["글라스 도어","도어"],["안전 도어","도어"],["3연동 미서기 도어","도어"]]},
   "키친":{description:"라이프스타일에 맞춘 주방 제품 라인업입니다.",filters:["전체","제니스9","셀렉션 7","셀렉션 5","셀렉션 3","셀렉션 1"],items:[["제니스9","키친"],["셀렉션 7","키친"],["셀렉션 5","키친"],["셀렉션 3","키친"],["셀렉션 1","키친"]]},
   "빌트인 시스템":{description:"수납과 공간 활용을 위한 빌트인 시스템 제품 분야입니다.",filters:["전체","붙박이장","현관장","유닛","행거 시스템","냉장고장"],items:[["붙박이장","빌트인 시스템"],["현관장","빌트인 시스템"],["유닛","빌트인 시스템"],["행거 시스템","빌트인 시스템"],["냉장고장","빌트인 시스템"]]},
   "보드":{description:"가구와 건축에 활용되는 보드 제품 분야입니다.",filters:["전체","가구용 보드","준불연 보드"],items:[["가구용 보드","보드"],["준불연 보드","보드"]]},
   "단열재":{description:"건축물의 단열 성능을 고려한 단열재 제품 분야입니다.",filters:["전체","인테리어용 단열재"],items:[["인테리어용 단열재","단열재"]]}
 };
 const architectureIcons={
"창호":`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"><path d="M14 50V10h26v40M19 50V14h8v36M31 14h5v36M10 50h35M7 54h42M12 34h30M15 36v14M20 36v14M25 36v14M30 36v14M35 36v14M40 36v14"/></g><path d="M20 14h7v22h-7zM31 14h5v22h-5z" fill="none" stroke="#d92f32" stroke-width="1.15"/></svg>`,
"벽지 & 벽장재":`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round"><path d="M16 14h31v33c0 5-4 8-9 8H16c-4 0-6-3-6-7V21c0-4 2-7 6-7zM47 14c5 0 7 3 7 7s-2 7-7 7"/></g><g fill="none" stroke="#d92f32" stroke-width="1"><path d="M22 23l2 3m-2 0l2-3M31 19v5m-2-2h4M38 29l2 3m-2 0l2-3M25 38v5m-2-2h4M36 40l2 3m-2 0l2-3"/></g><ellipse cx="51" cy="21" rx="2.5" ry="5" fill="none" stroke="currentColor" stroke-width="1"/></svg>`,
"바닥재(주거)":`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"><path d="M8 28 29 11l17 13-21 17zM29 11l17-8 18 14-18 15zM25 41l21-17 18 14-20 17z"/></g><path d="m46 32 18-15M46 32 64 46" fill="none" stroke="#d92f32" stroke-width="1.15"/></svg>`,
"바닥재(상업)":`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.05"><path d="M8 8h48v48H8zM8 24 24 8M8 40 40 8M8 56 56 8M24 56 56 24M40 56 56 40M24 8 8 24M40 8 8 40M56 8 8 56M56 24 24 56M56 40 40 56"/></g><path d="m18 42 24-24M30 54l24-24" fill="none" stroke="#d92f32" stroke-width="1.2"/></svg>`,
"인테리어필름":`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"><path d="M14 14c0-5 17-5 17 0v39c0 7-17 7-17 0zM31 14h30v30L49 56H31"/><ellipse cx="22.5" cy="14" rx="8.5" ry="4"/><path d="M49 56V44h12"/></g><path d="M49 44h12" stroke="#d92f32" stroke-width="1.2"/></svg>`,
"인테리어스톤":`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.05" stroke-linejoin="round"><path d="M8 48 17 12h34l8 36zM17 12l-4 16h42l-4-16M22 12c-1 9 7 10 10 16s-2 11-8 13M39 12c-1 8 7 10 11 15M12 36c8-4 13 0 18 7s12 6 18 1"/></g><path d="M31 28c4-3 8-2 11 2" fill="none" stroke="#d92f32" stroke-width="1.2"/></svg>`,
"중문":`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.15"><path d="M12 10h36v43H12zM17 14h10v35H17zM31 14h12v35H31zM8 53h44M53 35v18M53 35h6v18M56 29v6"/></g><path d="M17 14h10v35H17zM31 14h12v35H31z" fill="none" stroke="#d92f32" stroke-width="1.1"/></svg>`,
"도어":`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round"><path d="M16 10 49 14v43l-33-4zM9 14h7v39H9zM49 14l7 2v39l-7 2"/></g><circle cx="31" cy="35" r="2" fill="none" stroke="#d92f32" stroke-width="1.2"/></svg>`,
"키친":`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"><path d="M9 32h46v24H9zM14 25h36v7H14zM14 39h15v17H14zM34 39h16v17H34zM21 25v-8h13l7 8M23 17v-7h7v7M51 32v-9h5v33M54 23v-5"/></g><g fill="none" stroke="#d92f32" stroke-width="1"><circle cx="18" cy="28.5" r="1.5"/><circle cx="25" cy="28.5" r="1.5"/><circle cx="32" cy="28.5" r="1.5"/><path d="M18 44h7M38 44h7"/></g></svg>`,
"빌트인 시스템":`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"><path d="M10 9h44v47H10zM10 31h44M29 9v47M42 9v22M10 45h44M5 56h54"/></g><path d="M20 24v-6M33 24v-6M20 39h5M33 50h5" stroke="#d92f32" stroke-width="1.2"/></svg>`,
"보드":`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.15"><path d="M12 12h40v44H12zM12 34h40M32 12v44"/></g><path d="M22 28h7M36 28h7M22 40h7M36 40h7" stroke="#d92f32" stroke-width="1.2"/></svg>`,
"단열재":`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"><path d="m8 22 27-13 27 13-27 13zM8 31l27 13 27-13M8 40l27 13 27-13M14 25v11l21 10 21-10V25M20 19l15 7 15-7"/></g><path d="m8 22 27-13 27 13-27 13z" fill="none" stroke="#d92f32" stroke-width="1.2"/></svg>`
 };
 function renderMaterialBoard(material){
   const data=materialData[material];
   const intro=list.querySelector(".architecture-intro");
   if(!data||!intro)return;
   let board=intro.querySelector(".material-board");
   if(!board){board=document.createElement("section");board.className="material-board";board.setAttribute("aria-live","polite");intro.appendChild(board);}
   const cards=data.items.map((item,index)=>({name:item[0],type:item[1],code:item[2]||"",image:item[3]||`img/product0${index%7+1}.png`,best:index===1}));
   board.innerHTML=`
     <div class="material-board-heading">
       <div><p class="eyebrow">PRODUCT LIST</p><h4>${material} 제품</h4><p>${data.description}</p></div>
     </div>
     <div class="material-category-bar">
       <strong class="material-category-label">카테고리</strong>
       <div class="material-filter-list" role="group" aria-label="${material} 세부 카테고리">
         ${data.filters.map((filter,index)=>`<button type="button" class="material-filter${index===0?" is-active":""}" data-filter="${filter}">${filter}</button>`).join("")}
       </div>
     </div>
     <div class="material-products-heading">
       <div><h5>${material} 제품</h5><p>전체 <strong class="material-visible-count">${cards.length}</strong>개</p></div>
       <label class="material-sort-label"><span class="sr-only">제품 정렬</span><select class="material-sort"><option value="new">신제품순</option><option value="name">가나다순</option></select></label>
     </div>
     <div class="material-product-grid">
       ${cards.map((item,index)=>`<article class="material-product-card" data-type="${item.type}" data-name="${item.name}">
         <div class="material-product-image"><img src="${item.image}" alt="${item.name}" loading="lazy"><button type="button" class="material-bookmark" aria-label="${item.name} 스크랩"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.5 3.5h11a1 1 0 0 1 1 1v16l-6.5-4-6.5 4v-16a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>
         <p class="material-product-type">${item.type}</p><h6>${item.name}</h6>${item.code?`<p class="material-product-code">${item.code}</p>`:""}${item.best?'<span class="material-best">BEST</span>':""}
       </article>`).join("")}
     </div>`;
   const updateVisible=()=>{
     const activeFilter=board.querySelector("[data-filter].is-active")?.dataset.filter||"전체";
     const rows=[...board.querySelectorAll(".material-product-card")];
     rows.forEach(card=>{card.hidden=activeFilter!=="전체"&&card.dataset.type!==activeFilter;});
     const visible=rows.filter(card=>!card.hidden);
     board.querySelector(".material-visible-count").textContent=visible.length;
     const sort=board.querySelector(".material-sort")?.value;
     if(sort==="name"){
       const grid=board.querySelector(".material-product-grid");
       [...grid.children].sort((a,b)=>a.dataset.name.localeCompare(b.dataset.name,"ko")).forEach(card=>grid.appendChild(card));
     }
   };
   board.querySelectorAll("[data-filter]").forEach(filterButton=>filterButton.addEventListener("click",()=>{
     board.querySelectorAll("[data-filter]").forEach(item=>item.classList.toggle("is-active",item===filterButton));
     updateVisible();
   }));
   board.querySelector(".material-sort")?.addEventListener("change",updateVisible);
   board.scrollIntoView({behavior:"smooth",block:"start"});
 }
 function render(){
   const isArchitecture=active==="건축장식자재";
   if(toolbar)toolbar.hidden=isArchitecture;
   if(total)total.hidden=isArchitecture;
   if(heading)heading.classList.toggle("is-architecture",isArchitecture);
   if(title)title.textContent=isArchitecture?"건축장식자재":active+" 제품";
   if(desc)desc.textContent=isArchitecture?"LX Z:IN의 다양한 제품을 만나보세요.":"";
   if(isArchitecture){
     list.innerHTML=`
       <div class="architecture-intro">
         <div class="architecture-product-heading">
           <div><p class="eyebrow">LX Z:IN PRODUCT</p><p>LX Z:IN의 다양한 제품을 만나보세요.<br><span>제품 분야를 선택해 관련 제품 정보를 확인할 수 있습니다.</span></p></div>
         </div>
         <div class="architecture-product-grid" aria-label="건축장식자재 제품 분야">
           ${architectureItems.map((item,i)=>`<button class="architecture-product-item" type="button" data-material="${item}"><span class="architecture-product-symbol">${architectureIcons[item]||""}</span><strong>${item}</strong><span class="architecture-product-arrow" aria-hidden="true">↗</span></button>`).join("")}
         </div>
       </div>`;
     empty.hidden=true;
     list.querySelectorAll("[data-material]").forEach(button=>button.addEventListener("click",()=>{
       list.querySelectorAll("[data-material]").forEach(item=>{const selected=item===button;item.classList.toggle("is-selected",selected);item.setAttribute("aria-pressed",String(selected));});
       renderMaterialBoard(button.dataset.material);
     }));
     return;
   }
   const key=search?.value.trim().toLocaleLowerCase("ko")||"",rows=(products[active]||[]).filter(row=>row.join(" ").toLocaleLowerCase("ko").includes(key));
   list.innerHTML=rows.map(([name,type,summary],i)=>`<article class="product-board-item"><div class="board-thumb"><img src="img/products1.png" alt=""></div><div class="board-item-copy"><p class="board-item-category">${type}</p><h4>${name}</h4><p>${summary}</p></div><span class="board-item-index">${String(i+1).padStart(2,"0")}</span></article>`).join("");
   if(count)count.textContent=String(rows.length);
   if(empty)empty.hidden=rows.length>0;
   if(desc)desc.textContent=descriptions[active]||"";
 }
 tabs.forEach(tab=>tab.addEventListener("click",()=>{active=tab.dataset.category||"건축장식자재";tabs.forEach(item=>{const selected=item===tab;item.classList.toggle("is-active",selected);item.setAttribute("aria-selected",String(selected));});if(search)search.value="";render();}));
 tabs.forEach(tab=>{const selected=tab.dataset.category===active;tab.classList.toggle("is-active",selected);tab.setAttribute("aria-selected",String(selected));});
 document.querySelectorAll('a[href*="#category-"]').forEach(link=>link.addEventListener("click",event=>{
   const hash=new URL(link.href,location.href).hash;
   const targetTab=document.getElementById(hash.slice(1));
   if(!targetTab||!targetTab.classList.contains("category-tab"))return;
   event.preventDefault();
   history.pushState(null,"",hash);
   targetTab.click();
   document.querySelector(".category-tabs")?.scrollIntoView({behavior:"smooth",block:"center"});
 }));
 search?.addEventListener("input",render);clear?.addEventListener("click",()=>{if(search){search.value="";search.focus();render();}});render();
});