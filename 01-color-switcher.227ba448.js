const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),d=document.querySelector("body");e.disabled=!0;//!кнопка стоп изначально неактивна
let n=null;t.addEventListener("click",(function(){o(),//! запустит в первый раз изменение BGC
n=setInterval(o,1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(function(){clearInterval(n),t.disabled=!1,e.disabled=!0}));function o(){d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}
//# sourceMappingURL=01-color-switcher.227ba448.js.map
