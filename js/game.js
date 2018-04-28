var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

bullets = [];
enemies = [];
supportItens = [];
ammoItens = [];

var enemyCount = 0;
var enemySpeedMod = 0;
var enemyDamageMod = 0;

images = new LoadImages();
player = new Player();
item = new GlobalItens();
sharpBullet = new SharpBullet();
cometBullet = new CometBullet();
ultimateBullet = new UltimateBullet();

function LoadImages(){
	this.imgPlayer = new Image();
	this.imgPlayer.src = "./img/player.png";

	this.imgClassicBullet = new Image();
	this.imgClassicBullet.src = "./img/classicBullet.png";

	this.imgSharpBullet = new Image();
	this.imgSharpBullet.src = "./img/sharpBullet.png";

	this.imgCometBullet = new Image();
	this.imgCometBullet.src = "./img/cometBullet.png";

	this.imgUltimateBullet = new Image();
	this.imgUltimateBullet.src = "./img/ultimateBullet.png";

	this.imgClassicEnemy = new Image();
	this.imgClassicEnemy.src = "./img/classicEnemy.png";

	this.imgFastEnemy = new Image();
	this.imgFastEnemy.src = "./img/fastEnemy.png";

	this.imgDiagEnemy = new Image();
	this.imgDiagEnemy.src = "./img/diagEnemy.png";

	this.imgTankEnemy = new Image();
	this.imgTankEnemy.src = "./img/tankEnemy.png";

	this.imgHealingItem = new Image();
	this.imgHealingItem.src = "./img/healingItem.png";

	this.imgSharpItem = new Image();
	this.imgSharpItem.src = "./img/sharpItem.png";

	this.imgCometItem = new Image();
	this.imgCometItem.src = "./img/cometItem.png";

	this.imgUltimateItem = new Image();
	this.imgUltimateItem.src = "./img/ultimateItem.png";
}

window.addEventListener('keydown', function keyDownHandler(e){
	switch (e.keyCode) {
		case 38:
			player.moveUp = true;
			break;
		case 40:
			player.moveDown = true;
			break;
		case 90:
			if (!player.zIsDown) {
				player.shoot = true;
				player.zIsDown = true;
			}
			break;
	}
}, false)

window.addEventListener('keyup', function keyUpHandler(e){
	switch (e.keyCode) {
		case 38:
			player.moveUp = false;
			break;
		case 40:
			player.moveDown = false;
			break;
		case 90:
			player.zIsDown = false;
			break;
	}
}, false)

function Player() {
	this.bulletType = "Classic";
	this.height = 120;
	this.width = 120;
	this.x = 30;
	this.y = canvas.height / 2 - (this.height / 2);
	this.img = images.imgPlayer;
	this.moveUp = false;
	this.moveDown = false;
	this.shoot = false;
	this.zIsDown = false;
	this.speed = 10;
	this.hp = 100;
	this.score = 0;

	this.draw = function(){
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	this.move = function(){
		if (this.moveUp == true && this.y >= 0) {
			this.y -= this.speed;
		} else if (this.moveDown == true && this.y + this.height <= canvas.height) {
			this.y += this.speed;
		}
	}

	this.shootBullet = function(){
		if (this.shoot == true) {
			if (this.bulletType == "Classic") {
				bullets.push(new ClassicBullet());
			} else if (this.bulletType == "Sharp") {
				bullets.push(new SharpBullet());
				sharpBullet.ammo--;
				if (sharpBullet.ammo <= 0) {
					player.bulletType = "Classic";
				}
			} else if (this.bulletType == "Comet") {
				bullets.push(new CometBullet());
				cometBullet.ammo--;
				if (cometBullet.ammo <= 0) {
					player.bulletType = "Classic";
				}
			} else if (this.bulletType == "Ultimate") {
				bullets.push(new UltimateBullet());
				ultimateBullet.ammo--;
				if (ultimateBullet.ammo <= 0) {
					player.bulletType = "Classic";
				}
			}
		}
		this.shoot = false;
	}

	this.hitEnemy = function(){
		for (var i = 0; i < enemies.length; i++) {
			var currentEnemy = enemies[i];

			for (var j = 0; j < bullets.length; j++) {
				var currentBullet = bullets[j];

				if (currentBullet.x + currentBullet.width >= currentEnemy.x &&
					currentBullet.x <= currentEnemy.x + currentEnemy.width &&
					currentBullet.y + currentBullet.height >= currentEnemy.y &&
					currentBullet.y <= currentEnemy.y + currentEnemy.height) {
					currentEnemy.hp -= currentBullet.damage;
					if (currentBullet.passThrough == false) {
						bullets.splice(bullets.indexOf(currentBullet), 1);
					}

					if (currentEnemy.hp <= 0) {
						item.spawnItens();
						enemyCount++;
						player.score += currentEnemy.score;
						enemies.splice(enemies.indexOf(currentEnemy), 1);
						if (enemyCount % 10 == 0) {
							enemySpeedMod += 0.4;
							enemyDamageMod += 5;
						}
					}
				}
			}
		}
	}

	this.hitAmmoItem = function(){
		for (var i = 0; i < bullets.length; i++) {
			var currentBullet = bullets[i];

			for (var j = 0; j < ammoItens.length; j++) {
				var currentAmmoItem = ammoItens[j];

				if (currentBullet.x + currentBullet.width >= currentAmmoItem.x &&
					currentBullet.x <= currentAmmoItem.x + currentAmmoItem.width &&
					currentBullet.y + currentBullet.height >= currentAmmoItem.y &&
					currentBullet.y <= currentAmmoItem.y + currentAmmoItem.height) {
					currentAmmoItem.hp -= currentBullet.damage;
					if (currentBullet.passThrough == false) {
						bullets.splice(bullets.indexOf(currentBullet), 1);
					}
					if (currentAmmoItem.hp <= 0) {
						ammoItens = [];
						player.bulletType = currentAmmoItem.name;
						if (currentAmmoItem.name == "Sharp") {
							sharpBullet.ammo = 15;
						} else if (currentAmmoItem.name == "Comet") {
							cometBullet.ammo = 15; 
						} else if (currentAmmoItem.name == "Ultimate") {
							ultimateBullet.ammo = 5;
						}		
					}
				}
			}
		}
	}

	this.hitSupportItem = function(){
		for (var i = 0; i < bullets.length; i++) {
			var currentBullet = bullets[i];

			for (var j = 0; j < supportItens.length; j++) {
				var currentSupportItem = supportItens[j];

				if (currentBullet.x + currentBullet.width >= currentSupportItem.x &&
					currentBullet.x <= currentSupportItem.x + currentSupportItem.width &&
					currentBullet.y + currentBullet.height >= currentSupportItem.y &&
					currentBullet.y <= currentSupportItem.y + currentSupportItem.height) {
					currentSupportItem.hp -= currentBullet.damage;
					if (currentSupportItem.hp <= 0) {
						if (currentSupportItem.name == "Heal") {
							player.hp += 30;
						}
						supportItens.splice(supportItens.indexOf(currentSupportItem), 1);
					}
				}
			}
		}
	}
}

function ClassicBullet(){
	this.name = "Classic";
	this.height = 40;
	this.width = 40;
	this.x = player.x + 80;
	this.y = player.y + 40;
	this.img = images.imgClassicBullet;
	this.speed = 25;
	this.passThrough = false;
	this.damage = 1;

	this.draw = function(){
		this.x += this.speed;
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

function SharpBullet(){
	this.name = "Sharp";
	this.height = 120;
	this.width = 100;
	this.x = player.x + 20;
	this.y = player.y;
	this.img = images.imgSharpBullet;
	this.speed = 20;
	this.passThrough = false;
	this.ammo = 0;
	this.damage = 5;

	this.draw = function(){
		this.x += this.speed;
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

function CometBullet(){
	this.name = "Comet";
	this.height = 50;
	this.width = 120;
	this.x = player.x + 80;
	this.y = player.y + 35;
	this.img = images.imgCometBullet;
	this.speed = 20;
	this.passThrough = true;
	this.ammo = 0;
	this.damage = 10;

	this.draw = function(){
		this.x += this.speed;
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

function UltimateBullet(){
	this.name = "Ultimate";
	this.height = 350;
	this.width = 350;
	this.x = player.x;
	this.y = player.y - 100;
	this.img = images.imgUltimateBullet;
	this.speed = 10;
	this.passThrough = true;
	this.ammo = 0;
	this.damage = 10;

	this.draw = function(){
		this.x += this.speed;
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

function GlobalBullets(){
	this.drawBullets = function(){
		for (var i = 0; i < bullets.length; i++) {
			var currentBullet = bullets[i];
			currentBullet.draw();

			if (currentBullet.x >= canvas.width) {
				bullets.splice(bullets.indexOf(currentBullet), 1);
			}
		}
	}
}

function ClassicEnemy(){
	this.name = "Classic";
	this.height = 100;
	this.width = 100;
	this.x = canvas.width;
	this.y = Math.floor((Math.random() * 540) + 10);
	this.speed = 5 + enemySpeedMod;
	this.img = images.imgClassicEnemy;
	this.damage = 20 + enemyDamageMod;
	this.hp = 2;
	this.score = 10;

	this.draw = function(){
		this.x -= this.speed;
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

function FastEnemy(){
	this.name = "Fast";
	this.height = 100;
	this.width = 100;
	this.x = canvas.width;
	this.y = Math.floor((Math.random() * 540) + 10);
	this.speed = 8 + enemySpeedMod;
	this.img = images.imgFastEnemy;
	this.damage = 10 + enemyDamageMod;
	this.hp = 1;
	this.score = 20;

	this.draw = function(){
		this.x -= this.speed;
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

function DiagEnemy(){
	this.name = "Diag";
	this.height = 100;
	this.width = 100;
	this.x = canvas.width;
	this.y = Math.floor((Math.random() * 540) + 10);
	this.speed = 3 + enemySpeedMod;
	this.positionY = Math.floor(Math.random() * 2);
	this.img = images.imgDiagEnemy;
	this.damage = 15 + enemyDamageMod;
	this.hp = 2;
	this.score = 20;

	this.draw = function(){
		this.x -= this.speed;
		if (this.positionY == 0) {
			this.y -= this.speed;
		} else {
			this.y += this.speed;
		}
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

function TankEnemy(){
	this.name = "Tank";
	this.height = 100;
	this.width = 100;
	this.x = canvas.width;
	this.y = Math.floor((Math.random() * 540) + 10);
	this.speed = 3 + enemySpeedMod;
	this.img = images.imgTankEnemy;
	this.damage = 30 + enemyDamageMod;
	this.hp = 5;
	this.score = 100;

	this.draw = function(){
		this.x -= this.speed;
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
			var random = Math.floor(Math.random() * 12);
			if (random >= 0 && random <= 5) {
				enemies.push(new ClassicEnemy());
			} else if (random >= 6 && random <= 8) {
				enemies.push(new FastEnemy());
			} else if (random >= 9 && random <= 10) {
				enemies.push(new DiagEnemy());
			} else if (random == 11) {
				enemies.push(new TankEnemy());
			} 
		}, 500)
	}

	this.colideMargin = function(){
		for (var i = 0; i < enemies.length; i++) {
			var currentEnemy = enemies[i];

			if (currentEnemy.x + currentEnemy.width <= 0) {
				enemies.splice(enemies.indexOf(currentEnemy), 1);
				player.hp -= currentEnemy.damage;
			}

			if (currentEnemy.name == "Diag") {
				if (currentEnemy.y + 20 <= 0) {
					currentEnemy.positionY = 1;
				} else if (currentEnemy.y + currentEnemy.height - 20 >= canvas.height) {
					currentEnemy.positionY = 0;
				}
			}
		}
	}
}

function HealItem(){
	this.name = "Heal";
	this.height = 50;
	this.width = 50;
	this.img = images.imgHealingItem;
	this.x = Math.floor((Math.random()* 400) + 400);
	this.y = Math.floor((Math.random()* 500) + 10);
	this.hp = 2;

	this.draw = function(){
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

function SharpItem(){
	this.name = "Sharp";
	this.height = 70;
	this.width = 70;
	this.img = images.imgSharpItem;
	this.x = Math.floor((Math.random()* 400) + 400);
	this.y = Math.floor((Math.random()* 500) + 10);
	this.hp = 2;

	this.draw = function(){
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

function CometItem(){
	this.name = "Comet";
	this.height = 70;
	this.width = 120;
	this.img = images.imgCometItem;
	this.x = Math.floor((Math.random()* 400) + 400);
	this.y = Math.floor((Math.random()* 500) + 10);
	this.hp = 2;

	this.draw = function(){
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

function UltimateItem(){
	this.name = "Ultimate";
	this.height = 100;
	this.width = 100;
	this.img = images.imgUltimateItem;
	this.x = Math.floor((Math.random()* 400) + 400);
	this.y = Math.floor((Math.random()* 500) + 10);
	this.hp = 2;

	this.draw = function(){
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

function GlobalItens(){
	this.drawItens = function(){
		for (var i = 0; i < ammoItens.length; i++) {
			var currentAmmoItem = ammoItens[i];
			currentAmmoItem.draw();		
		}

		for (var j = 0; j < supportItens.length; j++) {
			var currentSupportItem = supportItens[j];
			currentSupportItem.draw();		
		}
	}

	this.spawnItens = function(){
		for (var i = 0; i < enemies.length; i++) {
			var currentEnemy = enemies[i];

			if (currentEnemy.hp <= 0) {
				var random = Math.floor(Math.random()* 40);
				if (random >= 10 && random <= 18) {
					supportItens.push(new HealItem());
				} else if (random >= 4 && random <= 5 && player.bulletType == "Classic") {
					ammoItens.push(new SharpItem());
				} else if (random >= 6 && random <= 8 && player.bulletType == "Classic") {
					ammoItens.push(new CometItem());
				} else if (random == 9 && player.bulletType == "Classic") {
					ammoItens.push(new UltimateItem());
				}			
			}

		}
	}
}

function newGame(){
	if (player.hp <= 0) {
		alert("Você perdeu! Pontuação final: " + player.score);
		player = new Player();
		enemies = [];
		bullets = [];
		supportItens = [];
		ammoItens = [];
		enemyCount = 0;
		enemySpeedMod = 0;
		enemyDamageMod = 0;
	}
}

