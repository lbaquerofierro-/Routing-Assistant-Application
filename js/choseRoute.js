/*Author: Rodwin Spruel
Date: March 13, 2015
Description: This document is used to provide information for orgin.html's dropdown menus 
*/

var app = angular.module('app', ['ionic','ngResource','ngRoute']);


app.controller('Location', function($scope) {
	    $scope.locations=[
	        {name: "Main Entrance", value: "Main Entrance"},
	        {name: "Lakeside Entrance", value: "Lakeside Entrance"},
	        {name: "Science Hall Entrance", value: "Science Hall Entrance"},
	        {name: "Cafe (Vines Side) Entrance", value: "Vines Entrance"}
	    ]
});
app.controller('Destination', function($scope){
	    $scope.destinations=[
	        	{name: "060 Suite", value: "060 Suite"},
			{name: "170 Suite", value: "170 Suite"},
			{name: "220 Suite", value: "220 Suite"},
			{name: "261 Suite & Osborne Assistive Technology Lab", value: "261 Suite"},
			{name: "280 Suite", value: "280 Suite"},
			{name: "320 Suite (Group Studies Room)", value: "320Suite"},
			{name: "Administration Suite", value: "Administration"},
			{name: "361 Suite & Honors Lounge", value: "361Suite"},
			{name: "Caudell Reading Room", value: "Caudell Reading Room"},
			{name: "Customer Service Center", value: "Customer Service Center"},
			{name: "Dodak Technology Commons", value: "dodak"},
			{name: "Learning Commons", value: "learningCommons"},
			{name: "Scholars Lounge", value: "Scholars Lounge"},
	        	{name: "Terrace Conference Room", value: "Terrace Conference Room"},			
			{name: "Tinney Cafe", value: "tinneyCafe"}
			
	    ];
});
// ROUTES
app.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/Main.htm',
        controller: 'locationController'
    })
     .when('/entrance', {
        templateUrl: 'pages/entrance.htm',
        controller: 'locationController'
    })
    .when('/GSR', {
        templateUrl: 'pages/GSR.htm',
        controller: 'locationController'
    })
    .when('/Lounges', {
        templateUrl: 'pages/Lounges.htm',
        controller: 'locationController'
    })
    .when('/Info', {
        templateUrl: 'pages/info.htm',
        controller: 'locationController'
    })
    .when('/Other', {
        templateUrl: 'pages/Other.htm',
        controller: 'locationController'
    })
    .when('/Destination', {
        templateUrl: 'pages/Destination.htm',
        controller: 'locationController'
    })
    .otherwise( {
//            redirectTo: '/'
    })
});

// CONTROLLERS
app.controller('locationController', ['$scope','LocationService',function($scope,LocationService) {
    
    $scope.start =  function (st) {
        LocationService.start(st);
    }
    
                                      
    $scope.end =  function (end) {
        LocationService.end(end);
    }
    
$scope.entrances = [ 
  { "floor" : "1st Floor",
    "image" : "http://i.imgur.com/dnefsCn.jpg",
    "name" : "Main Entrance",
    "value" : "Main Entrance"
  },
  { "floor" : "Terrace Level",
    "image" : "http://i.imgur.com/N3ZP3JI.jpg",
    "name" : "Lakeside Entrance",
    "value" : "Lakeside Entrance"
  },
  { "floor" : "Terrace Level",
    "image" : "http://i.imgur.com/vBLTdyj.jpg",
    "name" : "Science Hall Entrance",
    "value" : "Science Hall Entrance"
  },
  { "floor" : "Terrace Level",
    "image" : "http://i.imgur.com/gjlLGaB.jpg",
    "name" : "Cafe (Vines Side) Entrance",
   "value" : "Vines Entrance"
  }
];
    
    
$scope.destinations = [ { "floor" : "Terrace Level",
    "image" : "http://i.imgur.com/FYnr49E.jpg",
    "name" : "060 Suite",
    "rooms": ["Rooms:", "Archives" , "Curriculum Library" , "Center for Judaic Studies"],
    "value" : "060 Suite"
  },
  { "floor" : "Terrace Level ",
    "image" : "http://i.imgur.com/rFUKNZR.jpg",
    "name" : "Terrace Conference Room",
    "rooms" : ["Room:", "001 A-B"],
    "value" : "Terrace Conference Room"
  },
  { "floor" : "Terrace Level & 1st Floor",
    "image" : "http://i.imgur.com/BnFLBVgm.jpg",
    "name" : "Tinney Cafe",
    "rooms" : ["Starbucks","Pizza Hut","Brioche Doree","Sushi"],
    "value" : "tinneyCafe"
  },
  { "floor" : "1st Floor",
    "image" : "http://i.imgur.com/UpnN5XS.jpg",
    "name" : "Customer Service Center",
    "rooms" : [],
    "value" : "Customer Service Center"
  },
  { "floor" : "1st Floor",
    "image" : "http://i.imgur.com/M3yod66.jpg",
    "name" :  "Dodak Technology Commons",
    "rooms" : ["Room:", "160"],
    "value" : "dodak"
  },
  { "floor" : "1st Floor",
    "image" : "http://i.imgur.com/6u1bjtE.jpg",
    "name" : "170 Suite:",
    "rooms" : ["Rooms:", "170 A-C", "171 Active Learning Classroom"],
    "value" : "170 Suite"
  },
  { "floor" : "2nd  Floor",
    "image" : "http://i.imgur.com/1XXY4qb.jpg",
    "name" : "220 Suite",
    "rooms" : ["Rooms:", "220 A-G"],
    "value" : "220 Suite"
  },
  { "floor" : "2nd Floor",
    "image" : "http://i.imgur.com/AI6t05l.jpg",
    "name" : "261 Suite",
    "rooms" : ["Rooms:", "261 A-E" , "262 Osborne Assistive Technology Lab"],
    "value" : "261 Suite"
  },
  { "floor" : "2nd Floor",
    "image" : "http://i.imgur.com/FkNsT8l.jpg",
    "name" : "280 Suite",
    "rooms" : ["Rooms:", "280 A-G"],
    "value" : "280 Suite"
  },
  { "floor" : "2nd & 3rd Floors",
    "image" : "http://i.imgur.com/WUzoPCi.jpg",
    "name" : "Caudell Reading Room",
    "rooms" : ["Rooms:", "240 & 340"],
    "value" : "Caudell Reading Room"
  },
  { "floor" : "3rd Floor",
    "image" : "http://i.imgur.com/6tb2LGT.jpg",
    "name" : "Administration Suite",
    "rooms" : ["Room:", "300"],
    "value" : "Administration"
  },
  { "floor" : "3rd Floor",
    "image" : "http://i.imgur.com/Ap0RZr5.jpg",
    "name" : "Pou Learning Commons",
    "rooms" : ["Room:", "310"],
    "value" : "learningCommons"
  },
  { "floor" : "3rd Floor",
    "image" : "http://i.imgur.com/ZdYzlrT.jpg",
    "name" : "320 Suite",
    "rooms" : ["Rooms:", "320 A-K"],
    "value" : "320Suite"
  },
  { "floor" : "3rd Floor",
    "image" : "http://i.imgur.com/Hv5uCMI.jpg",
    "name" : "361 Suite",
    "rooms" : ["Rooms:", "Hornor's Office", "Scholars Commons" , "Scholars Conference Room"],
    "value" : "361Suite"
  },
  { "floor" : "3rd Floor",
    "image" : "http://i.imgur.com/xOzs1uk.jpg",
    "name" : "Scholars Lounge",
    "rooms" : ["Room:", "382"],
    "value" : "Scholars Lounge"
  }  
];
    $scope.goToDestination = function (name)
            {
                window.location.href='origin.html#/Destination';
            }


    $scope.Map = function (){
        
        var start = LocationService.getStart();
        var end = LocationService.getEnd();
        goToMap(start,end);
    }

function goToMap (start,end) {
     //Pass argument to map.html 
		window.location.href = 'map.html' + '?' + start + '&' + end;

    
}

}]);


//This function extracts the selected options and redirects the user to a second page
app.factory('LocationService', function () {
  var app = {}
   app.entrance = null; 
   app.destination = null;
    
    app.start = function (s){
       app.entrance = s;
    }
    
    app.end = function (e){
       app.destination = e;
    }
    
    app.getStart = function () {
        return app.entrance;
    }
    
    app.getEnd = function () {
            return app.destination;
    }
    
    return app
});