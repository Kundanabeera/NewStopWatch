let timerInterval;
let elapsedTime = 0;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const lapsDisplay = document.getElementById("laps");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");

// Helper function to format time
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Updates the timer display
function updateTimer() {
  timerDisplay.textContent = formatTime(elapsedTime);
}

// Starts the timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startButton.classList.add("disabled");
    startButton.setAttribute("disabled", true);
    const startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateTimer();
    }, 100);
  }
}

// Pauses the timer
function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  startButton.classList.remove("disabled");
  startButton.removeAttribute("disabled");
}

// Resets the timer
function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  updateTimer();
  lapsDisplay.innerHTML = "";
  startButton.classList.remove("disabled");
  startButton.removeAttribute("disabled");
}

// Adds a lap
function addLap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement("div");
    lapElement.textContent = `Lap: ${lapTime}`;
    lapsDisplay.appendChild(lapElement);
  }
}

// Attach event listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", addLap);

// Initialize the timer display
updateTimer();