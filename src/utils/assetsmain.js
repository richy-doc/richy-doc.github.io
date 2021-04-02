import makeSound from './makesound.js';

let assets = {
  toLoad: 0,
  loaded: 0,
  imageExtensions: ["png", "jpg"],
  fontExtensions: ["ttf", "otf", "ttc", "woff"],
  audioExtensions: ["mp3", "ogg", "wav", "webm"],

  load(sources) {
    return new Promise(resolve => {
      let loadHandler = () => {
        this.loaded += 1;
        // console.log(this.loaded);

        if (this.toLoad === this.loaded) {
          this.toLoad = 0;
          this.loaded = 0;
          console.log('Assets finished loading');
          // resolve the promise
          resolve();
        }
      };

      console.log("Loading assets ...");

      this.toLoad = sources.length;

      sources.forEach(source => {
        let extension = source.split(".").pop();

        if (this.imageExtensions.indexOf(extension) !== -1) {
          this.loadImage(source, loadHandler);
        } else if (this.fontExtensions.indexOf(extension) !== -1) {
          this.loadFont(source, loadHandler);
        } else if (this.audioExtensions.indexOf(extension) !== -1) {
          this.loadSound(source, loadHandler);
        } else {
          console.log('File type not recognized: '+ source);
        }
      });

    }); // END of promise
  }, // END of load fnc

  loadImage(source, loadHandler) {
    let image = new Image();
    image.addEventListener("load", loadHandler, false);
    this[source] = image;
    image.src = source;
  }, //END of load image

  loadFont(source, loadHandler) {
    let fontFamily = source.split("/").pop().split(".").pop();
    let newStyle = document.createElement("style");
    let fontFace = "@font-face {font-family:'}"+ fontFamily + "'; src: url('" + source + "');}";

    newStyle.appendChild(document.createTextNode(fontFace));
    document.head.appendChild(newStyle);

    loadHandler();
  }, //END of load font

  loadSound(source, loadHandler) {
    let sound = makeSound(source, loadHandler);

    sound.name = source;
    // sound.restart();

    //Assing hte sound as a property of assets object so
    //we can access it with assets["sounds/sound.mp3"]

    this[sound.name] = sound;
  }, //END of load sound

}

export default assets;