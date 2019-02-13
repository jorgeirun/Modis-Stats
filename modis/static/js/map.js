// display map first
displayMap();

// init rangeslider
$('input[type="range"]').rangeslider();

// on slider change refresh field
$(function() {
  	$(document).on('input', 'input[type="range"]', function(e) {
    	$('#sliderValueField').val(dateFromDay(2017, e.currentTarget.value));
    	$('#sliderValueFieldJulian').val(e.currentTarget.value);
	});
});

// global map variable
var map;
var pointsData;
let allCircles = new L.featureGroup();

// display map on screen
function displayMap() {
	map = L.map('map', {
	 	'center': [20,0],
	 	'zoom': 2,
	 	'layers': [
	    	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				'attribution': 'Map data &copy; OpenStreetMap contributors'
	    	})
	  	]
	});

	let bounds = [[-25,-40], [-25,-70]];
	map.fitBounds(bounds);

	// display data with Jan, 2 as default
	// set defualt values
	var defaultVal = 2;
	$('input[type="range"]').val(defaultVal).change();
	$('#sliderValueField').val(dateFromDay(2017, defaultVal));
	$('#sliderValueFieldJulian').val(defaultVal);
	displayData(defaultVal);
}

// display data on map
function displayData(datenumber, limit = 5000000) {

	let url = 'http://127.0.0.1:7000/modis/getData?datenumber='+datenumber+'&limit='+limit;
	let circle = [];

	$.getJSON(url,function (res) {
	  	pointsData = res['data'];
	  	// display total in view
	  	$('#total').html('Total pixels with cloud: '+pointsData.length);
	 	for (let i = 0; i < pointsData.length; i++) {
		   	if(pointsData[i][1] != null && pointsData[i][1] != null) {
		    	circle = L.circle([pointsData[i][1],pointsData[i][2]], {
				    stroke: false,
				    color: '#000',
				    weight: 2,
				    opacity: 0.5,
				    fillColor: '#ff0033',
				    fillOpacity: 0.4,
				    radius: 1000,
				 }).addTo(allCircles);
	    	}
		}
		map.addLayer(allCircles);
	});
}

// Date format
function dateFromDay(year, day){
	const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	var date = new Date(year, 0);
	var fullDate = new Date(date.setDate(day));
	var day = fullDate.getDate();
	var month = fullDate.getMonth() + 1;
	var year = fullDate.getYear();
	// return day +"/"+ month;
	return monthNames[month - 1]+" "+day;
}

// Refresh button action on click
$("#refreshButton").click(function() {
	var currentvalue = $('#sliderValueFieldJulian').val();
	console.log(currentvalue);
	// call displayData with new vars
	map.removeLayer(allCircles);
	displayData(currentvalue);

});