import errors from './errors.js';
import msg from './messages.js';

import {PolynomeFnc} from './polynome.js';
// import {termToHtml, htmlToTerm} from './termUtils.js';
import {resolveHtmlToObj, polyTermsToHtml, mulPolysTerms, copyPolyTerms, testStrangeChar, isPolysEquals, isPolysEquivalents, isPolysArrOpEquals, isPolysArrOpEquivalents, nbrNegativeSignPolyArrOp} from './polyutils.js';

import {isTermsEquivalent, isTermsEqual} from './termUtils.js'

const ProbFnc = props => {

  props.anPos = props.anPos || false;
  props.degArr = props.degArr || [1,0];
  props.nbrTerms = props.nbrTerms || 2;
  props.maxA = props.maxA || 1;
  props.randomDeg = props.randomDeg || false;
  props.min = props.min || 1;
  props.max = props.max || 11;
  props.numVar = props.numVar || ['x']; // ['x'] => ax², ['x','y'] => ax²y², ...
  props.excludeMultiples = props.excludeMultiples || [];
  props.mustExclude = props.mustExclude === undefined ? true : props.mustExclude;

  let variable = props.numVar[0];



  let poly1Obj = undefined;
  let poly2Obj = undefined;
  let poly1 = undefined;
  let poly2 = undefined;
  let polyObj = undefined;
  let product = undefined;
  let sum = undefined;
  let divMsg = props.divMsg || undefined;

  let o = {};
  

  let step1Html = []; // all aceptable form for step 1
  let step2Html = [];
  let step3Html = [];

  let step1Equal = []; // contain all possibles [{}] for the step, not ordering
  let step2Equal = [];
  let step3Equal = [];

  let steps_AllDone = false;
  let step_1_done = false;
  let step_2_done = false;
  let step_3_done = false;

  function genProb(props1, props2) {
    variable = props1.numVar &&  props1.numVar[0] !== undefined ? props1.numVar[0] : props.numVar[0];
    poly1Obj = PolynomeFnc({...props, ...props1});
    poly2Obj = PolynomeFnc({...props, ...props2});

    step1Html = []; // all aceptable form for step 1
    step2Html = [];
    step3Html = [];

    step1Equal = []; // contain all possibles [{}] for the step, not ordering
    step2Equal = [];
    step3Equal = [];

    steps_AllDone = false;
    step_1_done = false;
    step_2_done = false;
    step_3_done = false;

    poly1 = poly1Obj.poly;
    poly2 = poly2Obj.poly;

    let p ='('+polyTermsToHtml(poly1)+')('+polyTermsToHtml(poly2)+')';
    polyObj = resolveHtmlToObj(p);

    buildStepsArray();

    resetObject();
  }
  // genProb();

  function buildStepsArray() {

    let poly1Copy = null, poly2Copy = null;

    let coeff_1 = poly1[0].coeff;
    let coeff_2 = poly2[0].coeff;
    let b_1 = poly1[1].coeff;
    let b_2 = poly2[1].coeff;

    product = coeff_1 * coeff_2 * b_1 * b_2;
    sum = coeff_1 * b_2 + coeff_2 * b_1;

    let p1 = [],  p2 = [], p3 = [], p4 = [], p5 = [], p6 = [];
    p1 =  [poly1[0]];
    p2 =  [poly1[1]];
    p3 =  [poly2[0]];
    p4 =  [poly2[1]];

    let pu = polyTermsToHtml;
    let pum = mulPolysTerms;

    let p = null;
    let polyObj = null;

    let test = [];

     // Solution for step 1, solution 1 of 2

    p = pu(pum(p1,p3))+'+'+pu(pum(p1, p4))+'+'+pu(pum(p2,p3))+'+'+pu(pum(p2,p4));
    polyObj = resolveHtmlToObj(p);

    step1Equal.push(polyObj);
    step1Html.push(polyObj.chainHtmlReduce);

    // Solution for step 1, solution 2 of 2

    p = pu(pum(p1,p3))+'+'+pu(pum(p2,p3))+'+'+pu(pum(p1, p4))+'+'+pu(pum(p2,p4));
    polyObj = resolveHtmlToObj(p);

    step1Equal.push(polyObj);
    step1Html.push(polyObj.chainHtmlReduce);

    // // step 2 solution 1 of 4

    p = pu(p1)+'('+pu(poly2)+')+'+pu(p2)+'('+pu(poly2)+')';
    polyObj = resolveHtmlToObj(p);
    
    step2Equal.push(polyObj);
    step2Html.push(polyObj.chainHtmlReduce);

    

    // // step 2 solution 2 of 4
    
    p = pu(p3)+'('+pu(poly1)+')+'+pu(p4)+'('+pu(poly1)+')';
    polyObj = resolveHtmlToObj(p);
    
    step2Equal.push(polyObj);
    step2Html.push(polyObj.chainHtmlReduce);

    // step 2 solution 3 of 4

    p = pu(p2)+'('+pu(poly2)+')+'+ pu(p1)+'('+pu(poly2)+')';
    polyObj = resolveHtmlToObj(p);
    
    step2Equal.push(polyObj);
    step2Html.push(polyObj.chainHtmlReduce);

    // step 2 solution 4 of 4

    p = pu(p4)+'('+pu(poly1)+')+'+pu(p3)+'('+pu(poly1)+')';
    polyObj = resolveHtmlToObj(p);
    
    step2Equal.push(polyObj);
    step2Html.push(polyObj.chainHtmlReduce);

    // step2 negatives acceptable solutions

    poly1Copy = copyPolyTerms(poly1);
    poly2Copy = copyPolyTerms(poly2);

    poly1Copy[0].coeff = -1 * poly1Copy[0].coeff;
    poly1Copy[1].coeff = -1 * poly1Copy[1].coeff;
    poly2Copy[0].coeff = -1 * poly2Copy[0].coeff;
    poly2Copy[1].coeff = -1 * poly2Copy[1].coeff;

    p1 =  [poly1Copy[0]];
    p2 =  [poly1Copy[1]];
    p3 =  [poly2Copy[0]];
    p4 =  [poly2Copy[1]];

    // // step2 negative solution 1 of 4

    p = pu(p1)+'('+pu(poly2Copy)+')+'+pu(p2)+'('+pu(poly2Copy)+')';
    polyObj = resolveHtmlToObj(p);
    
    step2Equal.push(polyObj);
    step2Html.push(polyObj.chainHtmlReduce);

    // // step2 negative solution 2 of 4
    
    p = pu(p3)+'('+pu(poly1Copy)+')+'+pu(p4)+'('+pu(poly1Copy)+')';
    polyObj = resolveHtmlToObj(p);
    
    step2Equal.push(polyObj);
    step2Html.push(polyObj.chainHtmlReduce);

    // step2 negative solution 3 of 4

    p = pu(p2)+'('+pu(poly2Copy)+')+'+ pu(p1)+'('+pu(poly2Copy)+')';
    polyObj = resolveHtmlToObj(p);
    
    step2Equal.push(polyObj);
    step2Html.push(polyObj.chainHtmlReduce);

    // step2 negative solution 4 of 4

    p = pu(p4)+'('+pu(poly1Copy)+')+'+pu(p3)+'('+pu(poly1Copy)+')';
    polyObj = resolveHtmlToObj(p);
    
    step2Equal.push(polyObj);
    step2Html.push(polyObj.chainHtmlReduce);

    // END of negatives solutions for step 2

    // // step 3 solution 0 and 1 of 4

    if (isPolysEquals(poly1, poly2)) {
      // step3Html.push("("+polyTermsToHtml(poly1)+")<sup>2</sup>");

      // p = '('+pu(poly1)+')('+pu(poly2)+')';
      p = "("+polyTermsToHtml(poly1)+")<sup>2</sup>";
      polyObj = resolveHtmlToObj(p);
      
      step3Equal.push(polyObj);
      step3Html.push(polyObj.chainHtmlReduce);

      p = '('+pu(poly1)+')('+pu(poly2)+')';
      polyObj = resolveHtmlToObj(p);

      step3Equal.push(polyObj);
      step3Html.push(polyObj.chainHtmlReduce);
    } else {
      p = '('+pu(poly1)+')('+pu(poly2)+')';
      polyObj = resolveHtmlToObj(p);
      
      step3Equal.push(polyObj);
      step3Html.push(polyObj.chainHtmlReduce);
  
      // // step 3 solution 2 of 4
  
      p = '('+pu(poly2)+')('+pu(poly1)+')';
      polyObj = resolveHtmlToObj(p);
      
      step3Equal.push(polyObj);
      step3Html.push(polyObj.chainHtmlReduce);
    }

    // // step 3 solution 3 of 4

    poly1Copy = copyPolyTerms(poly1);
    poly2Copy = copyPolyTerms(poly2);

    poly1Copy[0].coeff = -1 * poly1Copy[0].coeff;
    poly1Copy[1].coeff = -1 * poly1Copy[1].coeff;
    poly2Copy[0].coeff = -1 * poly2Copy[0].coeff;
    poly2Copy[1].coeff = -1 * poly2Copy[1].coeff;

    if (isPolysEquals(poly1, poly2)) {
      // step3Html.push("("+polyTermsToHtml(poly1Copy)+")<sup>2</sup>");

      // p = '('+pu(poly1Copy)+')('+pu(poly2Copy)+')';
      p = "("+polyTermsToHtml(poly1Copy)+")<sup>2</sup>";
      polyObj = resolveHtmlToObj(p);
      
      step3Equal.push(polyObj);
      step3Html.push(polyObj.chainHtmlReduce);

      p = '('+pu(poly1Copy)+')('+pu(poly2Copy)+')';
      polyObj = resolveHtmlToObj(p);
      
      step3Equal.push(polyObj);
      step3Html.push(polyObj.chainHtmlReduce);
    } else {
      p = '('+pu(poly1Copy)+')('+pu(poly2Copy)+')';
      polyObj = resolveHtmlToObj(p);
      
      step3Equal.push(polyObj);
      step3Html.push(polyObj.chainHtmlReduce);
  
      // // step 3 solution 4 of 4
  
      p = '('+pu(poly2Copy)+')('+pu(poly1Copy)+')';
      polyObj = resolveHtmlToObj(p);
      
      step3Equal.push(polyObj);
      step3Html.push(polyObj.chainHtmlReduce);
  
      //test for reversing array
  
      p = '('+pu(poly2Copy.reverse())+')('+pu(poly1Copy)+')';
      polyObj = resolveHtmlToObj(p);
      
      step3Equal.push(polyObj);
    }

    

    // console.log('step 1 equal = ', step1Equal);
    // console.log('step 2 equal = ', step2Equal);
    // console.log('step 3 equal = ', step3Equal);
    // console.log('product ', product);
    // console.log('sum = ', sum);

  } // END of build forms terms in prob function

  // buildStepsArray();

  function analyseStudentInput(chainHtml, step) {

    let input = chainHtml;
    let o = {};
    o.msg = '';
    o.error = '';
    let color1 = 'blue';
    let color2 = 'red';

    if (chainHtml.length === 0) {
      let msg = '';
      if (step === 'step-1') {
        msg = "l'étape 1";
      } else if (step === 'step-2') {
        msg = "l'étape 2";
      } else if (step === 'step-3') {
        msg = "l'étape 3";
      }
      
      o.error = errors.empty_div(msg);
      return o;
    }
    
    if (chainHtml.length >= 200) {
      o.error = errors.entryTooBig();
      return o;
    }

    let checkPara = chain => {
      let open = 0, close = 0, error = '';

      chain.split('').forEach((c, i) => {
        if (c === '(') {
          open += 1;
        }
        if (c === ')') {
          close += 1;
          if (close > open && error === '') {
            error += errors.para_error(open, close, i);
          }
        }
      });

      let diff = open - close;
      if (error === ''){
        if (diff > 0) {
          error += errors.para_close_error(diff);
        } else if (diff < 0) {
          diff = Math.abs(diff);
          error += errors.para_open_error(diff);
        }
      }

      return error;
    }

    let error = checkPara(input);
    
    if (error !== '') {
      o.error = error;
      return o;
    }

    error = testStrangeChar(input);

    if (error !== '') {
      o.error = error;
      return o;
    }

    let studentObj = resolveHtmlToObj(input);

    // console.log('student after resolve =', studentObj)

    if (studentObj.error !== '') {
      o.error = studentObj.error;
      return o;
    }

    if (studentObj.special) {
      o.special = studentObj.special;
      return o;
    }

    if (studentObj.repeatedPlusMinus) {
      o.msg = msg.sign_repeated();
    }

    // Fist check if we have the good polynome

    o.studentObj = studentObj;

    // console.log('Student obj=====', studentObj)

    let studentResponse = studentObj.chainHtmlReduce;

    let findStepDone = studentChain => {
      let step1 = step1Html;
      let step2 = step2Html;
      let step3 = step3Html;
      let found = -1, result = {};
      found = step1.findIndex(choice => choice === studentChain);
      if (found !== -1) {
        result.find = 'step-1';
        result.index = found;
        // if (step === "step-1")
        // this.step_1_done = true;
        return result;
      }
      found = step2.findIndex(choice => choice === studentChain);
      if (found !== -1) {
        result.find = 'step-2';
        result.index = found;
        // this.step_2_done = true;
        return result;
      }
      found = step3.findIndex(choice => choice === studentChain);
      if (found !== -1) {
        result.find = 'step-3';
        result.index = found;
        // this.step_3_done = true;
        return result;
      }
      result.find = 'none';
      result.index = undefined;
      return result;
    }

    let result = findStepDone(studentResponse);
    o.result = result;

    if (result.index !== undefined) {

      // TODO improve the message about signs, not good right now.
      let studentSigns = undefined;
      let probSigns = undefined;

      if (result.index >= 4 && result.find === 'step-2') {
        studentSigns = nbrNegativeSignPolyArrOp(studentObj.polyArrOpToCheck);
        probSigns = nbrNegativeSignPolyArrOp(step2Equal[0].polyArrOpToCheck);
        if (studentSigns > probSigns && o.msg === '') o.msg= msg.signs_positives(step2Html[0]);
      }
      if (result.index >= 2 && result.find === 'step-3') {
        studentSigns = nbrNegativeSignPolyArrOp(studentObj.polyArrOpToCheck);
        probSigns = nbrNegativeSignPolyArrOp(step3Equal[0].polyArrOpToCheck);
        if (studentSigns > probSigns && o.msg === '') o.msg= msg.signs_positives(step3Html[0]);
      }
      if (result.index === 1 && result.find === 'step-3' && step3Html[0].includes("<sup>")) {
        o.msg= msg.prefered_exponent(step3Html[0]);
      }
      return o;
    } else {
      // o.error = errors.not_found_step123html();
      // return o;
    }

    let analyse_step1 = () => {
      let result = {};
      result.error = '';
      result.msg = '';
      let student = studentObj.polyArrOpToCheck;
      let studentPoly = [], step1Poly = [];
      let step1 = step1Equal[0].polyArrOpToCheck;

      function checkOp() {
        let ok = true;
        let step1Op = [], studentOp = [];

        step1.forEach(t => {
          if (t.op) {
            step1Op.push(t);
          } else {
            step1Poly.push(...t);
          }
        });

        student.forEach(t => {
          if (t.op) {
            studentOp.push(t);
          } else {
            studentPoly.push(...t);
          }
        });

        if (studentOp.length === step1Op.length) {
          step1Op.forEach((op, i) => {
            if ((op.op !== studentOp[i].op) || (op.level !== studentOp[i].level) ) ok = false;
          });
  
          studentOp.forEach((op, i) => {
            if ((op.op !== step1Op[i].op) || (op.level !== step1Op[i].level) ) ok = false;
          });
        } else {
          ok = false;
        }
        
        return {
          ok: ok,
          opStd: studentOp,
          opProb: step1Op,
        };

      }

      let checkOperations = checkOp();

      let termTest_X2 = step1Equal[0].arrOp[0][0];
      let termTest_X1 = step1Equal[0].arrOp[2][0];
      let termTest_X0 = step1Equal[0].arrOp[6][0];

      let termX2 = [], coeff1X2 = 0;
      let termX1 = [], coeff1X1 = 0, coeff2X1 = 0;
      let termX0 = [], coeff1X0 = 0;

      studentPoly.forEach(t => {
        if (isTermsEquivalent(t, termTest_X2)) {
          termX2.push(t);
        }
      });  
      studentPoly.forEach(t => {
        if (isTermsEquivalent(t, termTest_X1)) {
          termX1.push(t);
        }
      });
      studentPoly.forEach(t => {
        if (isTermsEquivalent(t, termTest_X0)) {
          termX0.push(t);
        }
      });

      if (termX2.length !== 1) {
        result.error = errors.nbr_terms_X2_not_equal(termX2.length, 1, termTest_X2);
        if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
          result.error += 
          errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
        }
        return result;
      }

      if (termX1.length !== 2) {
        result.error = errors.nbr_terms_X1_not_equal(termX1.length, 2, termTest_X1);
        if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
          result.error += 
          errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
        }
        return result;
      } else {
        coeff1X1 = termX1[0].coeff;
        coeff2X1 = termX1[1].coeff;
        let studentProductTerm = studentPoly.filter(p => p.varArr[0].exponent === 0);
        let prodStudent = 0;

        if (studentProductTerm.length > 0) {
          studentProductTerm.forEach( t => {
            prodStudent += t.coeff;
          })
        }

        let studentProduct = coeff1X1 * coeff2X1;

        let studentProductAbs = Math.abs(studentProduct);
        let productAbs = Math.abs(product);
        let studentSum = coeff1X1 + coeff2X1;

        if (studentProductAbs === productAbs && studentSum !== sum) {
          result.error = errors.produc_ok_sum_not(coeff1X1, coeff2X1);
          if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
            result.error +=  
            errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
          }
          return result;
        }

        if (studentSum === sum && studentProductAbs !== productAbs) {
          result.error = errors.sum_ok_product_not(coeff1X1, coeff2X1);
          if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
            result.error +=  
            errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
          }
          return result;
        }

        if (studentSum !== sum && studentProductAbs !== productAbs) {
          result.error = errors.sum_not_product_not(coeff1X1, coeff2X1);
          return result;
        }

        if (studentSum === sum && studentProduct === product && prodStudent !== product) {
          result.error = errors.sum_ok_product_ok_response_not(coeff1X1, coeff2X1, prodStudent);
          if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
            result.error += 
            errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
          }
          return result;
        }

      }

      if (studentObj.finalHtmlOrder === polyObj.finalHtmlOrder) {

        if (checkOperations.ok) {

          if (studentObj.finalHtml !== step1Equal[0].finalHtml && studentObj.finalHtml !== step1Equal[1].finalHtml) {
            result.msg = msg.not_ordered_poly(studentObj.chainHtml, step1Html[0], variable);
          } else {
            result.msg = msg.better_writing(studentObj.chainHtml, step1Html[0], variable);
          }
          
          result.find = 'step-1';

        } else { // check checkOperations.ok === false
  
          if (checkOperations.opStd.length !== checkOperations.opProb.length) {
            result.error = errors.operations_not_equal(checkOperations.opStd.length, checkOperations.opProb.length);
            if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
              result.error += 
              errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
            }
            return result;
          }else {
            result.error = errors.operations_not_same(checkOperations.opStd, checkOperations.opProb);
            if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
              result.error += 
              errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
            }
            return result;
          }   
        }

      } else { // studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder
        console.log('To define ++++++++++++++++++++++++')
        // if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
          result.error += 
          errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
        // }
        return result;
        
      } // END of studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder

      if (studentPoly.length !== 4) {
        result.error = errors.nbr_terms(studentPoly.length, 4);
        return result;
      }

      if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
        result.error += 
        errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
      }
      // return result;

      return result;
     
    } // END of analyse step 1

    let analyse_step2 = () => {
      let result = {};
      result.error = '';
      result.msg = '';
      let student = studentObj.polyArrOpToCheck;
      let studentPoly = [], step2Poly = [];
      let step2 = step2Equal[0].polyArrOpToCheck; 
      
      function findBestStep2() {
        let best = {index:0, minOpDiff: 10, minPolyDiff: 10};

        function checkOp(step2) {
          let ok = true;
          let step2Op = [], studentOp = [];
  
          step2.forEach(t => {
            if (t.op) {
              step2Op.push(t);
            } else {
              step2Poly.push(t);
            }
          });
  
          student.forEach(t => {
            if (t.op) {
              studentOp.push(t);
            } else {
              studentPoly.push(t);
            }
          });
  
          if (studentOp.length === step2Op.length) {
            step2Op.forEach((op, i) => {
              if ((op.op !== studentOp[i].op) || (op.level !== studentOp[i].level) ) ok = false;
            });
    
            studentOp.forEach((op, i) => {
              if ((op.op !== step2Op[i].op) || (op.level !== step2Op[i].level) ) ok = false;
            });
          } else {
            ok = false;
          }
          
          return {
            ok: ok,
            opStd: studentOp,
            opProb: step2Op,
          };
  
        } // END of check operations

        for (let i = 0; i < step2Equal.length; i += 1) {
          let stepAnalyse = step2Equal[i].polyArrOpToCheck;
          let checkOperations = checkOp(stepAnalyse);
          if (checkOperations.ok) {

            let polysEquivalents = isPolysArrOpEquivalents(student, stepAnalyse);
    
            // if (polysEquivalents.equal) {
              if (best.minOpDiff > polysEquivalents.nbrOpDiff ||
                  best.minPolyDiff > polysEquivalents.nbrPolyDiff) {
                  best.index = i;
                  best.minOpDiff = polysEquivalents.nbrOpDiff;
                  best.minPolyDiff = polysEquivalents.nbrPolyDiff;
              }
            // }
    
          }

        } // END of for loop

        return best;

      } // END of find the best step 2

      let best = findBestStep2();

      step2 = step2Equal[best.index].polyArrOpToCheck;

      function checkOp() {
        let ok = true;
        let step2Op = [], studentOp = [];

        step2.forEach(t => {
          if (t.op) {
            step2Op.push(t);
          } else {
            step2Poly.push(t);
          }
        });

        student.forEach(t => {
          if (t.op) {
            studentOp.push(t);
          } else {
            studentPoly.push(t);
          }
        });

        if (studentOp.length === step2Op.length) {
          step2Op.forEach((op, i) => {
            if ((op.op !== studentOp[i].op) || (op.level !== studentOp[i].level) ) ok = false;
          });
  
          studentOp.forEach((op, i) => {
            if ((op.op !== step2Op[i].op) || (op.level !== step2Op[i].level) ) ok = false;
          });
        } else {
          ok = false;
        }
        
        return {
          ok: ok,
          opStd: studentOp,
          opProb: step2Op,
        };

      }

      let checkOperations = checkOp();

      if (checkOperations.ok) {

        let polysEquivalents = isPolysArrOpEquivalents(student, step2);

        if (polysEquivalents.equal) {

          if (studentObj.finalHtml !== step2Equal[0].finalHtml && 
            studentObj.finalHtml !== step2Equal[1].finalHtml &&
            studentObj.finalHtml !== step2Equal[2].finalHtml &&
            studentObj.finalHtml !== step2Equal[3].finalHtml
            ) {
            result.msg = msg.not_ordered_poly(studentObj.chainHtml, step2Html[0], variable);
          } else {
            result.msg = msg.better_writing(studentObj.chainHtml, step2Html[0], variable);
          }

          // result.msg = msg.better_writing(studentObj.chainHtml, step2Html[0], variable);
          result.find = 'step-2';
        } else {
          result.error = errors.poly_arr_op_not_equivalents(polysEquivalents.nbrOpDiff, polysEquivalents.nbrPolyDiff);
          if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
            result.error += 
            errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
          }
          return result;
        }

      } else {

        if (checkOperations.opStd.length !== checkOperations.opProb.length) {
          result.error = errors.operations_not_equal(checkOperations.opStd.length, checkOperations.opProb.length);
          if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
            result.error += 
            errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
          }
          return result;
        }else {
          result.error = errors.operations_not_same(checkOperations.opStd, checkOperations.opProb);
          if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
            result.error += 
            errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
          }
          return result;
        }
      }

      if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
        result.error += 
        errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
      }

      return result;
     
    } // END of analyse step 2

    let analyse_step3 = () => {
      let result = {};
      result.error = '';
      result.msg = '';
      let student = studentObj.polyArrOpToCheck;
      let studentPoly = [], step3Poly = [];
      let step3 = step3Equal[0].polyArrOpToCheck;

      function findBestStep3() {
        let best = {index:0, minOpDiff: 10, minPolyDiff: 10};

        function checkOp(step3) {
          let ok = true;
          let step3Op = [], studentOp = [];
  
          step3.forEach(t => {
            if (t.op) {
              step3Op.push(t);
            } else {
              step3Poly.push(t);
            }
          });
  
          student.forEach(t => {
            if (t.op) {
              studentOp.push(t);
            } else {
              studentPoly.push(t);
            }
          });
  
          if (studentOp.length === step3Op.length) {
            step3Op.forEach((op, i) => {
              if ((op.op !== studentOp[i].op) || (op.level !== studentOp[i].level) ) ok = false;
            });
    
            studentOp.forEach((op, i) => {
              if ((op.op !== step3Op[i].op) || (op.level !== step3Op[i].level) ) ok = false;
            });
          } else {
            ok = false;
          }
          
          return {
            ok: ok,
            opStd: studentOp,
            opProb: step3Op,
          };
  
        } // END of check operations

        for (let i = 0; i < step3Equal.length; i += 1) {
          let stepAnalyse = step3Equal[i].polyArrOpToCheck;
          let checkOperations = checkOp(stepAnalyse);
          if (checkOperations.ok) {

            let polysEquivalents = isPolysArrOpEquivalents(student, stepAnalyse);
    
            // if (polysEquivalents.equal) {
              if (best.minOpDiff > polysEquivalents.nbrOpDiff ||
                  best.minPolyDiff > polysEquivalents.nbrPolyDiff) {
                  best.index = i;
                  best.minOpDiff = polysEquivalents.nbrOpDiff;
                  best.minPolyDiff = polysEquivalents.nbrPolyDiff;
              }
            // }
    
          }

        } // END of for loop

        return best;

      } // END of find the best step 3

      let best = findBestStep3();

      step3 = step3Equal[best.index].polyArrOpToCheck;

      function checkOp() {
        let ok = true;
        let step3Op = [], studentOp = [];

        step3.forEach(t => {
          if (t.op) {
            step3Op.push(t);
          } else {
            step3Poly.push(t);
          }
        });

        student.forEach(t => {
          if (t.op) {
            studentOp.push(t);
          } else {
            studentPoly.push(t);
          }
        });

        if (studentOp.length === step3Op.length) {
          step3Op.forEach((op, i) => {
            if ((op.op !== studentOp[i].op) || (op.level !== studentOp[i].level) ) ok = false;
          });
  
          studentOp.forEach((op, i) => {
            if ((op.op !== step3Op[i].op) || (op.level !== step3Op[i].level) ) ok = false;
          });
        } else {
          ok = false;
        }
        
        return {
          ok: ok,
          opStd: studentOp,
          opProb: step3Op,
        };

      }

      let checkOperations = checkOp();

      if (checkOperations.ok) {
        let polysEquivalents = isPolysArrOpEquivalents(student, step3);

        if (polysEquivalents.equal) {

          if (studentObj.finalHtml !== step3Equal[0].finalHtml && 
            studentObj.finalHtml !== step3Equal[1].finalHtml
            ) {
            result.msg = msg.not_ordered_poly(studentObj.chainHtml, step3Html[0], variable);
          } else {
            result.msg = msg.better_writing(studentObj.chainHtml, step3Html[0], variable);
          }

          // result.msg = msg.better_writing(studentObj.chainHtml, step3Html[0], variable);
          result.find = 'step-3';
        } else {
          result.error = errors.poly_arr_op_not_equivalents(polysEquivalents.nbrOpDiff, polysEquivalents.nbrPolyDiff);
          if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
            result.error += 
            errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
          }
          return result;
        }

      } else {

        if (checkOperations.opStd.length !== checkOperations.opProb.length) {
          result.error = errors.operations_not_equal(checkOperations.opStd.length, checkOperations.opProb.length);
          if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
            result.error += 
            errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
          }
          return result;
        }else {
          result.error = errors.operations_not_same(checkOperations.opStd, checkOperations.opProb);
          if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
            result.error += 
            errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
          }
          return result;
        }
      }

      if (studentObj.finalHtmlOrder !== polyObj.finalHtmlOrder) {
        result.error += 
        errors.poly_different(studentObj.finalHtmlOrder, polyObj.finalHtmlOrder);
      }

      return result;
     
    } // END of analyse step 3


    if (step === "step-1") {
      let result = analyse_step1();
      if (result.msg !== '') {
        if (o.msg === '') o.msg= result.msg;
        o.result = result;
      }
      if (result.error !== '') {
        o.error = result.error;
        return o;
      }

    } else if (step === "step-2") {
      let result = analyse_step2();
      if (result.msg !== '') {
        if (o.msg === '') o.msg= result.msg;
        o.result = result;
      }
      if (result.error !== '') {
        o.error = result.error;
        return o;
      }

    } else if (step === "step-3") {
      let result = analyse_step3();
      if (result.msg !== '') {
        if (o.msg === '') o.msg= result.msg;
        o.result = result;
      }
      if (result.error !== '') {
        o.error = result.error;
        return o;
      }
    } else {
      console.log('Not step for analysing');
    }

    return o;

  } // END of analysing student input

  function resetObject() {
    o.poly1Obj = poly1Obj;
    o.poly2Obj = poly2Obj;
    o.polyObj = polyObj;
    o.product = product;
    o.sum = sum;
    o.error = '';
    o.msg = '';
    o.result = {};
    o.step1Html = step1Html;
    o.step2Html = step2Html;
    o.step3Html = step3Html;
    o.step1Equal = step1Equal;
    o.step2Equal = step2Equal;
    o.step3Equal = step3Equal;
    o.step_1_done = step_1_done;
    o.step_2_done = step_2_done;
    o.step_3_done = step_3_done;
    o.steps_AllDone = steps_AllDone;
  }

  o.genProb = genProb;
  o.analyseStudentInput = analyseStudentInput;

  return o;

} // END of Prov function

export {ProbFnc};