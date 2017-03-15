
var mycanvas = document.getElementById('mycanvas');
var ctx = mycanvas.getContext('2d');

//Vars
var players = {};

//Settings
var pathWidth= 10;
var playerRadius = 20;
var lineWidth = 5;
var socketTransmitionDelay = 100; //ms
var pathFadeTime = 15; //seconds
