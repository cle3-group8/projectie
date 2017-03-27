

function updatePlayer(playerObject) {

	if (players[playerObject.id]){
		//Push new position to existing player object
		players[playerObject.id].push(
			{
				"color": playerObject.color,
				"x": playerObject.x,
				"y": playerObject.y
			}
		)
	}else{
		//Create new player object
		players[playerObject.id] = [
			{
				"color": playerObject.color,
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

	//Debug
	console.log(players[playerObject.id]);

	updatePositions();
}


function removePlayer(playerObject) {
	if (players[playerObject.id]){
		//Push new position to existing player object
		players[playerObject.id].push(
			{
				"color": playerObject.color,
				"x": playerObject.x,
				"y": playerObject.y
			}
		)
	}
}
