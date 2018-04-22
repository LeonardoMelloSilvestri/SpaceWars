var imgSharpItem = document.getElementById('imgSharpItem');
var imgCometItem = document.getElementById('imgCometItem');
var imgUltimateItem = document.getElementById('imgUltimateItem');
var imgHealingItem = document.getElementById('imgHealingItem');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ammoItens = [];
healingItens = [];

function SharpItem() {
	this.name = "Sharp";
	this.height = 80;
	this.width = 80;
	this.x = Math.floor((Math.random() * 600) + 500);
	this.y = Math.floor((Math.random() * 550) + 10);
	this.hp = 2;

	this.draw = function(){
		ctx.drawImage(imgSharpItem, this.x, this.y, this.width, this.height);
	}
}

function CometItem() {
	this.name = "Comet";
	this.height = 80;
	this.width = 120;
	this.x = Math.floor((Math.random() * 600) + 500);
	this.y = Math.floor((Math.random() * 550) + 10);
	this.hp = 2;

	this.draw = function(){
		ctx.drawImage(imgCometItem, this.x, this.y, this.width, this.height);
	}
}

function UltimateItem() {
	this.name = "Ultimate";
	this.height = 100;
	this.width = 100;
	this.x = Math.floor((Math.random() * 600) + 500);
	this.y = Math.floor((Math.random() * 550) + 10);
	this.hp = 2;

	this.draw = function(){
		ctx.drawImage(imgUltimateItem, this.x, this.y, this.width, this.height);
	}
}

function HealingItem() {
	this.name = "Heal";
	this.height = 80;
	this.width = 80;
	this.x = Math.floor((Math.random() * 600) + 500);
	this.y = Math.floor((Math.random() * 550) + 10);
	this.hp = 2;

	this.draw = function(){
		ctx.drawImage(imgHealingItem, this.x, this.y, this.width, this.height);
	}
}

function GlobalItens(){
	this.drawItens = function(){
		for (var i = 0; i < ammoItens.length; i++) {
			var currentAmmoItem = ammoItens[i];
			currentAmmoItem.draw();		
	
			for (var j = 0; j < healingItens.length; j++) {
				var currentHealingItem = healingItens[j];
				currentHealingItem.draw();		
			}
		}
	}

	this.spawnItens = function(){
		for (var i = 0; i < enemies.length; i++) {
			var currentEnemy = enemies[i];
			if (currentEnemy.hp <= 0) {
				var random = Math.floor((Math.random() * 20) + 1);
				if (random >= 0 && random <= 3 && player.bulletType == "Classic") {
					ammoItens.push(new SharpItem());
				} else if (random >= 4 && random <= 5 && player.bulletType == "Classic") {
					ammoItens.push(new CometItem());
				} else if (random == 6 && player.bulletType == "Classic") {
					ammoItens.push(new UltimateItem());
				} else if (random >= 4 && random <= 5) {
					healingItens.push(new HealingItem());
				}
			}
		}
	}
}