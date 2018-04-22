var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

player = new Player();
bullet = new GlobalBullets();
sharpBullet = new SharpBullet();
cometBullet = new CometBullet();
ultimateBullet = new UltimateBullet();
enemy = new GlobalEnemies();
item = new GlobalItens();

function menu(){
	ctx.fillStyle = "White";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.font = "45px Cursive";
	ctx.fillText("Comandos", 600, 200);
	ctx.font = "35px Cursive";
	ctx.fillText("Mover a nave para cima: ↑", 600, 240);
	ctx.fillText("Mover a nave para baixo: ↓", 600, 280);
	ctx.fillText("Atirar: Z", 600, 320);
	ctx.font = "45px Cursive";
	ctx.fillText("Objetivo do jogo", 600, 410);
	ctx.font = "35px Cursive";
	ctx.fillText("Impessa que os inimigos", 600, 460);
	ctx.fillText("alcancem a margem esquerda da tela", 600, 510);
	ctx.fillText("caso isso aconteça você perderá vida", 600, 560);
	ctx.fillText("Se sua vida chegar a 0 você perde", 600, 610);
}

menu();

function init() {
	document.getElementById('Play').remove();
	
	loop();
}

function update(){
	player.move();
	bullet.shootBullet();
	bullet.hitEnemy();
	bullet.colideMargin();
	enemy.colideMargin();
	bullet.hitAmmoItem();
	bullet.hitHealingItem();
	newGame();
}

function newGame(){
	if (player.hp <= 0) {
		alert("Você perdeu! Pontuação final: " + player.score);
		player = new Player();
		ammoItens = [];
		enemies = [];
		bullets = [];
		enemyCount = 0;
		speedMod = 0;
	}
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = '40px Cursive';
	ctx.fillStyle = "Red";
	ctx.fillText('Health: ' + player.hp, 150, 30);
	ctx.fillStyle = "White";
	ctx.fillText('Score: ' + player.score, 130, 620);
	ctx.fillText('Enemies: ' + enemyCount, 400, 620);
	if (sharpBullet.ammo > 0 && player.bulletType == "Sharp") {
		ctx.fillText('Sharp ammo: ' + sharpBullet.ammo, 500, 30);	
	} else if (cometBullet.ammo > 0 && player.bulletType == "Comet") {
		ctx.fillText('Comet ammo: ' + cometBullet.ammo, 500, 30);	
	} else if (ultimateBullet.ammo > 0 && player.bulletType == "Ultimate") {
		ctx.fillText('Ultimate ammo: ' + ultimateBullet.ammo, 500, 30);	
	}
	player.draw();
	bullet.drawBullets();
	enemy.drawEnemies();
	item.drawItens();
}

function loop(){
	window.requestAnimationFrame(loop, canvas);
	update();
	draw();
}
