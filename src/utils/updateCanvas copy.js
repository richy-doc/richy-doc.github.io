function UpdateCanvas(context, images, width = 1674, height = 625) {
  context.clearRect(0,0, width, height);
  context.drawImage(images[0], 0, 0, width, height);

  let nbrImage = images.length;

  let posx = 0, posy = 0, alreadyPick = [];

  let nbrX = Math.floor(width/300);
  let nbrY = Math.floor(height/100);
  
  
  let factorX = ((nbrX * 300) / 1280) * 300;
  let factorY = factorX/3;
  // let factorY = ((nbrY * 100) / 1280) * 100;
  let deltaX = 30 * (width/1000);
  let deltaY = 30 * (height/1000);
  nbrY = Math.floor(height/(factorY));

  // let factorX = width / (1200 + 4 * deltaX);
  // let factorY = factorX/3;

  // console.log('nbr x=', nbrX,' and nbr y=', nbrY)
  // console.log('factor x=', factorX,' and factor y=', factorY)

  let pickImageNbr = () => {

    let findOne = false;

    if (alreadyPick.length >= nbrImage -2) {
      alreadyPick = [];
    }
    
    let genNbr = () => {
      let n = Math.floor(Math.random() * (nbrImage-1) ) +1;
      return n;
    }
    let nbr = genNbr();
    if (alreadyPick.includes(nbr)) {
      nbr = genNbr();
    } else {
      findOne = true;
      alreadyPick.push(nbr);
    }

    while (!findOne) {
      nbr = genNbr();
      if (alreadyPick.includes(nbr)) {
        nbr = genNbr();
      } else {
        findOne = true;
        alreadyPick.push(nbr);
      }
    }
    ;
    return nbr;
  }

  let deltay = 0;
  let nbrImgPaint = nbrY *4;

  for (let ni = 1; ni <= nbrImgPaint; ni += 1) {

    let n = pickImageNbr();

    if (n <= 1 && n >= nbrImage) {
      n = 1;
    }

    // let ni = Math.floor(Math.random() * (nbrImage-1) ) +1;
    context.save();
    // let deg = Math.floor(Math.random()*3);

    // if (Math.random() * 2 < 2) deg = deg * -1;

    // context.scale(0.5, 0.5);

    // context.rotate(deg * Math.PI / 180);

    if (posy === 0) {
      deltay = 2;
    } else {
      deltay = 40;
    }
    
    context.drawImage(images[n], factorX* posx + posx * deltaX, factorY*posy + posy*deltaY, factorX, factorY);
    // context.drawImage(images[n], 300* posx+ 80*posx+30, 100*posy+50+deltay);
    if (posx >= 3) {
      posx = 0;
      posy += 1;
    } else {
      posx += 1;
    }
    context.restore();
  
  }
} 

export default UpdateCanvas;