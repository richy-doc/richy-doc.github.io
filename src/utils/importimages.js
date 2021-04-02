// import img0 from '../images/image_0.png';
// import img1 from '../images/image_1.png';
// import img2 from '../images/image_2.png';
// import img3 from '../images/image_3.png';
// import img4 from '../images/image_4.png';
// import img5 from '../images/image_5.png';
// import img6 from '../images/image_6.png';
// import img7 from '../images/image_7.png';
// import img8 from '../images/image_8.png';

// import favicon from '../images/favicon.ico';

// import cadenas_close_200x400 from '../images/cadenas_close_200x400.png';
// import cadenas_open_200x400 from '../images/cadenas_open_200x400.png';
// // import lights_all_off from '../images/lights_all_off.png';
// // import lights_green_on from '../images/lights_green_on.png';
// // import lights_red_on from '../images/lights_red_on.png';
// // import lights_yellow_on from '../images/lights_yellow_on.png';
// // import lights_all_on from '../images/lights_all_on.png';

// import lights_all_off from '../images/lights_all_off_200.png';
// import lights_green_on from '../images/lights_green_on_200.png';
// import lights_red_on from '../images/lights_red_on_200.png';
// import lights_yellow_on from '../images/lights_yellow_on_200.png';
// import lights_all_on from '../images/lights_all_on_200.png';


let imgs = [];
let img;

img = new Image();
img.src = './images/image_0.png';
// img.src = img0;
imgs.push(img);

img = new Image();
img.src = './images/image_1.png';
// img.src = img1;
imgs.push(img);

img = new Image();
img.src = './images/image_2.png';
// img.src = img2;
imgs.push(img);

img = new Image();
img.src = './images/image_3.png';
// img.src = img3;
imgs.push(img);

img = new Image();
img.src = './images/image_4.png';
// img.src = img4;
imgs.push(img);

img = new Image();
img.src = './images/image_5.png';
// img.src = img5;
imgs.push(img);

let cadenas_close_200x400 = new Image();
cadenas_close_200x400.src = './images/cadenas_close_200x400.png';

let cadenas_open_200x400 = new Image();
cadenas_open_200x400.src = './images/cadenas_open_200x400.png';

let lights_all_off = new Image();
lights_all_off.src = './images/lights_all_off.png';

let lights_green_on = new Image();
lights_green_on.src = './images/lights_green_on.png';

let lights_red_on = new Image();
lights_red_on.src = './images/lights_red_on.png';

let lights_yellow_on = new Image();
lights_yellow_on.src = './images/lights_yellow_on.png';

let lights_all_on = new Image();
lights_all_on.src = './images/lights_all_on.png';

export default {
  images:imgs,
  cadenas_close_200x400: cadenas_close_200x400,
  cadenas_open_200x400: cadenas_open_200x400,
  lights_all_off: lights_all_off,
  lights_green_on:lights_green_on,
  lights_red_on: lights_red_on,
  lights_yellow_on: lights_yellow_on,
  lights_all_on: lights_all_on
};