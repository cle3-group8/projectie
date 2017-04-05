//Update Loop
window.setInterval(function () {
	updateDisplay();
}, 50);

function updateDisplay(){
	//Clear canvas
	ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);

	//Set background
	ctx.fillStyle='black';
	ctx.fillRect(0 , 0, mycanvas.width, mycanvas.height);
	//console.log("==Looping Players==");
	for (var player in players){
		//console.log("   player in players: ", players[player]);

		//Color
		var color = players[player].color;

		//Get Last position Circle
		last = players[player].locations.length - 1;
		x = players[player].locations[last].x;
		y = players[player].locations[last].y;

		//Circle (player position)
		ctx.beginPath();
		ctx.arc(x, y, playerRadius, 0, 2 * Math.PI, false);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = '#e5e5e5';
		ctx.closePath();
		ctx.stroke();

	    //Each position
		var count = 0;
		for (var pos of players[player].locations){
			if (count >= 1){
				//Previous pos
				var posA_x = players[player].locations[count-1].x;
				var posA_y = players[player].locations[count-1].y;

				//This pos
				var posB_x = players[player].locations[count].x;
				var posB_y = players[player].locations[count].y;

				////console.log("posA: x="+ posA_x + ", y=" + posA_y);
				////console.log("posB: x="+ posB_x + ", y=" + posB_y);

				ctx.beginPath();
				ctx.moveTo(posA_x,posA_y);
				ctx.lineTo(posB_x,posB_y);
				ctx.closePath();
				ctx.lineWidth = pathWidth;
				ctx.strokeStyle = color;
				ctx.stroke();

				/*//Text
      			ctx.strokeStyle = 'black';
				ctx.font = "15px Arial";
      			ctx.lineWidth = 1;
				ctx.fillText("ID= "+players[player][count].id,posB_x,posB_y);
				ctx.strokeText("ID= "+players[player][count].id,posB_x,posB_y);
				*/
			}
			count++;
		}
	}
}
