
function simulation() {
	console.log("Starting simulation...");
    var p1_id = 1;
	var p1_x = 0;
	var p1_y = 0;

    var p2_id = 2;
	var p2_x = mycanvas.width - 200;
	var p2_y = -200;

	//Loop
    window.setInterval(function () {
		//PLAYER 1
		p1_x += 5;
		p1_y += 5;

		console.log("p1_id= "+p1_id);

		//Create object
		var playerObject1 = {
			"color": '#ff0000',
			"playerid": 1,
			"x": p1_x,
			"y": p1_y
		};
		updatePlayer(playerObject1);

		//PLAYER 2
		p2_x -= 5;
		p2_y += 5;

		//Create object
		var playerObject2 = {
			"color": '#00bbff',
			"playerid": 2,
			"x": p2_x,
			"y": p2_y
		};
		updatePlayer(playerObject2);
    }, 200);
}
