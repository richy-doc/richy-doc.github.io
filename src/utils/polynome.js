// import {TermUtils} from './termUtils.js';
import {resolveHtmlToObj, polyTermsToHtml, mulPolysTerms, copyPolyTerms, testStrangeChar} from './polyutils.js';
import {GenTerm} from './term.js'

const PolynomeFnc = props => {

  // console.log('IN polynome fnc props = ', {...props})

  let poly = [];
  let terms = [];
  let exclude = [];
  let maxA = props.maxA || 1;

  for (let i = 0; i < props.nbrTerms; i += 1) {
    let term = undefined;
    if (i === 0) {
      term = GenTerm({...props, firstTerm: true, deg: props.degArr[i], excludeMultiples: exclude});
      // if (maxA === 1) {
      //   term = GenTerm({...props, firstTerm: true, maxA: maxA, deg: props.degArr[i], excludeMultiples: exclude});
      // } else {
      //   term = GenTerm({...props, firstTerm: true,maxA: -1, deg: props.degArr[i], excludeMultiples: exclude});
      // }
      
      // term = GenTerm({anPos: anPos, deg: deg[i], maxA: maxA, excludeMultiples: excludeMultiples});
      if (props.mustExclude) {
        exclude.push(Math.abs(term.term.coeff));
      }

      // console.log('props of polynome fnc =',{...props})

      // props.maxA = 11;
    } else {
      term = GenTerm({...props,firstTerm: false,anPos: false, deg: props.degArr[i], excludeMultiples: exclude});
      // term = GenTerm({anPos: anPos, deg: deg[i], maxA: 11, excludeMultiples: excludeMultiples});
      if (props.mustExclude) {
        exclude.push(Math.abs(term.term.coeff));
      }
      // console.log('props of polynome fnc =',props)

    }
    terms.push(term);
  }

  for (let i = 0; i < terms.length; i += 1) {
    poly.push(terms[i].term);
  }
  // poly.push(terms[0].term);
  // poly.push(terms[1].term);

  // console.log('poly 1 in fnc =', poly);
  // console.log('poly 2 in fnc =', poly2);
  // console.log('terms fnc =', terms);

  return {
    terms: terms, 
    poly: poly,
  };

}

export {PolynomeFnc};