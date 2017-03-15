

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

	if (players[playerObject.id].length > 20){
		players[playerObject.id].shift();
	}

	updatePositions();
}
