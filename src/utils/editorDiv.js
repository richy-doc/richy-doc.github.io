
const EditorDivFnc = props => {
  // let editor = {};
  let div_1 = document.createElement('div');
  // editor.div = div_1;
  // editor.htmlForm = '';
  div_1.id = "parent";
  div_1.contentEditable = true;
  div_1.spellcheck = false;
  // let div_1.style.opacity = "0.5";
  // let div_1.style.visibility = 'hidden';
  let modeSup = false;
  let modeSupToggle = false;
  let modeSupArr = [];
  let addOne = false;
  let finalHtml = '';
  

  div_1.addEventListener('keydown', onKeydown);
  div_1.addEventListener('keyup', onKeyup);

  // let utils = new TermUtils();
  let specialChar =['⁰','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹'];
  let specialSet = new Set(specialChar);

  let autoComplete = props.auto === undefined ? true : props.auto;

  let charEmpty = '&';
  // let charEmpty = '\u200B';

  function displayDiv(e) {

    // console.log('Text content = ', this.div_1.textContent)
  
    let pos = getCaretIndex();
    // let pos = this.getCurrentCursorPosition(this.div_1.id);
  
    let txtArr = div_1.textContent.split('');
    
    let isDigit = d => {
      return /\d/.test(d);
    }
    let isSign = s => {
      return /[-+\(\)*]/.test(s);
    }
    let isLetter = l => {
      return /[A-Za-z]/.test(l);
    }
  
    let expo = '';
  
    let  buildHtml = () => {
      let modeSup2 = false;
      let tmp = '';
      let preHtml = '';
      let tmpHtml = '';
      let html2 = '';
      txtArr.forEach((key, i) => {
        if (specialSet.has(key)) {
          key = specialChar.findIndex(k => k === key);
        }
        if (isDigit(key) && txtArr[i-1] && (isLetter(txtArr[i-1]) || txtArr[i-1] === ")")) {
          modeSup2 = true;
          preHtml = html2;
        }
        if (isSign(key) || (isLetter(key) && txtArr[i-1] && isDigit(txtArr[i-1]) ) ) {
          if (modeSup2) {
            modeSup2 = false;
            html2 = preHtml + tmpHtml;
            preHtml = '';
          }
        }    
        if (modeSup2) {
          expo += key;
          // index += 1;
          tmpHtml = '<sup>'+expo+'</sup>';
          tmp = preHtml + tmpHtml;
        }else {
          html2 += key;
          // index += 1;
          expo = '';
          tmp = '';
        } 
      });
  
      if (tmp !== '') {
        html2 = tmp;
        tmp = '';
        expo = '';
      }
      return html2;
    };
  
    
    finalHtml =  buildHtml(); 
  
    div_1.innerHTML = finalHtml;

    // editor.htmlForm = final;
  
    // console.log('final html =', final)
    setCurrentCursorPosition(pos);

    // return finalHtml;
  
  } // END of display div

  function getHtmlForm() {
    return finalHtml;
  }
  
  function displayDivModeSup(e) {
  
    console.log('Text content = ', div_1.textContent)
  
    let pos = getCaretIndex();
    // let pos = this.getCurrentCursorPosition(this.div_1.id);
  
    console.log('position inside V2 = ', pos)
    let txt = div_1.textContent;
  
    // if (txt.indexOf('e') !== -1) {
    //   txt = this.div_1.textContent.replace(/e/ig,'');
    //   pos = pos - 1;
    // }
  
    
  
    let txtArr = txt.split('');
    
    let isDigit = d => {
      return /\d/.test(d);
    }
    let isSign = s => {
      return /[-+]/.test(s);
    }
    let isLetter = l => {
      return /[A-Za-z]/.test(l);
    }
  
    let expo = '';
  
    let sup = modeSupArr;
  
    let  buildHtml = () => {
      let modeSup2 = false;
      let tmp = '';
      let preHtml = '';
      let tmpHtml = '';
      let html2 = '';
      let html = '';
      let step = 1;
  
      for (let i = 0; i < txt.length; i+= step) {
        let found = sup.findIndex(e => e.start === i);
        if (found !== -1) {
          html += '<sup>';
          let end = modeSupArr[found].end || txt.length;
          for (let j = modeSupArr[found].start; j < end; j += 1) {
            html += txt[j];
            step += 1;
          }
          step = step -1;
          html += '</sup>';
        } else {
          html += txt[i];
          step = 1;
        }
      }
  
      return html;
    }
  
      
    let final =  buildHtml(); 
  
    div_1.innerHTML = final;
  
    htmlForm = final;
  
    console.log('final html =', final)
    if (addOne) {
      pos += 1;
    }
    setCurrentCursorPosition(pos);
  
  } // END of display div mode sup
  
  function onClick(e) {
    console.log('position clicked =', getCaretRange())
  }
  
  function onKeypress(e) {
    // console.log('IN key pressed and e =',e);
  }
  
  function onKeydown(e) {
    // if (e.key === 'e') {
    //   this.modeSupToggle = !this.modeSupToggle;
    //   if (this.modeSupToggle) {
    //     let o = {start: this.getCaretIndex(), end: undefined};
    //     this.modeSupArr.push(o);
    //   } else {
    //     this.modeSupArr[this.modeSupArr.length-1].end = this.getCaretIndex();
    //   }
    //   console.log('mode sup array = ',this.modeSupArr )
    //   console.log('div 1 text content = ',this.div_1.textContent )
    //   // e.key = 0;
    //   this.div_1.textContent = this.div_1.textContent+ this.charEmpty;
    //   // this.setCurrentCursorPosition(this.getCaretIndex()+1)
    //   this.addOne = true;
    //   e.preventDefault();
    //   // e.stopPropagation(true);
    //   // e.stopped = true;
    // } else {
    //   this.addOne = false;
    // }
  
    // console.log('Key = ', e.key)
  
    if( e.key === 'Enter') {
      e.preventDefault();
    }
  
    // this.setCurrentCursorPosition(pos);
  
  }
  
  function onKeyup(e) {
    if (modeSup) {
      displayDivModeSup();
    } else {
      displayDiv();
      // console.log('Display div----------------')
    }
  }
  
  function getCaretIndex() {
    let position = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection();
      if (selection.rangeCount !== 0) {
        const range = window.getSelection().getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(div_1);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        position = preCaretRange.toString().length;
      }
    }
    return position;
  }
  
  function getCaretRange() {
    let position = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    let range = undefined, preCaretRange = undefined, selection = undefined;
    if (isSupported) {
      selection = window.getSelection();
      if (selection.rangeCount !== 0) {
        range = window.getSelection().getRangeAt(0);
        preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(div_1);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        position = preCaretRange.toString().length;
      }
    }
    console.log('selection = ', selection.type);
    let caret = {start: range.startOffset, end: range.endOffset, range: range}
    return caret;
  }
  
  function getCaretPosition() {
    if (window.getSelection && window.getSelection().getRangeAt) {
      var range = window.getSelection().getRangeAt(0);
      var selectedObj = window.getSelection();
      var rangeCount = 0;
      var childNodes = selectedObj.anchorNode.parentNode.childNodes;
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i] == selectedObj.anchorNode) {
          break;
        }
        if (childNodes[i].outerHTML)
          rangeCount += childNodes[i].outerHTML.length;
        else if (childNodes[i].nodeType == 3) {
          rangeCount += childNodes[i].textContent.length;
        }
      }
      return range.startOffset + rangeCount;
    }
    return -1;
  } // Another one to try
  
  
  function getCurrentCursorPosition(parentId)  {
    console.log('Parent id = ', parentId)
    var selection = window.getSelection(),
        charCount = -1,
        node;
  
    function isChildOf(node, parentId) {
      while (node !== null) {
          if (node.id === parentId) {
              return true;
          }
          node = node.parentNode;
      }
  
      return false;
    };
  
    if (selection.focusNode) {
      if (isChildOf(selection.focusNode, parentId)) {
        node = selection.focusNode; 
        charCount = selection.focusOffset;
  
        while (node) {
          if (node.id === parentId) {
              break;
          }
  
          if (node.previousSibling) {
              node = node.previousSibling;
              charCount += node.textContent.length;
          } else {
              node = node.parentNode;
              if (node === null) {
                  break
              }
          }
        }
      }
    }
  
      return charCount;
  }; // END of another one to try
  
  
  function setCurrentCursorPosition(chars) {
  
    function createRange(node, chars, range) {
      if (!range) {
          range = document.createRange()
          range.selectNode(node);
          range.setStart(node, 0);
      }
  
      if (chars.count === 0) {
          range.setEnd(node, chars.count);
      } else if (node && chars.count >0) {
          if (node.nodeType === Node.TEXT_NODE) {
              if (node.textContent.length < chars.count) {
                  chars.count -= node.textContent.length;
              } else {
                  range.setEnd(node, chars.count);
                  chars.count = 0;
              }
          } else {
             for (var lp = 0; lp < node.childNodes.length; lp++) {
                  range = createRange(node.childNodes[lp], chars, range);
  
                  if (chars.count === 0) {
                      break;
                  }
              }
          }
      } 
  
      return range;
    };
  
    if (chars >= 0) {
        var selection = window.getSelection();
  
        var range = createRange(div_1, { count: chars });
  
        // console.log('range == ', range)
  
        if (range) {
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
  }; // END of set current cursor position

  function resetDiv() {
    div_1.innerHTML = '';
    displayDiv();
  }

  return {
    div: div_1,
    getHtmlForm: getHtmlForm,
    resetDiv: resetDiv,
    setCaretPosition: setCurrentCursorPosition,
    displayDiv: displayDiv,
  }
}

export {EditorDivFnc};