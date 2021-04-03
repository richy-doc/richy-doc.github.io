import CreateDivFnc from '../utils/createDiv.js';

import {ProbFnc} from '../utils/prob.js';

import msg from '../utils/messages.js';

import {Language as lang} from '../utils/language.js';

import updateCanvas from '../utils/updateCanvas.js';
import updateProps12 from '../utils/updateProps12.js';

// import './styles/main.css';
// import './scss/main.scss';

// import imgs from './utils/importimages.js';

import assets from '../utils/assetsmain.js';

import makeSound from '../utils/makesound.js';

// import musicWav from './utils/importsounds.js';

//Shortcut for document function

const dqs = (obj) => document.querySelector(obj);
const dqsa = (obj) => document.querySelectorAll(obj);
const dce = (obj) => document.createElement(obj);

//Assets to load before showing the main page

// console.log('Start = ', Date.now())

let imagesToLoad = [
  "./images/image_0.png",
  "./images/image_1.png",
  "./images/image_2.png",
  "./images/image_3.png",
  "./images/image_4.png",
  "./images/image_5.png",
  "./images/cadenas_close_200x400.png",
  "./images/cadenas_open_200x400.png",
  "./images/lights_all_off.png",
  "./images/lights_green_on.png",
  "./images/lights_red_on.png",
  "./images/lights_yellow_on.png",
  "./images/lights_all_on.png"
];

let soundsToLoad = [
  "./sounds/music.wav",
];

// let arrayToLoad = [...imagesToLoad, ...soundsToLoad];
let arrayToLoad = imagesToLoad.concat(soundsToLoad);
let music;

// let music = assets["./sounds/music.wav"];
// setupMusic();

assets.load(arrayToLoad).then(() => {
  let calc = 0;
  // for ( let i = 0; i < 10000; i +=1){ console.log('I=',i)}
  showPage();
});

// let music  = makeSound("./sounds/music.wav", setupMusic);

function clgAsset() {
  console.log('Asset is =', assets)
  console.log('Asset is =',  assets["./images/lights_red_on.png"]);
  console.log('Asset wav is =',  assets["./sounds/music.wav"]);

  music = assets["./sounds/music.wav"];

  console.log('music actx state=', music.actx.state)
  // setupMusic();
}

// Main function to show the main page

function showPage() {

// console.log('Start show page = ', Date.now())


music = assets["./sounds/music.wav"];
// setupMusic();

const lights_red_on = "url("+  assets["./images/lights_red_on.png"].src +")";
const lights_all_off = "url("+  assets["./images/lights_all_off.png"].src +")";
const lights_green_on = "url("+  assets["./images/lights_green_on.png"].src +")";
const lights_yellow_on = "url("+  assets["./images/lights_yellow_on.png"].src +")";
const lights_all_on = "url("+  assets["./images/lights_all_on.png"].src +")";
const cadenas_open_200x400 = "url("+  assets["./images/cadenas_open_200x400.png"].src +")";
const cadenas_close_200x400 = "url("+  assets["./images/cadenas_close_200x400.png"].src +")";

const htmlEl = document.getElementsByTagName('html')[0];
const style = window.getComputedStyle(htmlEl, null).getPropertyValue('font-size');
const fontSize = parseFloat(style);
const lockedDiv = dqs('.locked');

lockedDiv.style.backgroundImage = cadenas_close_200x400;
lockedDiv.style.backgroundRepeat = "no-repeat";
lockedDiv.style.backgroundSize = "100%";
// lockedDiv.innerHTML = "0/5";

const lights = dqs('.lights');

lights.style.backgroundImage = lights_all_off;
lights.style.backgroundRepeat = "no-repeat";
lights.style.backgroundSize = "100%";

let counter = 0, countError = 0;
const nbrGoodProb = 5;

lockedDiv.innerHTML = "0/" + nbrGoodProb;

// let music = makeSound(musicWav, setupMusic);

function setupMusic() {
  music.pause();
  music.loop = true;
  music.pan = -0.8;
  music.volume = 0.3;
  music.play();
  music.actx.resume().then(()=>{
    music.play();
  })
  // .then(()=>{
  //   console.log('MUSIC playing');
  // }).catch(error => {
  //   console.log('ERROR = ',error)
  // });
  // if (!music.playing) {
  //   music.play();
  // } else {
  //   music.restart();
  // }
 
}

// let music  = makeSound("./sounds/music.wav", setupMusic);
// let music = assets["./sounds/music.wav"];
// setupMusic();

let clickLockedDiv = e => {

  // window.open('game.html');
  loadGameV2();
  // loadGame();

  if (counter >= nbrGoodProb) {
    // alert('Go ahead with play')
    // location.href = 'info.html';
    window.open('game.html');
  } else {
    // alert('Not enought good prob!')
  }
}

lockedDiv.addEventListener('click', clickLockedDiv);
//  lockedDiv.innerHTML = '00';


htmlEl.style.fontSize = Math.floor(Math.min( (window.innerWidth/768) * 150 , 200)) +'%';

let canvas = document.getElementById('canvasId');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function (params) {
  htmlEl.style.fontSize = Math.floor(Math.min( (window.innerWidth/768) * 150 , 200)) +'%';

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  updateCanvas(ctx, images, window.innerWidth, window.innerHeight);
});

const language = navigator.language || navigator.userLanguage;

let page = undefined;
let menuList = undefined;

const updateLanguage = () => {

  if (language === "fr-CA") {
    page = lang.LanguageFr.page();
    menuList = lang.LanguageFr.menu();
  } else if (language === "en-US") {
    page = lang.LanguageFr.page();
    menuList = lang.LanguageFr.menu();
  } else {
    page = lang.LanguageFr.page();
    menuList = lang.LanguageFr.menu();
  };
};

updateLanguage();

// Declaration all elements in index.html
// const dqs = (obj) => dqs(obj);

const formDiv = CreateDivFnc({classes:['step-next', 'step-00', 'formDiv'], step: page.form,});

const probTxt = CreateDivFnc({classes:['step-next', 'step-0', 'probDiv'], step:page.decompose,});

const etape_1 = CreateDivFnc({classes:['step-next', 'step-1'], step:page.step1,});
const etape_2 = CreateDivFnc({classes:['step-next', 'step-2'], step:page.step2,});
const etape_3 = CreateDivFnc({classes:['step-next', 'step-3'], step:page.step3,});

const formButton = CreateDivFnc({classes:['step-next', 'step-button'], step:'',});

const info = dqs('.info');
const about = dqs('.about');
const infoClick = dqs('.info-click');
const aboutClick = dqs('.about-click');

const checkBox = dqs('.toggler');

const divBtn = dce('div');

const btn = dce('button');

const step1DivMsg = dce('div');

const step2DivMsg = dce('div');

const step3DivMsg = dce('div');

const nextProbMsg = dce('div');

const heading = dce('div');


const subAll = dqsa('.sub-menu-div');
const subItems = dqsa('.sub-menu');
const formsClickable = dqsa('.has-sub-menu');


const app = dqs('.root');

divBtn.classList.add('divBtn');

btn.innerHTML = page.button;
divBtn.append(btn);

// END of declaration all elements in index.html

// let step1 = app.querySelector('.step-next.step-1');
// let step2 = dqs('.step-next.step-2');
// let step3 = dqs('.step-next.step-3');

let formsArr = [
  '(x+b<sub>1</sub>)(x+b<sub>2</sub>)',
  '(a<sub>1</sub>x+b<sub>1</sub>)(a<sub>2</sub>x+b<sub>2</sub>)',
  '(x<sup>n</sup>+b<sub>1</sub>)(x<sup>n</sup>+b<sub>2</sub>)',
  '(a<sub>1</sub>x<sup>n</sup>+b<sub>1</sub>)(a<sub>2</sub>x<sup>n</sup>+b<sub>2</sub>)',
];

let formActive = 0;

document.title = page.title;
dqs(".menu-item.info-click").innerHTML = menuList.menu0;
dqs(".menu-item.about-click").innerHTML = menuList.menu1;

/**
 * props.anPos = props.anPos || false;
  props.degArr = props.degArr || [1,0];
  props.nbrTerms = props.nbrTerms || 2;
  props.maxA = props.maxA || 1;
  props.randomDeg = props.randomDeg || false;
  props.min = props.min || 1;
  props.max = props.max || 11;
  props.numVar = props.numVar || ['x']; // ['x'] => ax², ['x','y'] => ax²y², ...
  props.excludeMultiples = props.excludeMultiples || [];
  props.mustExclude = props.mustExclude === undefined ? true : props.mustExclude;
 */

let props = {max: 6,numVar: ['x'],nbrTerms:2, degArr: [1,0], anPos: true};

let props1 = {anPos:true, maxA:1, max: 11};
let props2 = {anPos:true, maxA:1, max:11};
let props12 = {};


let prob = ProbFnc(props);
prob.genProb(props1, props2);

let menuActive = {menu:'form-0', subMenu:'item-0'};

let updateAllDivs = () => {
  probTxt.divEditor.innerHTML = prob.polyObj.finalHtmlReduce;

  formDiv.divEditor.innerHTML = formsArr[formActive];
  etape_1.editor.resetDiv();
  etape_2.editor.resetDiv();
  etape_3.editor.resetDiv();
  // etape_1.editor.setCaretPosition(0);

  // to eleminate for production

  etape_1.divEditor.innerHTML =  prob.step1Html[0];
  etape_2.divEditor.innerHTML = prob.step2Html[0];
  etape_3.divEditor.innerHTML = prob.step3Html[0];

  etape_1.divEditor.focus();
  etape_1.editor.setCaretPosition(0);
}

let updateMenuActive = menuActive => {
  let menu = menuActive.menu;
  let subMenu = menuActive.subMenu;
  if (menu === "form-0") {
    formActive = 0;
  } else if (menu === "form-1") {
    formActive = 1;
  } else if (menu === "form-2") {
    formActive = 2;
  } else if (menu === "form-3") {
    formActive = 3;
  }

  subItems.forEach(subItem => {
    subItem.classList.remove('active');
    if (subItem.classList[1] === menu && subItem.classList[2] === subMenu) {
      subItem.classList.add('active');
      if (checkBox.checked) {
        checkBox.checked = false;
      }
    }
  });

  // updateProps12V2();
  props12 = updateProps12(menuActive);
  props1 = props12.props1;
  props2 = props12.props2;

  prob.genProb(props1, props2);
}


if (menuActive) {
  updateMenuActive(menuActive);
  // updateAllDivs();
}

// Initialize all elements in index.html

formDiv.divEditor.contentEditable = false;
formDiv.divEditor.innerHTML = formsArr[formActive];

formButton.divEditor.contentEditable - false;

probTxt.divEditor.contentEditable = false;
probTxt.divEditor.innerHTML = prob.polyObj.finalHtmlOrder;

infoClick.addEventListener('click', () => {
  info.classList.toggle('show');
});

aboutClick.addEventListener('click', () => {
  about.classList.toggle('show');
})

step1DivMsg.classList.add('message');
step1DivMsg.classList.add('hidden');

step2DivMsg.classList.add('message');
step2DivMsg.classList.add('hidden');

step3DivMsg.classList.add('message');
step3DivMsg.classList.add('hidden');

nextProbMsg.classList.add('message');
nextProbMsg.classList.add('hidden');
nextProbMsg.classList.add('success');

heading.textContent = 'My AI exerciser';
heading.classList.add('heading');

// END of initialize all element in index.html



let imagesPromise = [];
let images = [], nbrImage = 5;
// images = imgs.images;

for (let i = 0; i <= nbrImage; i +=1) {
  // let im = assets[`./images/image_${i}.png`];
  images.push(assets[`./images/image_${i}.png`]);
  // images.push(im);
}

// for (let i = 0; i < nbrImage; i += 1) {
//   imagesPromise.push(
//     new Promise( (resolve, reject) => {
//       let name = `images/image_${i}.png`;
//       images[i] = new Image();
//       images[i].src = name;
//       images[i].addEventListener('load', function() {
//         resolve(true);
//       });
//     })
//   );
// }

// Promise.all(imagesPromise).then( result => {
//   updateCanvas(ctx, images, window.innerWidth, window.innerHeight);
// });

// console.log('prob is = ', prob);

let updateSteps = from => {

  if (from.target === undefined) return;

  // if (e.target.classList[1] === 'step-button') {
  if (from.target === 'btn') {
    if (prob.step_1_done && prob.step_2_done && prob.step_3_done) {
      if (countError === 0) {
        counter += 1;
        lockedDiv.innerHTML = counter + '/' + nbrGoodProb;
        
      } else {
        if (counter > 0) {
          counter -= 1;
          lockedDiv.innerHTML = counter + '/' + nbrGoodProb;
        }
      }

      if (counter >= nbrGoodProb) {
        lockedDiv.style.backgroundImage = cadenas_open_200x400;
        lockedDiv.style.cursor = 'pointer';
      } else {
        lockedDiv.style.backgroundImage = cadenas_close_200x400;
        lockedDiv.style.cursor = '';
      }

      countError = 0;
      updateCanvas(ctx, images, window.innerWidth, window.innerHeight);
      props12 = updateProps12(menuActive);
      props1 = props12.props1;
      props2 = props12.props2;
      prob.genProb(props1, props2);

      nextProbMsg.innerHTML = msg.success();
      nextProbMsg.classList.remove('hidden');
      setTimeout( () => {
        nextProbMsg.classList.add('hidden');
      }, 3000);

      probTxt.divEditor.innerHTML = prob.polyObj.finalHtmlReduce;
      etape_1.editor.resetDiv();
      etape_2.editor.resetDiv();
      etape_3.editor.resetDiv();
      etape_1.editor.setCaretPosition(0);

      updateAllDivs(); // to eleminate for prod

      return;
    } else {
      if (!prob.step_1_done) {
        // etape_1.editor.resetDiv();
        etape_1.editor.setCaretPosition(0);
        return;
      } else if (!prob.step_2_done) {
        // etape_2.editor.resetDiv();
        etape_2.editor.setCaretPosition(0);
        return;
      } else if (!prob.step_3_done) {
        // etape_3.editor.resetDiv();
        etape_3.editor.setCaretPosition(0);
        return;
      }
    }
    
  }

  step1DivMsg.innerHTML = '';
  step1DivMsg.classList.add('hidden');
  step1DivMsg.classList.remove('error');
  step1DivMsg.classList.remove('warning');
  step1DivMsg.classList.remove('special');

  step2DivMsg.innerHTML = '';
  step2DivMsg.classList.add('hidden');
  step2DivMsg.classList.remove('error');
  step2DivMsg.classList.remove('warning');
  step2DivMsg.classList.remove('special');

  step3DivMsg.innerHTML = '';
  step3DivMsg.classList.add('hidden');
  step3DivMsg.classList.remove('error');
  step3DivMsg.classList.remove('warning');
  step3DivMsg.classList.remove('special');

  let response = '', step ='';
  step = from.target;

  if (step === 'step-1') {
    response = etape_1.editor.getHtmlForm();
    if (response === '') {
      etape_1.editor.setCaretPosition(0);
      return;
    }
  } else if (step === 'step-2') {
    response = etape_2.editor.getHtmlForm();
    if (response === '') {
      etape_2.editor.setCaretPosition(0);
      return;
    }
  } else if (step === 'step-3') {
    response = etape_3.editor.getHtmlForm();
    if (response === '') {
      etape_3.editor.setCaretPosition(0);
      return;
    }
  } else {
    console.log('error in blur method==================');
    return;
  }

  // if (response === '') return;

  let out = prob.analyseStudentInput(response, step);

  if (out.special) {
    lights.style.backgroundImage = lights_all_on;
    setTimeout(() => {
      lights.style.backgroundImage = lights_all_off;
    }, 2000);

    if (step === 'step-1') {
      step1DivMsg.innerHTML = out.special;
      step1DivMsg.classList.add('special');
      step1DivMsg.classList.remove('hidden');
      etape_1.divEditor.focus();
    } else if (step === 'step-2') {
      step2DivMsg.innerHTML = out.special;
      step2DivMsg.classList.add('special');
      step2DivMsg.classList.remove('hidden');
      etape_2.divEditor.focus();
    } else if (step === 'step-3') {
      step3DivMsg.innerHTML = out.special;
      step3DivMsg.classList.add('special');
      step3DivMsg.classList.remove('hidden');
      etape_3.divEditor.focus();
    } else {
      console.log('error in update click fnc ==================');
      return;
    } 
    
    return;
  } // END of special

  if (out.error === '') {

    let stepFound = out.result.find;

    if (stepFound === 'step-1') {
      prob.step_1_done = true;
      etape_1.divEditor.innerHTML = out.studentObj.chainHtml;
    } else if (stepFound === 'step-2') {
      prob.step_2_done = true;
      etape_2.divEditor.innerHTML = out.studentObj.chainHtml;
    } else if (stepFound === 'step-3') {
      prob.step_3_done = true;
      etape_3.divEditor.innerHTML = out.studentObj.chainHtml;
    }

    if (stepFound === step) {
      if (!prob.step_1_done) {
        etape_1.editor.setCaretPosition(0);
      } else if (!prob.step_2_done) {
        // etape_2.divEditor.focus(); 
        etape_2.editor.setCaretPosition(0);
      } else if (!prob.step_3_done) {
        etape_3.editor.setCaretPosition(0);
      } else {
        btn.focus();
      }
    } else {
      if (step === 'step-1') {
        etape_1.divEditor.innerHTML = '';
        etape_1.editor.setCaretPosition(0);
      } else if (step === 'step-2') {
        etape_2.divEditor.innerHTML = '';
        etape_2.editor.setCaretPosition(0);
      } else if (step === 'step-3') {
        etape_3.divEditor.innerHTML = '';
        etape_3.editor.setCaretPosition(0);
      }
    }

    if (out.msg !== '') {

      lights.style.backgroundImage =lights_yellow_on;
      setTimeout(() => {
        lights.style.backgroundImage = lights_all_off;
      }, 2000);

      if (stepFound === 'step-1') {
        step1DivMsg.innerHTML = out.msg;
        step1DivMsg.classList.add('warning');
        step1DivMsg.classList.remove('hidden');

      } else if (stepFound === 'step-2') {
        step2DivMsg.innerHTML = out.msg;
        step2DivMsg.classList.add('warning');
        step2DivMsg.classList.remove('hidden');
        // etape_3.divEditor.focus();

      } else if (stepFound === 'step-3') {
        step3DivMsg.innerHTML = out.msg;
        step3DivMsg.classList.add('warning');
        step3DivMsg.classList.remove('hidden');
        // etape_3.divEditor.focus();

      } else {
        console.log('error in blur method==================');
        return;
      }
    } else {
      lights.style.backgroundImage = lights_green_on;
      setTimeout(() => {
        lights.style.backgroundImage = lights_all_off;
      }, 2000);
    }
    
  } else {

    countError += 1;

    // lights.style.backgroundImage = imgs.lights_red_on.currentSrc;
    lights.style.backgroundImage = lights_red_on;
    // lights.style.backgroundImage = "url("+  assets["./images/lights_red_on.png"].src +")";
    // lights.style.backgroundImage = "url("+ imgs.lights_red_on.currentSrc+")";
    // lights.style.backgroundImage = "url("+ imgs.lights_red_on+")";
    setTimeout(() => {
      lights.style.backgroundImage = lights_all_off;
      // lights.style.backgroundImage = "url("+  assets["./images/lights_all_off.png"].src +")";
      // lights.style.backgroundImage = "url("+ imgs.lights_all_off.currentSrc+")";
    }, 2000);

    if (step === 'step-1') {
      step1DivMsg.innerHTML = out.error;
      step1DivMsg.classList.add('error');
      step1DivMsg.classList.remove('hidden');
      etape_1.divEditor.focus();
    } else if (step === 'step-2') {
      step2DivMsg.innerHTML = out.error;
      step2DivMsg.classList.add('error');
      step2DivMsg.classList.remove('hidden');
      etape_2.divEditor.focus();
    } else if (step === 'step-3') {
      step3DivMsg.innerHTML = out.error;
      step3DivMsg.classList.add('error');
      step3DivMsg.classList.remove('hidden');
      etape_3.divEditor.focus();
    } else {
      console.log('error in update click fnc ==================');
      return;
    }
  }

} // END of updateSteps by click

let clickDiv = e => {
  let step = e.target.classList[1];
  if (step === 'step-1') {
    // updateSteps({target: "step-1"})
  } else if (step === 'step-2') {
    if (!prob.step_1_done) {
      updateSteps({target: "step-1"});
    } else {
      // updateSteps({target: "step-2"});
    }
  } else if (step === 'step-3') {
    if (!prob.step_1_done) {
      updateSteps({target: "step-1"});
    } else if (!prob.step_2_done) {
      updateSteps({target: "step-2"});
    } else {
      // updateSteps({target: "step-3"});
    }
  }
  
}

etape_1.divEditor.addEventListener('click', clickDiv);
etape_2.divEditor.addEventListener('click', clickDiv);
etape_3.divEditor.addEventListener('click', clickDiv);

let onClickBtn = (e) => {

  if (!prob.step_1_done) {
    updateSteps({target: "step-1"});
    return;
  } else if (!prob.step_2_done) {
    updateSteps({target: "step-2"});
    return;
  } else if (!prob.step_3_done) {
    updateSteps({target: "step-3"});
    return;
  }

  step1DivMsg.innerHTML = '';
  step1DivMsg.classList.add('hidden');
  step1DivMsg.classList.remove('error');
  step1DivMsg.classList.remove('warning');
  step1DivMsg.classList.remove('special');

  step2DivMsg.innerHTML = '';
  step2DivMsg.classList.add('hidden');
  step2DivMsg.classList.remove('error');
  step2DivMsg.classList.remove('warning');
  step2DivMsg.classList.remove('special');

  step3DivMsg.innerHTML = '';
  step3DivMsg.classList.add('hidden');
  step3DivMsg.classList.remove('error');
  step3DivMsg.classList.remove('warning');
  step3DivMsg.classList.remove('special');

  updateSteps({target: "btn"});
    
}

let onkeydown = (e) => {

  step1DivMsg.innerHTML = '';
  step1DivMsg.classList.add('hidden');
  step1DivMsg.classList.remove('error');
  step1DivMsg.classList.remove('warning');
  step1DivMsg.classList.remove('special');

  step2DivMsg.innerHTML = '';
  step2DivMsg.classList.add('hidden');
  step2DivMsg.classList.remove('error');
  step2DivMsg.classList.remove('warning');
  step2DivMsg.classList.remove('special');

  step3DivMsg.innerHTML = '';
  step3DivMsg.classList.add('hidden');
  step3DivMsg.classList.remove('error');
  step3DivMsg.classList.remove('warning');
  step3DivMsg.classList.remove('special');

  if( e.key === 'Enter') { 

    updateSteps({target:e.target.classList[1]});
  }
}


document.body.addEventListener('keydown', onkeydown);
btn.addEventListener('click', onClickBtn);

etape_1.divEditor.innerHTML =  prob.step1Html[0];

etape_2.divEditor.innerHTML = prob.step2Html[0];
etape_3.divEditor.innerHTML = prob.step3Html[0];

// add event listener for all forms

let subMenuListener = e => {

  let menu = e.target.classList[1];
  let subMenu = e.target.classList[2];

  menuActive.menu = menu;
  menuActive.subMenu = subMenu;

  updateMenuActive(menuActive);

  updateAllDivs();

} // END of sub item listener


let formListen = e => {

  if (e.target.classList[0] === "has-sub-menu") {

    subAll.forEach(f => {
      // f.style.display = "none";
      f.classList.remove("active");
    });

    formsClickable.forEach(f => {
      f.classList.remove("active");
    });

    e.target.classList.add("active");

    let sub = e.target.querySelector(`.sub-menu-div.${e.target.classList[1]}`);

    if (sub !== undefined && sub !== null) {
      sub.classList.add("active");
    }
  }
} // END of form listener

function addListernerForms() {

  subItems.forEach(f => {
    f.addEventListener('click', subMenuListener);
  });

  formsClickable.forEach(f => {
    f.addEventListener('click', formListen);
  });
}

addListernerForms();
//END of adding event listener for forms

app.append(formDiv.div, probTxt.div, etape_1.div,step1DivMsg, etape_2.div, step2DivMsg, etape_3.div, step3DivMsg, divBtn, nextProbMsg);

// window.addEventListener('load', function() {
//   // updateCanvas(ctx, images, screen.width, screen.height);
//   updateCanvas(ctx, images, window.innerWidth, window.innerHeight);

// console.log('Start show page loaded = ', Date.now())


// });

updateCanvas(ctx, images, window.innerWidth, window.innerHeight);

etape_1.divEditor.focus();
etape_1.editor.setCaretPosition(0);

function loadGame(){
  let menu = menuActive.menu;
  let subMenu = menuActive.subMenu;

  let game = window.open("game.html");
  game.onload = function() {
    this.menu = menu;
    this.subMenu = subMenu;
  }
}

function loadGameV2(){
  let menu = menuActive.menu;
  let subMenu = menuActive.subMenu;
  let params = new URLSearchParams();

  params.append("menu", menu);
  params.append("subMenu", subMenu);

  let game = window.open("game.html?"+params);
}

// console.log('Start show page loaded = ', Date.now())

} // END show page

