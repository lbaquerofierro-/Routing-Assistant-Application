/*
======================
Name: Waypoint Class
Author: Walter Tomlin
Date: February 14, 2015
Functions: WaypointClass
Description: Initialize the Waypoint objects
======================
*/


/*TYPES:
	1 = initial location
	2 = destination
	3 = with picture
	4 = ignore
	5 = invisible
*/

/*WaypointStuff
	[
	 WaypointName,
	 WaypointImage,
	 WaypointText
	]
*/
	function WaypointClass(WayPointStuff)
	{
		
		var test = getWaypoint(WayPointStuff[0]); // Get the waypoint
		
		//If the route has some specific waypoint text, load it 
		if(WayPointStuff[2] != '') {
			this.text = WayPointStuff[2];
		}
		//else load general waypoint text
		else {
			this.text = test['WaypointText'];
		}
		
		//If the route has a waypoint image, load it
		if(WayPointStuff[1] != '') {
			this.images = [getImage(WayPointStuff[1])];
		}
		//else, load the generic waypoint image
		else if (test['WaypointImages'][0] != ""){
			this.images = [getImage(test['WaypointImages'][0])];
		}
		//else, load the placeholder image
		else {
			this.images = getImage("placeholder");
		}
		this.xCoord = test['xCoord'];
		this.yCoord = test['yCoord'];
		this.floor = test['Floor'];
		this.name = test['WaypointName'];
		this.type = test['Type'];
			
	}