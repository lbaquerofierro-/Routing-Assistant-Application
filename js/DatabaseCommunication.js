/*
======================
Name: DatabaseCommunication
Author: Walter Schultz
Date: February 17, 2015
Functions: getWaypoint,
		   retrieveRoute,
		   getInitialLocations,
		   getImage,
		   getInfo,
		   loadConfig
Description: Provide the functions to pulling information from the database 
======================
*/

var databaseLocation = 'N/A',
    databaseAccountName = 'N/A',
    databasePassword = 'N/A',
	imageDatabase = 'N/A';

var waypointJSON = null,
	routeJSON = null,
	imageJSON = null,
	configJSON = null;
	
/*
returns the information necessary to populate a waypoint
	Input: "the name of a waypoint"
	Output: {
				"name": "name",
				"type": 1 (initial location) OR 2 (destination) OR 3 (with picture) OR 4 (ignore) OR 5 (invisible),
				"xCoord": "a percentage that places the json on the x-axis on the map",
				"yCoord": "a percentage that places the json on the y-axis on the map",
				"floor": int (denotes floor, 0 is the Terrace level),
				"text": "waypoint text",
				"imageName": "image name"
			}
*/
function getWaypoint(waypointName) {
	//Remove .json extension in call
	var data = getInfo('Waypoints');
	
	
	//return array
	var output = [];
	
	//Saerch through Waypoints.json for the correct waypoint
	for (var i = 0; i < data.length; i++){
		if(data[i]["name"] == waypointName) {
			
			//Load the data into output and return
			output["WaypointName"] = data[i]["name"];
			output["WaypointText"] = data[i]["text"];
			//output["WaypointImages"] = [getImage(data[i]["imageName"])];
			output["WaypointImages"] = [data[i]["imageName"]];
			output["xCoord"] = data[i]["xCoord"];
			output["yCoord"] = data[i]["yCoord"];
			output["Floor"] = data[i]["floor"];
			output["Type"] = data[i]["type"];
				
			return output;
		}
	}
	
	//Waypoint not found
	output["WaypointName"] = "";
	output["WaypointText"] = "";
	output["WaypointImages"] = [new Image()];
	output["xCoord"] = 0;
	output["yCoord"] = 0;
	output["Floor"] = 0;
	output["Type"] = 0;
	return output;
}

/*
returns the route JSON from Routes.json
	Input: starting waypoint name, ending waypoint name
	Output: {
				name: "name",
				start: "starting waypoint name",
				end: "ending waypoint name",
				waypointList: [
								["waypointName", "routeImageName", "routeText"],
								...,
							  ]
			}
*/
function retrieveRoute(start, end) {
	var data = getInfo('Routes');
	
	//Return array
	var output = [];
	
	//Search through Routes.json for the correct route
	for (var i = 0; i < data.length; i++){
		if(data[i]["start"] == start && data[i]["end"] == end) {
			
			//Load the correct route into output and return it
			output["RouteName"] = data[i]["name"];
			output["RouteStart"] = data[i]["start"];
			output["RouteEnd"] = data[i]["end"];
			output["waypointList"] = data[i]["waypointList"];
			output["waypointType"] = data[i]["type"];
				
			return output;
		}
	}
	
	//Route not found
	output["RouteName"] = "";
	output["RouteStart"] = "";
	output["RouteEnd"] = "";
	output["waypointList"] = "";
	output["waypointType"] = 0;
		
	return output;
}



/*
returns all initial locations from Waypoints.json
	Input: none
	Output: [WaypointName, ...]
*/
function getInitialLocations() {
	var data = getInfo('Waypoints');
	
	//Return array
	var output = [];
	
	//Search through waypoints for all initial location waypoints (type = 1)
	for (var i = 0; i < data.length; i++){
		if(data[i]["type"] == 1) {
			
			output.push(data[i]["name"]);
		}
	}
	
	return output;
}

/*
Returns the image URL
	Input: "imageName"
	Output: "imageURL"
*/
function getImage(imageName) {
	var data = getInfo("Images");
	
	output = "Not found"	//Need to be not found picture
	
	//Search through images
	for (var i = 0; i < data.length; i++){
		if(data[i]["name"] == imageName) {
			
			output = data[i]["URL"];
			break;
		}
	}
	
	return output;
}

/*
Uses synchronous AJAX to get JSON
	Input: 'Waypoints' OR 'Routes' OR 'Images' OR 'Config'
	Output: a json structure that relates to the input
*/
function getInfo(info) {
	if(info == 'Waypoints'){
		if(!waypointJSON) {
			waypointJSON = jQuery.ajax({
			  url: 'json/Waypoints.json',
			  async: false,
			  dataType: 'json',
			  success: function (data) {}
			  })["responseJSON"];
		}
		return waypointJSON;
	}
	else if (info == 'Routes') {
		if(!routeJSON) {
			routeJSON = jQuery.ajax({
			  url: 'json/Routes.json',
			  async: false,
			  dataType: 'json',
			  success: function (data) {}
			  })["responseJSON"];
		}
	return routeJSON;
	}
	else if (info == 'Images') {
		if(!imageJSON) {
			imageJSON = jQuery.ajax({
			  url: 'json/Images.json',
			  async: false,
			  dataType: 'json',
			  success: function (data) {}
			  })["responseJSON"];
		}
	return imageJSON;
	}
	else if (info == 'Config') {
		if(!configJSON) {
			configJSON = jQuery.ajax({
			  url: 'json/Config.json',
			  async: false,
			  dataType: 'json',
			  success: function (data) {}
			  })["responseJSON"];
		}
	return configJSON;
	}
}

/*
Load configuration information
	Input: none
	Output: none
*/
function loadConfig() {
	//Can be encapsulated in getInfo()
	var data = getInfo('Config');
	
	//Remove imageDatabase
	imageDatabase = data["imageDatabase"];
	databaseLocation = data["databaseLocation"];
}

loadConfig();