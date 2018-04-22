var imgClassicEnemy = document.getElementById('imgClassicEnemy');
var imgFastEnemy = document.getElementById('imgFastEnemy');
var imgDiagEnemy = document.getElementById('imgDiagEnemy');
var imgTankEnemy = document.getElementById('imgTankEnemy');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

enemies = [];
player = new Player();
var enemyCount = 0;
var speedMod = 0;

function ClassicEnemy() {
	this.name = "Classic";
	this.height = 100;
	this.width = 100;
	this.x = canvas.width;
	this.y = Math.floor((Math.random() * 540) + 10);
	this.speed = 5 + speedMod;
	this.hp = 2;
	this.damage = 20;
	this.score = 10;

	this.draw = function(){
		this.x -= this.speed;
		ctx.drawImage(imgClassicEnemy, this.x, this.y, this.width, this.height);
	}
}

function FastEnemy() {
	this.name = "Fast";
	this.height = 80;
	this.width = 80;
	this.x = canvas.width;
	this.y = Math.floor((Math.random() * 540) + 10);
	this.speed = 10 + speedMod;
	this.hp = 1;
	this.damage = 10;
	this.score = 20;

	this.draw = function(){
		this.x -= this.speed;
		ctx.drawImage(imgFastEnemy, this.x, this.y, this.width, this.height);
	}
}

function DiagEnemy() {
	this.name = "Diag";
	this.height = 150;
	this.width = 120;
	this.x = canvas.width;
	this.y = Math.floor((Math.random() * 540) + 10);
	this.speed = 3 + speedMod;
	this.posY = Math.floor(Math.random() * 2);
	this.hp = 3;
	this.damage = 15;
	this.score = 30;

	this.draw = function(){
		this.x -= this.speed;
		if (this.posY == 0) {
			this.y -= this.speed;
		} else {
			this.y += this.speed;
		}
		ctx.drawImage(imgDiagEnemy, this.x, this.y, this.width, this.height);
	}
}

function TankEnemy() {
	this.name = "Tank";
	this.height = 150;
	this.width = 150;
	this.x = canvas.width;
	this.y = Math.floor((Math.random() * 500) + 10);
	this.speed = 4 + speedMod;
	this.hp = 5;
	this.damage = 40;
	this.score = 50;

	this.draw = function(){
		this.x -= this.speed;
		ctx.drawImage(imgTankEnemy, this.x, this.y, this.width, this.height);
	}
}

function GlobalEnemies(){
	this.drawEnemies = function(){
		for (var i = 0; i < enemies.length; i++) {
			var currentEnemy = enemies[i];
			currentEnemy.draw();
		}
	}

	this.spawnEnemies = function(){
		setInterval(function(){
			var random = Math.floor((Math.random() * 12) + 1);
			if (random >= 1 && random <= 5) {
				enemies.push(new ClassicEnemy());
			} else if (random >= 6 && random <= 8) {
				enemies.push(new FastEnemy());
			} else if (random >= 9 && random <= 11) {
				enemies.push(new DiagEnemy());
			} else if (random == 12) {
				enemies.push(new TankEnemy());
			}
			enemyCount++;
			if (enemyCount % 10 == 0) {
				speedMod += 0.5;
			}
		}, 500);
	}

	this.colideMargin = function(){
		for (var i = 0; i < enemies.length; i++) {
			var currentEnemy = enemies[i];

			if (currentEnemy.name == "Diag") {
				if (currentEnemy.y + 35 <= 0) {
					currentEnemy.posY = 1;
				} else if (currentEnemy.y + currentEnemy.height - 35 >= canvas.height) {
					currentEnemy.posY = 0;
				}
			}
			if (currentEnemy.x + currentEnemy.width <= 0) {
				player.hp -= currentEnemy.damage;
				enemies.splice(enemies.indexOf(currentEnemy), 1);
			}
		}
	}
}