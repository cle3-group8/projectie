

function updatePlayer(playerObject) {
	if(removedPlayers.indexOf("" + playerObject.playerid) > -1) return;

	//Create new players object for specified player if not existing already
	if (!players[playerObject.playerid]){
		players[playerObject.playerid] = {
			"color": playerObject.color,
			"locations": []
		};

	}

	console.log("=======[UPDATING PLAYER]=======");
	console.log("   playerObject.playerid: "+playerObject.playerid);

	//Push new location to existing player object
	players[playerObject.playerid].locations.push(
		{
			"x": playerObject.x,
			"y": playerObject.y
		}
	);

	//Calculate max amount of positions to be shown
	var maxPositions = pathFadeTime * (1000 / socketTransmitionDelay);

	//If max location amount is reached, delete the oldest location
	if (players[playerObject.playerid].locations.length > maxPositions){
		players[playerObject.playerid].locations.shift();
	}

	updatePositions();
	checkCollisionForPlayer(playerObject.playerid);
}


function removePlayer(playerId) {
	if (players[playerId]){
		//Remove player by id
		delete players[playerId];
		removedPlayers.push("" + playerId);
	}

	//Socket send player removal
	socket.emit("playerdies", {
		playerid: playerId
	});
}

function checkCollisionForPlayer(playerId){
	var mainPlayer = players[playerId];
	var lAmount = mainPlayer.locations.length; //Amount of locations
	//console.log("mainplayer object = ", mainPlayer);

	//Get latest pathline from mainPlayer
	if ( (mainPlayer.locations[(lAmount-1)] != undefined) && (mainPlayer.locations[(lAmount-2)] != undefined) ){
		p0_x = mainPlayer.locations[(lAmount-1)].x;
		p0_y = mainPlayer.locations[(lAmount-1)].y;
		p1_x = mainPlayer.locations[(lAmount-2)].x;
		p1_y = mainPlayer.locations[(lAmount-2)].y;
		//console.log("main player: 0x=" + p0_x + ", 0y=" + p0_y + " | 1x=" + p1_x + ", 1y=" + p1_y);

		//Loop all lines from all OTHER players and check if colliding
		for (var loopPlayerId in players){
			//Create local player object
			loopPlayer = players[loopPlayerId];
			//console.log("player from for loop: ", loopPlayer);

			//Skip own path (cannot collide with itself)
			if (loopPlayerId == playerId){
				//console.log("skipping self");
				continue;
			}

		    //Loop all pathlines of loop-player
			for (var i = 0; i < loopPlayer.locations.length-1; i++) {
				if ( (loopPlayer.locations[i] != undefined) && (loopPlayer.locations[i+1] != undefined) ){

					//Get latest line from loop-player
					p2_x = loopPlayer.locations[i].x;
					p2_y = loopPlayer.locations[i].y;
					p3_x = loopPlayer.locations[i+1].x;
					p3_y = loopPlayer.locations[i+1].y;

					//console.log("check line ("+loopPlayerId+"): 2x=" + p2_x + ", 2y=" + p2_y + " | 3x=" + p3_x + ", 3y=" + p3_y);

					var collisionResult = line_intersects(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y);
					if (collisionResult==true){
						removePlayer(playerId);
						console.log("Collision Detected, removing player: "+playerId);
					}
					//console.log("collisionResult = "+collisionResult)
				}
			}
		}
	}
}

function line_intersects(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {

    var s1_x, s1_y, s2_x, s2_y;
    s1_x = p1_x - p0_x;
    s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x;
    s2_y = p3_y - p2_y;

    var s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
    {
        // Collision detected
        return true;
    }

    return false; // No collision
}
