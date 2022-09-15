/*stopwatch es 00:00*/
const stopwatch = document.getElementById('stopwatch');
/*boton de pausa/play*/
const playPauseButton = document.getElementById('play-pause');
/*boton de stop*/
const stopButton = document.getElementById('stop');
/*es la pelotita*/
const secondsSphere = document.getElementById('seconds-sphere');

/*modifica el 00:00*/
let stopwatchInterval;
/*lleva el tiempo que paso*/
let runningTime = 0;

const playPause = () => {
  const isPaused = !playPauseButton.classList.contains('running');

  if (isPaused) {
    playPauseButton.classList.add('running');
    start();
  } else {
    playPauseButton.classList.remove('running');
    pause();
  }
}

const pause = () => {
  secondsSphere.style.animationPlayState = 'paused';
  clearInterval(stopwatchInterval);
}

const stop = () => {
  secondsSphere.style.transform = 'rotate(-90deg) translate(60px)';
  secondsSphere.style.animation = 'none';
  playPauseButton.classList.remove('running');
  runningTime = 0;
  clearInterval(stopwatchInterval);
  stopwatch.textContent = '00:00';
}

const start = () => {
  secondsSphere.style.animation = 'rotacion 60s linear infinite';
  let startTime = Date.now() - runningTime;
  secondsSphere.style.animationPlayState = 'running';
  stopwatchInterval = setInterval(() => {
    runningTime = Date.now() - startTime;
    stopwatch.textContent = calculateTime(runningTime);
  }, 1000)
}

const calculateTime = runningTime => {
  const total_seconds = Math.floor(runningTime / 1000);
  const total_minutes = Math.floor(total_seconds / 60);

  const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
  const display_minutes = total_minutes.toString().padStart(2, "0");

  return `${display_minutes}:${display_seconds}`
}

playPauseButton.addEventListener('click', () => {
  playPause()
})

stopButton.addEventListener('click', () => {
  stop()
})
