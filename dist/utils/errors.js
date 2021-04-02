function blink(e){return`<span class='blinking'> ${e} </span>`}const ErrorsFr={empty_term:function(){let e=[],n=0;return e.push("Il y a un terme manquant dans ton énoncé.<br>Je ne peux pas continuer l'analyse.<br>"),e.push("Un terme est invalide dans ton énoncé, corrige le!<br>"),e.push("Il y a un terme que je ne peux déchiffrer!<br>"),n=Math.floor(Math.random()*e.length),e[n]},error_exponent:function(e){let n=[],t=0;return n.push(`Je ne peux transformer l'exposant ${blink(e)} en entier.<br>`),t=Math.floor(Math.random()*n.length),n[t]},empty_char:function(){let e=[],n=0;return e.push("Un terme doit contenir au moins un caractère.<br>"),e.push("Un terme doit être défini.<br>"),e.push("Un terme est manquant dans ton énoncé.<br>"),n=Math.floor(Math.random()*e.length),e[n]},end:function(){let e=[],n=0;return e.push("Il faut corriger cette(ces) erreur(s) avant de poursuivre."),e.push("Cette erreur doit être corrigée avant de continuer."),e.push("Corrige le terme et je pourrai en faire l'analyse."),n=Math.floor(Math.random()*e.length),e[n]},empty_div:function(e){let n=[],t=0;return n.push(`Vous devez entrer une réponse dans ${e} pour fin d'analyse.`),t=Math.floor(Math.random()*n.length),n[t]},para_error:function(e,n,t){let r=[],o=0;return r.push(`Il y a ${e} ${blink("(")} et ${n} ${blink(")")} à cet endroit.<br>\n      Regarde vers le ${t+1}<sup>ième</sup> caractère.<br>`),o=Math.floor(Math.random()*r.length),r[o]},para_open_error:function(e){let n=[],t=0;return n.push(`Il te manque ${e} ${blink("(")}`),t=Math.floor(Math.random()*n.length),n[t]},para_close_error:function(e){let n=[],t=0;return n.push(`Il te manque ${e} ${blink(")")}`),t=Math.floor(Math.random()*n.length),n[t]},poly_different:function(e,n){let t=[],r=0;return t.push(`Ton polynôme est équivalent à <br> ${e}.<br>\n    Il n'est pas semblable à celui que l'on cherche à décomposer.`),t.push(`Ton polynôme réduit est <br> ${e},<br>\n      il n'est pas égal à celui du départ.`),t.push(`Si tu effectues les opérations sur ton entrée, <br>\n      tu obtiendras le polynôme suivant: <br> ${e}.<br>\n      Il ne correspond pas à celui du départ.`),t.push(`Est-ce que ton polynôme réduit <br> ${e},<br>\n      est le même que ${n} ?`),t.push(`Nous cherchons à décomposer ${n} ,<br>\n      et le tiens vaut <br> ${e} !!!`),t.push(`Est-ce que ton polynôme <br> ${e}<br>égal ${n} ?`),r=Math.floor(Math.random()*t.length),t[r]},nbr_terms:function(e,n){let t=[],r=0;return t.push(`Nous cherchons un polynône de ${n} termes et le tien en a ${e}.`),r=Math.floor(Math.random()*t.length),t[r]},char_not_allowed:function(e,n){let t=[],r=0,o=0===n?" premier ":`${n+1}<sup>ième</sup>`;return t.push(`Un caractère non permis a été trouvé.<br> \n    ${blink(e)} vers le ${o} caractère.<br>`),r=Math.floor(Math.random()*t.length),t[r]},not_found_step123html:function(){let e=[],n=0;return e.push("Cette entrée ne correspond à aucune réponse acceptable."),n=Math.floor(Math.random()*e.length),e[n]},produc_ok_sum_not:function(e,n){let t=[],r=0;return t.push(`Tu sembles avoir les bons facteurs ${blink(e)} et ${blink(n)}. <br>\n    Mais est-ce que la somme est bien celle que l'on recherche?<br>`),r=Math.floor(Math.random()*t.length),t[r]},sum_ok_product_not:function(e,n){let t=[],r=0;return t.push(`La somme de ${blink(e)} et de ${blink(n)} est bien ${blink(e+n)}. <br>\n    Mais est-ce que ton produit est bien celui que l'on recherche?<br>`),r=Math.floor(Math.random()*t.length),t[r]},sum_not_product_not:function(e,n){let t=[],r=0;return t.push(`La somme de ${blink(e)} et de ${blink(n)} est ${blink(e+n)}. <br>\n    Le produit de ${blink(e)} et de ${blink(n)} est ${blink(e*n)}. <br>\n    Est-ce bien les critères désirés?`),t.push(`${blink(e)} + ${blink(n)} = ${blink(e+n)}. <br>\n    ${blink(e)} * ${blink(n)} = ${blink(e*n)}. <br>\n    Est-ce bien ce que l'on cherche?`),r=Math.floor(Math.random()*t.length),t[r]},sum_ok_product_ok_response_not:function(e,n,t){let r=[],o=0;return r.push(`Les facteurs ${blink(e)} et ${blink(n)} remplissent les conditions.<br>\n    Mais tu as inscrit un produit de ${t} ?<br>`),o=Math.floor(Math.random()*r.length),r[o]},operations_not_equal:function(e,n){let t=[],r=0,o=e<=1?`${blink(e)} opération `:`${blink(e)} opérations `;return t.push(`Ton énoncé contient ${o} et la réponse attendue en contient ${blink(n)}.<br>`),t.push(`Tu as ${o} et la décomposition en a ${blink(n)}.<br>`),r=Math.floor(Math.random()*t.length),t[r]},operations_not_same:function(e,n){let t=[],r=0,o="",a="",s="",l="";return e.forEach((e=>{s+=e.op+" "})),n.forEach((e=>{l+=e.op+" "})),o=e.length>1?"Tes opérations sont ":"Ton opération est ",a=n.length>1?"les opérations attendues sont ":"l'opération attendue est ",t.push(`${o}${blink(s)} et ${a}${blink(l)}.<br>`),r=Math.floor(Math.random()*t.length),t[r]},nbr_terms_X1_not_equal:function(e,n,t){let r=[],o=0,a=e<=1?`${e} terme `:`${e} termes `,s="";return t.varArr.forEach((e=>{1===e.exponent?s+=e.variable:e.exponent>1&&(s+=e.variable+"<sup>"+e.exponent+"</sup>")})),r.push(`Tu as ${a} en ${s} et nous en voulons ${n}.<br>`),r.push(`Tu as ${a} en ${s}. Pour avoir un produit et une somme, il en faut ${n}.<br>`),o=Math.floor(Math.random()*r.length),r[o]},nbr_terms_X2_not_equal:function(e,n,t){let r=[],o=0,a=e<=1?`${e} terme `:`${e} termes `,s="";return t.varArr.forEach((e=>{1===e.exponent?s+=e.variable:e.exponent>1&&(s+=e.variable+"<sup>"+e.exponent+"</sup>")})),r.push(`Tu as ${a} en ${s} et nous en cherchons ${n}.<br>`),o=Math.floor(Math.random()*r.length),r[o]},poly_arr_op_not_equivalents:function(e,n){console.log("Operations diff=",e),console.log("Poly diff=",n);let t=[],r=0,o="",a="",s="",l="";return 0!==e&&(s+="Il ya un problème avec tes opérations.<br>",l+="Les opérations ne concordent pas.<br>",o="Il y a au moins une opération non conforme.<br>"),0!==n?(""===s?(s="Il y a un problème avec tes polynômes.<br>",l+="Les polynômes ne concordent pas.<br>"):s+=" et avec tes polynômes.<br>",a=1===n?`Il y a ${n} polynôme non conforme.<br>`:`Il y a ${n} polynômes non conformes.<br>`):s+=".<br>",t.push(`${s}\n      ${""!==o?o:""}${""!==a?a:""}\n    \n    `),t.push(`${l}\n      ${""!==o?o:""}${""!==a?a:""}\n    \n    `),r=Math.floor(Math.random()*t.length),t[r]},specialCases:function(e,n){let t=[],r=0,o="";return o=1===e?"Un monôme ":2===e?"Un binôme ":3===e?"Un trinôme ":`Un polynôme de ${e} termes `,t.push(`${o}avec un exposant de ${n} n'est pas supporté dans cette version de l'application.<br>\n    Réduit l'exposant avant de continuer.\n    `),t.push(`La limite de calcul de l'application est dépassée.<br>\n    Un exposant de ${n} avec une base polynômiale de ${e} termes sera peut-être disponible dans la prochaine version.<br>\n    Réduit l'exposant avant de continuer.\n    `),r=Math.floor(Math.random()*t.length),t[r]},entryTooBig:function(){let e=[],n=0;return e.push("Votre entrée dépasse 200 caractères.<br>\n    Cette application ne considère pas cette entrée.<br>\n    Reduisez votre réponse!\n    "),e.push("Les problèmes dans cette application ne sont pas conçus pour dépasser 200 caractères et ton entrée dépasse ce nombre.<br>\n    Réduit ton entrée.\n    "),n=Math.floor(Math.random()*e.length),e[n]}};export default ErrorsFr;