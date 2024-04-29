
//snow
function init() {
    var portrait = document.getElementById('winter-field');
    var context = portrait.getContext('2d');
    var w = portrait.width = window.innerWidth; // Set canvas width to viewport width
    var h = portrait.height = window.innerHeight; // Set canvas height to viewport height
    var background = new Image();

    var snowflakes = [];

    function snowfall (){
        context.clearRect(0, 0, w, h);
        context.drawImage(background, 0, 0, w, h); // Draw background with adjusted size
        addSnowFlake();
        snow();
    };

    function addSnowFlake (){
        var x = Math.ceil(Math.random() * w);
        var s = Math.ceil(Math.random() * 3);
        snowflakes.push({"x": x, "y": 0, "s": s});
    };

    function snow() {
        for (var i = 0; i < snowflakes.length; i++) {
            var snowflake = snowflakes[i];
            context.beginPath();
            context.fillStyle = "rgba(255, 255, 255, 0.7)";
            context.arc(snowflake.x, snowflakes[i].y += snowflake.s, snowflake.s / 2, 0, 2 * Math.PI);
            context.fill();
            if (snowflakes[i].y > h) {
                snowflakes.splice(i, 1);
            }
        }
    }

    portrait.addEventListener('mousemove', function(event) {
        var mouseX = event.clientX;
        var mouseY = event.clientY;

        for (var i = 0; i < snowflakes.length; i++) {
            var snowflake = snowflakes[i];
            var distance = Math.sqrt(Math.pow(mouseX - snowflake.x, 2) + Math.pow(mouseY - snowflake.y, 2));
            if (distance < 50) { // Adjust the value as needed for the hover radius
                snowflake.x += (snowflake.x - mouseX) * 0.1;
                snowflake.y += (snowflake.y - mouseY) * 0.1;
            }
        }
    });

    setInterval(snowfall, 20);
}

window.onload = init;
function redirectToGmail() {
    window.open("https://mail.google.com", "_blank");
}

//timer
  // Function to update the timer
function updateTimer() {
    const timerDisplay = document.getElementById('timer');
    const startTime = localStorage.getItem('startTime');
    
    let elapsedTime = 0;

    // Calculate elapsed time if start time is available
    if (startTime) {
        elapsedTime = Math.floor((Date.now() - parseInt(startTime)) / 1000);
    }

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Call the updateTimer function every second
const timerInterval = setInterval(updateTimer, 1000);

// Update timer immediately after page load
updateTimer();

// Store start time in localStorage when the page is loaded
if (!localStorage.getItem('startTime')) {
    localStorage.setItem('startTime', Date.now());
}
// Check if the timer is already running by checking if the start time is stored in local storage
const isTimerRunning = localStorage.getItem('startTime') !== null;


// If the timer is already running, display the stored time difference
if (isTimerRunning) {
    const storedTimeDifference = localStorage.getItem('timeDifference');
    if (storedTimeDifference) {
        document.getElementById('time-difference').textContent = `Time Taken for the heist: ${storedTimeDifference}`;
    }
}
let isStopped = false; // Flag to track if the timer is already stopped

// Event listener for stop button
document.getElementById('stop-button').addEventListener('click', function() {
    // Check if the timer is running and not already stopped
    if (isTimerRunning && !isStopped) {
        const startTime = parseInt(localStorage.getItem('startTime')); // Retrieve start time from localStorage
        const stopTime = Date.now(); // Get the current time when stopped
        const elapsedTimeInSeconds = Math.floor((stopTime - startTime) / 1000); // Calculate elapsed time in seconds
        const minutes = Math.floor(elapsedTimeInSeconds / 60);
        const seconds = elapsedTimeInSeconds % 60;
        const timeDifference = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; // Format time difference

        // Store stopped time and time difference in local storage
        localStorage.setItem('stoppedTime', new Date(stopTime).toLocaleString());
        localStorage.setItem('timeDifference', timeDifference);

        // Calculate total time and update it in local storage
        const totalTime = parseInt(localStorage.getItem('totalTime')) || 0; // Get current total time or initialize to 0
        const newTotalTime = totalTime + elapsedTimeInSeconds; // Add elapsed time to total time
        localStorage.setItem('totalTime', newTotalTime); // Update total time in local storage

        // Display stopped time, time difference, and total time on the webpage
        document.getElementById('stopped-time').textContent = `Stopped Time: ${localStorage.getItem('stoppedTime')}`;
        document.getElementById('time-difference').textContent = `Time Taken for the heist: ${timeDifference}`;
        document.getElementById('total-time').textContent = `Total Time: ${formatTime(newTotalTime)}`;

        // Clear start time from localStorage
        localStorage.removeItem('startTime');

        isStopped = true; // Set the flag to indicate that the timer is stopped
    }
});

// Helper function to format time as MM:SS
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Load stopped time when the page loads
window.addEventListener('load', function() {
    const stoppedTime = localStorage.getItem('stoppedTime');
    if (stoppedTime) {
        document.getElementById('stopped-time').textContent = `Stopped Time: ${stoppedTime}`;
        isStopped = true; // Set the flag if the stop time is already stored
    }
});
