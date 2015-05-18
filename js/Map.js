/*

Author: Lina Baquero, 
		Rodwin Spruel, 
		Walter Schultz
Date: February 13, 2015
Description: This document contain the functions in charge of rendering the map and waypoints

*/


function Map(){
	this.CurrentLayer = 0;
	this.Floors = [];
	this.CurrentWaypoint = 0;
	
	
	//Break route into separate floors so that each floor can be rendered separately 
	this.LoadRoute = function (route){
		var layer = 0;
		var tempFloor = 1;
		
		//add step count to waypoint text
		route = this.countSteps(route);
		
		//separate the route by floors
		for(var i = 0; i < route.length; i++){
			if(i == 0){
				tempFloor = route[0].floor;
				this.Floors[layer] = new Array();
			}
			
			if (tempFloor == route[i].floor){
				this.Floors[layer].push(route[i]);
			}
			else {
				layer += 1;
				tempFloor = route[i].floor;
				this.Floors[layer] = new Array();
				this.Floors[layer].push(route[i]);
			}
		}
		
		//initialize the map
		this.DrawScreen(this.Floors[this.CurrentLayer]);
		this.changeWaypoint('walkingMan', this.Floors[0][0].xCoord, this.Floors[0][0].yCoord);
		
		//Insert first instruction 
		document.getElementById('inst').innerHTML = this.Floors[0][0].text; 
		
		$("#img0").toggleClass("blink");
	}
	
	//Moves the current floor to the next floor in the route and renders the floor
	this.upFloor = function () {
		if (!(this.Floors.length > 0)){
			return false;
		}
		
		if (this.CurrentLayer < this.Floors.length - 1) {
			this.CurrentLayer += 1;
			this.DrawScreen(this.Floors[this.CurrentLayer]);
		}
	}
	
	//Moves the current floor to the last floor in the route and renders the floor
	this.downFloor = function () {
		if (!(this.Floors.length > 0)){
			return false;
		}
		
		if (this.CurrentLayer > 0) {
			this.CurrentLayer -= 1;
			this.DrawScreen(this.Floors[this.CurrentLayer]);
		}
	}
	
	
	//Moves to the man to the next waypoint
	this.walkForward = function () {
		waypoint = this.CurrentWaypoint;
		
		//loop through the floors
		for(var i = this.CurrentLayer; i < this.Floors.length; i++) {
			
			//loop through the waypoints on a floor
			for(var j = 0; j < this.Floors[i].length; j++) {
				
				//check if the waypoint is visible
				if(i >= this.CurrentLayer && j > waypoint && (this.Floors[i][j].type == 1 || this.Floors[i][j].type == 2 || this.Floors[i][j].type == 3)) {
					this.CurrentWaypoint = j;
					$("#img" + waypoint).toggleClass("blink");
					
					//the next waypoint is not on the current floor
					if(i > this.CurrentLayer) {
						this.CurrentLayer = i;
						this.DrawScreen(this.Floors[this.CurrentLayer]);
						$("#navText").text(this.Floors[i][j].text);						
						this.changeWaypoint('walkingMan', this.Floors[i][j].xCoord, this.Floors[i][j].yCoord);
						$("#img" + j).toggleClass("blink");
						document.getElementById('inst').innerHTML = this.Floors[i][j].text; 
						return true;
					}
					//the next waypoint is on the this floor
					else {
						this.changeWaypoint('walkingMan', this.Floors[i][j].xCoord, this.Floors[i][j].yCoord);
						$("#img" + j).toggleClass("blink");
						$("#navText").text(this.Floors[i][j].text);
						document.getElementById('inst').innerHTML = this.Floors[i][j].text; 
						return true;
					}
				}
			}
			waypoint = -1;
		}
		return false;
	}
	 
	//Moves to the man to the next waypoint
	this.walkBack = function () {
		waypoint = this.CurrentWaypoint;
		
		//loop through the floors
		for(var i = this.CurrentLayer; i >= 0; i--) {
			
			//loop through the waypoints on a floor
			for(var j = this.Floors[i].length - 1; j >= 0; j--) {
				
				//check if the waypoint is visible
				if(i <= this.CurrentLayer && j < waypoint && (this.Floors[i][j].type == 1 || this.Floors[i][j].type == 2 || this.Floors[i][j].type == 3)) {
					this.CurrentWaypoint = j;
					$("#img" + waypoint).toggleClass("blink");
					
					//the next waypoint is not on the current floor
					if(i < this.CurrentLayer) {
						this.CurrentLayer = i;
						this.DrawScreen(this.Floors[this.CurrentLayer]);
						this.changeWaypoint('walkingMan', this.Floors[i][j].xCoord, this.Floors[i][j].yCoord);
						$("#img" + j).toggleClass("blink");
						this.DrawLines(this.Floors[this.CurrentLayer]);
						document.getElementById('inst').innerHTML = this.Floors[i][j].text;
						return true;
					}
					//the next waypoint is on the this floor
					else {
						this.changeWaypoint('walkingMan', this.Floors[i][j].xCoord, this.Floors[i][j].yCoord);
						$("#img" + j).toggleClass("blink");
						this.DrawLines(this.Floors[this.CurrentLayer]);
						document.getElementById('inst').innerHTML = this.Floors[i][j].text;
						return true;
					}
				}
			}
			
			//move down one floor
			if(i != 0) {
				waypoint = this.Floors[i - 1].length;
			}
		}
		return false;
	}
	
	//Renders the images for a list of waypoints
	this.DrawScreen = function (route){
		//Variable to draw images
		var imgn; 
		var node; 
		var cssProp;//Variables to store order
		var floorNum; //Store floor number
		var lastFloor; //Load each floor map only once
		
		//Clear previous CSS for next floor
		var tempMain = document.getElementById("main");
		while (tempMain.firstChild) {
			tempMain.removeChild(tempMain.firstChild);
		}
		
		//Get floor map
		function drawMap(map){
			return getImage("Floor" + map);
		}
		
		//Draw waypoint(*source*)
		function wpImage(num){
			switch(num){
			case 1: //start
				return getImage("startWaypoint");
				break; 
			case 2: //destination
				return getImage("endWaypoint");
				break;
			case 3: //with picture
				return getImage("wPictureWaypoint");
				break;
			case 4: //without picture
				return getImage("woutImageWaypoint");
				break;
			case 5: //invisible
				return getImage("invisible2"); //Temp
				break;
			}
		}
		
		function newImage(aClass, aid, aSource, caption, imID, imSource, flag){
			var newIm;
			var alink;
			alink = document.createElement('a'); 
			alink.setAttribute("class", aClass); 
			alink.id = aid;
			if (aSource != '') {
				alink.href = aSource;
			}
			//alink.title = caption; 
			newIm = document.createElement("img"); 
			newIm.id = imID; 
			newIm.src = imSource; 
			
			//load map/load waypoints
			if(flag == true){ 
				document.getElementById("main").appendChild(alink);	
				alink.appendChild(newIm);
			} else{
				document.getElementById("main").appendChild(newIm);
			}
		}
		
		
		//Set newImage Properties
		function setCSS(p, w, t1, t2){
			//local variables
			var p; //position
			var w; //widtth
			var t = "50%"; //margin top
			var l = "50%"; //left margin
			var t1; //horizontal transformation
			var t2; //vertical transformation
			
			var cssString = 'position:'+p+';width:'+w+';top:'+t+';left:'+l+';transform:translate('+t1+','+t2+');-webkit-transform:translate('+t1+','+t2+');-moz-transform:translate('+t1+','+t2+');-ms-transform:translate('+t1+','+t2+');z-index: 2;'
			
			return cssString; 
		}
			
		//Create the walking man
		newImage("walker", "", "", "He walks!", "walkingMan", "images/halo3_Icon.png", true);
		
		
		//Draw floor map
		for(var i = 0; i < route.length; i++){
			floorNum = route[i].floor; 
			if(floorNum == lastFloor){
			}else{
				src =  drawMap(floorNum);
				newImage("", "", "#","", "loadPlan", src, false);
			}
			lastFloor = floorNum;
			
			
			//If wp has a picture
			var className; 
			var aIm; 
			var captionText; 
			if(route[i].type == 1 || route[i].type == 2 || route[i].type == 3){
				className = "popup"; 
				aIm = route[i].images;
			} else{
				className = "";
				aIm = "";
			}
			
			//Draw waypoints
			wpImg = wpImage(route[i].type);  
			newImage(className, "", aIm, captionText, 'img'+String(i), wpImg, true);
			cssProp = setCSS("absolute","3%",route[i].xCoord,route[i].yCoord); 
			document.getElementById('img'+String(i)).style.cssText = cssProp;
			
			//draw the lines when the last waypoint is drawn
			if(route[i].type == 2){
				document.getElementById('img'+String(i)).onload = function() {map.DrawLines(map.Floors[map.CurrentLayer]);}
			}
			
			//Initializes popups for the new waypoints being rendered
			$(".popup").magnificPopup({
				type: 'image',
				closeOnContentClick: true,
				mainClass: 'mfp-img-mobile',
				image: {
					verticalFit: true
				}
			});
			
		}
	}
	
	/*Move the white background dot to another waypoint
		Input: dotID, waypointxCoord, waypointyCoord
		Output: none
	*/
	this.changeWaypoint = function(id, xCoord, yCoord){
		yCoord = yCoord.replace("%", "");
		yCoord = parseInt(yCoord) - 0; //90;
		yCoord = String(yCoord) + "%";
		document.getElementById(id).style.cssText = 'position:absolute;width:3%;top:50%;left:50%;transform:translate('+xCoord+','+yCoord+');-webkit-transform:translate('+xCoord+','+yCoord+');-moz-transform:translate('+xCoord+','+yCoord+');-ms-transform:translate('+xCoord+','+yCoord+');z-index: 1;'
	}
	
	
	this.DrawLines = function (route){
		//Clear the canvas
		if(!(typeof this.context == 'undefined')) {
			this.context.clearRect( 0 , 0 , this.canvas.width, this.canvas.height );
		}
		else {
			this.canvas = document.getElementById('canvas');
			this.context = canvas.getContext('2d');
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
		}
		
		
		for(var i = 0; i < route.length; i++){
			var el = document.getElementById('img'+String(i));
			var curTransform = new WebKitCSSMatrix(window.getComputedStyle(el).webkitTransform);
			var a;
			var b;
			var c;
			if(i%2==0){
				a = i;  
				x1 = el.offsetLeft + curTransform.m41;
				y1 = el.offsetTop + curTransform.m42;
				h1 = document.getElementById('img'+String(i)).clientHeight;
				w1 = h1; 
			}else if(i%2==1){
				b = i;  
				x2 = el.offsetLeft + curTransform.m41;
				y2 = el.offsetTop + curTransform.m42;
				h2 = document.getElementById('img'+String(i)).clientHeight;
				w2 = h2; 
			}else{}
			if(i>0){
				this.context.strokeStyle = "white"; 
				this.context.beginPath();
				this.context.moveTo(x1 + w1/2, y1 + h1/2);
				this.context.lineTo(x2 + w2/2, y2 + h2/2);
				this.context.stroke(); 
			}
		}
	}
	
	this.countSteps = function(route)
	{
		var waypoints = [];
		
		//find all visible waypoints and save their index
		for (var i = 0; i < route.length; i++) {
			if(route[i].type.type == 1 || route[i].type == 2 || route[i].type == 3) {
				waypoints.push(i);
			}
		}
		
		//add a step count to the waypoint text
		//	e.g. (step 3 of 8) Go to...
		for (var i = 0; i < waypoints.length; i++){
			route[waypoints[i]].text = "(Step " + (i + 1) + " of " + (waypoints.length) + ") " + route[waypoints[i]].text;
		}
		
		//return the route with modified text
		return route;
	}
	
}