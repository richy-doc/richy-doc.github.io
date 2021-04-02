import {EditorDivFnc} from './editorDiv.js';

function createDiv( classes, step) {
  const div_0 = document.createElement('div');
  div_0.classList.add('step');
  const etape = document.createElement('div');
  etape.textContent = step;
  etape.classList.add('etape');
  div_1 = inputDiv.div_1;
  // this.div_2 = this.inputDiv.div_2;
  classes.forEach(c => {
    div_1.classList.add(c);
  });

  div_0.append(etape, div_1);
  // div_0.append(etape, this.div_1, this.div_2);
  this.div = div_0;
  // this.inputDiv = this.div.children[1];
}

function CreateDivFnc(props) {
  let classes = props.classes;
  let step = props.step;
  let div = null;
  let mode = props.mode || {auto: true};
  let prob = props.mode || undefined;
  let editor = EditorDivFnc({mode: mode, prob: prob});
  let inputDiv = editor.div;
  let inputHtml = editor.htmlForm;
  // this.utils = new TermUtils;
  let termArr = [];
  // let div_1 = null;
  // this.div_2 = null;

  // console.log('Editor construction ==========', editor)

  const div_0 = document.createElement('div');
  div_0.classList.add('step');
  const etape = document.createElement('div');
  etape.textContent = step;
  etape.classList.add('etape');
  // this.div_2 = this.inputDiv.div_2;
  classes.forEach(c => {
    inputDiv.classList.add(c);
  });

  div_0.append(etape, inputDiv);

  return {
    div: div_0,
    divEtape: etape,
    divEditor: inputDiv,
    editor: editor,
  };
}

// class CreateDiv {
//   constructor( props) {
//   // constructor( classes, step, mode = {auto: true}, prob) {
//     this.classes = props.classes;
//     this.step = props.step;
//     this.div = null;
//     this.mode = props.mode || {auto: true};
//     this.prob = props.mode || undefined;
//     this.inputDiv = new EditorDiv(this.mode, this.prob );
//     // this.inputDiv = new Editor;
//     this.input = this.inputDiv.htmlForm;
//     // this.utils = new TermUtils;
//     this.termArr = [];
//     this.div_1 = null;
//     // this.div_2 = null;
//     this.createDiv( this.classes, this.step);
//   }

//   createDiv = ( classes, step) => {
//     const div_0 = document.createElement('div');
//     div_0.classList.add('step');
//     const etape = document.createElement('div');
//     etape.textContent = step;
//     etape.classList.add('etape');
//     this.div_1 = this.inputDiv.div_1;
//     // this.div_2 = this.inputDiv.div_2;
//     classes.forEach(c => {
//       this.div_1.classList.add(c);
//     });

//     div_0.append(etape, this.div_1);
//     // div_0.append(etape, this.div_1, this.div_2);
//     this.div = div_0;
//     // this.inputDiv = this.div.children[1];
//   }

// }

export default CreateDivFnc;

