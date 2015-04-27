// don't touch this
output = document.getElementById('output');

// logging function
function log() {
  try {
    console.log.apply(console, arguments);
  }
  catch(e) {
    try {
      opera.postError.apply(opera, arguments);
    }
    catch(e){
      alert(Array.prototype.join.call( arguments, " "));
    }
  }
}

// check if integer (excludes strings)
function isIntNotString(x) {
  return (typeof x === 'number' && (x % 1) === 0);
}

// check if integer (includes strings)
function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

function isNumber(n) {
  // replace commas for European-formatted numbers
  n = n.replace(/,/,".");
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// return random integer
function randomInt(max)
{
    return Math.floor(Math.random()*(max+1));
}

function capitalizeFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// toggle = returns boolean opposite
function toggle(value) {
  return (value ? !value : !value);
}

// getMonthName and getDayName
// taken from http://javascript.about.com/library/bldatenames.htm
Date.prototype.getMonthName = function() {
  var m = ['January','February','March','April','May','June','July',
  'August','September','October','November','December'];
  return m[this.getMonth()];
} 
Date.prototype.getDayName = function() {
  var d = ['Sunday','Monday','Tuesday','Wednesday',
  'Thursday','Friday','Saturday'];
  return d[this.getDay()];
}

