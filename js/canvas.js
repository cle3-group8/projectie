

function updatePositions(){
	//Clear canvas
	ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);

	for (var player in players){
		//Color
		var color = players[player][players[player].length - 1].color;
		//Last position Circle
		x = players[player][players[player].length - 1].x;
		y = players[player][players[player].length - 1].y;

		//Circle (player position)
		ctx.beginPath();
		ctx.arc(x, y, playerRadius, 0, 2 * Math.PI, false);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = '#003300';
		ctx.closePath();
		ctx.stroke();

	    //Each position
		var count = 0;
		for (var pos of players[player]){
			if (count >= 1){
				console.log("pos =" , pos);
				//Previous pos
				var posA_x = players[player][count-1].x;
				var posA_y = players[player][count-1].y;

				//This pos
				var posB_x = players[player][count].x;
				var posB_y = players[player][count].y;

				//console.log("posA: x="+ posA_x + ", y=" + posA_y);
				//console.log("posB: x="+ posB_x + ", y=" + posB_y);
				//TODO: Remove new color every position

				var color = players[player][count].color;

				ctx.beginPath();
				ctx.moveTo(posA_x,posA_y);
				ctx.lineTo(posB_x,posB_y);
				ctx.closePath();
				ctx.lineWidth = pathWidth;
				ctx.strokeStyle = color;
				ctx.stroke();

				//Text
      			ctx.strokeStyle = 'black';
				ctx.font = "15px Arial";
      			ctx.lineWidth = 1;
				ctx.fillText("ID= "+players[player][count].id,posB_x,posB_y);
				ctx.strokeText("ID= "+players[player][count].id,posB_x,posB_y);

			}
			count++;
		}
	}
}
