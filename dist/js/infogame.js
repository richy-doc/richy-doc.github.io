import{Language}from"../utils/language.js";let lang=Language.LanguageFr,info=lang.infogame();const htmlEl=document.getElementsByTagName("html")[0];htmlEl.style.fontSize=Math.floor(Math.min(window.innerWidth/768*150,200))+"%",window.addEventListener("resize",(function(e){htmlEl.style.fontSize=Math.floor(Math.min(window.innerWidth/768*150,200))+"%"}));let closeDiv=document.querySelector(".closeDiv");closeDiv.innerHTML=info.close;let showcase=document.querySelector(".showcase");document.addEventListener("click",(()=>{parent.document.querySelector(".info-game-iframe").classList.toggle("show")}));