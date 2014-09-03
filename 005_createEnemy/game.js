enchant();

var core;
var player;
var enemy;

window.onload = function() {
    core = new Core(640, 480);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";

    core.preload('player.PNG');
    core.preload('enemy.PNG');

    core.onload = initGame;
    core.start();
};

function initGame() {
    player = new Sprite(128,128);
    player.image = core.assets['player.PNG'];
    player.x = 256;
    player.y = 352;
    player.addEventListener(Event.ENTER_FRAME,function(){
        if(core.input.right){
            player.x += 4;
        } else if(core.input.left) {
            player.x -= 4;
        }

        if(core.input.up){
            player.y -= 4;
        } else if(core.input.down) {
            player.y += 4;
        }

        if(player.x < 0){
            player.x = 0;
        }if(player.x > 512) {
            player.x = 512;
        }
        if(player.y < 0){
            player.y = 0;
        }
        if(player.y > 352){
            player.y = 352;
        }
    });
    core.rootScene.addChild(player);

    enemy = new Sprite(128,128);
    enemy.image = core.assets['enemy.PNG'];
    enemy.x = 256;
    enemy.y = 0;
    core.rootScene.addChild(enemy);
}