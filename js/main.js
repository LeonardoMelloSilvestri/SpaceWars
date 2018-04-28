var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

player = new Player();
bullet = new GlobalBullets();
enemy = new GlobalEnemies();
item = new GlobalItens();
sharpBullet = new SharpBullet();
cometBullet = new CometBullet();
ultimateBullet = new UltimateBullet();

function init() {
	
	loop();
}

function update() {
	player.move();
	player.shootBullet();
	player.hitEnemy();
	player.hitAmmoItem();
	player.hitSupportItem();
	enemy.colideMargin();
	newGame();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	player.draw();
	bullet.drawBullets();
	enemy.drawEnemies();
	item.drawItens();
	ctx.font = "40px Cursive";
	ctx.fillStyle = "White";
	ctx.fillText("Vida: " + player.hp, 40, 40);
	ctx.fillText("Pontuação: " + player.score, 40, 640);
	ctx.fillText("Inimigos abatidos: " + enemyCount, 450, 640);
	if (player.bulletType != "Classic") {
		if (player.bulletType == "Sharp") {
			ctx.fillText("Munição Afiada: " + sharpBullet.ammo, 400, 40);
		} else if (player.bulletType == "Comet") {
			ctx.fillText("Munição Cometa: " + cometBullet.ammo, 400, 40);
		} else if (player.bulletType == "Ultimate") {
			ctx.fillText("Munição Suprema: " + ultimateBullet.ammo, 400, 40);
		}
	}
}

function loop() {
	window.requestAnimationFrame(loop, canvas);
	update();
	draw();
}

enemy.spawnEnemies();
init();

