var imgPlayer = document.getElementById('imgPlayer');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

player = new Player();

window.addEventListener('keydown', function keyDownHandler(e){
	var key = e.keyCode;
	switch (key) {
		case 38:
			player.moveUp = true;
			break;
		case 40:
			player.moveDown = true;
			break;
	}
}, false);

window.addEventListener('keyup', function keyUpHandler(e){
	var key = e.keyCode;
	switch (key) {
		case 38:
			player.moveUp = false;
			break;
		case 40:
			player.moveDown = false;
			break;
	}
}, false);

function Player() {
	this.height = 150;
	this.width = 150;
	this.x = 20;
	this.y = canvas.height / 2 - 75;
	this.moveUp = false;
	this.moveDown = false;
	this.speed = 10;
	this.bulletType = "Classic";
	this.hp = 100;
	this.score = 0;

	this.draw = function(){
		ctx.drawImage(imgPlayer, this.x, this.y, this.width, this.height);
	}

	this.move = function(){
		if (this.moveUp == true && this.y >= 0) {
			this.y -= this.speed;
		} else if (this.moveDown == true && this.y + this.height <= canvas.height) {
			this.y += this.speed;
		}
	}
}