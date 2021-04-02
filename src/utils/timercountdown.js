function Timer(callback, timeInterval, errorCallback, elMin, elSec, elLeft, maxTimeMin) {
  // let timeInterval = timeInterval;
  let expected, timeout, timeLeft = 0, cumulTime = 0, min = 0, sec = 0, running = false;

  let started, ended, timerStarted = false, timerEnded = false;

  function show(nbr) {
    return nbr >= 10 ? nbr : "0" + nbr;
  }

  let showMaxTime = show(maxTimeMin);

  elMin.textContent = show(maxTimeMin);
  elSec.textContent = show(sec);
  elLeft.textContent = "00";

  let round = ()=> {
    let drift = Date.now() - expected;

    cumulTime += timeInterval;
    timeLeft += timeInterval;
    elLeft.textContent = show((990 - timeLeft)/timeInterval);

    if (sec === 0) {
      elSec.textContent = show(60 - sec);
    }

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
        elMin.textContent = show((maxTimeMin - min - 1)>=0?(maxTimeMin - min - 1):0);
        sec = 0;
        elSec.textContent = show(60 - sec);
      } else {
        elSec.textContent = show(60 - sec);
      }

      timeLeft = 0;
      elLeft.textContent = show((990 - timeLeft)/timeInterval);     
    }
    timeout = setTimeout(round, (timeInterval - drift)>0?(timeInterval - drift):0);
    if (cumulTime >= maxTimeMin * 60 * 1000) {
      clearTimeout(timeout);
      stop();
    }
  }

  let start = () => {
    timerStarted = true;
    started = Date.now();
    expected = Date.now() + timeInterval;
    timeout = setTimeout(round, timeInterval);
    running = true;
    elMin.textContent = show(maxTimeMin - 1);
    elSec.textContent = show(sec);
    elLeft.textContent = "00";
  }

  let stop = () => {
    timerEnded = true;
    ended = Date.now();
    clearTimeout(timeout);
    running = false;
    elMin.textContent = "00";
    elSec.textContent = "00";
    elLeft.textContent = "00";
  }

  let reset = () => {
    cumulTime = 0;
    min = 0;
    sec = 0;
    timeLeft = 0;
    elMin.textContent = showMaxTime;
    elSec.textContent = "00";
    elLeft.textContent = "00";
    // callback();
    running = false;
  }

  let isRunning = () => {
    return running;
  }

  let isTimerStarted = () => {
    return timerStarted;
  }

  let isTimerEnded = () => {
    return timerEnded;
  }

  return {
    start: start,
    stop: stop,
    reset: reset,
    isRunning: isRunning,
    isTimerStarted: isTimerStarted,
    isTimerEnded: isTimerEnded
  }
}

export default Timer;