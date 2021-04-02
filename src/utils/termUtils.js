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

function htmlToTerm(chainHtml, lastTerm = false) {
  let chainTemp = '', coeff = '', expo = '', term = {}, v = '', modeSup = false;
  let vArr = [];
  // let supOpen = '[', supClose = ']';

  term.error = '';

  chainTemp = reduceHtml(chainHtml);

  if (chainTemp.length === 0) {
    return {
      error: errors.empty_term(),
    };
  }

  chainTemp = chainTemp.replace(/<sup>/ig, supOpen);
  chainTemp = chainTemp.replace(/<\/sup>/ig, supClose);

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

  if (coeff === '' && vArr.length === 0 && expo === '') {
    term.error = errors.empty_char();
  }

  if (coeff === '' && vArr.length === 0 && expo !== '') {
    term.expo = true;
    term.coeff = Number(expo);
    term.varArr = [{variable: 'x', exponent: 0}];

    if (term.coeff > 10) {
      // term.error = errors.expo_greater_10(term.coeff);
      term.greater10 = true;
    }

    return term;
    // term.error = errors.empty_char();
  }

  if (coeff === '-') {
    if (lastTerm && vArr.length === 0) {
      term.error = errors.empty_term();
    } else {
      coeff = -1;
    }
  } 

  if (vArr.length === 0) {
    vArr.push({variable: 'x', exponent: 0});
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

function mulTerms(term1, term2) {
  // term = {coeff: int, varArr:[{variable: string, exponent: int}]}
  let t1 = copyTerm(term1);
  let t2 = copyTerm(term2);

  let o = {
    coeff: t1.coeff * t2.coeff,
    varArr: []
  }

  t1.varArr.forEach( t1 => {
    let v = {
      variable: t1.variable,
      exponent: t1.exponent      
    }
    let index = [];

    t2.varArr.forEach( (t2, idx) => {
      if (t2.variable === t1.variable) {
        v.exponent += t2.exponent;
        index.push(idx);
      }
    });
    
    if (index.length > 0) {
      Object.keys(index).reverse().forEach(i => {
        t2.varArr.splice(index[i],1);
      });
    }
    o.varArr.push(v);
  })

  if (t2.varArr.length) {
    for (let j = 0; j < t2.varArr.length; j++) {
      o.varArr.push(t2.varArr[j]);
    }
  }

  return o;

} // END terms mul v2

function addTerms(term1, term2) {
  // term = {coeff: int, varArr:[{variable: string, exponent: int}]}
  let t1 = copyTerm(term1);
  let t2 = copyTerm(term2);
  let o = {
    coeff: null,
    varArr: []
  }
  let poly = [];

  if (isTermsEquivalent(t1, t2)) {
    o.coeff = t1.coeff + t2.coeff;
    o.varArr = t1.varArr;
    poly.push(o);
  } else {
    // return poly of 2 terms
    poly.push(t1);
    poly.push(t2); 
  }

  return poly;
} // END of add terms

function copyTerm(term) {

  let t = {};
  t.coeff = term.coeff;
  t.varArr = [];

  for (let i = 0; i < term.varArr.length; i++) {
    t.varArr.push({...term.varArr[i]})
  }

  return t;
  
} // END of copy term

function isTermsEqual(term1, term2) {
  let t1 = copyTerm(term1),
      t2 = copyTerm(term2);
  if (t1.coeff !== t2.coeff) return false;
  if (t1.varArr.length !== t2.varArr.length) return false;

  for (let i = 0; i < t1.varArr.length; i++) {
    let obj1 = t1.varArr[i], find = false;

    for (let j = 0; j < t2.varArr.length; j++) {
      let obj2 = t2.varArr[j];
      if(JSON.stringify(obj1) === JSON.stringify(obj2)) find = true;
    }
    if (!find) return false;
  }

  for (let i = 0; i < t2.varArr.length; i++) {
    let obj1 = t2.varArr[i], find = false;

    for (let j = 0; j < t1.varArr.length; j++) {
      let obj2 = t1.varArr[j];
      if(JSON.stringify(obj1) === JSON.stringify(obj2)) find = true;
    }
    if (!find) return false;
  }

  return true;
  
} // END of is terms equals

function isTermsEquivalent(term1, term2) {
  let t1 = copyTerm(term1),
      t2 = copyTerm(term2);

  for (let i = 0; i < t1.varArr.length; i++) {
    let obj1 = t1.varArr[i], find = false;

    for (let j = 0; j < t2.varArr.length; j++) {
      let obj2 = t2.varArr[j];
      if(JSON.stringify(obj1) === JSON.stringify(obj2)) find = true;
    }
    if (!find) return false;
  }

  for (let i = 0; i < t2.varArr.length; i++) {
    let obj1 = t2.varArr[i], find = false;

    for (let j = 0; j < t1.varArr.length; j++) {
      let obj2 = t1.varArr[j];
      if(JSON.stringify(obj1) === JSON.stringify(obj2)) find = true;
    }
    if (!find) return false;
  }

  return true;
  
} // END of is terms equivalent

function orderTermVariables(term) {
  let t = copyTerm(term);

  t.varArr.sort((a, b) => {
    if (a.variable < b.variable) { return -1;};
    if (a.variable > b.variable) { return 1;};
    return 0;
  });

  return t;
} // END of order term variables ascending x, y, z ...

function reduceTerm(term) {
  let t = copyTerm(term);

  if (t.varArr.length === 1) return t;

  let t1 = {};
  t1.coeff = t.coeff;
  let tVar = [];
  let oldVarArr = JSON.parse(JSON.stringify(t.varArr));
  tVar.push(oldVarArr[0]);

  for (let i = 1; i < oldVarArr.length; i += 1) {
    let v = oldVarArr[i];
    let foundIdx = tVar.findIndex(tv => tv.variable === v.variable);

    if (foundIdx !== -1) {
      tVar[foundIdx].exponent += v.exponent;
    } else {
      tVar.push(v);
    }
  }

  t1.varArr = tVar;

  return orderTermVariables(t1);

} // END of reduce term if more than one same variable

const TermsFnc = props => {
  let deg = props.deg === undefined ? 1 :  props.deg;
  let min = props.min || 1 ;
  let max = props.max || 11 ;
  let maxA = props.maxA || 1;
  let numVar = props.numVar || ['x'] ;
  // const supOpen = '[';
  // const supClose = ']';
  // this.numVar = numVar ;
  let excludeMultiples = props.excludeMultiples || [] ;
  let randomDeg = props.randomDeg || false ;

  let genCoeff = () => {
    let coefficient = Math.floor( Math.random() * ( max - min )) + min ;
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
      vari.push({variable: numVar[i], exponent: expo});
    }
  } else {
    for (let i=0; i < numVar.length ; i++){
      vari.push({variable: numVar[i], exponent: deg});
    }
  }

  let term ={}, termFnc = '';
  if (maxA === 1) coefficient = 1;
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
    htmlToTerm: htmlToTerm,
  };
};

export {
  termToHtml, 
  htmlToTerm, 
  reduceTerm, 
  orderTermVariables, 
  isTermsEquivalent, 
  isTermsEqual, 
  copyTerm, 
  addTerms, 
  mulTerms,
};