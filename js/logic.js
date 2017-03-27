

function updatePlayer(playerObject) {

	if (players[playerObject.id]){
		//Push new position to existing player object
		players[playerObject.id].push(
			{
				"color": playerObject.color,
				"id": playerObject.id,
				"x": playerObject.x,
				"y": playerObject.y
			}
		)
	}else{
		//Create new player object
		players[playerObject.id] = [
			{
				"color": playerObject.color,
				"id": playerObject.id,
				"x": playerObject.x,
				"y": playerObject.y
			}
		]
	}
	//Calculate path amount of positions to be shown
	var maxPositions = pathFadeTime * (1000 / socketTransmitionDelay);
	console.log("maxPositions = "+ maxPositions);
	if (players[playerObject.id].length > maxPositions){
		players[playerObject.id].shift();
	}

	updatePositions();
	checkCollisionForPlayer(playerObject.id);
}


function removePlayer(playerId) {
	if (players[playerId]){
		//Remove player by id
		delete players[playerId];
	}
}

function checkCollisionForPlayer(playerId){
	mainPlayer = players[playerId];

	//Get latest line from mainPlayer
	if ( (mainPlayer[(mainPlayer.length-1)] != undefined) && (mainPlayer[(mainPlayer.length-2)] != undefined) ){
		p0_x = mainPlayer[(mainPlayer.length-1)].x;
		p0_y = mainPlayer[(mainPlayer.length-1)].y;
		p1_x = mainPlayer[(mainPlayer.length-2)].x;
		p1_y = mainPlayer[(mainPlayer.length-2)].y;
		console.log("main player: 0x=" + p0_x + ", 0y=" + p0_y + " | 1x=" + p1_x + ", 1y=" + p1_y);

		//TODO: Loop all lines from all OTHER players and check if colliding

		for (var player in players){
			//Create local player object
			player = players[player];

		    //TODO: Loop all lines of loop-player

				//TODO: Skip own lines (cannot collide with itself)
				if (player.id = mainPlayer.id){
					console.log("skipping self");
					continue;
				}

			if ( (player[(player.length-1)] != undefined) && (player[(player.length-2)] != undefined) ){

				//Get latest line from loop-player
				p2_x = player[(player.length-1)].x;
				p2_y = player[(player.length-1)].y;
				p3_x = player[(player.length-2)].x;
				p3_y = player[(player.length-2)].y;

				console.log("player ("+player.id+"): 2x=" + p2_x + ", 2y=" + p2_y + " | 3x=" + p3_x + ", 3y=" + p3_y);
			}
		}
	}
}
