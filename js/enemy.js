var imgClassicEnemy = document.getElementById('imgClassicEnemy');
var imgFastEnemy = document.getElementById('imgFastEnemy');
var imgTankEnemy = document.getElementById('imgTankEnemy');
var imgClassicBullet = document.getElementById('imgClassicBullet');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

enemies = [];
player = new Player();
var enemyCount = 0;
var speedMod = 0;

function ClassicEnemy() {
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

function TankEnemy() {
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
			var random = Math.floor((Math.random() * 10) + 1);
			if (random >= 1 && random <= 5) {
				enemies.push(new ClassicEnemy());
			} else if (random >= 6 && random <= 9) {
				enemies.push(new FastEnemy());
			} else if (random == 10) {
				enemies.push(new TankEnemy());
			}
			enemyCount++;
			if (enemyCount % 10 == 0) {
				speedMod++;
			}
		}, 400);
	}

	this.colideMargin = function(){
		for (var i = 0; i < enemies.length; i++) {
			var currentEnemy = enemies[i];

			if (currentEnemy.x + currentEnemy.width <= 0) {
				player.hp -= currentEnemy.damage;
				enemies.splice(enemies.indexOf(currentEnemy), 1);
			}
		}
	}
}