// variables
let workTitle = document.getElementById('work');
let breakTitle = document.getElementById('break');
let startBtn = document.getElementById('start');
let resetBtn = document.getElementById('reset');
let minutesDisplay = document.getElementById('minutes');
let secondsDisplay = document.getElementById('seconds');

let workTime = 25;
let breakTime = 5;
let seconds = 0;
let minutes = workTime;
let isRunning = false;
let isWorkTime = true;
let timerInterval = null;

// display initial time
window.onload = () => {
    minutesDisplay.innerHTML = workTime.toString().padStart(2, '0');
    secondsDisplay.innerHTML = "00";
    workTitle.classList.add('active');
    breakTitle.classList.remove('active');
}

// start timer function
function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    
    // change button appearance
    startBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    startBtn.style.backgroundColor = "#4A5568"; // dark color
    
    // add running animation
    document.querySelector('.timer').classList.add('running');
    
    // start countdown
    timerInterval = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                // time's up - switch between work and break
                switchTimer();
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        
        // update display
        updateDisplay();
    }, 1000);
}

// pause timer function
function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    
    // change button back to play
    startBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    startBtn.style.backgroundColor = "";
    
    // remove running animation
    document.querySelector('.timer').classList.remove('running');
}

// switch between work and break
function switchTimer() {
    // play sound notification (optional)
    playNotificationSound();
    
    if (isWorkTime) {
        // switch to break time
        isWorkTime = false;
        minutes = breakTime;
        workTitle.classList.remove('active');
        breakTitle.classList.add('active');
    } else {
        // switch to work time
        isWorkTime = true;
        minutes = workTime;
        breakTitle.classList.remove('active');
        workTitle.classList.add('active');
    }
    
    seconds = 0;
    updateDisplay();
}

// update display
function updateDisplay() {
    minutesDisplay.innerHTML = minutes.toString().padStart(2, '0');
    secondsDisplay.innerHTML = seconds.toString().padStart(2, '0');
}

// reset timer
function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    
    // reset to work time
    isWorkTime = true;
    minutes = workTime;
    seconds = 0;
    
    // update display
    updateDisplay();
    
    // reset buttons
    startBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    startBtn.style.backgroundColor = "";
    
    // reset active tab
    workTitle.classList.add('active');
    breakTitle.classList.remove('active');
    
    // remove running animation
    document.querySelector('.timer').classList.remove('running');
}

// notification sound (optional)
function playNotificationSound() {
    // You can add a sound here if you want
    console.log("Timer finished!");
    
    // Example with browser notification
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(isWorkTime ? "Break Time!" : "Work Time!", {
            body: `Time to ${isWorkTime ? "take a break" : "start working"}!`,
            icon: "https://img.icons8.com/color/96/000000/timer.png"
        });
    }
}

// Event listeners
startBtn.addEventListener('click', function() {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);

// Tab switching
workTitle.addEventListener('click', function() {
    if (!isRunning) {
        isWorkTime = true;
        minutes = workTime;
        seconds = 0;
        updateDisplay();
        workTitle.classList.add('active');
        breakTitle.classList.remove('active');
    }
});

breakTitle.addEventListener('click', function() {
    if (!isRunning) {
        isWorkTime = false;
        minutes = breakTime;
        seconds = 0;
        updateDisplay();
        breakTitle.classList.add('active');
        workTitle.classList.remove('active');
    }
});

// Request notification permission
if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
}