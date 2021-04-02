findImgTag = str => {

  let regexpImg = /<\s*img[^>]*>/ig;
  let regexpAlt = /alt\s*=\s*("|')(.*?)(\1)/ig;
  let regexpSrc = /src\s*=\s*("|')(.*?)(\1)/ig;

  let array = [...str.matchAll(regexpImg)];

  let alt = [], src = [], mustHaveLink=false, link = "", variant="success", messages = [], tmpAlt=null, tmpSrc=null, index = 0;

  if(array.length){

      array.map( arr =>{

          let checkAlt = [...arr[0].matchAll(regexpAlt)];
          let checkSrc = [...arr[0].matchAll(regexpSrc)];
          tmpAlt = tmpSrc = null;

          if(checkAlt[0] == undefined){
              tmpAlt = "no_alt";
          } else {
              tmpAlt = checkAlt[0][0].replace(/\s+/ig,'');
          }

          if(checkSrc[0] == undefined){
              tmpSrc = "no_src";
          } else {
              tmpSrc = checkSrc[0][2];
          }

          if(tmpAlt == 'alt=""' || tmpAlt == "alt=''") {
              alt[index] = checkAlt[0][0];
              src[index] = tmpSrc;
              messages[index] = 'L\'attribut "alt" est nul pour les images suivantes.';
              mustHaveLink = true;
              variant = "danger";
              index++; 
          } else if(tmpAlt == "no_alt" && tmpSrc !=  "no_src"){
              alt[index] = "no_alt";
              src[index] = tmpSrc;
              messages[index] = 'L\'attribut "alt" n\'est pas défini pour les images suivantes.';
              mustHaveLink = true;
              variant = "danger";
              index++;
          };           
      });

  } else {
      alt[index] = "Aucun attribut alt dans cette page.";
      src[index] = "Aucune image dans cette page.";
      messages[index] = 'Aucune image dans cette activité.';
  }

  if(array.length && alt.length == 0 ){
      alt[index] = 'Toutes les images ont un attribut "alt" conforme.';
      src[index] = 'Toutes les images ont un attribut "alt" conforme.';
      messages[index] = 'Toutes les images ont un attribut "alt" conforme.';
  }

  mustHaveLink ? link = location.origin+"/course/modedit.php?update="+this.state.data.cmId+"&return=1" : link = null ;
  
  return {alt, src, link, variant, messages} ;
}