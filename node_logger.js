// ==== START OF LOG SETTINGS ====

var LOG_FILE = process.env.BACKUP_LOG_FILE || "./logs/console.log";

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(LOG_FILE, {flags : 'a'});
var log_stdout = process.stdout;

function formatDate(date) {
    var d = date
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function formatTime(date) {
    var d = date,
	hour = '' + d.getHours(),
	minute = '' + d.getMinutes(),
	seconds= '' + d.getSeconds(),
	milliseconds= '' + d.getMilliseconds();

    var zeros = (milliseconds < 10) ? '00' : (milliseconds < 100) ? '0' : '';

    return [hour, minute, seconds, zeros + milliseconds].join(':');
}

function genPrefix(currTime, level) {
    return formatDate(currTime) + ' - ' + formatTime(currTime) + ' - ' + level + ' - ';
}

var logFunction = function (level) {

    return function(d) {
	var currTime = new Date()
	var prefix = genPrefix(currTime, level);
	log_file.write(prefix + util.format(d) + '\n');
	log_stdout.write(prefix + util.format(d) + '\n');
    }
}

// Log Levels
console.log = logFunction("LOG");
console.info = logFunction("INFO");
console.debug = logFunction("DEBUG");
console.warn = logFunction("WARNING");
console.error = logFunction("ERROR");
console.critical = logFunction("CRITICAL");

// ==== END OF LOG SETTINGS ====
