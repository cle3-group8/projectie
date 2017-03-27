var socket = io('http://game.maashaven.win:3000');

socket.on("playermove", function(data){
	for (player of data){
		console.log("player: ", player)
		updatePlayer(player);
	}
});
