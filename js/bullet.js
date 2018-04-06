var imgClassicBullet = document.getElementById('imgClassicBullet');
var imgSharpBullet = document.getElementById('imgSharpBullet');
var imgUltimateBullet = document.getElementById('imgUltimateBullet');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

player = new Player();
bullet = new GlobalBullets();
sharpBullet = new SharpBullet();
ultimateBullet = new UltimateBullet();
enemy = new GlobalEnemies();
item = new GlobalItens();
bullets = [];

window.addEventListener('keydown', function keyDownHandler(e){
	var key = e.keyCode;
	switch (key) {
		case 90:
			if (!bullet.zIsDown) {
				bullet.zIsDown = true;
				bullet.shoot = true;
			}
			break;
	}
}, false);

window.addEventListener('keyup', function keyUpHandler(e){
	var key = e.keyCode;
	switch (key) {
		case 90:
			bullet.zIsDown = false;
			break;
	}
}, false);

function ClassicBullet(){
	this.height = 50;
	this.width = 80;
	this.x = player.x + 120;
	this.y = player.y + 50;
	this.speed = 40;
	this.damage = 1;

	this.draw = function(){
		this.x += this.speed;
		ctx.drawImage(imgClassicBullet, this.x, this.y, this.width, this.height);
	}
}

function SharpBullet(){
	this.height = 200;
	this.width = 150;
	this.x = player.x + 20;
	this.y = player.y;
	this.speed = 30;
	this.zIsDown = false;
	this.shoot = false;
	this.damage = 5;
	this.ammo = 0;

	this.draw = function(){
		this.x += this.speed;
		ctx.drawImage(imgSharpBullet, this.x, this.y, this.width, this.height);
	}
}

function UltimateBullet(){
	this.height = 800;
	this.width = 500;
	this.x = player.x + 50;
	this.y = player.y - 320;
	this.speed = 50;
	this.zIsDown = false;
	this.shoot = false;
	this.damage = 100;
	this.ammo = 0;

	this.draw = function(){
		this.width += this.speed;
		ctx.drawImage(imgUltimateBullet, this.x, this.y, this.width, this.height);
	}
}

function GlobalBullets(){
	this.drawBullets = function(){
		for (var i = 0; i < bullets.length; i++) {
			var currentBullet = bullets[i];
			currentBullet.draw();
		}
	}

	this.shootBullet = function(){
		if (this.shoot == true) {
			if (player.bulletType == "Classic") {
				bullets.push(new ClassicBullet());
			} else if (player.bulletType == "Sharp") {
				bullets.push(new SharpBullet());
				sharpBullet.ammo--;
				if (sharpBullet.ammo <= 0) {
					player.bulletType = "Classic";
				}
			} else if (player.bulletType == "Ultimate") {
				player.score += 1000;
				enemies = [];
				bullets.push(new UltimateBullet());
				ultimateBullet.ammo--;
				if (ultimateBullet.ammo <= 0) {
					player.bulletType = "Classic";
				}
			}
		}
		this.shoot = false;
	}

	this.colideMargin = function(){
		for (var i = 0; i < bullets.length; i++) {
			var currentBullet = bullets[i];

			if (currentBullet.x >= canvas.width && player.bulletType != "Ultimate") {
				bullets.splice(bullets.indexOf(currentBullet), 1);
			} else if (currentBullet.x + currentBullet.width >= canvas.width) {
				bullets.splice(bullets.indexOf(currentBullet), 1);
			}
		}
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
						if (currentEnemy.hp <= 0) {
							item.spawnItens();
							player.score += currentEnemy.score;
							enemies.splice(enemies.indexOf(currentEnemy), 1);
						}
						if (player.bulletType != "Ultimate") {
							bullets.splice(bullets.indexOf(currentBullet), 1);
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
					bullets.splice(bullets.indexOf(currentBullet), 1);
					if (currentAmmoItem.hp <= 0) {
						player.bulletType = currentAmmoItem.name;
						if (currentAmmoItem.name == "Sharp") {
							sharpBullet.ammo = 20;
						} else if (currentAmmoItem.name == "Ultimate") {
							ultimateBullet.ammo = 1; 
						}
						ammoItens = [];
					}
				}
			}
		}
	}

	this.hitHealingItem = function(){
		for (var i = 0; i < bullets.length; i++) {
			var currentBullet = bullets[i];

			for (var j = 0; j < healingItens.length; j++) {
				var currentHealingItem = healingItens[j];

				if (currentBullet.x + currentBullet.width >= currentHealingItem.x &&
					currentBullet.x <= currentHealingItem.x + currentHealingItem.width &&
					currentBullet.y + currentBullet.height >= currentHealingItem.y &&
					currentBullet.y <= currentHealingItem.y + currentHealingItem.height) {
					currentHealingItem.hp -= currentBullet.damage;
					bullets.splice(bullets.indexOf(currentBullet), 1);
					if (currentHealingItem.hp <= 0) {
						if (currentHealingItem.name == "Heal") {
							player.hp += 30;
						}
						healingItens = [];
					}
				}
			}
		}
	}
}