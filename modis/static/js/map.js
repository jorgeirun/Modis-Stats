displayMap();
// global map variable
var map;

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
	displayData();
}

// display data on map
function displayData() {

	let url = 'http://127.0.0.1:7000/modis/getData?datenumber=1&limit=5000000';
	let clients = new L.featureGroup();
	let circle = [];

	$.getJSON(url,function (res) {
	  	let radarIcon = L.icon({
			iconUrl:      'http://127.0.0.1:7000/public/static/images/dot.png',
			iconSize:     [10, 10], // size of the icon
			shadowSize:   [50, 64], // size of the shadow
			iconAnchor:   [12, 14], // point of the icon which will correspond to marker's location
			shadowAnchor: [4, 62],  // the same for the shadow
	    	popupAnchor:  [0, -15] // point from which the popup should open relative to the iconAnchor
		});

	  	var pointsData = res['data'];

	  	// display total in view
	  	$('#total').html('Total pixels with cloud: '+pointsData.length);

	 	for (let i = 0; i < pointsData.length; i++) {
	    	L.marker([
	      		pointsData[i][1],
	      		pointsData[i][2]
		    ], {
	        	icon: radarIcon
	      	});
	      	// }).bindPopup(customPopup(pointsData[i]),customOptions).addTo(clients);
		   	if(pointsData[i][1] != null && pointsData[i][1] != null) {
		    	circle = L.circle([pointsData[i][1],pointsData[i][2]], {
				    stroke: false,
				    color: '#000',
				    weight: 2,
				    opacity: 0.5,
				    fillColor: '#ff0033',
				    fillOpacity: 0.4,
				    radius: 1000,
				 }).addTo(map);
	    	}
		}
	});

	map.addLayer(clients);
	let bounds = [[-25,-40], [-25,-70]];
	map.fitBounds(bounds);
}