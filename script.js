let timer;
let isRunning = false;
let startTime;
let laps = [];

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startTime = new Date() - laps.reduce((acc, lap) => acc + lap, 0);
    timer = setInterval(updateTime, 10); // Updated interval to 10 milliseconds
    document.getElementById("laps").innerHTML = "";
  }
}

function pauseStopwatch() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timer);
    laps.push(new Date() - startTime);
  }
}

function resetStopwatch() {
  isRunning = false;
  clearInterval(timer);
  document.getElementById("display").innerHTML = "00:00:00:000";
  startTime = null;
  laps = [];
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (isRunning) {
    const lapTime = new Date() - startTime;
    laps.push(lapTime);

    const lapList = document.getElementById("laps");
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(formatTime(lapTime)));
    lapList.appendChild(li);
  }
}

function updateTime() {
  const currentTime = new Date() - startTime;
  document.getElementById("display").innerHTML = formatTime(currentTime);
}

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor(time % 1000);

  return (
    (hours < 10 ? "0" : "") +
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds +
    ":" +
    (milliseconds < 10 ? "00" : milliseconds < 100 ? "0" : "") +
    milliseconds
  );
}
