import {Language} from '../utils/language.js';
// import '../scss/about.scss';

let lang = Language.LanguageFr;
let info = lang.info();

const htmlEl = document.getElementsByTagName('html')[0];
htmlEl.style.fontSize = Math.floor(Math.min( (window.innerWidth/768) * 150 , 200)) +'%';

window.addEventListener('resize', function (params) {
  htmlEl.style.fontSize = Math.floor(Math.min( (window.innerWidth/768) * 150 , 200)) +'%';
});

let closeDiv = document.querySelector('.closeDiv');
closeDiv.innerHTML = info.close;

document.addEventListener('click', () => {
  // console.log('parent',parent.document.querySelector('.info').classList[1])
  parent.document.querySelector('.about').classList.toggle("show");
})



// let main = document.querySelector('.info');
// let paragraphes = document.querySelectorAll('.para');

// // console.log('paragraphes=',paragraphes)

// paragraphes.forEach((p, idx) => {
//   p.innerHTML = info['p'+idx];
// });