

function updatePlayer(playerObject) {

	if (!players[playerObject.playerid]){
		players[playerObject.playerid] = [];
	}

	console.log("======= playerObject.id"+playerObject.playerid);
	//Push new position to existing player object
	players[playerObject.playerid].push(
		{
			"color": playerObject.color,
			"playerid": playerObject.playerid,
			"x": playerObject.x,
			"y": playerObject.y
		}
	)
	console.log("======= players[] ",players[playerObject.playerid]);

	//Calculate path amount of positions to be shown
	var maxPositions = pathFadeTime * (1000 / socketTransmitionDelay);
	console.log("maxPositions = "+ maxPositions);
	if (players[playerObject.playerid].length > maxPositions){
		players[playerObject.playerid].shift();
	}

	updatePositions();
	checkCollisionForPlayer(playerObject.playerid);
}


function removePlayer(playerId) {
	if (players[playerId]){
		//Remove player by id
		delete players[playerId];
	}
}

function checkCollisionForPlayer(playerId){
	var mainPlayer = players[playerId];
	console.log("mainPlayer = ", mainPlayer);

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

			//console.log("mainplayer = ",mainPlayer);
			//console.log("player = ",player);

			//Skip own path (cannot collide with itself)
			if (player[0].id = mainPlayer.id){
				console.log("skipping self");
				continue;
			}

			console.log("playerid= "+player[0].id);

		    //TODO: Loop all lines of loop-player
			for (var i = 0; i < player.length-1; i++) {
				if ( (player[i] != undefined) && (player[i+1] != undefined) ){

					//Get latest line from loop-player
					p2_x = player[i].x;
					p2_y = player[i].y;
					p3_x = player[i+1].x;
					p3_y = player[i+1].y;

					console.log("player ("+player[i].id+"): 2x=" + p2_x + ", 2y=" + p2_y + " | 3x=" + p3_x + ", 3y=" + p3_y);
				}
			}
		}
	}
}
