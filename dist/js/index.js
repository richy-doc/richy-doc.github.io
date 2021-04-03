import CreateDivFnc from"../utils/createDiv.js";import{ProbFnc}from"../utils/prob.js";import msg from"../utils/messages.js";import{Language as lang}from"../utils/language.js";import updateCanvas from"../utils/updateCanvas.js";import updateProps12 from"../utils/updateProps12.js";import assets from"../utils/assetsmain.js";import makeSound from"../utils/makesound.js";const dqs=e=>document.querySelector(e),dqsa=e=>document.querySelectorAll(e),dce=e=>document.createElement(e);let music,imagesToLoad=["./images/image_0.png","./images/image_1.png","./images/image_2.png","./images/image_3.png","./images/image_4.png","./images/image_5.png","./images/cadenas_close_200x400.png","./images/cadenas_open_200x400.png","./images/lights_all_off.png","./images/lights_green_on.png","./images/lights_red_on.png","./images/lights_yellow_on.png","./images/lights_all_on.png"],soundsToLoad=["./sounds/music.wav"],arrayToLoad=imagesToLoad.concat(soundsToLoad);function clgAsset(){console.log("Asset is =",assets),console.log("Asset is =",assets["./images/lights_red_on.png"]),console.log("Asset wav is =",assets["./sounds/music.wav"]),music=assets["./sounds/music.wav"],console.log("music actx state=",music.actx.state)}function showPage(){music=assets["./sounds/music.wav"];const e="url("+assets["./images/lights_red_on.png"].src+")",s="url("+assets["./images/lights_all_off.png"].src+")",t="url("+assets["./images/lights_green_on.png"].src+")",i="url("+assets["./images/lights_yellow_on.png"].src+")",n="url("+assets["./images/lights_all_on.png"].src+")",a="url("+assets["./images/cadenas_open_200x400.png"].src+")",r="url("+assets["./images/cadenas_close_200x400.png"].src+")",o=document.getElementsByTagName("html")[0],d=window.getComputedStyle(o,null).getPropertyValue("font-size"),l=(parseFloat(d),dqs(".locked"));l.style.backgroundImage=r,l.style.backgroundRepeat="no-repeat",l.style.backgroundSize="100%";const c=dqs(".lights");c.style.backgroundImage=s,c.style.backgroundRepeat="no-repeat",c.style.backgroundSize="100%";let m=0,g=0;l.innerHTML="0/5";l.addEventListener("click",(e=>{!function(){let e=N.menu,s=N.subMenu,t=new URLSearchParams;t.append("menu",e),t.append("subMenu",s);window.open("game.html?"+t)}(),m>=5&&window.open("game.html")})),o.style.fontSize=Math.floor(Math.min(window.innerWidth/768*150,200))+"%";let u=document.getElementById("canvasId"),p=u.getContext("2d");u.width=window.innerWidth,u.height=window.innerHeight,window.addEventListener("resize",(function(e){o.style.fontSize=Math.floor(Math.min(window.innerWidth/768*150,200))+"%",u.width=window.innerWidth,u.height=window.innerHeight,updateCanvas(p,J,window.innerWidth,window.innerHeight)}));navigator.language||navigator.userLanguage;let L,v;L=lang.LanguageFr.page(),v=lang.LanguageFr.menu();const b=CreateDivFnc({classes:["step-next","step-00","formDiv"],step:L.form}),h=CreateDivFnc({classes:["step-next","step-0","probDiv"],step:L.decompose}),f=CreateDivFnc({classes:["step-next","step-1"],step:L.step1}),_=CreateDivFnc({classes:["step-next","step-2"],step:L.step2}),H=CreateDivFnc({classes:["step-next","step-3"],step:L.step3}),w=CreateDivFnc({classes:["step-next","step-button"],step:""}),T=dqs(".info"),E=dqs(".about"),M=dqs(".info-click"),y=dqs(".about-click"),k=dqs(".toggler"),P=dce("div"),C=dce("button"),x=dce("div"),q=dce("div"),D=dce("div"),I=dce("div"),F=dce("div"),j=dqsa(".sub-menu-div"),S=dqsa(".sub-menu"),A=dqsa(".has-sub-menu"),O=dqs(".root");P.classList.add("divBtn"),C.innerHTML=L.button,P.append(C);let W=["(x+b<sub>1</sub>)(x+b<sub>2</sub>)","(a<sub>1</sub>x+b<sub>1</sub>)(a<sub>2</sub>x+b<sub>2</sub>)","(x<sup>n</sup>+b<sub>1</sub>)(x<sup>n</sup>+b<sub>2</sub>)","(a<sub>1</sub>x<sup>n</sup>+b<sub>1</sub>)(a<sub>2</sub>x<sup>n</sup>+b<sub>2</sub>)"],z=0;document.title=L.title,dqs(".menu-item.info-click").innerHTML=v.menu0,dqs(".menu-item.about-click").innerHTML=v.menu1;let R={anPos:!0,maxA:1,max:11},B={anPos:!0,maxA:1,max:11},V={},$=ProbFnc({max:6,numVar:["x"],nbrTerms:2,degArr:[1,0],anPos:!0});$.genProb(R,B);let N={menu:"form-0",subMenu:"item-0"},U=()=>{h.divEditor.innerHTML=$.polyObj.finalHtmlReduce,b.divEditor.innerHTML=W[z],f.editor.resetDiv(),_.editor.resetDiv(),H.editor.resetDiv(),f.divEditor.innerHTML=$.step1Html[0],_.divEditor.innerHTML=$.step2Html[0],H.divEditor.innerHTML=$.step3Html[0],f.divEditor.focus(),f.editor.setCaretPosition(0)},G=e=>{let s=e.menu,t=e.subMenu;"form-0"===s?z=0:"form-1"===s?z=1:"form-2"===s?z=2:"form-3"===s&&(z=3),S.forEach((e=>{e.classList.remove("active"),e.classList[1]===s&&e.classList[2]===t&&(e.classList.add("active"),k.checked&&(k.checked=!1))})),V=updateProps12(e),R=V.props1,B=V.props2,$.genProb(R,B)};N&&G(N),b.divEditor.contentEditable=!1,b.divEditor.innerHTML=W[z],w.divEditor.contentEditable,h.divEditor.contentEditable=!1,h.divEditor.innerHTML=$.polyObj.finalHtmlOrder,M.addEventListener("click",(()=>{T.classList.toggle("show")})),y.addEventListener("click",(()=>{E.classList.toggle("show")})),x.classList.add("message"),x.classList.add("hidden"),q.classList.add("message"),q.classList.add("hidden"),D.classList.add("message"),D.classList.add("hidden"),I.classList.add("message"),I.classList.add("hidden"),I.classList.add("success"),F.textContent="My AI exerciser",F.classList.add("heading");let J=[];for(let e=0;e<=5;e+=1)J.push(assets[`./images/image_${e}.png`]);let K=o=>{if(void 0===o.target)return;if("btn"===o.target){if($.step_1_done&&$.step_2_done&&$.step_3_done)return 0===g?(m+=1,l.innerHTML=m+"/5"):m>0&&(m-=1,l.innerHTML=m+"/5"),m>=5?(l.style.backgroundImage=a,l.style.cursor="pointer"):(l.style.backgroundImage=r,l.style.cursor=""),g=0,updateCanvas(p,J,window.innerWidth,window.innerHeight),V=updateProps12(N),R=V.props1,B=V.props2,$.genProb(R,B),I.innerHTML=msg.success(),I.classList.remove("hidden"),setTimeout((()=>{I.classList.add("hidden")}),3e3),h.divEditor.innerHTML=$.polyObj.finalHtmlReduce,f.editor.resetDiv(),_.editor.resetDiv(),H.editor.resetDiv(),f.editor.setCaretPosition(0),void U();if(!$.step_1_done)return void f.editor.setCaretPosition(0);if(!$.step_2_done)return void _.editor.setCaretPosition(0);if(!$.step_3_done)return void H.editor.setCaretPosition(0)}x.innerHTML="",x.classList.add("hidden"),x.classList.remove("error"),x.classList.remove("warning"),x.classList.remove("special"),q.innerHTML="",q.classList.add("hidden"),q.classList.remove("error"),q.classList.remove("warning"),q.classList.remove("special"),D.innerHTML="",D.classList.add("hidden"),D.classList.remove("error"),D.classList.remove("warning"),D.classList.remove("special");let d="",u="";if(u=o.target,"step-1"===u){if(d=f.editor.getHtmlForm(),""===d)return void f.editor.setCaretPosition(0)}else if("step-2"===u){if(d=_.editor.getHtmlForm(),""===d)return void _.editor.setCaretPosition(0)}else{if("step-3"!==u)return void console.log("error in blur method==================");if(d=H.editor.getHtmlForm(),""===d)return void H.editor.setCaretPosition(0)}let L=$.analyseStudentInput(d,u);if(L.special)if(c.style.backgroundImage=n,setTimeout((()=>{c.style.backgroundImage=s}),2e3),"step-1"===u)x.innerHTML=L.special,x.classList.add("special"),x.classList.remove("hidden"),f.divEditor.focus();else if("step-2"===u)q.innerHTML=L.special,q.classList.add("special"),q.classList.remove("hidden"),_.divEditor.focus();else{if("step-3"!==u)return void console.log("error in update click fnc ==================");D.innerHTML=L.special,D.classList.add("special"),D.classList.remove("hidden"),H.divEditor.focus()}else if(""===L.error){let e=L.result.find;if("step-1"===e?($.step_1_done=!0,f.divEditor.innerHTML=L.studentObj.chainHtml):"step-2"===e?($.step_2_done=!0,_.divEditor.innerHTML=L.studentObj.chainHtml):"step-3"===e&&($.step_3_done=!0,H.divEditor.innerHTML=L.studentObj.chainHtml),e===u?$.step_1_done?$.step_2_done?$.step_3_done?C.focus():H.editor.setCaretPosition(0):_.editor.setCaretPosition(0):f.editor.setCaretPosition(0):"step-1"===u?(f.divEditor.innerHTML="",f.editor.setCaretPosition(0)):"step-2"===u?(_.divEditor.innerHTML="",_.editor.setCaretPosition(0)):"step-3"===u&&(H.divEditor.innerHTML="",H.editor.setCaretPosition(0)),""!==L.msg)if(c.style.backgroundImage=i,setTimeout((()=>{c.style.backgroundImage=s}),2e3),"step-1"===e)x.innerHTML=L.msg,x.classList.add("warning"),x.classList.remove("hidden");else if("step-2"===e)q.innerHTML=L.msg,q.classList.add("warning"),q.classList.remove("hidden");else{if("step-3"!==e)return void console.log("error in blur method==================");D.innerHTML=L.msg,D.classList.add("warning"),D.classList.remove("hidden")}else c.style.backgroundImage=t,setTimeout((()=>{c.style.backgroundImage=s}),2e3)}else if(g+=1,c.style.backgroundImage=e,setTimeout((()=>{c.style.backgroundImage=s}),2e3),"step-1"===u)x.innerHTML=L.error,x.classList.add("error"),x.classList.remove("hidden"),f.divEditor.focus();else if("step-2"===u)q.innerHTML=L.error,q.classList.add("error"),q.classList.remove("hidden"),_.divEditor.focus();else{if("step-3"!==u)return void console.log("error in update click fnc ==================");D.innerHTML=L.error,D.classList.add("error"),D.classList.remove("hidden"),H.divEditor.focus()}},Q=e=>{let s=e.target.classList[1];"step-1"===s||("step-2"===s?$.step_1_done||K({target:"step-1"}):"step-3"===s&&($.step_1_done?$.step_2_done||K({target:"step-2"}):K({target:"step-1"})))};f.divEditor.addEventListener("click",Q),_.divEditor.addEventListener("click",Q),H.divEditor.addEventListener("click",Q);document.body.addEventListener("keydown",(e=>{x.innerHTML="",x.classList.add("hidden"),x.classList.remove("error"),x.classList.remove("warning"),x.classList.remove("special"),q.innerHTML="",q.classList.add("hidden"),q.classList.remove("error"),q.classList.remove("warning"),q.classList.remove("special"),D.innerHTML="",D.classList.add("hidden"),D.classList.remove("error"),D.classList.remove("warning"),D.classList.remove("special"),"Enter"===e.key&&K({target:e.target.classList[1]})})),C.addEventListener("click",(e=>{$.step_1_done?$.step_2_done?$.step_3_done?(x.innerHTML="",x.classList.add("hidden"),x.classList.remove("error"),x.classList.remove("warning"),x.classList.remove("special"),q.innerHTML="",q.classList.add("hidden"),q.classList.remove("error"),q.classList.remove("warning"),q.classList.remove("special"),D.innerHTML="",D.classList.add("hidden"),D.classList.remove("error"),D.classList.remove("warning"),D.classList.remove("special"),K({target:"btn"})):K({target:"step-3"}):K({target:"step-2"}):K({target:"step-1"})})),f.divEditor.innerHTML=$.step1Html[0],_.divEditor.innerHTML=$.step2Html[0],H.divEditor.innerHTML=$.step3Html[0];let X=e=>{let s=e.target.classList[1],t=e.target.classList[2];N.menu=s,N.subMenu=t,G(N),U()},Y=e=>{if("has-sub-menu"===e.target.classList[0]){j.forEach((e=>{e.classList.remove("active")})),A.forEach((e=>{e.classList.remove("active")})),e.target.classList.add("active");let s=e.target.querySelector(`.sub-menu-div.${e.target.classList[1]}`);null!=s&&s.classList.add("active")}};S.forEach((e=>{e.addEventListener("click",X)})),A.forEach((e=>{e.addEventListener("click",Y)})),O.append(b.div,h.div,f.div,x,_.div,q,H.div,D,P,I),updateCanvas(p,J,window.innerWidth,window.innerHeight),f.divEditor.focus(),f.editor.setCaretPosition(0)}assets.load(arrayToLoad).then((()=>{showPage()}));