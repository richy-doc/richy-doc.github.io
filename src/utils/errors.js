function blink(chars) {
  return `<span class='blinking'> ${chars} </span>`;
}

const ErrorsFr = {
  empty_term: function() {
    let error = [], errorNbr = 0;
    error.push(`Il y a un terme manquant dans ton énoncé.<br>Je ne peux pas continuer l'analyse.<br>`);
    error.push(`Un terme est invalide dans ton énoncé, corrige le!<br>`);
    error.push(`Il y a un terme que je ne peux déchiffrer!<br>`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  error_exponent: function(expo) {
    let error = [], errorNbr = 0;
    error.push(`Je ne peux transformer l'exposant ${blink(expo)} en entier.<br>`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  empty_char: function() {
    let error = [], errorNbr = 0;
    error.push(`Un terme doit contenir au moins un caractère.<br>`);
    error.push(`Un terme doit être défini.<br>`);
    error.push(`Un terme est manquant dans ton énoncé.<br>`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  end: function() {
    let error = [], errorNbr = 0;
    error.push("Il faut corriger cette(ces) erreur(s) avant de poursuivre.");
    error.push("Cette erreur doit être corrigée avant de continuer.");
    error.push("Corrige le terme et je pourrai en faire l'analyse.");
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  empty_div: function(step) {
    let error = [], errorNbr = 0;
    error.push(`Vous devez entrer une réponse dans ${step} pour fin d'analyse.`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  para_error: function(open, close, i) {
    let error = [], errorNbr = 0;
    error.push(`Il y a ${open} ${blink('(')} et ${close} ${blink(')')} à cet endroit.<br>
      Regarde vers le ${i+1}<sup>ième</sup> caractère.<br>`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr]; 
  },
  para_open_error: function(nbr) {
    let error = [], errorNbr = 0;
    error.push(`Il te manque ${nbr} ${blink('(')}`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr] ;
  },
  para_close_error: function(nbr) {
    let error = [], errorNbr = 0;
    error.push(`Il te manque ${nbr} ${blink(')')}`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  poly_different: function(poly, polyProb) {
    let error = [], errorNbr = 0;
    error.push(`Ton polynôme est équivalent à <br> ${poly}.<br>
    Il n'est pas semblable à celui que l'on cherche à décomposer.`);
    error.push(`Ton polynôme réduit est <br> ${poly},<br>
      il n'est pas égal à celui du départ.`);
    error.push(`Si tu effectues les opérations sur ton entrée, <br>
      tu obtiendras le polynôme suivant: <br> ${poly}.<br>
      Il ne correspond pas à celui du départ.`);
    error.push(`Est-ce que ton polynôme réduit <br> ${poly},<br>
      est le même que ${polyProb} ?`);
    error.push(`Nous cherchons à décomposer ${polyProb} ,<br>
      et le tiens vaut <br> ${poly} !!!`);
      error.push(`Est-ce que ton polynôme <br> ${poly}<br>égal ${polyProb} ?`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  nbr_terms: function(nbrStudent, nbrDesired) {
    let error = [], errorNbr = 0;
    error.push(`Nous cherchons un polynône de ${nbrDesired} termes et le tien en a ${nbrStudent}.`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  char_not_allowed: function(char, index) {
    let error = [], errorNbr = 0;
    let idx = index === 0 ? ' premier ':`${index+1}<sup>ième</sup>`;
    error.push(`Un caractère non permis a été trouvé.<br> 
    ${blink(char)} vers le ${idx} caractère.<br>`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  not_found_step123html: function() {
    let error = [], errorNbr = 0;
    error.push(`Cette entrée ne correspond à aucune réponse acceptable.`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  produc_ok_sum_not: function(coeff1, coeff2) {
    let error = [], errorNbr = 0;
    error.push(`Tu sembles avoir les bons facteurs ${blink(coeff1)} et ${blink(coeff2)}. <br>
    Mais est-ce que la somme est bien celle que l'on recherche?<br>`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  sum_ok_product_not: function(coeff1, coeff2) {
    let error = [], errorNbr = 0;
    error.push(`La somme de ${blink(coeff1)} et de ${blink(coeff2)} est bien ${blink(coeff1+coeff2)}. <br>
    Mais est-ce que ton produit est bien celui que l'on recherche?<br>`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  sum_not_product_not: function(coeff1, coeff2) {
    let error = [], errorNbr = 0;
    error.push(`La somme de ${blink(coeff1)} et de ${blink(coeff2)} est ${blink(coeff1+coeff2)}. <br>
    Le produit de ${blink(coeff1)} et de ${blink(coeff2)} est ${blink(coeff1*coeff2)}. <br>
    Est-ce bien les critères désirés?`);
    error.push(`${blink(coeff1)} + ${blink(coeff2)} = ${blink(coeff1+coeff2)}. <br>
    ${blink(coeff1)} * ${blink(coeff2)} = ${blink(coeff1*coeff2)}. <br>
    Est-ce bien ce que l'on cherche?`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  sum_ok_product_ok_response_not: function(coeff1, coeff2, prodStudent) {
    let error = [], errorNbr = 0;
    error.push(`Les facteurs ${blink(coeff1)} et ${blink(coeff2)} remplissent les conditions.<br>
    Mais tu as inscrit un produit de ${prodStudent} ?<br>`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  operations_not_equal: function(opStd, opProb) {
    let error = [], errorNbr = 0;
    let opSdt = opStd <=1 ? `${blink(opStd)} opération ` : `${blink(opStd)} opérations `;
    error.push(`Ton énoncé contient ${opSdt} et la réponse attendue en contient ${blink(opProb)}.<br>`);
    error.push(`Tu as ${opSdt} et la décomposition en a ${blink(opProb)}.<br>`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  operations_not_same: function(opStdArr, opProbArr) {
    let error = [], errorNbr = 0, m1 = '', m2 = '';
    // let opSdt = opStd <=1 ? `${blink(opStd)} opération ` : `${blink(opStd)} opérations `;
    let opstudent = '', opprob = '';
    opStdArr.forEach(op => {
      opstudent += op.op+' ';
    });
    opProbArr.forEach(op => {
      opprob += op.op+' ';
    })

    if (opStdArr.length >1) {
      m1 = "Tes opérations sont ";
    } else {
      m1 = "Ton opération est ";
    }

    if (opProbArr.length >1) {
      m2 = "les opérations attendues sont ";
    } else {
      m2 = "l'opération attendue est ";
    }

    error.push(`${m1}${blink(opstudent)} et ${m2}${blink(opprob)}.<br>`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  nbr_terms_X1_not_equal: function(nbrTerm, desiredNbr, termTest) {
    let error = [], errorNbr = 0;
    let desired = desiredNbr <=1 ? `${desiredNbr} terme ` : `${desiredNbr} termes `;
    let nbr = nbrTerm <=1 ? `${nbrTerm} terme ` : `${nbrTerm} termes `;
    let term = '';
    termTest.varArr.forEach(t => {
      if (t.exponent === 1) {
        term += t.variable;
      } else if (t.exponent > 1) {
        term += t.variable + '<sup>' + t.exponent + '</sup>';
      }
    })

    error.push(`Tu as ${nbr} en ${term} et nous en voulons ${desiredNbr}.<br>`);
    error.push(`Tu as ${nbr} en ${term}. Pour avoir un produit et une somme, il en faut ${desiredNbr}.<br>`);

    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  nbr_terms_X2_not_equal: function(nbrTerm, desiredNbr, termTest) {
    let error = [], errorNbr = 0;
    let desired = desiredNbr <=1 ? `${desiredNbr} terme ` : `${desiredNbr} termes `;
    let nbr = nbrTerm <=1 ? `${nbrTerm} terme ` : `${nbrTerm} termes `;
    let term = '';
    termTest.varArr.forEach(t => {
      if (t.exponent === 1) {
        term += t.variable;
      } else if (t.exponent > 1) {
        term += t.variable + '<sup>' + t.exponent + '</sup>';
      }
    })
    error.push(`Tu as ${nbr} en ${term} et nous en cherchons ${desiredNbr}.<br>`);
    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },
  poly_arr_op_not_equivalents: function(opDiff, polyDiff) {

    console.log('Operations diff=',opDiff)
    console.log('Poly diff=',polyDiff)
   
    let error = [], errorNbr = 0, txtOp = '', txtPoly = '', txtHeader = '', txtHeader1 = '';
    if (opDiff !== 0) {
      txtHeader += `Il ya un problème avec tes opérations.<br>`;
      txtHeader1 += `Les opérations ne concordent pas.<br>`;

      txtOp = `Il y a au moins une opération non conforme.<br>`;


      // if (opDiff === 1) {
      //   txtOp = `Il y a ${opDiff} opération non conforme.<br>`;
      // } else {
      //   txtOp = `Il y a ${opDiff} opérations non conformes.<br>`;
      // }
    }

    if (polyDiff !== 0) {
      if (txtHeader === '') {
        txtHeader = `Il y a un problème avec tes polynômes.<br>`;
        txtHeader1 += `Les polynômes ne concordent pas.<br>`;
      } else {
        txtHeader += ` et avec tes polynômes.<br>`;
      }
      if (polyDiff === 1) {
        txtPoly = `Il y a ${polyDiff} polynôme non conforme.<br>`;
      } else {
        txtPoly = `Il y a ${polyDiff} polynômes non conformes.<br>`;
      }
    } else {
      txtHeader += `.<br>`;
    }

    error.push(`${txtHeader}
      ${txtOp !== '' ? txtOp:''}${txtPoly !== '' ? txtPoly:''}
    
    `);
    error.push(`${txtHeader1}
      ${txtOp !== '' ? txtOp:''}${txtPoly !== '' ? txtPoly:''}
    
    `);

    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },

  specialCases: function(polyLength, expo) {
    let error = [], errorNbr = 0, txtOp = '', txtPoly = '', txtHeader = '';

    if (polyLength === 1) {
      txtPoly = "Un monôme ";
    } else if (polyLength === 2) {
      txtPoly = "Un binôme ";
    } else if (polyLength === 3) {
      txtPoly = "Un trinôme ";
    } else {
      txtPoly = `Un polynôme de ${polyLength} termes `;
    }
    
    error.push(`${txtPoly}avec un exposant de ${expo} n'est pas supporté dans cette version de l'application.<br>
    Réduit l'exposant avant de continuer.
    `);
    error.push(`La limite de calcul de l'application est dépassée.<br>
    Un exposant de ${expo} avec une base polynômiale de ${polyLength} termes sera peut-être disponible dans la prochaine version.<br>
    Réduit l'exposant avant de continuer.
    `);

    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  },

  entryTooBig: function() {
    let error = [], errorNbr = 0;
    
    error.push(`Votre entrée dépasse 200 caractères.<br>
    Cette application ne considère pas cette entrée.<br>
    Reduisez votre réponse!
    `);
    error.push(`Les problèmes dans cette application ne sont pas conçus pour dépasser 200 caractères et ton entrée dépasse ce nombre.<br>
    Réduit ton entrée.
    `);

    errorNbr = Math.floor(Math.random() * error.length);
    return error[errorNbr];
  }
};

export default ErrorsFr;