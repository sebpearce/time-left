'use strict';

var hue = "215";

var canvas = document.getElementById("clock-canvas");
var sleepCanvas = document.getElementById("sleep-canvas");
var workCanvas = document.getElementById("work-canvas");
var handCanvas = document.getElementById("clock-hand-canvas");
var timer = document.getElementById("timer");
var timerLabel = document.getElementById("timer-label");
var freeTimeDisplay = document.getElementById("free-time");
var ctx = canvas.getContext("2d");
var handCtx = handCanvas.getContext("2d");
var sleepCtx = sleepCanvas.getContext("2d");
var workCtx = workCanvas.getContext("2d");

var radius = (canvas.width / 2) * 0.9;
var lastPos = 0;
var clockHandLength = 1; // as a % of radius

height = canvas.height;
width = canvas.width;
var centerX = width / 2;
var centerY = height / 2;

var sleepColor = "hsla(" + hue + ",90%,70%,0.1";
var workColor = "hsla(" + hue + ",90%,70%,0.2)";
var clockHandColor = "hsla(5,100%,70%,0.9)";
var hourLabelsFont = "normal 14px Helvetica Neue";
var hourLabelsFillStyle = "hsla(" + hue + ",100%,80%,0.4)";

// default times
var bedtime = 21.5;
var waketime = 6.5;
var goToWorkTime = 8;
var comeHomeTime = 17.5;
var freeTime = 24 - 
               ((24 - bedtime + waketime) % 24) - 
               ((24 - goToWorkTime + comeHomeTime) % 24);

var bedtimeDate = new Date();
bedtimeDate.setHours(parseInt(bedtime));
bedtimeDate.setMinutes(parseInt((bedtime - parseInt(bedtime)) * 60));
bedtimeDate.setSeconds(0);

var goToWorkDate = new Date();
goToWorkDate.setHours(parseInt(goToWorkTime));
goToWorkDate.setMinutes(parseInt((goToWorkTime - parseInt(goToWorkTime)) * 60));
goToWorkDate.setSeconds(0);

var bedtimeInput = document.getElementById("bedtime");
var waketimeInput = document.getElementById("waketime");
var goToWorkInput = document.getElementById("go-to-work");
var comeHomeInput = document.getElementById("come-home");



function drawGrid() {

  for (var x = 0.5; x < width; x += 10) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }

  for (var y = 0.5; y < height; y += 10) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }

  ctx.strokeStyle = "#eee";
  ctx.stroke();

}

function drawCrosshairs() {
  // main crosshairs
  ctx.beginPath(); // new path
  ctx.moveTo(centerX - radius, centerY);
  ctx.lineTo(centerX + radius, centerY);
  ctx.moveTo(centerX, centerY + radius);
  ctx.lineTo(centerX, centerY - radius);
  ctx.strokeStyle = "hsl(" + hue + ",50%,40%)";
  ctx.lineWidth = 2;
  ctx.stroke();  
}

function circle(r) {
  ctx.beginPath();
  // arc(x, y, r, startAngle, endAngle, anticlockwise)
  // angles measured in radians, so 1 gives ~57.2958 degrees
  ctx.arc(width/2, height/2, r, 0, Math.PI * 2, false);
  ctx.closePath(); // this connects the two open bits
  ctx.strokeStyle = "hsla(" + hue + ",0%,100%,0.4)";
  ctx.stroke(); 
}

function ch(chunk) {

  // 1 hr = 2 * PI / 24 = 0.2617993878 radians

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX,centerY,radius,lastPos,lastPos+(2*Math.PI*chunk),false);
  lastPos += 2 * Math.PI * chunk;
  // ctx.closePath;
  ctx.lineTo(centerX, centerY);
  // ctx.strokeStyle = "#333";
  // ctx.stroke(); 
  ctx.fillStyle = "hsla(110,30%,40%,0.3";
  ctx.fill();
  ctx.closePath();

}

function drawSleepTime(start, end) {

  killme(sleepCanvas);

  // duration as a fraction of a total day e.g. 1 hour = 1/24
  duration = ((24 - start + end) % 24) / 24;

  start = (start / 24 * Math.PI * 2) + (3 * Math.PI / 2);

  sleepCtx.beginPath();
  sleepCtx.moveTo(centerX, centerY);
  sleepCtx.arc(centerX,centerY,radius,start,start+(2*Math.PI*duration),false);  
  sleepCtx.lineTo(centerX, centerY);
  // sleepCtx.strokeStyle = "hsla(" + hue + ",100%,80%,0.2)";
  // sleepCtx.stroke(); 
  sleepCtx.fillStyle = sleepColor;
  sleepCtx.fill();
  sleepCtx.closePath();  

}

function drawWorkTime(start, end) {

  killme(workCanvas);

  duration = ((24 - start + end) % 24) / 24;

  start = (start / 24 * Math.PI * 2) + (3 * Math.PI / 2);

  workCtx.beginPath();
  workCtx.moveTo(centerX, centerY);
  workCtx.arc(centerX,centerY,radius,start,start+(2*Math.PI*duration),false);  
  workCtx.lineTo(centerX, centerY);
  // workCtx.strokeStyle = "hsla(" + hue + ",100%,80%,0.2)";
  // workCtx.stroke(); 
  workCtx.fillStyle = workColor;
  workCtx.fill();
  workCtx.closePath();  

}

function updateBedtimeDate() {
  bedtimeDate.setHours(parseInt(bedtime));
  bedtimeDate.setMinutes(parseInt((bedtime - parseInt(bedtime)) * 60));
  bedtimeDate.setSeconds(0);
  return 0;
}


function updateFreeTime() {

  freeTime = 24 - 
             ((24 - bedtime + waketime) % 24) - 
             ((24 - goToWorkTime + comeHomeTime) % 24);

  if (isInt(freeTime)) {
    freeTimeDisplay.innerHTML = freeTime;
  } else {
    freeTimeDisplay.innerHTML = freeTime.toFixed(1);
  }

}

// get X co-ordinates along the clock edge for a given hour
function getX(hour, distFromEdge) {

  var t = hour / 24;
  // if distFromEdge isn't specified, set it to 0
  distFromEdge = (distFromEdge > 0 ? distFromEdge : 0);

  return centerX + (radius - distFromEdge) * 
         Math.cos((2 * Math.PI * t) + (3 * Math.PI / 2));

}

// get Y co-ordinates along the clock edge for a given hour
function getY(hour, distFromEdge) {

  var t = hour / 24;
  // if distFromEdge isn't specified, set it to 0
  distFromEdge = (distFromEdge > 0 ? distFromEdge : 0);

  return centerY + (radius - distFromEdge) * 
         Math.sin((2 * Math.PI * t) + (3 * Math.PI / 2));

}

function drawHourLabels() {

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = hourLabelsFont;

  var items = 24;
  var xtra = 15;

  for (var i = 0; i < items; i++) {

    var x = centerX + (radius+xtra) * 
            Math.cos((2 * Math.PI * i / items) + (3 * Math.PI / 2));

    var y = centerY + (radius+xtra) * 
            Math.sin((2 * Math.PI * i / items) + (3 * Math.PI / 2));

    ctx.fillStyle = hourLabelsFillStyle;
    ctx.fillText(i, x, y);
  }

}

function drawClockHand(hour) {

  handCtx.beginPath();
  handCtx.moveTo(centerX, centerY);
  var x = getX(hour, radius - (radius * clockHandLength));
  var y = getY(hour, radius - (radius * clockHandLength));
  handCtx.lineTo(x, y);
  handCtx.strokeStyle = clockHandColor;
  handCtx.lineWidth = 2;
  handCtx.stroke();   

}

function killme(c) {

  // reset all pixels, which happens on w/h change:
  c.width = c.width;

}

function leadingZero(time) {

  return (time < 10) ? "0" + time : + time;

}

// give it an amount of seconds and it will format it as total time remaining and return a string
function calcTime(seconds) {

  //find out how many hours/mins/seconds are left
  var hours = Math.floor(seconds / 3600);
  seconds -= hours * (3600);
  var minutes = Math.floor(seconds / 60);
  seconds -= minutes * (60);

  // don't show hours/minutes if we don't need them
  // if (hours > 0)
    var timeStr = (leadingZero(hours) + ":" + leadingZero(minutes) + ":" + leadingZero(seconds));
  // else if (minutes > 0)
  //   var timeStr = (leadingZero(minutes) + ":" + leadingZero(seconds));
  // else
  //   var timeStr = leadingZero(seconds);

  return timeStr;
}

window.onload = function() {

  // set default values
  bedtimeInput.value = bedtime;
  waketimeInput.value = waketime;
  goToWorkInput.value = goToWorkTime;
  comeHomeInput.value = comeHomeTime;

  // drawGrid();
  // drawCrosshairs();
  // circle(radius);
  // ch(1/24);
  drawHourLabels();
  drawSleepTime(bedtime, waketime);
  drawWorkTime(8, 17.5);
  updateFreeTime();

  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  m /= 60;
  h += m;
  drawClockHand(h);

  // show date
  document.getElementById("day-name").innerHTML = now.getDayName();
  document.getElementById("day-number").innerHTML = ("0"+now.getDate()).slice(-2); 
  document.getElementById("month-name").innerHTML = now.getMonthName();

  // get timer to show time left before first interval kicks in
  var milliSecondsLeft = bedtimeDate - now;
  var secondsLeft = Math.round(milliSecondsLeft / 1000);
  if (secondsLeft <= 0) {
    timer.innerHTML = "00:00:00"
  } else {
    timer.innerHTML = calcTime(secondsLeft);
  }

  // timer (time left until bedtime)
  timerInterval = setInterval(function() {

    var milliSecondsLeft = 0;
    var isBeforeWork = false;
    var now = new Date();
    var h = now.getHours();
    if (h >= waketime && h < goToWorkTime) {
      isBeforeWork = true;
      milliSecondsLeft = goToWorkDate - now;
      timerLabel.innerHTML = "Time until work";
    } else {
      isBeforeWork = false;
      milliSecondsLeft = bedtimeDate - now;
      timerLabel.innerHTML = "Time until bedtime";
    }   
    var secondsLeft = Math.round(milliSecondsLeft / 1000);

    // if past bedtime, set to zero
    if (secondsLeft <= 0) {
      timer.innerHTML = "00:00:00"
    } else {
      timer.innerHTML = calcTime(secondsLeft);
    }


  }, 1000);

  // clock hand – do this every 30000ms = 30s
  clockHandInterval = setInterval(function() {

    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    m /= 60;
    h += m;
    killme(handCanvas);
    drawClockHand(h);

  }, 30000);



}

function handleBedtimeInputChange(e) {
  if (e.keyCode == 13) {
    var x = bedtimeInput.value;
    if (isNumber(x) && x >= 0 && x < 24) {
      bedtime = parseFloat(x);
      drawSleepTime(bedtime, waketime);
      updateBedtimeDate();
      // updateGoToWorkTimeDate();
      updateFreeTime();
    }
  }  
  return false;
}

function handleWaketimeInputChange(e) {
  if (e.keyCode == 13) {
    var x = waketimeInput.value;
    if (isNumber(x) && x >= 0 && x < 24) {
      waketime = parseFloat(x);
      drawSleepTime(bedtime, waketime);
      updateFreeTime();
    }
  }
  return false;
}

function handleGoToWorkInputChange(e) {
  if (e.keyCode == 13) {
    var x = goToWorkInput.value;
    if (isNumber(x) && x >= 0 && x < 24) {
      goToWorkTime = parseFloat(x);
      drawWorkTime(goToWorkTime, comeHomeTime);
      updateFreeTime();
    }
  }
  return false;
}

function handleComeHomeInputChange(e) {
  if (e.keyCode == 13) {
    var x = comeHomeInput.value;
    if (isNumber(x) && x >= 0 && x < 24) {
      comeHomeTime = parseFloat(x);
      drawWorkTime(goToWorkTime, comeHomeTime);
      updateFreeTime();
    }
  }
  return false;
}

bedtimeInput.addEventListener('keypress', handleBedtimeInputChange, false);
waketimeInput.addEventListener('keypress', handleWaketimeInputChange, false);
goToWorkInput.addEventListener('keypress', handleGoToWorkInputChange, false);
comeHomeInput.addEventListener('keypress', handleComeHomeInputChange, false);

// bedtimeInput.addEventListener('blur', handleBedtimeInputChange, false);
// waketimeInput.addEventListener('blur', handleWaketimeInputChange, false);
// goToWorkInput.addEventListener('blur', handleGoToWorkInputChange, false);
// comeHomeInput.addEventListener('blur', handleComeHomeInputChange, false);

$("#bedtime").blur(function(e){
  var x = bedtimeInput.value;
  if (isNumber(x) && x >= 0 && x < 24) {
    bedtime = parseFloat(x);
    drawSleepTime(bedtime, waketime);
    updateBedtimeDate();
    // updateGoToWorkTimeDate();
    updateFreeTime();
  }
});


$("#waketime").blur(function(e){
  var x = waketimeInput.value;
  if (isNumber(x) && x >= 0 && x < 24) {
    waketime = parseFloat(x);
    drawSleepTime(bedtime, waketime);
    updateFreeTime();
  }
});


$("#go-to-work").blur(function(e){
  var x = goToWorkInput.value;
  if (isNumber(x) && x >= 0 && x < 24) {
    goToWorkTime = parseFloat(x);
    drawWorkTime(goToWorkTime, comeHomeTime);
    updateFreeTime();
  }
});


$("#come-home").blur(function(e){
  var x = comeHomeInput.value;
  if (isNumber(x) && x >= 0 && x < 24) {
    comeHomeTime = parseFloat(x);
    drawWorkTime(goToWorkTime, comeHomeTime);
    updateFreeTime();
  }
});



