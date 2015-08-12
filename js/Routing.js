/*
======================
Name: Routing
Author: Lina Baquero
Functions: getWaypoint
======================
*/

function Route (start, end){
	this.route = [];
	
	//Get the route information
	var raw = retrieveRoute(start, end);
	
	//Initialize waypoints and load them into the object attribute
	for(var i = 0; i < raw["waypointList"].length; i++){
		this.route.push(new WaypointClass(raw["waypointList"][i]));
	}
	
	//Not used
	function getRoute() {
		return this.route;
	}
	
}
