import errors from './errors.js';

import {
  termToHtml, 
  htmlToTerm, 
  reduceTerm, 
  orderTermVariables, 
  isTermsEquivalent, 
  isTermsEqual, 
  copyTerm, 
  addTerms, 
  mulTerms,
} from './termUtils.js';

let supOpen = '«';
let supClose = '»';

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

function repeatedPlusMinus(chainHtml) {
  let finalChain = '', repeated = false;

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
    if (tmp !== finalChain) repeated = true;
  }

  return repeated;

}

function isNotAcceptedChar(c) {
  let reg = new RegExp('[A-Za-z\\s\\d-+*()]', 'ig');
  // let reg = new RegExp('[A-Za-z\\s\\d-+*()'+supOpen+supClose+']', 'ig');

  return ! reg.test(c);
  // return ! /[A-Za-z\s\d-+*()\[\]]/.test(c);
  // return ! /[A-Za-z\s\d-+*()\/<>]/.test(c);
}

function testStrangeChar(chainHtml) {
  let error ='';
  let tmp = chainHtml;
  tmp = tmp.replace(/<sup>/ig, '');
  tmp = tmp.replace(/<\/sup>/ig, '');

  let foundIdx = tmp.split('').findIndex((c, i) => isNotAcceptedChar(c));

  if (foundIdx !== -1) {
    let nbrCharSup = 0;
    for (let i = 0; i < foundIdx; i += 1) {
      if (tmp[i] === supOpen) nbrCharSup += 1;
      if (tmp[i] === supClose) nbrCharSup += 1;
    }
    error = errors.char_not_allowed(tmp[foundIdx], foundIdx - nbrCharSup);
  }

  return error;
} 

function isDigit(c) {
  return /[-\d]/.test(c);
}

function isNumber(n) {
  return /[\d]/.test(n);
}

function isLetter(l) {
  return /[a-zA-Z]/.test(l);
}

function mulPolysTerms(poly1, poly2) {
  let terms = [];

  poly1.forEach( t1 => {
    poly2.forEach( t2 => {
      terms.push(mulTerms(t1, t2));
    })
  });

  return terms;
} // END of multiply polynoms

function exponentPolysTerms(poly1, poly2) {
  let terms = [];
  let p2 = copyPolyTerms(poly1);
  let exp = poly2[0].coeff;

  function mulP1P2(p1, p2) {
    let t = [];
    p1.forEach( t1 => {
      p2.forEach( t2 => {
        t.push(mulTerms(t1, t2));
      })
    });
    return t;
  }

  if (exp === 1) {
    return poly1;
  }
  if (exp === 0) {
    return [{coeff: 1, varArr:[{variable: "x", exponent: 0}]}];
  }

  if (exp === 2) {
    let mul = mulP1P2(poly1, poly1)
    return mul;
  }

  if (exp > 2) {
    let polyStart = mulP1P2(poly1, poly1);
    for(let i = exp; i > 2; i -= 1) {
      polyStart = mulP1P2(polyStart, poly1)
    }
    return polyStart;
  }

  return terms;
} // END of exponent polynoms

function orderPolyDescr(poly, variable) {
  let p = copyPolyTerms(poly);

  p.sort((a, b) => {
    let dega = 0, degb = 0;
    a.varArr.forEach(el => dega += el.exponent);
    b.varArr.forEach(el => degb += el.exponent);

    if (dega > degb) { return -1;}
    else if (dega < degb) { return 1;}
    else {
      if (a.coeff > b.coeff) { return -1;}
      else if (a.coeff < b.coeff) { return 1;}
      else return 0;
    }
    // if (dega === degb) {
    //   if (a.coeff > b.coeff) { return -1;}
    //   else if (a.coeff < b.coeff) { return 1;}
    //   else return 0;
    // }
    // return 0;
  });

  p.forEach(t => {
    t.varArr.sort((a, b) => {
      if (a.variable < b.variable) { return -1;};
      if (a.variable > b.variable) { return 1;};
      return 0;
    })
  });

  // p.sort((a, b) => {
  //   let dega = 0, degb = 0;
  //   a.varArr.forEach(el => dega += el.exponent);
  //   b.varArr.forEach(el => degb += el.exponent);
  //   return degb - dega;
  // });

  return p;

} // END of ordering poly in decreasing order of degre V4

function orderPolyOpDescr(poly, variable) {
  let p = copyPolyTerms(poly);

  p.forEach(t => {
    t.varArr.sort((a, b) => {
      if (a.variable < b.variable) { return -1;};
      if (a.variable > b.variable) { return 1;};
      return 0;
    })
  });

  p.sort((a, b) => {
    let dega = 0, degb = 0;
    a.varArr.forEach(el => dega += el.exponent);
    b.varArr.forEach(el => degb += el.exponent);
    return degb - dega;
  })

  return p;

} // END of ordering poly in decreasing order with operations

function polyTermsToHtml(poly) {

  let html = '';

  poly.forEach( (t, i) => {

    let degree = 0;
    t.varArr.forEach(v => {
      degree = degree + v.exponent;
    });
    if (degree === 0) {
      if (t.coeff > 0) {
        if (i === 0) {
          html += t.coeff;
        } else {
          html += '+'+t.coeff;
        }
      } else {
        html += t.coeff;
      }
    } else {
      if (t.coeff > 1) {
        if (i === 0) {
          html += t.coeff;
        } else {
          html += '+'+t.coeff;
        }
      }  else if (t.coeff === 1) {
        if (i !== 0) {
          html += '+';
        } 
      } else if (t.coeff === -1) {
        html += '-';
      } else {
        html += t.coeff;
      }
    }

    t.varArr.forEach(v => {

      if (v.exponent > 0) {
        html += v.variable;
        if (v.exponent > 1) {
          html += `<sup>${v.exponent}</sup>`;
        }
      }
    });
  });

  return reduceHtml(html);
} // END of build html from poly

function addPolysTerms(poly1, poly2) {
  let polyAdded = [];

  for (let i = 0; i < poly1.length; i++) {
    // let term = {};
    polyAdded.push(poly1[i]);
  }

  for (let i = 0; i < poly2.length; i++) {
    // let term = {};
    polyAdded.push(poly2[i]);
  }

  polyAdded = reducePolyTerms(polyAdded);

  return polyAdded;
} // END of addition polynoms

function copyPolyTerms(poly) {
  // let p = poly.map( p => {
  //   let o = {}, v = [], ob = {};
  //   o.coeff = p.coeff;
  //   for (let i = 0; i < p.varArr.length; i++) {
  //     ob = {...p.varArr[i]};
  //     v.push(ob);
  //   }
  //   o.varArr = v;
  //   return o;
  // });

  // return p;
  return JSON.parse(JSON.stringify(poly));
} // END of copy poly to a new array

function reducePolyTerms(poly) {

  let p = copyPolyTerms(poly);

  let cumul = [];
  cumul.push(p[0]);

  for (let i = 1; i < p.length; i++) {
    let added = false;

    // for (let j = 0; j < cumul.length ;j++) {
    //   if (isArrEqual(cumul[j].varArr, p[i].varArr)) {
    //     cumul[j].coeff = cumul[j].coeff + p[i].coeff;
    //     added = true;
    //   }
    // }
    for (let j = 0; j < cumul.length ;j++) {
      if (isTermsEquivalent(cumul[j], p[i])) {
        cumul[j].coeff = cumul[j].coeff + p[i].coeff;
        added = true;
      }
    }
    if (!added) {
      cumul.push(p[i]);
    }
  }

  let cumulFinal = [];

  for (let i = 0; i < cumul.length; i++) {
    if (cumul[i].coeff !== 0) cumulFinal.push(cumul[i]);
  }

  return cumulFinal;

} // END of add same terms version 2

function transformHtmlToOP(htmlChain) {

// console.log('IN transform html param=', htmlChain)

  let o = {};
  o.msg = '';
  o.error = '';
  // let supOpen = '[', supClose = ']';

  o.chainHtml = htmlChain;
  o.chainHtmlReduce = reduceHtml(htmlChain.toLowerCase());
  o.repeatedPlusMinus = repeatedPlusMinus(htmlChain.toLowerCase());

  let htmlReduce = reduceHtml(htmlChain.toLowerCase());
  let c = htmlReduce.split('-').join('+-');
  
  let chainTmp = c.replace(/<sup>/ig, supOpen);
  chainTmp = chainTmp.replace(/<\/sup>/ig, supClose);
  let chain1 = chainTmp.split('');

  htmlReduce = chain1;
  let modeSup = false;

  let nbrLevel = 0;

  let htmlArrV3 = [];

  let paraOpenV3 = 0;
  let insertOpInArr3 = (c, idx, modeSup = false) => {

    if (modeSup) {
      // if (chain1[idx-1] && chain1[idx-1] === ")" ) {
      //   htmlArrV3.push({char: c, op:'^', level: paraOpenV3, index: idx, modeSup: modeSup});
      // } 
      // else {
      //   htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
      // }
      htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
      return;
    }

    if (c === '+') {
      if (idx === 0 || chain1[idx-1] === '(') {
        //htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
        return;
      } else {
        htmlArrV3.push({char: c, op:'+', level: paraOpenV3, index: idx, modeSup: modeSup});
        return ;
      }
    }

    if (c === '(') {
      paraOpenV3++;
      nbrLevel = Math.max(nbrLevel, paraOpenV3);
      if (chain1[idx-1] === '*') {
        // htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
        return;
      } else if (chain1[idx-1] === '+' || idx === 0 || chain1[idx-1] === '(') {
        // htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
        return;
      } else {
        htmlArrV3.push({char: '*', op:'*', level: paraOpenV3-1, index: idx, modeSup: modeSup});
        // htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
        return;
      }
    }
    if (c === ')') {
      paraOpenV3--;
      if (chain1[idx+1] === '+' || idx === chain1.length -1 || chain1[idx+1] === ')'|| chain1[idx+1] === '*' || chain1[idx+1] === '(') {
        // htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
        return;
      } else if(chain1[idx+1] && chain1[idx+1] === supOpen) {
        htmlArrV3.push({char: "^", op:'^', level: paraOpenV3, index: idx, modeSup: modeSup});
        return;
      } else {
        // htmlArrV3.push({char: c, op:'no', level: paraOpenV3+1, index: idx, modeSup: modeSup});
        htmlArrV3.push({char: '*', op:'*', level: paraOpenV3, index: idx, modeSup: modeSup});
        return ;
      }
    }
    if (c === '*') {
      htmlArrV3.push({char: c, op:'*', level: paraOpenV3, index: idx, modeSup: modeSup});
      return;
    }
    if (isLetter(c) && chain1[idx-1] && isNumber(chain1[idx+1])) {
      htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
      htmlArrV3.push({char: '*', op:'*', level: paraOpenV3, index: idx, modeSup: modeSup});
      return;
    }
    if ((isNumber(c) || isLetter(c) ) && chain1[idx-1] && (chain1[idx-1] === supClose)  ) {
      // if (isNumber(c) && chain1[idx-1] === supClose) {
      htmlArrV3.push({char: '*', op:'*', level: paraOpenV3, index: idx, modeSup: modeSup});
      htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
      return;
    }
    if (isLetter(c) && chain1[idx-1] && isLetter(chain1[idx-1])  ) {
      // if (isNumber(c) && chain1[idx-1] === supClose) {
      htmlArrV3.push({char: '*', op:'*', level: paraOpenV3, index: idx, modeSup: modeSup});
      htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
      return;
    }
    htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
    return;
  }

  chain1.forEach( (c, i) => {
    if (c === supOpen) { 
      modeSup = true; 
    }

    if (chain1[i-1] === supClose) { 
      modeSup = false;    
    }

    insertOpInArr3(c, i, modeSup);
  });

  o.chainOp = htmlArrV3.map(t=> t.char).join('');

  let term = '', arrOp = [], testOp = [];

  htmlArrV3.forEach(obj => {
    if (obj.op === 'no') {
      term += obj.char;
    } else {
      testOp.push(term);
      testOp.push(obj);
      term ='';
    }
  });

  if (term !== '') {
    testOp.push(term);
  } else {
    testOp.push('');
  }
  
  o.testOp = testOp;

  let priority = 1, groupLevel = []; //, subsetGroup = createArrSubset(nbrLevel);
  let subsetGroup = Array.from(new Array(nbrLevel+1), ()=> new Array());

  testOp.forEach(t => {
    if (t.op === '+' || t.op === '*' || t.op === "^") {
      groupLevel.push(t);
    }
  });

  for (let n = nbrLevel; n >= 0; n--) {
    let subset = [];
    for (let l = 0; l < groupLevel.length; l++) {
      if (groupLevel[l].level === n) {
        subset.push(groupLevel[l]);
        if(groupLevel[l+1] && groupLevel[l+1].level !== n) {
          subsetGroup[n].push(subset);
          subset = [];
        } else if (!groupLevel[l+1]) {
          subsetGroup[n].push(subset);
          subset = [];
        } else {
          subsetGroup[n].push(subset);
          subset = [];
        }
      }
    }

  }

  for (let n = nbrLevel; n >= 0; n--) {

    testOp.forEach(obj => {
      if (obj.op === '^' && obj.level === n) {
        obj.priority = priority++;
      }
    });

    testOp.forEach(obj => {
      if (obj.op === '*' && obj.level === n) {
        obj.priority = priority++;
      }
    });

    testOp.forEach(obj => {
      if (obj.op === '+' && obj.level === n) {
        obj.priority = priority++;
      }
    });

  } // END for subset group priority

  let opMin = Infinity, opMax = 0;
  let copyArrOp = JSON.parse(JSON.stringify(testOp));

  let copyTerms = copyArrOp.map((obj, idx) => {
    if (obj.op === '+' || obj.op === '*' || obj.op === "^") {
      return obj;
    } else {
      let polyHtml = obj
                        .replace(`/${supOpen}/ig`, '<sup>')
                        .replace(`/${supClose}/ig`, '</sup>');
      // if (polyHtml === '') {
      //   o.error = `Tu as un monôme vide.<br>`;
      // }
      let poly = ((idx === copyArrOp.length -1) || 
          (copyArrOp[idx+1] && copyArrOp[idx+1].op === '+') ||
          (copyArrOp[idx-1] && copyArrOp[idx+1] && (copyArrOp[idx-1].level !== copyArrOp[idx+1].level))
          ) 
        ? htmlToTerm(polyHtml, true) 
        :  htmlToTerm(polyHtml);
      
      if (poly.error !== '') {
        o.error += poly.error;
      }
      return [poly];
    }
  });

  if (o.error !== '') {
    o.error += errors.end();
    return o;
  }

  o.arrOp = JSON.parse(JSON.stringify(copyTerms));

  o.nbrLevel = nbrLevel;
  o.copyTerms = JSON.parse(JSON.stringify(copyTerms));

  function checkIfCanMakeOps(arrOp) {
    let copyTerms = JSON.parse(JSON.stringify(arrOp));
    let updateOpMinMax = (level) => {
      opMin = Infinity, opMax = 0;
  
      copyTerms.forEach(obj => {
        if (obj.level === level) {
          opMin = Math.min(opMin, obj.priority);
          opMax = Math.max(opMax, obj.priority);
        }
      })
    }
  
    let doOp = level => {
      updateOpMinMax(level);
      if (opMin === Infinity) return 'done';
  
      for (let i = 0; i < copyTerms.length; i++) {
        let obj = copyTerms[i];
        if (obj.priority === opMin) {;
          let poly1 = copyTerms[i-1];
          let poly2 = copyTerms[i+1];
          let p = [{coeff:1, varArr:[{variable:"x", exponent: 0}]}];
          if (obj.op === "^") {
  
            // console.log('poly1=', poly1,' and poly2=',poly2)

            if (poly1.length > 1) {
              if(poly1.length === 2) {
                if (poly2[0].coeff > 10) {
  
                  // console.log("Must do something »IN CHECK +++++++++++");
  
                  o.specialOperand = "Exponent is too high!!!!!!!!";
                  o.poly1Length = poly1.length;
                  o.expo = poly2[0].coeff; 
                }
              } else if (poly1.length === 3) {
                if (poly2[0].coeff > 5) {
                  o.specialOperand = "Exponent is too high!!!!!!!!";
                  o.poly1Length = poly1.length;
                  o.expo = poly2[0].coeff; 
                }
              } else {
                o.specialOperand = "Poly too big to expose !!!!!!!!!!!";
                o.poly1Length = poly1.length;
                o.expo = poly2[0].coeff; 
              }
            } else {
              if (poly2[0].coeff > 10000) {
                o.specialOperand = "Exponent is too high!!!!!!!!";
                o.poly1Length = poly1.length;
                o.expo = poly2[0].coeff; 
              }
            }

            copyTerms.splice(i-1, 3, addPolysTerms(poly1, poly2));
          } else if (obj.op === '*') {
            copyTerms.splice(i-1, 3, addPolysTerms(poly1, poly2));
          } else if (obj.op === '+') {
            copyTerms.splice(i-1, 3, addPolysTerms(poly1, poly2));
          }
          break;
        }
      }
  
    }
  
    let arrResLevel = [];
  
    for (let l = nbrLevel; l >= 0; l--) {
      while (doOp(l) !== 'done') {
        doOp(l);
      }
      arrResLevel.push(JSON.parse(JSON.stringify(copyTerms)) );
    }

    return "OK";
  } // END of can i make operations ???????????

  // console.log('Check op =', checkIfCanMakeOps(copyTerms) );

  checkIfCanMakeOps(copyTerms);

  return o;
}

function resolveHtmlToObj(htmlChain) {
  let o = {};
  o.msg = '';
  o.error = '';
  // let supOpen = '[', supClose = ']';

  let obj = transformHtmlToOP(htmlChain);

  o = Object.assign(o, obj);

  // console.log('o is now ====', o)

  if (o.error !== "") {
    return o;
  }

  if (o.specialOperand) {
    // console.log('MUST EXIT');
    // o.error = errors.expo_greater_10(o.expo);
    o.special = errors.specialCases(o.poly1Length, o.expo);
    // o.error = errors.specialCases(o.poly1Length, o.expo);
    return o;
  }

  let nbrLevel = o.nbrLevel;
  let copyTerms = o.copyTerms;

  // o.chainHtml = htmlChain;
  // o.chainHtmlReduce = reduceHtml(htmlChain.toLowerCase());
  // o.repeatedPlusMinus = repeatedPlusMinus(htmlChain.toLowerCase());

  // let htmlReduce = reduceHtml(htmlChain.toLowerCase());
  // let c = htmlReduce.split('-').join('+-');
  
  // let chainTmp = c.replace(/<sup>/ig, supOpen);
  // chainTmp = chainTmp.replace(/<\/sup>/ig, supClose);
  // let chain1 = chainTmp.split('');

  // htmlReduce = chain1;
  // let modeSup = false;

  // let nbrLevel = 0;

  // let htmlArrV3 = [];

  // let paraOpenV3 = 0;
  // let insertOpInArr3 = (c, idx, modeSup = false) => {

  //   if (modeSup) {
  //     // if (chain1[idx-1] && chain1[idx-1] === ")" ) {
  //     //   htmlArrV3.push({char: c, op:'^', level: paraOpenV3, index: idx, modeSup: modeSup});
  //     // } 
  //     // else {
  //     //   htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
  //     // }
  //     htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
  //     return;
  //   }

  //   if (c === '+') {
  //     if (idx === 0 || chain1[idx-1] === '(') {
  //       //htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
  //       return;
  //     } else {
  //       htmlArrV3.push({char: c, op:'+', level: paraOpenV3, index: idx, modeSup: modeSup});
  //       return ;
  //     }
  //   }

  //   if (c === '(') {
  //     paraOpenV3++;
  //     nbrLevel = Math.max(nbrLevel, paraOpenV3);
  //     if (chain1[idx-1] === '*') {
  //       // htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
  //       return;
  //     } else if (chain1[idx-1] === '+' || idx === 0 || chain1[idx-1] === '(') {
  //       // htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
  //       return;
  //     } else {
  //       htmlArrV3.push({char: '*', op:'*', level: paraOpenV3-1, index: idx, modeSup: modeSup});
  //       // htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
  //       return;
  //     }
  //   }
  //   if (c === ')') {
  //     paraOpenV3--;
  //     if (chain1[idx+1] === '+' || idx === chain1.length -1 || chain1[idx+1] === ')'|| chain1[idx+1] === '*' || chain1[idx+1] === '(') {
  //       // htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
  //       return;
  //     } else if(chain1[idx+1] && chain1[idx+1] === supOpen) {
  //       htmlArrV3.push({char: "^", op:'^', level: paraOpenV3, index: idx, modeSup: modeSup});
  //       return;
  //     } else {
  //       // htmlArrV3.push({char: c, op:'no', level: paraOpenV3+1, index: idx, modeSup: modeSup});
  //       htmlArrV3.push({char: '*', op:'*', level: paraOpenV3, index: idx, modeSup: modeSup});
  //       return ;
  //     }
  //   }
  //   if (c === '*') {
  //     htmlArrV3.push({char: c, op:'*', level: paraOpenV3, index: idx, modeSup: modeSup});
  //     return;
  //   }
  //   if (isLetter(c) && chain1[idx-1] && isNumber(chain1[idx+1])) {
  //     htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
  //     htmlArrV3.push({char: '*', op:'*', level: paraOpenV3, index: idx, modeSup: modeSup});
  //     return;
  //   }
  //   if ((isNumber(c) || isLetter(c) ) && chain1[idx-1] && (chain1[idx-1] === supClose)  ) {
  //     // if (isNumber(c) && chain1[idx-1] === supClose) {
  //     htmlArrV3.push({char: '*', op:'*', level: paraOpenV3, index: idx, modeSup: modeSup});
  //     htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
  //     return;
  //   }
  //   if (isLetter(c) && chain1[idx-1] && isLetter(chain1[idx-1])  ) {
  //     // if (isNumber(c) && chain1[idx-1] === supClose) {
  //     htmlArrV3.push({char: '*', op:'*', level: paraOpenV3, index: idx, modeSup: modeSup});
  //     htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
  //     return;
  //   }
  //   htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
  //   return;
  // }

  // chain1.forEach( (c, i) => {
  //   if (c === supOpen) { 
  //     modeSup = true; 
  //   }

  //   if (chain1[i-1] === supClose) { 
  //     modeSup = false;    
  //   }

  //   insertOpInArr3(c, i, modeSup);
  // });

  // o.chainOp = htmlArrV3.map(t=> t.char).join('');

  // let term = '', arrOp = [], testOp = [];

  // htmlArrV3.forEach(obj => {
  //   if (obj.op === 'no') {
  //     term += obj.char;
  //   } else {
  //     testOp.push(term);
  //     testOp.push(obj);
  //     term ='';
  //   }
  // });

  // if (term !== '') {
  //   testOp.push(term);
  // } else {
  //   testOp.push('');
  // }
  
  // o.testOp = testOp;

  // let priority = 1, groupLevel = []; //, subsetGroup = createArrSubset(nbrLevel);
  // let subsetGroup = Array.from(new Array(nbrLevel+1), ()=> new Array());

  // testOp.forEach(t => {
  //   if (t.op === '+' || t.op === '*' || t.op === "^") {
  //     groupLevel.push(t);
  //   }
  // });

  // for (let n = nbrLevel; n >= 0; n--) {
  //   let subset = [];
  //   for (let l = 0; l < groupLevel.length; l++) {
  //     if (groupLevel[l].level === n) {
  //       subset.push(groupLevel[l]);
  //       if(groupLevel[l+1] && groupLevel[l+1].level !== n) {
  //         subsetGroup[n].push(subset);
  //         subset = [];
  //       } else if (!groupLevel[l+1]) {
  //         subsetGroup[n].push(subset);
  //         subset = [];
  //       } else {
  //         subsetGroup[n].push(subset);
  //         subset = [];
  //       }
  //     }
  //   }

  // }

  // for (let n = nbrLevel; n >= 0; n--) {

  //   testOp.forEach(obj => {
  //     if (obj.op === '^' && obj.level === n) {
  //       obj.priority = priority++;
  //     }
  //   });

  //   testOp.forEach(obj => {
  //     if (obj.op === '*' && obj.level === n) {
  //       obj.priority = priority++;
  //     }
  //   });

  //   testOp.forEach(obj => {
  //     if (obj.op === '+' && obj.level === n) {
  //       obj.priority = priority++;
  //     }
  //   });

  // } // END for subset group priority

  let opMin = Infinity, opMax = 0;
  // let copyArrOp = JSON.parse(JSON.stringify(testOp));

  // let copyTerms = copyArrOp.map((obj, idx) => {
  //   if (obj.op === '+' || obj.op === '*' || obj.op === "^") {
  //     return obj;
  //   } else {
  //     let polyHtml = obj
  //                       .replace(`/${supOpen}/ig`, '<sup>')
  //                       .replace(`/${supClose}/ig`, '</sup>');
  //     // if (polyHtml === '') {
  //     //   o.error = `Tu as un monôme vide.<br>`;
  //     // }
  //     let poly = ((idx === copyArrOp.length -1) || 
  //         (copyArrOp[idx+1] && copyArrOp[idx+1].op === '+') ||
  //         (copyArrOp[idx-1] && copyArrOp[idx+1] && (copyArrOp[idx-1].level !== copyArrOp[idx+1].level))
  //         ) 
  //       ? htmlToTerm(polyHtml, true) 
  //       :  htmlToTerm(polyHtml);
      
  //     if (poly.error !== '') {
  //       o.error += poly.error;
  //     }
  //     return [poly];
  //   }
  // });

  // if (o.error !== '') {
  //   o.error += errors.end();
  //   return o;
  // }

  // o.arrOp = JSON.parse(JSON.stringify(copyTerms));

  let updateOpMinMax = (level) => {
    opMin = Infinity, opMax = 0;

    copyTerms.forEach(obj => {
      if (obj.level === level) {
        opMin = Math.min(opMin, obj.priority);
        opMax = Math.max(opMax, obj.priority);
      }
    })
  }

  let doOp = level => {
    updateOpMinMax(level);
    if (opMin === Infinity) return 'done';

    for (let i = 0; i < copyTerms.length; i++) {
      let obj = copyTerms[i];
      if (obj.priority === opMin) {;
        let poly1 = copyTerms[i-1];
        let poly2 = copyTerms[i+1];
        if (obj.op === "^") {

          // console.log('poly1=', poly1,' and poly2=',poly2)

          // if(poly1.length > 1 && poly2[0].coeff > 10) {
          //   console.log("Must do something+++++++++++");
          // }


          copyTerms.splice(i-1, 3, exponentPolysTerms(poly1, poly2));
        } else if (obj.op === '*') {
          copyTerms.splice(i-1, 3, mulPolysTerms(poly1, poly2));
        } else if (obj.op === '+') {
          copyTerms.splice(i-1, 3, addPolysTerms(poly1, poly2));
        }
        break;
      }
    }

  }

  let arrResLevel = [];

  for (let l = nbrLevel; l >= 0; l--) {
    while (doOp(l) !== 'done') {
      doOp(l);
    }
    arrResLevel.push(JSON.parse(JSON.stringify(copyTerms)) );
  }

  let final = reducePolyTerms(copyTerms[0]);
  arrResLevel.push(final);

  o.nbrLevel = nbrLevel;
  o.arrAllResLevels = arrResLevel;
  o.finalHtml = polyTermsToHtml(arrResLevel[nbrLevel+1]);
  o.finalHtml = polyTermsToHtml(arrResLevel[nbrLevel+1]);
  o.finalPoly = arrResLevel[nbrLevel+1];
  o.finalHtmlReduce = polyTermsToHtml(o.finalPoly);

  let polyArrOpToCheck = [];

  if (nbrLevel === 0) {
    polyArrOpToCheck = o.arrOp;
  } else {
    polyArrOpToCheck = o.arrAllResLevels[0];
  }
  o.polyArrOpToCheck = polyArrOpToCheck;

  o.finalPolyOrder =  orderPolyDescr(o.finalPoly); 
  
  o.finalHtmlOrder =  polyTermsToHtml(o.finalPolyOrder);

  return o;

} // END of html to object that contains all response for all levels and more infos FNC

function resolveHtmlToObj_backup(htmlChain) {
  let o = {};
  o.msg = '';
  o.error = '';
  // let supOpen = '[', supClose = ']';

  o.chainHtml = htmlChain;
  o.chainHtmlReduce = reduceHtml(htmlChain.toLowerCase());
  o.repeatedPlusMinus = repeatedPlusMinus(htmlChain.toLowerCase());

  let htmlReduce = reduceHtml(htmlChain.toLowerCase());
  let c = htmlReduce.split('-').join('+-');
  
  let chainTmp = c.replace(/<sup>/ig, supOpen);
  chainTmp = chainTmp.replace(/<\/sup>/ig, supClose);
  let chain1 = chainTmp.split('');

  htmlReduce = chain1;
  let modeSup = false;

  let nbrLevel = 0;

  let htmlArrV3 = [];

  let paraOpenV3 = 0;
  let insertOpInArr3 = (c, idx, modeSup = false) => {

    if (modeSup) {
      // if (chain1[idx-1] && chain1[idx-1] === ")" ) {
      //   htmlArrV3.push({char: c, op:'^', level: paraOpenV3, index: idx, modeSup: modeSup});
      // } 
      // else {
      //   htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
      // }
      htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
      return;
    }

    if (c === '+') {
      if (idx === 0 || chain1[idx-1] === '(') {
        //htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
        return;
      } else {
        htmlArrV3.push({char: c, op:'+', level: paraOpenV3, index: idx, modeSup: modeSup});
        return ;
      }
    }

    if (c === '(') {
      paraOpenV3++;
      nbrLevel = Math.max(nbrLevel, paraOpenV3);
      if (chain1[idx-1] === '*') {
        // htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
        return;
      } else if (chain1[idx-1] === '+' || idx === 0 || chain1[idx-1] === '(') {
        // htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
        return;
      } else {
        htmlArrV3.push({char: '*', op:'*', level: paraOpenV3-1, index: idx, modeSup: modeSup});
        // htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
        return;
      }
    }
    if (c === ')') {
      paraOpenV3--;
      if (chain1[idx+1] === '+' || idx === chain1.length -1 || chain1[idx+1] === ')'|| chain1[idx+1] === '*' || chain1[idx+1] === '(') {
        // htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
        return;
      } else if(chain1[idx+1] && chain1[idx+1] === supOpen) {
        htmlArrV3.push({char: "^", op:'^', level: paraOpenV3, index: idx, modeSup: modeSup});
        return;
      } else {
        // htmlArrV3.push({char: c, op:'no', level: paraOpenV3+1, index: idx, modeSup: modeSup});
        htmlArrV3.push({char: '*', op:'*', level: paraOpenV3, index: idx, modeSup: modeSup});
        return ;
      }
    }
    if (c === '*') {
      htmlArrV3.push({char: c, op:'*', level: paraOpenV3, index: idx, modeSup: modeSup});
      return;
    }
    if (isLetter(c) && chain1[idx-1] && isNumber(chain1[idx+1])) {
      htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
      htmlArrV3.push({char: '*', op:'*', level: paraOpenV3, index: idx, modeSup: modeSup});
      return;
    }
    if ((isNumber(c) || isLetter(c) ) && chain1[idx-1] && (chain1[idx-1] === supClose)  ) {
      // if (isNumber(c) && chain1[idx-1] === supClose) {
      htmlArrV3.push({char: '*', op:'*', level: paraOpenV3, index: idx, modeSup: modeSup});
      htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
      return;
    }
    if (isLetter(c) && chain1[idx-1] && isLetter(chain1[idx-1])  ) {
      // if (isNumber(c) && chain1[idx-1] === supClose) {
      htmlArrV3.push({char: '*', op:'*', level: paraOpenV3, index: idx, modeSup: modeSup});
      htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
      return;
    }
    htmlArrV3.push({char: c, op:'no', level: paraOpenV3, index: idx, modeSup: modeSup});
    return;
  }

  chain1.forEach( (c, i) => {
    if (c === supOpen) { 
      modeSup = true; 
    }

    if (chain1[i-1] === supClose) { 
      modeSup = false;    
    }

    insertOpInArr3(c, i, modeSup);
  });

  o.chainOp = htmlArrV3.map(t=> t.char).join('');

  let term = '', arrOp = [], testOp = [];

  htmlArrV3.forEach(obj => {
    if (obj.op === 'no') {
      term += obj.char;
    } else {
      testOp.push(term);
      testOp.push(obj);
      term ='';
    }
  });

  if (term !== '') {
    testOp.push(term);
  } else {
    testOp.push('');
  }
  
  o.testOp = testOp;

  let priority = 1, groupLevel = []; //, subsetGroup = createArrSubset(nbrLevel);
  let subsetGroup = Array.from(new Array(nbrLevel+1), ()=> new Array());

  testOp.forEach(t => {
    if (t.op === '+' || t.op === '*' || t.op === "^") {
      groupLevel.push(t);
    }
  });

  for (let n = nbrLevel; n >= 0; n--) {
    let subset = [];
    for (let l = 0; l < groupLevel.length; l++) {
      if (groupLevel[l].level === n) {
        subset.push(groupLevel[l]);
        if(groupLevel[l+1] && groupLevel[l+1].level !== n) {
          subsetGroup[n].push(subset);
          subset = [];
        } else if (!groupLevel[l+1]) {
          subsetGroup[n].push(subset);
          subset = [];
        } else {
          subsetGroup[n].push(subset);
          subset = [];
        }
      }
    }

  }

  for (let n = nbrLevel; n >= 0; n--) {

    testOp.forEach(obj => {
      if (obj.op === '^' && obj.level === n) {
        obj.priority = priority++;
      }
    });

    testOp.forEach(obj => {
      if (obj.op === '*' && obj.level === n) {
        obj.priority = priority++;
      }
    });

    testOp.forEach(obj => {
      if (obj.op === '+' && obj.level === n) {
        obj.priority = priority++;
      }
    });

  } // END for subset group priority

  let opMin = Infinity, opMax = 0;
  let copyArrOp = JSON.parse(JSON.stringify(testOp));

  let copyTerms = copyArrOp.map((obj, idx) => {
    if (obj.op === '+' || obj.op === '*' || obj.op === "^") {
      return obj;
    } else {
      let polyHtml = obj
                        .replace(`/${supOpen}/ig`, '<sup>')
                        .replace(`/${supClose}/ig`, '</sup>');
      // if (polyHtml === '') {
      //   o.error = `Tu as un monôme vide.<br>`;
      // }
      let poly = ((idx === copyArrOp.length -1) || 
          (copyArrOp[idx+1] && copyArrOp[idx+1].op === '+') ||
          (copyArrOp[idx-1] && copyArrOp[idx+1] && (copyArrOp[idx-1].level !== copyArrOp[idx+1].level))
          ) 
        ? htmlToTerm(polyHtml, true) 
        :  htmlToTerm(polyHtml);
      
      if (poly.error !== '') {
        o.error += poly.error;
      }
      return [poly];
    }
  });

  if (o.error !== '') {
    o.error += errors.end();
    return o;
  }

  o.arrOp = JSON.parse(JSON.stringify(copyTerms));

  let updateOpMinMax = (level) => {
    opMin = Infinity, opMax = 0;

    copyTerms.forEach(obj => {
      if (obj.level === level) {
        opMin = Math.min(opMin, obj.priority);
        opMax = Math.max(opMax, obj.priority);
      }
    })
  }

  let doOp = level => {
    updateOpMinMax(level);
    if (opMin === Infinity) return 'done';

    for (let i = 0; i < copyTerms.length; i++) {
      let obj = copyTerms[i];
      if (obj.priority === opMin) {;
        let poly1 = copyTerms[i-1];
        let poly2 = copyTerms[i+1];
        if (obj.op === "^") {

          // console.log('poly1=', poly1,' and poly2=',poly2)

          // if(poly1.length > 1 && poly2[0].coeff > 10) {
          //   console.log("Must do something+++++++++++");
          // }


          copyTerms.splice(i-1, 3, exponentPolysTerms(poly1, poly2));
        } else if (obj.op === '*') {
          copyTerms.splice(i-1, 3, mulPolysTerms(poly1, poly2));
        } else if (obj.op === '+') {
          copyTerms.splice(i-1, 3, addPolysTerms(poly1, poly2));
        }
        break;
      }
    }

  }

  let arrResLevel = [];

  for (let l = nbrLevel; l >= 0; l--) {
    while (doOp(l) !== 'done') {
      doOp(l);
    }
    arrResLevel.push(JSON.parse(JSON.stringify(copyTerms)) );
  }

  let final = reducePolyTerms(copyTerms[0]);
  arrResLevel.push(final);

  o.nbrLevel = nbrLevel;
  o.arrAllResLevels = arrResLevel;
  o.finalHtml = polyTermsToHtml(arrResLevel[nbrLevel+1]);
  o.finalHtml = polyTermsToHtml(arrResLevel[nbrLevel+1]);
  o.finalPoly = arrResLevel[nbrLevel+1];
  o.finalHtmlReduce = polyTermsToHtml(o.finalPoly);

  let polyArrOpToCheck = [];

  if (nbrLevel === 0) {
    polyArrOpToCheck = o.arrOp;
  } else {
    polyArrOpToCheck = o.arrAllResLevels[0];
  }
  o.polyArrOpToCheck = polyArrOpToCheck;

  o.finalPolyOrder =  orderPolyDescr(o.finalPoly); 
  
  o.finalHtmlOrder =  polyTermsToHtml(o.finalPolyOrder);

  return o;

} // END of html to object that contains all response for all levels and more infos FNC

function isPolysEquals(poly1, poly2) {
  let p1 = copyPolyTerms(poly1);
  let p2 = copyPolyTerms(poly2);
  let equal = true;

  if (p1.length !== p2.length) {
    return false;
  }

  p1.forEach((t, i) => {
    if (!isTermsEqual(t, p2[i])) equal = false;
  });

  return equal;
} // END of is polys equals

function isPolysEquivalents(poly1, poly2) {
  let p1 = orderPolyDescr(poly1);
  let p2 = orderPolyDescr(poly2);
  let equal = true;

  if (p1.length !== p2.length) {
    return false;
  }

  p1.forEach((t, i) => {
    if (!isTermsEqual(t, p2[i])) equal = false;
  });

  return equal;
} // END of is polys equivalents

function isPolysArrOpEquals(poly1, poly2) {
  let p1 = copyPolyTerms(poly1);
  let p2 = copyPolyTerms(poly2);
  let equal = true;

  if (p1.length !== p2.length) {
    return false;
  }

  p1.forEach((t, i) => { // check for operations equals order and level
    if (t.op && !(t.op === p2[i].op && t.level === p2[i].level && t.priority === p2[i].priority) ) {
      equal = false;
    };
  });

  if (equal) {
    p1.forEach((t, i) => { // check for poly inside
      if (Array.isArray(t)) {
        if (Array.isArray(p2[i])) {
          if (JSON.stringify(t) !== JSON.stringify(p2[i])) equal = false;
        } else {
          equal = false;
        }
      };
    });
  }
  
  return equal;
} // END of is polys arr operations equals

function isPolysArrOpEquivalents(poly1, poly2) {
  let p1 = copyPolyTerms(poly1);
  let p2 = copyPolyTerms(poly2);
  // p1 = orderPolyDescr(p1);
  // p2 = orderPolyDescr(p2);
  let equal = true;
  let nbrOpDiff = 0;
  let nbrPolyDiff = 0;
  let p1Op = [], p2Op = [];

  p1.forEach((t, i) => { // check for operations equals order and level
    if (t.op) {
      p1Op.push(t);
    };
  });

  p2.forEach((t, i) => { // check for operations equals order and level
    if (t.op) {
      p2Op.push(t);
    };
  });

  p1Op.forEach((t, i) => {
    if (t.op && !(t.op === p2Op[i].op && t.level === p2Op[i].level && t.priority === p2Op[i].priority) ) {
      equal = false;
      nbrOpDiff += 1;
    };   
  })

  if (p2Op.length > p1Op.length) {
    nbrOpDiff += p2Op.length - p1Op.length;
  }

  // p1.forEach((t, i) => { // check for operations equals order and level
  //   if (t.op && !(t.op === p2[i].op && t.level === p2[i].level && t.priority === p2[i].priority) ) {
  //     equal = false;
  //     nbrOpDiff += 1;
  //   };
  // });

  // if (equal) {
    let findInP2 = [];
    p1.forEach((t, i) => { // check for poly inside

      if (Array.isArray(t)) {
        let find = false;

        for (let j = 0; j < p2.length; j += 1) {

          if (Array.isArray(p2[j])) {

            if (isPolysEquals(orderPolyOpDescr(t), orderPolyDescr(p2[j]))) {
              if (!findInP2.includes[j]) {
                find = true;
                findInP2.push(j);
              }
            }
          }
        }

        if (!find) {
          equal = false;
          nbrPolyDiff += 1;
        }

      };
    });
  // }

  return {
    equal: equal,
    nbrOpDiff: nbrOpDiff,
    nbrPolyDiff: nbrPolyDiff
  };
} // END of is polys arr operations equivalents

function nbrNegativeSignPolyArrOp(polyArrOp) {
  let signs = 0;

  function deg(varArr) {
    let deg = 0;
    varArr.forEach(v => {
      deg += v.exponent;
    })

    return deg;    
  }

  polyArrOp.forEach(t => {
    if (Array.isArray(t)) {
      for (let i = 0; i < t.length; i += 1) {
        if (deg(t[i].varArr) > 0 && t[i].coeff < 0) {
          signs += 1;
        }
      }
    }
  });

  return signs;  
} // END of number negative signs in poly array with operations

export {
  resolveHtmlToObj, 
  polyTermsToHtml, 
  mulPolysTerms, 
  copyPolyTerms, 
  testStrangeChar,
  isPolysEquals,
  isPolysEquivalents,
  isPolysArrOpEquals,
  isPolysArrOpEquivalents,
  nbrNegativeSignPolyArrOp
};