function blink_plus_minus(chars) {
  return `<span class='blinking_plus_minus'> ${chars} </span>`;
}

const MessagesFr = {
  first: function() {
    let msg = [], msgNbr = 0;
    msg.push(`Un message`);
    msg.push(`Deuxième message<br>`);
    msgNbr = Math.floor(Math.random() * msg.length);
    return msg[msgNbr];
  },
  good: function() {
    let msg = [], msgNbr = 0;
    msg.push(`Good Job!`);
    msgNbr = Math.floor(Math.random() * msg.length);
    return msg[msgNbr];
  },
  sign_repeated: function() {
    let msg = [], msgNbr = 0;
    msg.push(`Des signes consécutifs ont été rencontrés.<br>Essaie de les réduire.<br>
        ${blink_plus_minus('+ +')} et ${blink_plus_minus('- -')} peuvent être remplacés par ${blink_plus_minus('+')}<br>
        ${blink_plus_minus('+ -')} et ${blink_plus_minus('- +')} peuvent être remplacés par ${blink_plus_minus('-')}<br>
    `);
    msg.push(`Tu peux réduire les signes consécutifs.<br>
        ${blink_plus_minus('+ +')} et ${blink_plus_minus('- -')} sont équivalents à ${blink_plus_minus('+')}<br>
        ${blink_plus_minus('+ -')} et ${blink_plus_minus('- +')} sont équivalents à ${blink_plus_minus('-')}<br>
    `);
    msg.push(`Les signes consécutifs peuvent être réduits.<br>
        ${blink_plus_minus('+ +')} et ${blink_plus_minus('- -')} se réduisent à ${blink_plus_minus('+')}<br>
        ${blink_plus_minus('+ -')} et ${blink_plus_minus('- +')} se réduisent à ${blink_plus_minus('-')}<br>
    `);
    msg.push(`Il est préférable de réduire les signes consécutifs en un seul.<br>
        ${blink_plus_minus('+ +')} et ${blink_plus_minus('- -')} se remplacent par ${blink_plus_minus('+')}<br>
        ${blink_plus_minus('+ -')} et ${blink_plus_minus('- +')} se remplacent par ${blink_plus_minus('-')}<br>
    `);
    msg.push(`On peux éliminer les signes répétitifs.<br>
        ${blink_plus_minus('+ +')} &#x2227 ${blink_plus_minus('- -')} = ${blink_plus_minus('+')}<br>
        ${blink_plus_minus('+ -')} &#x2227 ${blink_plus_minus('- +')} = ${blink_plus_minus('-')}<br>
    `);
    msgNbr = Math.floor(Math.random() * msg.length);
    return msg[msgNbr];
  },
  signs_positives: function(probHtml) {
    let msg = [], msgNbr = 0;
    msg.push(`Ta réponse est acceptable mais on peut améliorer l'écriture.<br>
      On essaie d'écrire nos polynômes avec le plus grand nombre de coefficients positifs.<br>
      Comme exemple : ${probHtml} .<br>
    `);
    msgNbr = Math.floor(Math.random() * msg.length);
    return msg[msgNbr];
  },
  success: function(nbrProbGood, nbrProbBad) {
    let msg = [], msgNbr = 0;
    msg.push(`Un autre de réussit, maintenant au suivant ...<br>`);
    msg.push(`Bravo ! Prêt pour attaquer le prochain ?<br>`);
    msg.push(`Excellent, tu es sur la bonne voie ...<br>`);
    msg.push(`Un autre défi t'attend, lâche pas.<br>`);
    msg.push(`Très bien, l'amélioration demande de la patience ...<br>`);
    msg.push(`Avec le temps, cette décomposition deviendra facile à réaliser.<br>`);
    msgNbr = Math.floor(Math.random() * msg.length);
    return msg[msgNbr];
  },
  not_ordered_poly: function(polyStudent, goodPoly, variable) {
    let msg = [], msgNbr = 0;
    msg.push(`Ton polynôme est acceptable.<br> 
      Tu devrais l'écrire en puissance décroissante de ${variable}. 
      Tu l'as écrit ${polyStudent},
      mais c'est plus joli  mathématiquement de l'écrire ${goodPoly}.<br>`);
    msg.push(`Ta décomposition est valide.<br>
      ${goodPoly} est la même mais en ordre décoissant de la puissance de ${variable}.<br>
      En math, on aime mieux ça que ${polyStudent}.<br>`);
    msg.push(`Ta décomposition est bonne.<br>
      Si tu l'écrivais ${goodPoly}, la prochaine étape serait plus facile.<br>`);
    msg.push(`Ta réponse est bonne.<br> 
      Mathématiquement, on préfère l'écrire ${goodPoly},<br>
      en ordre décroissant des exposants de la variable ${variable}.<br>`);
    msg.push(`En passant,<br> 
      si tu écris le polynôme comme ${goodPoly},<br>
      ce sera plus facile pour la prochaine étape.<br>`);
    msgNbr = Math.floor(Math.random() * msg.length);
    return msg[msgNbr];
  },
  better_writing: function(polyStudent, goodPoly, variable) {
    let msg = [], msgNbr = 0;
    msg.push(`Ton polynôme est acceptable.<br>
      Tu l'as écrit ${polyStudent},<br> 
      mais une écriture plus élégante "mathématiquement" serait ${goodPoly}.<br>`);
    msg.push(`Ta décomposition est bonne.<br>
      On peut aussi l'écrire ${goodPoly},<br>
      cette écriture est préférable à ${polyStudent}.<br>`);
    msg.push(`Ton polynôme est bon.<br>
      Mathématiquement, ${goodPoly} est une écriture plus jolie,<br>
      mais la tienne ${polyStudent} ne contient pas d'erreur.<br>`);
    msgNbr = Math.floor(Math.random() * msg.length);
    return msg[msgNbr];
  },

  prefered_exponent: function(chainHtml) {
    let msg = [], msgNbr = 0;

    msg.push(`On utilise l'exposant pour une réponse plus courte comme ${chainHtml}.`);
    msg.push(`Que penses-tu si on l'écrivait ${chainHtml} ?`);
    msg.push(`${chainHtml} est une écriture plus adéquate.`);
    msg.push(`${chainHtml} est une écriture plus courte.`);
    msg.push(`Sous la forme ${chainHtml}, c'est plus réduit.`);
    msg.push(`Essaie d'utiliser l'écriture exponentielle comme ${chainHtml}.`);

    msgNbr = Math.floor(Math.random() * msg.length);
    return msg[msgNbr];
  },

}

export default MessagesFr;