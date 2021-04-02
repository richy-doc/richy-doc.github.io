import errors from './errors.js';

let supOpen = '«', supClose = '»';

function isDigit(c) {
  return /[-+\d]/.test(c);
}

function isLetter(l) {
  return /[a-zA-Z]/.test(l);
}

function reduceHtml(chainHtml) {
  let finalChain = '';

  finalChain = chainHtml;
  finalChain = finalChain.replace(/&nbsp;/g, '');
  finalChain = finalChain.replace(/\s/g, '');

  let tmp = '';

  while (tmp !== finalChain) {
    tmp = finalChain;
    finalChain = finalChain.split('--').join('+');
    finalChain = finalChain.split('++').join('+');
    finalChain = finalChain.split('+-').join('-');
    finalChain = finalChain.split('-+').join('-');
  }

  return tmp;

}

function htmlToTerm(chainHtml) {
  let chainTemp = '', coeff = '', expo = '', term = {}, v = '', modeSup = false;
  let vArr = [];

  term.error = '';

  chainTemp = reduceHtml(chainHtml);
  // chainTemp = this.reduceHtml(chainHtml);

  chainTemp = chainTemp.replace(/<sup>/ig, supOpen);
  chainTemp = chainTemp.replace(/<\/sup>/ig, supClose);

  // console.log('chain term ',chainTemp );

  let chainArr = chainTemp.split('');

  chainArr.forEach((c, idx) => {
    if (c === supOpen) {
    // if (chainArr[idx-1] === supOpen) {
      modeSup = true;
    } else if(chainArr[idx-1] === supClose) {
      modeSup = false;
      if (expo !== '') {
        if (isNaN( Number(expo))) {
          term.error =  errors.error_exponent(expo);
        }
        vArr.push({variable: v, exponent: Number(expo)});
      } else {
        vArr.push({variable: v, exponent: 1});
      }
      expo = ''; v = '';
    }
    if (modeSup) {
      if (c !== supOpen && c !== supClose) {
        expo += c;
      } 
    } else {
      if (isDigit(c)) {
        coeff += c;
      } else if (isLetter(c)) {
        if (v !== '') {
          if (expo !== '') {
            if (isNaN( Number(expo))) {
              term.error =  errors.error_exponent(expo);
            }
            vArr.push({variable: v, exponent: Number(expo)});
          } else {
            vArr.push({variable: v, exponent: 1});
          }
          v = c;
          expo = '';
        } else {
          v = c;
          expo = '';
        }
       
      }
    }
  });

  if(v !== '') {
    if (expo !== '') {
      if (isNaN( Number(expo))) {
        term.error = errors.error_exponent(expo);
      }
      vArr.push({variable: v, exponent: Number(expo)});
    } else {
      vArr.push({variable: v, exponent: 1});
    }
  }

  if (coeff === '' && vArr.length === 0) {
    term.error = errors.empty_char();
  }

  if (vArr.length === 0) {
    vArr.push({variable: 'x', exponent: 0});
  }

  if (coeff === '-') {
    coeff = -1;
  }

  if (coeff === '' || coeff === '+') {
    coeff = 1;
  }

  // term.coeff = coeff;

  term.coeff = Number(coeff);
  term.varArr = vArr;
  
  return term;
} // END build term from html

function termToHtml(term) {
  let htmlChain = '';
  if ( term.coeff === 0 ) return '0';
  if ( term.coeff !== 1 ) {
    if ( term.coeff === -1 ) {
      htmlChain += '-';
    } else {
      htmlChain += term.coeff.toString();
    }
  }
  for ( let i=0 ; i < term.varArr.length ; i++ ){
    let v = term.varArr[i];
    if ( v.exponent !== 0){
      if ( v.exponent === 1) {
        htmlChain += `${v.variable}`;
      } else {
        htmlChain += `${v.variable}<sup>${v.exponent}</sup>`;
      }
    }
  }

  if ( htmlChain === '-' ) htmlChain = '-1';
  if ( htmlChain === '' ) htmlChain = '1';

  return htmlChain;
} // END of term to html

const GenTerm = props => {

  // console.log('IN gen term props start = ', props)

  let deg = props.deg === undefined ? 1 :  props.deg;
  let min = props.min || 1 ;
  let max = props.max || 11 ;
  let maxA = props.maxA || 1;
  let numVar = props.numVar || ['x'] ;
  let anPos = props.anPos === undefined ? true : props.anPos;
  // this.numVar = numVar ;
  let excludeMultiples = props.excludeMultiples || [] ;
  let randomDeg = props.randomDeg === undefined ? false : props.randomDeg ;
  let firstTerm = props.firstTerm || false;

  // console.log('IN gen term props after = ', props)
  // console.log('an pos = ', anPos)


  let genCoeff = () => {
    let coefficient = undefined;
    if (firstTerm) {
      coefficient = Math.floor( Math.random() * ( maxA - min )) + min ;
    } else {
      coefficient = Math.floor( Math.random() * ( max - min )) + min ;
    }
    return coefficient;
  };

  let coefficient = genCoeff() ;

  // generate coefficient without multiples of eclude ones
 
  if ( excludeMultiples.length ) {
    let check = true ;
    while (check) {
      let isMultiple = false;
      for (let i=0 ; i < excludeMultiples.length ; i++) {
        // let multiple = 1;
        for (let j=2 ; j < max ; j++) {
          // multiple = j * excludeMultiples[i];
          // if ( coefficient === multiple || excludeMultiples[i] % coefficient === 0 ) {
          //   isMultiple = true;
          // }
          if ( coefficient % j === 0 && excludeMultiples[i] % j === 0) {
            isMultiple = true;
          }
        }
      }
      if (!isMultiple) check = false;
      else coefficient = genCoeff();
    }
  }

  if ( Math.floor(Math.random() * 2) == 0 ) coefficient = coefficient * -1 ;
  // let variables = [ {variable: numVar[0], exponent: deg} ];
  let vari = [];

  if ( randomDeg ) {
    for (let i=0; i < numVar.length ; i++){
      let expo = Math.floor(Math.random()*(deg+1));
      if (firstTerm && expo === 0) {
        expo =1;
      }
      vari.push({variable: numVar[i], exponent: expo});
    }
  } else {
    for (let i=0; i < numVar.length ; i++){
      vari.push({variable: numVar[i], exponent: deg});
    }
  }

  let term ={}, termFnc = '';

  // if (maxA === 1) coefficient = 1;
  if (anPos) coefficient = Math.abs(coefficient);

  term.coeff = coefficient;
  term.varArr = vari;
  termFnc += coefficient;

  for (let i = 0; i < vari.length; i +=1) {
    termFnc += vari[i].variable+supOpen+vari[i].exponent+supClose;
  }

  return {
    term:term, 
    termFnc:termFnc, 
    termHtml:termToHtml(term),
  };
};

export {GenTerm};

// return { term:term,  termFnc:termFnc, termHtml:termToHtml(term),}