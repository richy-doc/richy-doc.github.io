import {Language as lang} from '../utils/language.js';
// import './scss/game.scss';

import CreateDivFnc from '../utils/createDiv.js';

import {ProbFnc} from '../utils/prob.js';
import updateProps12 from '../utils/updateProps12.js';

import Timer from '../utils/timer.js';
import TimerCountDown from '../utils/timercountdown.js';

import assets from '../utils/assetsmain.js';

import makeSound from '../utils/makesound.js';

// console.log('GAME ANIMATION')

const dqs = (obj) => document.querySelector(obj);
const dqsa = (obj) => document.querySelectorAll(obj);
const dce = (obj) => document.createElement(obj);

//Assets to load before showing the main page

// console.log('Start = ', Date.now())

const menu_wrap = dqs('.menu-wrap');


let soundsToLoad = [
  "./sounds/music.wav",
];

// let arrayToLoad = [...imagesToLoad, ...soundsToLoad];
let arrayToLoad = [].concat(soundsToLoad);
let music;

let waitVideo = document.querySelector('video');

let wait = document.querySelector('.wait');

// let music = assets["./sounds/music.wav"];
// setupMusic();

// assets.load(arrayToLoad).then(() => console.log('Loaded sounds'));

assets.load(arrayToLoad).then(() => {
  let calc = 0;
  // for ( let i = 0; i < 10000; i +=1){ console.log('I=',i)}
  // showPage();
  setTimeout(() => {
    showPage();
  }, 8000);
});

//get parameters in url
let menuActive = {};
let params = getParams();

function getParams() {
  let params = new URLSearchParams(window.location.search);
  let menu = params.get("menu");
  let subMenu = params.get("subMenu");
  return {
    menu:menu,
    subMenu: subMenu
  }
}

menuActive.menu = params.menu;
menuActive.subMenu = params.subMenu;

function checkMenuParams() {
  let m = menuActive.menu;
  let s = menuActive.subMenu;

  if (m !== "form-0" && m !== "form-1" && m!== "form-2") {
    console.log('menu not good _-_-__--_____---_');
    return "Error in parameter form";
  };

  if (s !== "item-0" && s !== "item-1" && s !== "item-2") {
    console.log('item not ok ++++++++++++++++++');
    return "Error in parameter item";
  };

  return "OK";
}

const msgBlock = document.createElement('div');
msgBlock.classList.add('msg-block');

document.body.append(msgBlock);

let blockEverything = false;

const msg = document.querySelector('.message');

//Starting game

function showPage() {
  
const htmlEl = document.getElementsByTagName('html')[0];

const language = navigator.language || navigator.userLanguage;

let page = undefined;
let menuList = undefined;
let timer = undefined;
let loading = true;

let options = [];
let optionsInArr = undefined;
let optionActive = undefined;
let arrProb = [];
// let arrProbActive = 0;
let nbrProb = 400;
let tries = 0;
let tryActive = false;
let keepProb = true;
let arrResStudent = [];
// let menuActive = {};
let probId = 0;

// let blockEverything = false;

const nbrMinOption_1 = 2;
const nbrMinOption_2 = 5;
const maxTimeOption_3 = 15;
// const maxTimeOption_3 = 60;

function resetGameParams() {

  arrResStudent = [];
  divHeader1.innerHTML = page.number+arrResStudent.length;
  probId = 0;

}

// let params = getParams();

// function getParams() {
//   let params = new URLSearchParams(window.location.search);
//   let menu = params.get("menu");
//   let subMenu = params.get("subMenu");
//   return {
//     menu:menu,
//     subMenu: subMenu
//   }
// }

// menuActive.menu = params.menu;
// menuActive.subMenu = params.subMenu;

// function checkMenuParams() {
//   let m = menuActive.menu;
//   let s = menuActive.subMenu;

//   if (m !== "form-0" && m !== "form-1" && m!== "form-2") {
//     console.log('menu not good _-_-__--_____---_');
//     return "Error in parameter form";
//   };

//   if (s !== "item-0" && s !== "item-1" && s !== "item-2") {
//     console.log('item not ok ++++++++++++++++++');
//     return "Error in parameter item";
//   };

//   return "OK";
// }

// checkMenuParams();

let props = {max: 6,numVar: ['x'],nbrTerms:2, degArr: [1,0], anPos: true};

let props1 = {anPos:true, maxA:1, max: 11};
let props2 = {anPos:true, maxA:1, max:11};
let props12 = {};


let prob = ProbFnc(props);

const updateLanguage = () => {

  if (language === "fr-CA") {
    page = lang.LanguageFr.pagegame();
    menuList = lang.LanguageFr.menu();
  } else if (language === "en-US") {
    page = lang.LanguageFr.pagegame();
    menuList = lang.LanguageFr.menu();
  } else {
    page = lang.LanguageFr.pagegame();
    menuList = lang.LanguageFr.menu();
  };
};

updateLanguage();

// Declaration all elements in index.html

const formDiv = CreateDivFnc({classes:['step-next', 'step-00', 'formDiv'], step: page.form,});

const divProbTxt = CreateDivFnc({classes:['step-next', 'step-0', 'probDiv'], step:page.decompose,});
divProbTxt.divEditor.contentEditable = false;

const response = CreateDivFnc({classes:['step-next', 'step-1'], step:page.gameStep,});

const checkBox = document.querySelector('.toggler');

const divBtn = document.createElement('div');
const divHeader = document.createElement('div');
divHeader.classList.add('divHeader');

const divHeader1 = document.createElement('div');
divHeader1.innerHTML = page.number+arrResStudent.length;

const infoGame = document.querySelector('.information');
const infoIframe = document.querySelector('.info-game-iframe');

const clock = document.createElement('div');

const clockMin = document.createElement('div');
clockMin.classList.add('clockMin');
const clockSec = document.createElement('div');
clockSec.classList.add('clockSec');
const clockLeft = document.createElement('div');
clock.classList.add('clock');
clock.append(clockMin, clockSec, clockLeft);

divHeader.append(divHeader1, clock);

const btn_start = document.createElement('button');
const btn_show_resume = document.createElement('button');

const step1DivMsg = document.createElement('div');

const divResume = document.createElement('div');
divResume.classList.add("resume");

const resumeHeader = document.createElement('div');
resumeHeader.classList.add("sticky");
resumeHeader.innerHTML = page.resumeHeaderTitle;

const resumeClickToClose = document.createElement('div');
resumeClickToClose.classList.add("clickToClose");
resumeClickToClose.innerHTML = page.clickToClose;

divResume.append(resumeClickToClose, resumeHeader);

const step2DivMsg = document.createElement('div');

const step3DivMsg = document.createElement('div');

const nextProbMsg = document.createElement('div');

const heading = document.createElement('div');


const menuItems = document.querySelectorAll('.menu-item');

// const msg = document.querySelector('.message');

// const msgBlock = document.createElement('div');
// msgBlock.classList.add('msg-block');

// document.body.append(msgBlock);

const app = document.querySelector('.root');

divBtn.classList.add('divBtn');

btn_start.innerHTML = page.button1;
btn_show_resume.innerHTML = page.button2;
divBtn.append(btn_show_resume, btn_start);

// END of declaration all elements in index.html


// if (checkMenuParams() !== "OK") {
//   msgBlock.innerHTML = `Les paramètres de cette page ne sont pas conformes.<br>
//   Erreur: ${checkMenuParams()}<br>
//   Demandez de l'aide à votre administrateur réseau.
//   `;
//   msgBlock.classList.add('show');

//   window.addEventListener('click', function() {
//     msg.innerHTML = `Vous ne pouvez plus continuer tant que les erreurs ne seront pas réglées.<br>
//     Les paramètres de cette page ne sont pas conformes.<br>
//     Demandez de l'aide à votre administrateur réseau.
//     `
//   });
// }

function resetAll() {
  tries = 0;
  let tables = divResume.querySelectorAll('.div-table');

  tables.forEach(t => {
    t.remove();
  });

  arrResStudent = [];
  divHeader1.innerHTML = page.number+arrResStudent.length;

  // genArrProb(nbrProb);
  shuffleProb(arrProb);
  probId = 0;
  btn_start.innerHTML = page.button1;
}

function genArrProb(nbr) {

  arrProb = [];

  for (let i = 0; i <= nbr; i += 1) {
    props12 = updateProps12(menuActive);
    props1 = props12.props1;
    props2 = props12.props2;
    prob.genProb(props1, props2);
    arrProb.push({
      probTxt: prob.polyObj.finalHtmlReduce,
      respArr: prob.step3Html
    })
  }
}

genArrProb(nbrProb);

function resetClock() {
  if (optionActive === "option-1") {
    clockMin.innerHTML = "0"+nbrMinOption_1;
    clockSec.innerHTML = "00";
    clockLeft.innerHTML = "00";
  } else if (optionActive === "option-2") {
    clockMin.innerHTML = "0"+nbrMinOption_2;
    clockSec.innerHTML = "00";
    clockLeft.innerHTML = "00";
  } else {
    clockMin.innerHTML = "00";
    clockSec.innerHTML = "00";
    clockLeft.innerHTML = "00";
  }
}

let callbackTimer = () => {
  console.log('Callback timer.')
  // clockMin.textContent = timer.time.min+":";
  // clockSec.textContent = timer.time.sec+",";
  // clockLeft.textContent = timer.time.timeLeft;
}

function updateProbDiv() {
  divProbTxt.divEditor.innerHTML = arrProb[probId++].probTxt;
  response.editor.resetDiv();
  response.editor.setCaretPosition(0);
}

function clearProbDiv() {
  divProbTxt.divEditor.innerHTML = "";
  response.editor.resetDiv();
  response.editor.setCaretPosition(0);
}

btn_start.addEventListener('click', function(e) {

  // if (tryActive) {
  //   showResumeTableV3();
  //   return;
  // }

  tryActive = true;
  btn_start.innerHTML = page.button1_1;

  if (optionActive === "option-1" || optionActive === "option-2") {
    if (!timer.isRunning()) {
      resetGameParams();
      
      timer.reset();
      timer.start();
    } else {
      arrResStudent.push(response.divEditor.innerHTML);
      divHeader1.innerHTML = page.number+arrResStudent.length;
    }
  
    updateProbDiv();
    return;
  }

  if (optionActive === "option-3") {

    if (timer.isStarted()) {
      if (timer.isRunning()) {
        arrResStudent.push(response.divEditor.innerHTML);
        divHeader1.innerHTML = page.number+arrResStudent.length;
        clearProbDiv();
        timer.stop();
      } else {
        resetGameParams();
        updateProbDiv();
        timer.start();
      }
    } else {
      timer.reset();
      resetGameParams(); // TO check
      updateProbDiv();
      timer.start();
    }

    return;

    if (!timer.isStarted()) {
      resetGameParams();
      
      timer.reset();
      timer.start();
    } else {
      arrResStudent.push(response.divEditor.innerHTML);
      divHeader1.innerHTML = page.number+arrResStudent.length;
      timer.start();
    }
  
    updateProbDiv();
    return;

    resetGameParams();
    timer.reset();
    timer.start();
    updateProbDiv();
    return;
  }

  if (optionActive === "option-4") {
    resetGameParams();
    updateProbDiv();
    return;
  }

  // if (tries >= 1) {
    // btn_start.innerHTML = page.button1_1;
  // }

});

btn_show_resume.addEventListener('click', function() {
  if (optionActive === "option-1" || optionActive === "option-2") {
    if (!timer.isRunning()) {
      showResumeTableV3();
    } else {
      arrResStudent.push(response.divEditor.innerHTML);
      divHeader1.innerHTML = page.number+arrResStudent.length;
      updateProbDiv();
    };
    
    return;
  }

  if (optionActive === "option-3") {
    
    showResumeTableV3();
    timer.reset();
    timer.stop();
    resetGameParams();
    return;
  }

  if (optionActive === "option-4") {
    
    showResumeTableV3();
    resetGameParams();
  }
  
});

htmlEl.style.fontSize = Math.floor(Math.min( (window.innerWidth/768) * 150 , 200)) +'%';


window.addEventListener('resize', function (params) {
  htmlEl.style.fontSize = Math.floor(Math.min( (window.innerWidth/768) * 150 , 200)) +'%';
});

let menuListener = e => {

  e.target.classList.toggle('active');

  let opts = [], nbrOpt = 0;

  menuItems.forEach(m => {
    m.classList.forEach(c => {
      if (c === "active") {
        opts.push(m.classList[1]);
      }
    })
  });

  opts.forEach(o => {
    if(o === "option-1" || o === "option-2" || o === "option-3" || o === "option-4") {
      nbrOpt += 1;
    }
  });

  if (nbrOpt > 1) {
    e.target.classList.toggle('active');
    msg.innerHTML = page.optionsOneSelection;
    msg.classList.add('show');
    setTimeout(() => {
      msg.classList.remove('show');
    }, 3000);
    return;
  }

  keepProb = true;

  opts.forEach(o => {
    if (o === "diff-prob") {
      keepProb = false;
    }
  })

  options = [...opts];

} // END of sub item listener

function addListernerForms() {

  menuItems.forEach(f => {
    f.addEventListener('click', menuListener);
  });

}

addListernerForms();

infoGame.addEventListener('click', function() {
  infoIframe.classList.toggle('show');
});

checkBox.addEventListener('click', updateOptionsTimer);

function updateOptionsTimer() {

  if (blockEverything) {
    checkBox.checked = false;
    return;
  }



  if (loading) {
    return;
  }

  if (timer && timer.isRunning()) {
    checkBox.checked = false;
    return;
  }

  optionActive = undefined;
  keepProb = true;

  // console.log('OPtions =', options);
  
  options.forEach(o=> {
    if (o === "option-1" || o === "option-2" || o === "option-3" || o === "option-4"){
      optionActive = o;
    }
    if (o === "diff-prob") {
      keepProb = false;
    }
  });

  if(!optionActive) {
    msg.innerHTML = page.optionsOneSelection;
    msg.classList.add('show');
    setTimeout(() => {
      msg.classList.remove('show');
    }, 3000);
    checkBox.click();
    return;
  }

  if (optionActive === "option-1") {
    timer = TimerCountDown(callbackTimer, 
      10,
      () => { console.log('Error !!!!!!!!!!!!!!!!!!!!!!')},
      clockMin, clockSec, clockLeft,
      nbrMinOption_1
      );
  } else if (optionActive === "option-2") {
    timer = TimerCountDown(callbackTimer, 
      10,
      () => { console.log('Error !!!!!!!!!!!!!!!!!!!!!!')},
      clockMin, clockSec, clockLeft,
      nbrMinOption_2
      );
  } else if (optionActive === "option-3") {
    timer = Timer(callbackTimer, 
      10,
      () => { console.log('Error !!!!!!!!!!!!!!!!!!!!!!')},
      clockMin, clockSec, clockLeft,
      maxTimeOption_3
      );
  } else if (optionActive === "option-4") {
    resetClock();
  }

  clearProbDiv();

  if (!checkBox.ckecked) {
      resetAll();
  }
  
};

response.divEditor.addEventListener("keydown", function(e) {

  if (e.key === "Enter") {
    if (optionActive === "option-4") {
      arrResStudent.push(response.divEditor.innerHTML);
      divHeader1.innerHTML = page.number+arrResStudent.length;
      let resp = arrResStudent[arrResStudent.length -1].split(' ').join('').toLowerCase();

      if (probId > 0 && arrProb[probId -1].respArr.includes(resp)) {
        updateProbDiv();
      } else {
        btn_show_resume.click();
      }
      return;      
    }
    if (optionActive === "option-1" || optionActive === "option-2") {
      if (timer.isRunning()) {
        arrResStudent.push(response.divEditor.innerHTML);
        divHeader1.innerHTML = page.number+arrResStudent.length;
        updateProbDiv();
        return;
      }
    }
    if (optionActive === "option-3") {

      if (!timer.isStopped()) {
        if (timer.isRunning()) {
          timer.stop();
          arrResStudent.push(response.divEditor.innerHTML);
          divHeader1.innerHTML = page.number+arrResStudent.length;
          clearProbDiv();
        } else {
          if (!tryActive) {
            resetGameParams();
            timer.reset();
            updateProbDiv();
            timer.start();
            tryActive = true;
          }else {
            updateProbDiv();
            timer.start();
          }
        }
      } else {
        resetGameParams();
        timer.reset();
        updateProbDiv();
        timer.start();
      }
      return;
    }
    if (optionActive === "option-4") {
      arrResStudent.push(response.divEditor.innerHTML);
      divHeader1.innerHTML = page.number+arrResStudent.length;
      updateProbDiv();
      return;
    }
  }
  
});

divResume.addEventListener('click', function() {
  divResume.classList.toggle("show");
});

function showResumeTableV3() {

  // if (!keepProb) {

  //   setTimeout(() => {
  //     genArrProb(nbrProb); 
  //   }, 1000);
  // }

  if (tryActive) {
    tries += 1;
    let table = document.createElement("table");
    table.classList.add("div-table");
    let caption = table.createCaption();
    // caption.innerHTML = page.tries+tries+"<br>";
    if (optionActive === "option-1") {
      caption.innerHTML = page.caption_01 + page.tries+tries+"<br>";
      caption.innerHTML += page.option_1_resume + arrResStudent.length + ".";
    }
    if (optionActive === "option-2") {
      caption.innerHTML = page.caption_02 + page.tries+tries+"<br>";
      caption.innerHTML += page.option_2_resume + arrResStudent.length + ".";
    }
    if (optionActive === "option-3") {
      caption.innerHTML = page.caption_03 + page.tries+tries+"<br>";
      caption.innerHTML += page.time_number + arrResStudent.length + ".<br>";
      caption.innerHTML += page.time+clockMin.innerHTML+page.minute(clockMin.innerHTML)+clockSec.innerHTML+","+clockLeft.innerHTML+page.second(clockSec.innerHTML);
    }
    if (optionActive === "option-4") {
      caption.innerHTML = page.caption_04 + page.tries+tries+"<br>";
      caption.innerHTML += page.numberProbTries + arrResStudent.length;
    }

    // if (tries >= 1) {
    //   btn_start.innerHTML = page.button1_1;
    // }
    let header = table.createTHead();
    let colsHeader = page.colsHeader;
    let row = header.insertRow();
  
    colsHeader.forEach((c, idx) => {
      let cell = row.insertCell(idx);
      cell.innerHTML = c;
    });
  
    let body = table.createTBody();
  
    let data = [];
    let points = 0;
    let probGood = 0, probBad = 0;
  
    let obj = {prob:0, solution: 0, enter:0, point: 0};
  
    for (let i = 0; i < Math.min(arrResStudent.length, nbrProb); i +=1) {
  
      obj = {prob:0, solution: 0, enter:0, point: 0};
  
      if (arrProb[i].respArr.includes(arrResStudent[i].split(' ').join('').toLowerCase())) {
        probGood += 1;
        points += 1;
        obj.point = "+1";
      } else {
        probBad += 1;
        points -= 1;
        obj.point = "-1";
      }
  
      let resp = document.createElement("ul");
      resp.style.listStyleType = "none";
  
      for (let j = 0; j < arrProb[i].respArr.length; j += 1){
        let li = document.createElement("li");
        li.style.listStyleType = "none";
        li.innerHTML = arrProb[i].respArr[j];
        resp.append(li);
      }
        
      obj.prob = arrProb[i].probTxt;
      obj.solution = resp.innerHTML;
      obj.enter = arrResStudent[i];
      data.push(obj);
  
    }
  
    let r, c;
  
    data.forEach((d, i) => {
      r = body.insertRow(i);
      Object.values(d).forEach((cell, idx) => {
        c = r.insertCell(idx);
        if (idx === 3) {
          c.style.textAlign = "center";
        }
        c.innerHTML = cell;
      })
    })
    
    let footer = table.createTFoot();
    let rowFoot = footer.insertRow(0);
    let cellFooter = rowFoot.insertCell(0);
    cellFooter.colSpan = "2";
    cellFooter.rowSpan = "2";
  
    cellFooter.innerHTML = page.cellFooter1(probGood)+probGood+"<br>"+page.cellFooter1_1(probBad)+ probBad;

    let cellFooter1 = rowFoot.insertCell(1);
    cellFooter1.rowSpan = "2";
    cellFooter1.innerHTML = page.cellFooter2;
    cellFooter1.style.textAlign = "center";
  
    let cellFooter2 = rowFoot.insertCell(2);
    cellFooter2.rowSpan = "2";
    cellFooter2.innerHTML = probGood - probBad;
    cellFooter2.style.textAlign = "center";

    divResume.append(table);

    tryActive = false;
    clearProbDiv();
    resetClock();
  }

  divResume.classList.toggle("show");

  // if (!keepProb) {

  //   setTimeout(() => {
  //     genArrProb(nbrProb); 
  //   }, 10);
  // }

  if (!keepProb) {
    shuffleProb(arrProb);
  }
}

function shuffleProb(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    const temp = JSON.parse(JSON.stringify( array[i]));
    array[i] = JSON.parse(JSON.stringify( array[j]));
    array[j] = JSON.parse(JSON.stringify( temp));
  }
}

app.append(divHeader, divProbTxt.div, response.div, step1DivMsg, divBtn, nextProbMsg, divResume);

checkBox.click();
loading = false;

waitVideo.pause();
waitVideo.currentTime = 0;

wait.style.display = 'none';

menu_wrap.style.display = "block";

} // END show page

window.addEventListener('load', function() {  
  
  if (checkMenuParams() !== "OK") {

    msgBlock.innerHTML = `Les paramètres de cette page ne sont pas conformes.<br>
    Erreur: ${checkMenuParams()}<br>
    Demandez de l'aide à votre administrateur réseau.
    `;
    msgBlock.classList.add('show');
    
    window.addEventListener('click', function() {
      msg.innerHTML = `Vous ne pouvez plus continuer tant que les erreurs ne seront pas réglées.<br>
      Les paramètres de cette page ne sont pas conformes.<br>
      Demandez de l'aide à votre administrateur réseau.
      `
    });
    blockEverything = true;
  } else {
    // checkBox.click();
    // loading = false;
    // htmlEl.style.background = "url('./images/image_0.png') no-repeat center center fixed";
    // // htmlEl.style.backgroundRepeat = "no-repeat";
    // // htmlEl.style.backgroundSize = "cover";
    // htmlEl.style.backgroundSize = "100% 100%";
  }

});
