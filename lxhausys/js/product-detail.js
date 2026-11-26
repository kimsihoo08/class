document.addEventListener("DOMContentLoaded",()=>{
  const params=new URLSearchParams(window.location.search);
  const name=params.get("name"), type=params.get("type"), code=params.get("code"), image=params.get("image"), category=params.get("category");
  const title=document.querySelector("#detail-title"), breadcrumb=document.querySelector("#detail-breadcrumb"), categoryEl=document.querySelector("#detail-category"), codeEl=document.querySelector("#detail-code"), description=document.querySelector("#detail-description"), imageBox=document.querySelector(".detail-image");
  if(!name){title.textContent="제품 정보를 찾을 수 없습니다.";breadcrumb.textContent="제품 상세";categoryEl.textContent="PRODUCT";description.textContent="제품 목록에서 확인할 제품을 다시 선택해 주세요.";imageBox.hidden=true;}
  else {
    document.title=name+" | LX하우시스"; title.textContent=name; breadcrumb.textContent=name; categoryEl.textContent=(category||"제품")+" · "+(type||""); codeEl.textContent=code||"";
    description.textContent="제품의 상세 사양과 적용 정보는 확인 후 추가할 수 있습니다.";
    if(image){imageBox.innerHTML='<img class="detail-product-image" src="" alt="">';const img=imageBox.querySelector("img");img.src=image;img.alt=name;}
  }
  const toggle=document.querySelector(".mobile-menu-toggle"),menu=document.querySelector("#mobile-menu");
  if(toggle&&menu){toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")==="true";toggle.setAttribute("aria-expanded",String(!open));toggle.setAttribute("aria-label",open?"메뉴 열기":"메뉴 닫기");menu.hidden=open;});menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","메뉴 열기");menu.hidden=true;}));}
});