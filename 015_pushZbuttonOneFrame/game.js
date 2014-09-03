enchant();

var core;
var player;
var enemyArray = new Array(4);
var shot;
var oldInput = {};

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

        if(core.input.z && !oldInput.z && shot.visible===false && player.visible===true){
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
        if(player.y > 352) {
            player.y = 352;
        }
    });
    core.rootScene.addChild(player);

    for(var i=0; i<4; i++){
        enemyArray[i] = createEnemy(i*170,0);
        core.rootScene.addChild(enemyArray[i]);
    }

    shot = new Sprite(64,128);
    shot.image = core.assets['shot.PNG'];
    shot.visible = false;
    shot.addEventListener(Event.ENTER_FRAME,function(){
        shot.y -= 18;
        if(shot.y < -128) {
            shot.visible = false;
        }
    });
    core.rootScene.addChild(shot);

    core.addEventListener(Event.ENTER_FRAME,enterFrameByCore);
    core.keybind(90, 'z');
}

function enterFrameByCore() {
    for(var i=0; i<4; i++){
        if(enemyArray[i].visible===true && player.intersect(enemyArray[i])){
            player.visible = false;
        }

        if(shot.intersect(enemyArray[i]) && shot.visible === true){
            enemyArray[i].visible = false;
        }
    }

    $.extend(true,oldInput,core.input);
}

function createEnemy(posx,posy) {
    var lenemy = new Sprite(128,128);
    lenemy.image = core.assets['enemy.PNG'];
    lenemy.x = posx;
    lenemy.y = posy;
    lenemy.addEventListener(Event.ENTER_FRAME,function(){
        lenemy.y += 2;
    });
    return lenemy;
}