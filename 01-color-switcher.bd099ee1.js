!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body");e.disabled=!0;//!кнопка стоп изначально неактивна
var a=null;t.addEventListener("click",(function(){d(),//! запустит в первый раз изменение BGC
a=setInterval(d,1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(function(){clearInterval(a),t.disabled=!1,e.disabled=!0}));function d(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}}();
//# sourceMappingURL=01-color-switcher.bd099ee1.js.map
