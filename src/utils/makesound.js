let actx = new AudioContext();

class Sound {
  constructor(source, loadHandler) {

    this.source = source;
    this.loadHandler = loadHandler;

    //Set default properties
    // this.actx = new AudioContext();
    this.actx = actx;
    this.volumeNode = this.actx.createGain();
    this.panNode = this.actx.createStereoPanner();
    this.soundNode = null;
    this.buffer = null;
    this.loop = null;
    this.playing = false;

    //Values for pan and volume getters/setters
    this.panValue = 0;
    this.volumeValue = 1;
    this.startTime = 0;
    this.startOffset = 0;

    //Load the sound
    this.load();
  }

  //Sound object method
  load() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", this.source, true);
    xhr.responseType = "arraybuffer";
    xhr.addEventListener("load", () => {
      this.actx.decodeAudioData(
        xhr.response,
        buffer => {
          this.buffer = buffer;
          this.hasLoadded = true;

          if (this.loadHandler) {
            this.loadHandler();
          }
        },
        //Throw errer if the sound can't be decoded
        error => {
          throw new Error("Audio could not be decoded: " + error);
        }
      );
    });
    //Send the request
    xhr.send();
  } // END of load

  play() {
    
    // this.actx.resume();
    this.startTime = this.actx.currentTime;

    this.soundNode = this.actx.createBufferSource();
    this.soundNode.buffer = this.buffer;

    //Connect hte sound to the volume, connect the volume to the pan
    //and connect the pan to the destination
    this.soundNode.connect(this.volumeNode);
    this.volumeNode.connect(this.panNode);
    this.panNode.connect(this.actx.destination);

    //Will the sound loop? true or false
    this.soundNode.loop = this.loop;

    //Finally use the start method to play sound
    this.soundNode.start(
      this.startTime,
      this.startOffset % this.buffer.duration
    );

    //Set playing to true (for pause and restart)
    this.playing = true;
  } //END of play

  pause() {

    //Pause the sound if playing and calculate the startOffset to save the current position
    if (this.playing) {
      this.soundNode.stop(this.actx.currentTime);
      this.startOffset += this.actx.currentTime - this.startTime;
      this.playing = false;
    }
  } //END of pause

  restart() {
    //Stop the sound if it's playing, reset the start and offset times,
    //then call the play methos again
    if (this.playing) {
      this.soundNode.stop(this.actx.currentTime);
    }
    this.startOffset = 0;
    this.play();
  }//END of restart

  playFrom(value) {
    if (this.playing) {
      this.soundNode.stop(this.actx.currentTime);
    }
    this.startOffset = value;
    this.play();
  }//END of play from value

  //Volume and pan getters and setters

  get volume() {
    return this.volumeValue;
  }
  set volume(value) {
    this.volumeNode.gain.value = value;
    this.volumeValue = value;
  }
  get pan() {
    return this.panNode.pan.value;
  }
  set pan(value) {
    this.panNode.pan.value = value;
  }
}

// Create a high-level wrapper to keep our general API style consistant and flexible

function makeSound(source, loadHandler) {
  return new Sound(source, loadHandler);
}

export default makeSound;