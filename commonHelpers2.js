import{S as b,i as g,a as L}from"./assets/vendor-4c86d853.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const w=document.querySelector(".form"),u=document.querySelector('input[type="text"]'),m=document.querySelector(".gallery"),v=document.querySelector(".loader"),f=document.querySelector(".load-btn"),S="40876862-5828b09b8a35d05d7759eed0a",p=40;let a=1,y="",l=[];const A={icon:"icon-false",backgroundColor:"#FC5A5A",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",messageSize:"16px",position:"topRight",close:!1},k=async()=>(await L.get("https://pixabay.com/api",{params:{key:S,q:y,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:p,page:a}})).data,h=async()=>{try{const e=await k();if(e.hits.length===0)return s("none"),r("none"),g.show(A);if(Math.ceil(e.totalHits/p)===a)return r("none"),g.show({icon:"icon-false",backgroundColor:"#FC5A5A",message:"We're sorry, but you've reached the end of search results.",messageColor:"#FAFAFB",messageSize:"16px",position:"topRight",close:!1});I(e)}catch(e){console.error(e.message)}},I=e=>{l=e.hits.map(n=>`
    <li class="gallery-item">
      <a href="${n.largeImageURL}">
        <img class="api-img" src="${n.webformatURL}" alt="${n.tags}">
        <div class="img-desc">
          <span><b>Likes:</b> <br/>${n.likes}</span>
          <span><b>Views:</b> <br/>${n.views}</span>
          <span><b>Comments:</b> <br/>${n.comments}</span>
          <span><b>Downloads:</b> <br/>${n.downloads}</span>
        </div>
      </a>
    </li>
              `),m.insertAdjacentHTML("beforeend",l.join("")),r("inline-block"),q(),F.refresh()},s=e=>{v.style.display=e},r=e=>{f.style.display=e},q=()=>{if(a>1){const e=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:e.height*2.4,left:0,behavior:"smooth"})}};u.addEventListener("input",e=>{y=e.target.value});w.addEventListener("submit",async e=>{e.preventDefault(),r("none"),l=[],a=1,m.innerHTML="",s("inline-block"),await h(),l.length>0&&r("inline-block"),s("none"),u.value=""});f.addEventListener("click",async()=>{r("none"),s("inline-block"),a+=1,await h(),s("none")});const F=new b(".gallery a",{overlayOpacity:0,captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers2.js.map