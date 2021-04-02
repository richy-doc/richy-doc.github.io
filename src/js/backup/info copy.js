import {Language} from '../utils/language.js';
import '../scss/info.scss';

let lang = Language.LanguageFr;
let info = lang.info();

const htmlEl = document.getElementsByTagName('html')[0];
htmlEl.style.fontSize = Math.floor(Math.min( (window.innerWidth/768) * 150 , 200)) +'%';

window.addEventListener('resize', function (params) {
  htmlEl.style.fontSize = Math.floor(Math.min( (window.innerWidth/768) * 150 , 200)) +'%';
});

let closeDiv = document.querySelector('.closeDiv');
closeDiv.innerHTML = info.close;

let showcase = document.querySelector('.showcase');

document.addEventListener('click', () => {
  // console.log('parent',parent.document.querySelector('.info').classList[1])
  parent.document.querySelector('.info').classList.toggle("show");
});



let main = document.querySelector('.info');
let divinfo = document.querySelectorAll('.para');

// console.log('divinfo=',divinfo)

divinfo.forEach((d, idx) => {
  d.innerHTML = info['div'+idx];
});

