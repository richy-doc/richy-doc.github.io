const LanguageFr = {
  menu: function() {
    const menu = {};
    menu.menu0 = "Informations";
    menu.menu1 = "Au sujet de ...";
    return menu;
  },
  page: function() {
    const page = {};
    page.title = "Décomposition de polynômes";
    page.form = "Forme";
    page.decompose = "Décompose";
    page.step1 = "Étape 1";
    page.step2 = "Étape 2";
    page.step3 = "Étape 3";
    page.button = "Problème suivant";
    
    return page;
  },
  pagegame: function() {
    const page = {};
    page.title = "Décomposition de polynômes";
    page.form = "Forme";
    page.decompose = "Décompose";
    page.chrono = "Chrono";
    page.step1 = "Étape 1";
    page.step2 = "Étape 2";
    page.step3 = "Étape 3";
    page.button1 = "Commencer";
    page.button1_1 = "Recommencer";
    page.button2 = "Correction";
    page.button2_1 = "Montrer à nouveau";
    page.gameStep = "Réponse";
    page.caption = "Correction des problèmes et calcul des points ";
    page.caption_01 = "Première option. ";
    page.caption_02 = "Deuxième option. ";
    page.caption_03 = "Troisième option. ";
    page.caption_04 = "Quatrième option. ";
    page.colsHeader = ["Problème", "Solutions possibles", "Entrée de l'apprenant", "Pointage"];
    page.cellFooter1 = function(good){
      if (good > 1) {
        return "Bonnes réponses = ";
      }
      return "Bonne réponse = ";
    } ;
    page.cellFooter1_1 = function(bad){
      if (bad > 1) {
        return "Mauvaises réponses = ";
      }
      return "Mauvaise réponse = ";
    };
    page.cellFooter2 = "Grand total = ";
    page.tries = "Essai no.";
    page.resumeHeaderTitle = "Correction et calcul du pointage.";
    page.clickToClose = "Note: cliquer dans la fenêtre pour la fermer.";
    page.optionsOneSelection = "Vous devez choisir une et une seule option.";
    page.time = "Temps écoulé: ";
    page.time_number = "Nombre de tentatives ";
    page.number = "No. ";
    page.numberProbTries = "Nombre de problèmes essayés ";
    page.option_1_resume = "En deux minutes, le nombre de tentatives est éqal à ";
    page.option_2_resume = "En cinq minutes, le nombre de tentatives est éqal à ";
    page.minute = function minute(m) {
      let minute = parseInt(m);
      if (minute <= 1) return " minute ";
      else return " minutes ";

      }
    page.second = function(s) {
      let second = parseInt(s);
      if (second <= 1) return " seconde";
      else return " secondes";
    }
    return page;
  },
  info: function() {
    const info = {};
    info.close = "Note: cliquer dans la fenêtre pour la fermer.";
    info.div0 = "Informations générales.";

    info.div1 = 'Les lettres "o" et "l" ont été enlevées de la liste des variables car elles se confondent avec les chiffres 0 et 1 dans plusieurs polices de caractères. Donc, il y a 24 possibilités pour les varialbles dans le menu x&#x220A{a,...,z}\\{o,l}.';

    info.div2 = `Tous les paramètres &#x220A&#x2124 même si la notation par intervalle a été utilisée. C'est pour simplifier le menu. Comme exemple:<br>
    <div class="center">
    <span class="red-text"> |b<sub>i</sub>|&#x220A[1, 10]</span> signifie que <span class="red-text"> b<sub>i</sub>&#x220A{-10, -9, -8, ..., 8, 9, 10}\\{0}</span>
    </div>
    `;
    
    info.div3 = `En date du ...., les navigateurs compatibles de cette application web sont;<br><br>
    <ol>
      <li>and_chr 88, and_ff 86, and_qq 10.4, and_uc 12.12, android 81</li>
      <li>chrome 89, chrome 88, chrome 87</li>
      <li>baidu 7.12</li>
      <li>edge 89, edge 88, ie 11</li>
      <li>firefox 86, firefox 85, firefox 78</li>
      <li>ios_saf 14.0-14.4, ios_saf 13.4-13.7</li>
      <li>kaios 2.5</li>
      <li>op_mini all, op_mob 62, opera 73, opera 72</li>
      <li>safari 14, safari 13.1</li>
      <li>samsung 13.0, samsung 12.0</li>
    </ol>
    `;
    info.div4 = `
      Vous devez décomposer le trinôme (parfois binôme) en facteurs. Trois étapes sont nécessaires afin de pouvoir trouver les deux binômes.
      <ul>
        <li>Première étape : <li>Elle consiste à trouver deux facteurs tels que le produit</li>
        </li
      </ul>
      ` ;
    
    return info;
  },
  infogame: function() {
    const info = {};
    info.close = "Note: cliquer dans la fenêtre pour la fermer.";
    info.div0 = "Option 1 = faire le plus grand nombres de bonnes décompositions en 2 mins.";
    info.div1 = "Option 2 = faire le plus grand nombres de bonnes décompositions en 5 mins.";
    info.div2 = "Options 3 = faire le plus grand nombre de bonnes décompositions dans le temps le plus court posssible.";
    info.div3 = 'Option 4 = faire le plus grand nombre de bonnes décompositions sans limite de temps.';

    // info.div3 = "div3 informations";

    return info;
  },

};

const LanguageUs = {
  menu: function() {
    const menu = {};
    menu.menu0 = "Informations";
    menu.menu1 = "About";
    return menu;
  },
  page: function() {
    const page = {};
    page.title = "Polynômes decomposition";
    page.form = "Form :";
    page.decompose = "Factorize :";
    page.step1 = "Step 1 :";
    page.step2 = "Step 2 :";
    page.step3 = "Step 3 :";
    page.button = "Next";
    return page;
  },
  info: function() {
    const info = {};
    info.close = "Close";
    info.p0 = "Informations for Web App.";
    info.p1 = "All parameters &#x220A&#x2124.";
    info.p2 = "Other tests for paragaraphs.";

    return info;
  },

};

const Language = {};
Language.LanguageFr = LanguageFr;
Language.LanguageUs = LanguageUs;

export {Language};