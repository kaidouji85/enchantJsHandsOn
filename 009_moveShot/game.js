enchant();

var core;
var player;
var enemy;
var shot;

window.onload = function() {
    core = new Core(640, 480);
    core.fps = 60;
    core.rootScene.backgroundColor = "black";

    core.preload('player.PNG');
    core.preload('enemy.PNG');
    core.preload('shot.PNG');

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

        if(core.input.z){
            shot.x = player.x+32;
            shot.y = player.y-32;
            shot.visible = true;
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
    enemy.addEventListener(Event.ENTER_FRAME,function(){
        enemy.y += 2;
    });
    core.rootScene.addChild(enemy);

    shot = new Sprite(64,128);
    shot.image = core.assets['shot.PNG'];
    shot.visible = false;
    shot.addEventListener(Event.ENTER_FRAME,function(){
        shot.y -= 8;
    });
    core.rootScene.addChild(shot);

    core.addEventListener(Event.ENTER_FRAME,enterFrameByCore);
    core.keybind(90, 'z');
}

function enterFrameByCore() {
    if(player.intersect(enemy)){
        player.visible = false;
    }
}