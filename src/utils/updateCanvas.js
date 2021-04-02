function UpdateCanvas(context, images, width = 1674, height = 625) {
  context.clearRect(0,0, width, height);
  context.drawImage(images[0], 0, 0, width, height);

  let nbrImage = images.length;

  let posx = 0, posy = 0, alreadyPick = [];
  let deltaX = 30 ;

  let factorX = width / (1200 + 4 * deltaX);

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

  let nbrImgPaint = Math.ceil(height/(factorX*(100+deltaX) )) *4;

  for (let ni = 1; ni <= nbrImgPaint; ni += 1) {

    let n = pickImageNbr();

    if (n <= 1 || n >= nbrImage) {
      n = 1;
    }

    context.save();

    context.drawImage(images[n], posx*(factorX*(300+deltaX)), posy*(factorX*(100+deltaX)),
      factorX*300, factorX*100);

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