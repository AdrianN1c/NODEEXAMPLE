// https://github.com/heapwolf/prompt-sync
const prompt = require('prompt-sync')();

// https://www.geodatasource.com/developers/javascript
function Distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=='K') { dist = dist * 1.609344 }
		if (unit=='N') { dist = dist * 0.8684 }
        return dist;
	}
}

// Clear Screen
process.stdout.write('\033c');

// Prompts for user input
const la1 = prompt('Please enter Lat 1 - ');
const lo1 = prompt('Please enter Long 1 - ');
const la2 = prompt('Please enter Lat 2 - ');
const lo2 = prompt('Please enter Long 2 - ');
const unt = prompt('How would you like the result to be displayed (M)iles , (K)ilometers or (N)autical Miles? ');

// Copy user unit selection to another variable
var un = unt;

// Set this copy of unit to display the full description on our output
if (un == 'M') {
  un = "Miles";
} else if (un == 'K') {
  un = "Kilometers";
} else {
  un = "Nautical Miles";
}

// Pass inputs to the function and save the returned calculation as a variable we can print
var Distn = Distance(la1,lo1,la2,lo2,unt);

// Clear Screen
process.stdout.write('\033c');

// Print answer to screen
console.log(" ");
console.log("It is " + Distn + " " + un) + ".";
console.log(" ");console.log(" ");

//Output into a table also
console.table([{ Distance: Distn, Unit: un }]);
console.log(" ");console.log(" ");
