function Timer(callback, timeInterval, errorCallback, elMin, elSec, elLeft, maxTime) {
  // let timeInterval = timeInterval;
  let expected, timeout, timeLeft = 0, cumulTime = 0, min = 0, sec = 0, running = false;
  let stopped = false, started = false;

  let show = nbr => {
    return nbr >= 10 ? nbr : `0${nbr}`;
  }
  let show0 = show(0);

  elMin.textContent = show0;
  elSec.textContent = show0;
  elLeft.textContent = show0;

  let round = ()=> {
    let drift = Date.now() - expected;

    cumulTime += timeInterval;
    timeLeft += timeInterval;
    elLeft.textContent = show(timeLeft/timeInterval);

    if (drift > timeInterval) {
      if (errorCallback) {
        errorCallback();
      }
    }
    // callback();
    expected += timeInterval;
    if (cumulTime % 1000 === 0) {

      sec += 1;

      if (sec === 60) {
        min +=1;
        elMin.textContent = show(min);
        sec = 0;
        elSec.textContent = show(sec);
      } else {
        elSec.textContent = show(sec);
      }
      timeLeft = 0;
      elLeft.textContent = show(timeLeft/timeInterval);     
    }
    timeout = setTimeout(round, (timeInterval - drift)>0?(timeInterval - drift):0);
    if (maxTime === min) {
      stop();
      stopped = true;
      started = false;
    }
  }

  let start = () => {
    expected = Date.now() + timeInterval;
    timeout = setTimeout(round, timeInterval);
    running = true;
    started = true;
    // stopped = false;
  }

  let stop = () => {
    clearTimeout(timeout);
    running = false;
    // stopped = true;
  }

  let reset = () => {
    cumulTime = 0;
    min = 0;
    sec = 0;
    timeLeft = 0;
    elMin.textContent = show0;
    elSec.textContent = show0;
    elLeft.textContent = show0;
    // callback();
    running = false;
    stopped = false;
    started = false;
  }

  let isRunning = () => {
    return running;
  }

  let isStopped = () => {
    return stopped;
  }

  let isStarted = () => {
    return started;
  }

  return {
    start: start,
    stop: stop,
    reset: reset,
    isRunning: isRunning,
    isStarted: isStarted,
    isStopped: isStopped
  }
}

export default Timer;